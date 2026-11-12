# Stage 5.1: Extension UI Foundation Addendum Report

**Product Name:** MyPESU Themes  
**Product Tagline:** Your Academy. Your Style.  
**Document:** Extension UI Foundation Addendum (Stage 5.1)  
**File Name:** `19_STAGE5_UI_FOUNDATION_ADDENDUM_REPORT.md`  
**Version:** 1.0  
**Stage:** Stage 5 — BUILD (Stage 5.1 Addendum: Extension UI Foundation)  
**Date:** 12 November 2026  
**Status:** Verification Complete — Gated for Owner Sign-off  

---

## 1. Executive Summary & Decision Implementation

Following explicit product owner approval (`DEC-14`), this addendum integrates:
1. **shadcn/ui Primitives:** Unstyled, accessible Radix UI primitives (`@radix-ui/react-select`) adapted to extension origins.
2. **Tailwind CSS v4:** Modern `@tailwindcss/vite` integration without legacy config files.
3. **Decoupled Extension UI Appearance:** Complete separation between the **Extension UI appearance** (`light`, `dark`, `system`) and the **PESU Portal Theme appearance** (`monochrome` / `apple-inspired`, `light` / `dark` / `system`).

The existing Chrome MV3 and Firefox MV3 builds, zero-background model, and least-privilege permission profile were preserved intact.

---

## 2. Framework & Tooling Integration

### 2.1 Dependencies Added
- `tailwindcss@4.3.5` & `@tailwindcss/vite@4.3.5` (Vite 8-native styling pipeline).
- `clsx@2.1.1` & `tailwind-merge@3.7.0` (Reusable `cn()` class merger).
- `@radix-ui/react-select@2.4.1` (Accessible Select primitive).
- `lucide-react@1.72.0` (Icon set).

### 2.2 WXT Vite Configuration (`wxt.config.ts`)
Integrated `@tailwindcss/vite` directly into WXT's Vite plugin pipeline:
```ts
import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  // ...manifest configuration
});
```

### 2.3 shadcn/ui Configuration (`components.json`)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### 2.4 Semantic Light / Dark Token Palette (`src/styles/globals.css`)
Tailwind v4 imports `@import "tailwindcss";` and declares semantic HSL/HEX variables for `:root` and `.dark` containers, covering `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--input`, and `--ring`.

---

## 3. Decoupled Preference Model

In accordance with Section 3 of Prompt 05.1, the extension UI's appearance is strictly decoupled from the university portal's appearance:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   USER PREFERENCE ARCHITECTURE                         │
├───────────────────────────────────┬────────────────────────────────────┤
│ 1. EXTENSION UI APPEARANCE        │ 2. PESU PORTAL THEME APPEARANCE    │
│ Field: extensionUiAppearance      │ Fields: themeId, appearanceMode    │
│ Values: "light" | "dark" | "system"│ Values: monochrome / apple-inspired│
│ Default: "system"                 │ Values: "light" | "dark" | "system"│
│                                   │                                    │
│ Scope: Popup & Options UI only    │ Scope: PESU Academy portal only    │
└───────────────────────────────────┴────────────────────────────────────┘
```

### 3.1 Schema Definition (`src/core/types/preferences.ts`)
```ts
export const ExtensionUiAppearanceSchema = z.enum(['light', 'dark', 'system']);
export type ExtensionUiAppearance = z.infer<typeof ExtensionUiAppearanceSchema>;

export const UserPreferencesSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  themeId: ThemeIdSchema.default('monochrome'),
  appearanceMode: AppearanceModeSchema.default('system'),
  extensionUiAppearance: ExtensionUiAppearanceSchema.default('system'),
  density: DensityModeSchema.default('comfortable'),
  fontScale: FontScaleSchema.default(100),
  pageOverrides: z.record(z.string(), PageOverrideSchema).default({}),
});
```

---

## 4. Reactive UI Theme Engine (`src/hooks/useExtensionUiTheme.ts`)

A centralized React hook manages the extension UI appearance:
1. **Initial Resolution:** Reads `extensionUiAppearance` asynchronously from `browser.storage.local`.
2. **System Mode Detection:** When set to `'system'`, evaluates `window.matchMedia('(prefers-color-scheme: dark)').matches`.
3. **Live System Listening:** Subscribes to `change` events on `(prefers-color-scheme: dark)` media queries.
4. **Cross-View Synchronization:** Listens to `browser.storage.onChanged` on the `local` area. Changing the setting in the Options page updates the active Browser Action Popup immediately without requiring reload.
5. **DOM Class Toggling:** Toggles `.dark` on `document.documentElement` to trigger semantic Tailwind variable shifts.
6. **Persistence:** Saves changes via `savePreferences()` back to `browser.storage.local`. Zero reliance on volatile `localStorage`.

---

## 5. Functional Appearance Control & Verification

- **Options Interface (`src/entrypoints/options/OptionsApp.tsx`):**
  - Includes a dedicated "Extension UI Appearance" control using the shadcn/ui `Select` component (`SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`).
  - Allows instant switching between **System (Auto)**, **Light**, and **Dark**.
  - Displays current effective UI mode (`light` vs `dark`).
  - Displays complete preference configuration baseline.
- **Popup Interface (`src/entrypoints/popup/PopupApp.tsx`):**
  - Connects to `useExtensionUiTheme()`.
  - Reflects the currently selected appearance and resolved mode.
  - Displays both `UI Appearance` and `Portal Theme` status side-by-side to verify clear separation.

---

## 6. Manifest & Permission Audit

Both production manifests were rebuilt and inspected directly from disk (`.output/chrome-mv3/manifest.json` and `.output/firefox-mv3/manifest.json`):

| Invariant | Target Requirement | Chrome MV3 Output | Firefox MV3 Output | Compliance |
| :--- | :---: | :---: | :---: | :---: |
| **Manifest Version** | `3` | `3` | `3` | **PASS** |
| **Background Script / Service Worker** | **ABSENT** | **ABSENT** | **ABSENT** | **PASS (Zero-Background Preserved)** |
| **API Permissions** | `["storage"]` only | `["storage"]` | `["storage"]` | **PASS (Least Privilege Preserved)** |
| **Host Permissions** | None in `permissions` | None | None | **PASS** |
| **Content Script Host Match** | `["https://www.pesuacademy.com/*"]` | `["https://www.pesuacademy.com/*"]` | `["https://www.pesuacademy.com/*"]` | **PASS** |
| **Firefox Data Collection Permissions** | `required: ["none"]` | N/A | `required: ["none"]` | **PASS** |
| **Prohibited Permissions (`tabs`, `cookies`)** | **ABSENT** | **ABSENT** | **ABSENT** | **PASS** |

---

## 7. Verification Ladder Results

```bash
# 1. TypeScript Strict Typecheck
$ pnpm.cmd run typecheck
$ tsc --noEmit
# Result: 0 errors (PASS)

# 2. Vitest Test Suite (including new preferences tests)
$ pnpm.cmd test
$ vitest run
 RUN  v3.2.7 C:/Users/shrey/Downloads/mypesu themes
 ✓ tests/theme-registry.test.ts (4 tests) 7ms
 ✓ tests/preferences.test.ts (9 tests) 9ms
 ✓ tests/storage.test.ts (6 tests) 16ms
 Test Files  3 passed (3)
      Tests  19 passed (19)
   Duration  979ms (PASS)

# 3. Production Chrome MV3 Build
$ pnpm.cmd run build:chrome
$ wxt build -b chrome --mv3
i Building chrome-mv3 for production with Vite 8.3.8
√ Built extension in 1.345 s
  ├─ .output\chrome-mv3\manifest.json                    463 B    
  ├─ .output\chrome-mv3\options.html                     497 B    
  ├─ .output\chrome-mv3\popup.html                       483 B    
  ├─ .output\chrome-mv3\chunks\jsx-runtime-BQ4kbIr3.js   279.67 kB
  ├─ .output\chrome-mv3\chunks\options-DCW_-nxY.js       127.14 kB
  ├─ .output\chrome-mv3\chunks\popup-CZqqc6gE.js         2.64 kB  
  ├─ .output\chrome-mv3\content-scripts\pesu.js          3.41 kB  
  └─ .output\chrome-mv3\assets\jsx-runtime-DWSyIxna.css  18.62 kB 
Σ Total size: 432.93 kB                                
√ Finished in 2.270 s (PASS)

# 4. Production Firefox MV3 Build
$ pnpm.cmd run build:firefox
$ wxt build -b firefox --mv3
i Building firefox-mv3 for production with Vite 8.3.8
 WARN  Firefox requires extension ID for MV3 and recommends it for MV2.
√ Built extension in 1.048 s
  ├─ .output\firefox-mv3\manifest.json                    555 B    
  ├─ .output\firefox-mv3\options.html                     497 B    
  ├─ .output\firefox-mv3\popup.html                       483 B    
  ├─ .output\firefox-mv3\chunks\jsx-runtime-BQ4kbIr3.js   279.67 kB
  ├─ .output\firefox-mv3\chunks\options-DCW_-nxY.js       127.14 kB
  ├─ .output\firefox-mv3\chunks\popup-CZqqc6gE.js         2.64 kB  
  ├─ .output\firefox-mv3\content-scripts\pesu.js          3.41 kB  
  └─ .output\firefox-mv3\assets\jsx-runtime-DWSyIxna.css  18.62 kB 
Σ Total size: 433.02 kB                                 
√ Finished in 1.456 s (PASS)
```

---

## 8. Documentation Updates Applied

- [09_DECISION_REGISTER.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/09_DECISION_REGISTER.md): Updated `DEC-14` to `CONFIRMED_BY_OWNER`, approving shadcn/ui, Tailwind CSS v4, and independent extension UI appearance modes.
- [14_THEME_COMPONENT_LIBRARY_MATRIX.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/14_THEME_COMPONENT_LIBRARY_MATRIX.md): Updated matrix to record shadcn/ui and Tailwind CSS v4 as the approved implementation for extension-owned surfaces.
- [13_THEME_STUDIO_UI_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/13_THEME_STUDIO_UI_SPEC.md): Added Section 1.1 formalizing the decoupling between extension UI appearance and portal theme mode.
- [AGENTS.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/AGENTS.md): Documented the approved UI architecture and appearance decoupling in the agent guidelines.
- [00_START_HERE.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/00_START_HERE.md): Indexed [19_STAGE5_UI_FOUNDATION_ADDENDUM_REPORT.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/19_STAGE5_UI_FOUNDATION_ADDENDUM_REPORT.md) and updated status.
- [05_IMPLEMENTATION_ROADMAP.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/05_IMPLEMENTATION_ROADMAP.md): Updated Stage 5 deliverables with the UI foundation addendum.

---

## 9. Strict Stage Boundary Adherence

In compliance with project boundaries:
- **Zero portal styling** was written or injected.
- **Zero portal DOM selectors** were implemented.
- **No final Theme Studio designs** or card layouts were created.
- **No Git commits or pushes** were performed.
- Work was strictly limited to establishing the shadcn/ui foundation and decoupled appearance controls.

---

## 10. Final Completion Verdict

**PASS — STAGE 5 UI FOUNDATION ADDENDUM COMPLETE**

