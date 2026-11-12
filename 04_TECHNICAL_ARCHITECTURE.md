# MyPESU Themes — Technical Architecture

**Product Name:** MyPESU Themes  
**Repository / Directory:** `mypesu-themes`  
**Version:** 1.1 (Stage 2.1 Audit Update)  
**Status:** Approved Technical Architecture  
**Date:** 6 November 2026

---

## 1. Technology Stack

* **Extension Framework:** [WXT](https://wxt.dev/) (Next-Gen Web Extension Framework powered by Vite).
* **Language:** TypeScript 5.x (Strict mode enabled).
* **UI Layer:** React 18 / 19 (for Popup, Options Page, and Shadow DOM preview overlays).
* **Styling Engine:** Scoped CSS Modules and CSS Custom Properties (`--pas-*`). Tailwind CSS is permitted strictly within extension-owned surfaces (Popup/Options/Shadow DOM); Tailwind utilities must **never** be injected into the host portal global scope.
* **Storage Layer:** `wxt/storage` (Type-safe wrapper over `browser.storage.local`).
* **Schema Validation:** [Zod](https://zod.dev/) for runtime validation of preferences and theme manifests.
* **Testing Stack:** [Vitest](https://vitest.dev/) for unit testing schemas and token compilers; [Playwright](https://playwright.dev/) for headless browser integration testing across Chromium and Firefox.

---

## 2. Cross-Browser Build Strategy: The Zero-Background Architecture

### 2.1 The Cross-Browser Dilemma in Manifest V3
Official browser extension documentation highlights significant divergences between Chromium and Gecko:
- **Chromium (Chrome, Edge):** Requires `background.service_worker`. Service workers are ephemeral, have no access to the DOM, and frequently go dormant.
- **Gecko (Firefox):** As documented by [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background), Firefox's Manifest V3 implementation **does not support service workers** for extensions. It requires `background.scripts` running in an event page context.
- **WXT Defaults:** In WXT, `wxt build -b chrome` defaults to Manifest V3, while `wxt build -b firefox` defaults to Manifest V2 unless explicitly configured for MV3 via `wxt.config.ts`. Furthermore, Firefox requires `browser_specific_settings.gecko.id` for signing and installation.

### 2.2 Architectural Breakthrough: Zero-Background Extension (V1)
An audit of MyPESU Themes' V1 feature set reveals that **a background script is completely unnecessary**:
1. **Settings Persistence:** The Popup and Options Page read and write directly to `browser.storage.local`.
2. **Content Script Synchronization:** The content script (`pesu.content`) reads preferences on initial page load (`run_at: document_start`). For real-time updates, it listens to the native `browser.storage.onChanged` event.
3. **Live Preview Communication:** Draft preview tokens are communicated either via direct tab messaging (`browser.tabs.sendMessage`) from the popup/options context or via a transient `previewSession` key in `browser.storage.local`.

```text
┌─────────────────────────┐          ┌──────────────────────────┐
│ Extension Popup / Theme │          │ Portal Content Script    │
│ Studio Options Page     │          │ (pesu.content.ts)        │
└────────────┬────────────┘          └─────────────▲────────────┘
             │                                     │
             ▼                                     │
┌──────────────────────────────────────────────────┴────────────┐
│                    browser.storage.local                      │
│             (Reactive via storage.onChanged)                  │
└───────────────────────────────────────────────────────────────┘
  * ZERO BACKGROUND SERVICE WORKER OR BACKGROUND SCRIPT REQUIRED *
```

### Benefits of Zero-Background Architecture in V1:
* **Eliminates Cross-Browser Discrepancy:** No service worker vs event page discrepancies between Chrome and Firefox.
* **Zero Cold-Start Latency:** No delays waiting for a dormant service worker to wake up.
* **Minimal Resource Footprint:** Consumes 0 MB of RAM when popup/options surfaces are closed.
* **Clean Manifests:** Both Chrome and Firefox manifests omit the `"background"` key entirely, reducing permission attack surface and store review friction.

### 2.3 WXT Multi-Target Configuration (`wxt.config.ts`)
```ts
import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: ({ browser, manifestVersion }) => ({
    name: 'MyPESU Themes',
    description: 'Your Academy. Your Style. Premium appearance customization for PESU Academy.',
    version: '1.0.0',
    permissions: ['storage'],
    host_permissions: ['https://www.pesuacademy.com/*'],
    // Zero background entrypoint declared in V1
    ...(browser === 'firefox' && {
      browser_specific_settings: {
        gecko: {
          id: 'mypesu-themes@pesu.academy',
          strict_min_version: '109.0',
        },
      },
    }),
  }),
});
```

---

## 3. Repository & Entrypoint Structure

```text
mypesu-themes/
├── .wxt/                       # Auto-generated WXT types and manifests
├── entrypoints/
│   ├── popup/                  # Extension browser action popup
│   │   ├── index.html
│   │   ├── main.tsx
│   │   └── PopupApp.tsx
│   ├── options/                # Full Theme Studio options page
│   │   ├── index.html
│   │   ├── main.tsx
│   │   └── OptionsApp.tsx
│   └── pesu.content/           # Portal content script
│       ├── index.ts            # Entrypoint mounting page adapters
│       ├── dom-guard.ts        # Route and host verification
│       └── observer.ts         # Debounced MutationObserver
├── src/
│   ├── core/
│   │   ├── preferences/        # Zod schema, migrations, storage wrapper
│   │   ├── theme-registry/     # Built-in theme loader & registry
│   │   ├── compiler/           # Token-to-CSS generator
│   │   └── preview/            # Ephemeral preview state manager
│   ├── themes/
│   │   ├── monochrome/         # Monochrome theme pack & token definitions
│   │   │   ├── tokens.light.ts
│   │   │   ├── tokens.dark.ts
│   │   │   └── index.ts
│   │   └── apple-inspired/     # Apple design theme pack & token definitions
│   │       ├── tokens.light.ts
│   │       ├── tokens.dark.ts
│   │       └── index.ts
│   ├── page-adapters/
│   │   ├── registry.ts         # Adapter router and lifecycle manager
│   │   ├── shell.adapter.ts    # Global header/sidebar adapter
│   │   ├── dashboard.adapter.ts# Dashboard adapter
│   │   └── courses.adapter.ts  # Course materials adapter
│   ├── shared/
│   │   ├── types.ts            # Core TypeScript interfaces
│   │   ├── schemas.ts          # Zod validation schemas
│   │   └── constants.ts        # Namespaces, storage keys, route regexes
│   └── styles/
│       ├── tokens.css          # Base CSS variable declarations
│       └── reset.css           # Extension UI reset
├── package.json
├── tsconfig.json
└── wxt.config.ts
```

---

## 4. Content Script & DOM Mutation Lifecycle

The content script runs in the `ISOLATED` world to guarantee that portal JavaScript cannot tamper with extension internals, and vice versa.

```text
Portal Document Load
       │
       ▼
[ run_at: document_start ] ──► Asynchronously read appearance preferences from browser.storage.local
       │                       If preferences resolve & validate:
       │                         Inject data-pas-theme & data-pas-mode on <html>
       │                         (Mitigates Flash of Unstyled Content)
       │                       If preferences are delayed, unavailable, or corrupted:
       │                         Leave native portal styling untouched (No partial theme)
       ▼
[ DOMContentLoaded ]      ──► Match active URL against PageAdapterRegistry
       │                       Mount matched adapter; apply scoped CSS rules
       ▼
[ Dynamic AJAX Update ]   ──► Debounced MutationObserver (150ms window)
                               Re-verify DOM markers; update tokens idempotently
```

### 4.1 Strict Preference Hydration & Safe Fallback Behavior
1. **Asynchronous Storage Architecture:** Browser extension storage APIs (`browser.storage.local`) are strictly asynchronous. The extension does **not** rely on or assume synchronous preference retrieval.
2. **Zero Authentication Exposure:** MyPESU Themes **never** accesses, reads, stores, transmits, or depends on PESU authentication tokens, session credentials, passwords, or cookies. It only handles its own visual appearance preferences stored locally.
3. **No Partial Theme Application:** If appearance preferences are unavailable, delayed, or fail schema validation, the extension leaves the portal's native styling completely unchanged. It will **never** apply a partially initialized theme. The selected theme is applied only after its required preferences have fully resolved and validated against the Zod schema.
4. **Engineering Performance Targets:**
   - **Local Appearance-Settings Hydration:** Target median (p50) `< 50ms`, 95th percentile (p95) `< 100ms`.
   - **Theme Injection and Paint:** Target median (p50) `< 75ms`, 95th percentile (p95) `< 150ms`.
   - *Note:* These figures represent unverified engineering targets to be measured and validated during Stage 7 performance benchmarking, not hard timeout guarantees.

### 4.2 Reversible Style Injection Mechanism
1. Styles are attached via a single `<style id="pas-theme-styles">` element in the document head.
2. Token attributes are declared directly on `document.documentElement`:
   ```html
   <html data-pas-theme="apple-inspired" data-pas-mode="dark" data-pas-density="comfortable">
   ```
3. To cancel or reset styling, the content script simply removes the `#pas-theme-styles` tag and purges all `data-pas-*` attributes. The native portal appearance is restored instantaneously without requiring a page reload.

### 4.3 In-Page Extension UI & Shadow DOM Isolation
If a floating Theme Studio bar or quick-switch widget is mounted into the active portal tab:
- It is attached to a host container `<div id="pas-floating-root">`.
- A closed Shadow Root (`attachShadow({ mode: 'closed' })`) is mounted.
- All extension widget styles are injected inside the Shadow Root.
- **Result:** Portal CSS cannot distort the extension controls, and extension styles cannot spill into the university layout.

---

## 5. Storage Architecture & Schema Migration

All user data is stored locally via `browser.storage.local`.

### 5.1 Storage Schema Definition
```ts
import { z } from 'zod';

export const UserPreferencesV1Schema = z.object({
  schemaVersion: z.literal(1),
  enabled: z.boolean().default(true),
  themeId: z.enum(['monochrome', 'apple-inspired']).default('monochrome'),
  mode: z.enum(['light', 'dark', 'system']).default('system'),
  appearance: z.object({
    textScale: z.enum(['default', 'comfortable', 'large']).default('default'),
    density: z.enum(['comfortable', 'compact']).default('comfortable'),
    fontFamilyOverride: z.string().optional(),
  }).default({}),
  pageOverrides: z.record(z.object({
    enabled: z.boolean().default(true),
    themeId: z.string().optional(),
    mode: z.enum(['light', 'dark', 'system']).optional(),
  })).default({}),
  diagnosticsEnabled: z.boolean().default(false),
});

export type UserPreferencesV1 = z.infer<typeof UserPreferencesV1Schema>;
```

### 5.2 Migration & Corruption Recovery
```ts
export async function loadPreferences(): Promise<UserPreferencesV1> {
  try {
    const raw = await browser.storage.local.get('preferences');
    const result = UserPreferencesV1Schema.safeParse(raw.preferences);
    if (result.success) {
      return result.data;
    }
    console.warn('[MyPESU Themes] Schema mismatch; resetting to defaults.');
    return UserPreferencesV1Schema.parse({ schemaVersion: 1 });
  } catch {
    return UserPreferencesV1Schema.parse({ schemaVersion: 1 });
  }
}
```

---

## 6. Measurable Engineering Performance Budgets

Rather than unmeasurable absolute claims (e.g. "0 dropped frames on every PC"), performance is governed by strict, measurable engineering budgets tested on a defined reference environment.

### 6.1 Reference Test Environment
* **Hardware Profile:** Mid-tier reference desktop (Quad-core CPU @ 2.5GHz, 8GB RAM, integrated graphics, 1080p 60Hz display).
* **Browser Channels:** Google Chrome Stable and Mozilla Firefox Release.
* **Measurement Methodology:** Performance profiles recorded via Chrome DevTools Performance panel and Firefox Profiler across 5 consecutive runs.

### 6.2 Performance Budget Matrix

| Performance Metric | Evaluation Method | Target (Median / p50) | Upper Bound (p95) | Hard Failure Threshold |
| :--- | :--- | :---: | :---: | :---: |
| **In-Tab Theme Switch Latency** | Delta from popup click to CSS variable update | `< 75ms` | `< 150ms` | `> 300ms` |
| **Cold-Start FOUC Window** | Time between initial paint and dark theme apply | `< 100ms` | `< 200ms` | `> 400ms` |
| **MutationObserver Script Time** | Execution time of debounced DOM callback | `< 8ms` | `< 16ms` (1 frame) | `> 32ms` |
| **Max Observer Frequency** | Throttling limit on dynamic portal AJAX loads | 1 call / 150ms | 1 call / 150ms | `> 10 calls / sec` |
| **Storage Read/Write Overhead** | Time to execute Zod parse + storage get/set | `< 15ms` | `< 30ms` | `> 100ms` |
| **Memory Footprint (Inert)** | RAM consumed on portal page when idle | `< 5 MB` | `< 10 MB` | `> 25 MB` |

### 6.3 Documented Failure & Safe Fallback Mode
If the styling engine encounters an unhandled exception, DOM mutation loop, or severe selector mismatch:
1. The engine catches the exception and increments an internal failure counter.
2. If >= 2 consecutive failures occur on a route, the engine activates **Safe Fallback Mode**:
   - Immediately unmounts `#pas-theme-styles`.
   - Purges all `data-pas-*` attributes from `document.documentElement`.
   - Logs a non-sensitive diagnostic event (`ADAPTER_DEGRADED_SAFELY`).
   - Leaves the native PESU Academy portal 100% operational in its default appearance.

---

## 7. Build, Test, & Release Pipeline

### 7.1 Package Commands
* `pnpm install`: Install dependencies outside sandbox.
* `pnpm dev`: Start local development with HMR on Chrome.
* `pnpm dev:firefox`: Start development with HMR on Firefox.
* `pnpm build`: Generate production builds for Chrome and Firefox.
* `pnpm build:chrome`: Generate Chrome MV3 distribution in `.output/chrome-mv3`.
* `pnpm build:firefox`: Generate Firefox MV3 distribution in `.output/firefox-mv3`.
* `pnpm test`: Execute Vitest unit test suite.
* `pnpm test:e2e`: Execute Playwright extension integration tests.
* `pnpm lint`: Typecheck and lint codebase.

### 7.2 Verification Ladder
1. **Unit Tests (Vitest):** Validate token schemas, Zod preference parsing, token compilation, and fallback recovery.
2. **Integration Tests (Playwright):** Load unpacked extensions in headless Chromium and Firefox; test theme switching, live preview, cancel, and apply against mocked HTML fixtures.
3. **Store Packaging Review:** Inspect generated manifests to ensure zero background keys and verify that output packages contain no source maps or unneeded assets.
