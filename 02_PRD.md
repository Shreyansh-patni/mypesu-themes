# MyPESU Themes — Product Requirements Document (PRD)

**Product Name:** MyPESU Themes  
**Tagline:** Your Academy. Your Style.  
**Repository / Directory:** `mypesu-themes`  
**Version:** 1.1 (Stage 2.1 Audit Update)  
**Status:** Audited Executable Contract  
**Date:** 6 November 2026  
**Methodology:** *Vibe Coding Engineering*, 2nd Edition (Nine-Stage Lifecycle)

---

## 1. Executive Summary & Product Boundary

MyPESU Themes is an independent browser extension for Google Chrome and Mozilla Firefox that provides a premium visual customization layer for the official PES University portal (`https://www.pesuacademy.com/*`).

The extension operates on **presentation only**. It strictly decouples appearance styling from underlying academic logic, records, authentication, and submissions. The extension is 100% local-first, storing user preferences in the browser's local storage with zero cloud dependencies, zero external network traffic, and zero data collection.

### Core Visual Directions (V1)
1. **Monochrome Theme:** Derived directly from the approved 12-step grayscale palette (`#FFFFFF` to `#000000`), offering pure high-contrast neutral styling.
2. **Apple-Inspired Theme:** Derived from the unique Apple design specification, utilizing Action Blue (`#0066cc`), Focus Blue (`#0071e3`), dark-surface link blue (`#2997ff`), and system typography/spacing scales.

---

## 2. Product Goals & Strict Non-Goals

### 2.1 Core Product Goals
- Provide polished, accessible Light, Dark, and System appearance modes for supported PESU Academy pages.
- Deliver a non-destructive in-tab Theme Studio with instantaneous live preview and 1-click revert.
- Maintain scoped, stable page adapters for core portal surfaces (Global Shell, Dashboard, Course Materials).
- Ensure strict cross-browser compatibility across Google Chrome and Mozilla Firefox via WXT under a **Zero-Background Architecture**.
- Enforce the principle of least privilege, requiring only `storage` and host access to `https://www.pesuacademy.com/*`.
- Guarantee deterministic reset capabilities at the page, theme, and global extension levels.

### 2.2 Strict Non-Goals (Explicit Exclusions)
- **NO Academic Productivity Utilities:** No parallel slide downloaders, bulk PDF mergers, or file export helpers.
- **NO Calculators or Predictions:** No SGPA, CGPA, or attendance shortage calculation engines.
- **NO Workflow Automation:** No auto-clicking, auto-enrollment, automated assignment submission, or automated CAPTCHA solving.
- **NO Data Scraping or Exfiltration:** Zero reading, logging, or transmitting of student roll numbers, names, grades, marks, or personal messages.
- **NO Inspection of Credentials:** Absolute prohibition against accessing password inputs, OTP fields, auth tokens, or session cookies.
- **NO Modification of Consequential Workflows:** Complete exclusion of fee payment pages, payment gateways, and formal exam test-taking engines. Default-off on grade cards, exam seating, and hall tickets.
- **NO Remote Code Execution:** Zero remote script loading, `@import` from CDNs, or `eval()` execution.
- **NO Broad Permissions:** Absolute prohibition against `<all_urls>` or matching domains outside verified PESU Academy hosts.

---

## 3. Scope & Priority Matrix

| Feature Area | Priority | Scope Description | Release Requirement |
| :--- | :---: | :--- | :--- |
| **WXT Scaffold** | **P0** | Chrome and Firefox builds from a single source tree using a Zero-Background Architecture. | Release Blocker |
| **Monochrome Theme** | **P0** | Light and Dark modes matching the exact 12-step neutral grayscale palette. | Release Blocker |
| **Apple-Inspired Theme** | **P0** | Light and Dark modes with Action Blue (`#0066cc`) and HIG typography/spacing tokens. | Release Blocker |
| **Appearance Modes** | **P0** | `Light`, `Dark`, and `System` (dynamic OS `prefers-color-scheme` synchronization). | Release Blocker |
| **Theme Studio** | **P0** | Extension popup + full Options page with live preview, Apply, Cancel, and Reset. | Release Blocker |
| **Non-Destructive Revert** | **P0** | Immediate restoration of previous styling upon Cancel without page refresh or storage corruption. | Release Blocker |
| **Core Page Adapters** | **P0** | Scoped adapters for Global Portal Shell, Student Dashboard, and Course Materials listings. | Release Blocker |
| **Readability Controls** | **P0** | Bounded text scaling (`default` 100%, `comfortable` 110%, `large` 120%) and density (`comfortable`, `compact`). | Release Blocker |
| **Per-Page Overrides** | **P0** | Enable/disable styling toggle for individual recognized portal page types. | Release Blocker |
| **Local Preferences** | **P0** | Versioned Zod schema persisted in `browser.storage.local` with migration recovery. | Release Blocker |
| **Minimal Permissions** | **P0** | Strict restriction to `storage` API and `https://www.pesuacademy.com/*` host match. | Release Blocker |
| **Accessibility Audit** | **P0** | WCAG 2.1 AA compliance (>= 4.5:1 contrast for body text), keyboard navigation, reduced motion. | Release Blocker |
| **Secondary Adapters** | **P1** | Scoped adapters for Timetable and Attendance summaries (subject to visual safety review). | Post-Core |
| **Declarative Backup** | **P1** | Export/import of validated preference JSON (strictly schema-checked, no executable CSS). | Post-Core |
| **Custom Accent Token** | **P1** | Bounded accent color picker for themes that declare customizable accent roles. | Post-Core |
| **Theme Presets** | **P1** | Favorites bar and quick-switch shortcuts for power users. | Post-Core |
| **Community Marketplace** | **Later** | Remote theme gallery or third-party theme distribution. | V2+ Deferred |
| **Cloud Sync** | **Later** | Cross-device profile synchronization via remote backend accounts. | V2+ Deferred |
| **Mobile Browsers** | **Later** | Safari on iOS, Firefox on Android. | V2+ Deferred |

---

## 4. Theme System Architectural Contract & Schemas

### 4.1 Typed Conceptual Schema Definitions

```ts
/** Appearance Modes */
export type ThemeMode = 'light' | 'dark';
export type PreferenceMode = 'light' | 'dark' | 'system';

/** Typography Hierarchy */
export interface TypographyTokens {
  fontFamily: string;
  displayFamily?: string;
  sizeXs: string;   // captions, metadata (e.g. 12px)
  sizeSm: string;   // table secondary, labels (e.g. 14px)
  sizeMd: string;   // body text, inputs (e.g. 16px / 17px)
  sizeLg: string;   // section titles, h3 (e.g. 20px)
  sizeXl: string;   // page headings, h1/h2 (e.g. 28px)
  lineHeightNormal: string;
  lineHeightComfortable: string;
  weightRegular: number;
  weightMedium: number;
  weightBold: number;
  letterSpacing?: string;
}

/** Layout and Shape Scale */
export interface LayoutTokens {
  spaceXs: string;   // 4px
  spaceSm: string;   // 8px
  spaceMd: string;   // 16px / 17px
  spaceLg: string;   // 24px
  spaceXl: string;   // 32px
  pageGutter: string;
  radiusSm: string;  // 5px
  radiusMd: string;  // 8px / 11px
  radiusLg: string;  // 18px
  radiusPill: string; // 9999px
  borderWidth: string; // 1px
}

/** Component Surface and Interactive States */
export interface ComponentTokens {
  buttonBg: string;
  buttonFg: string;
  buttonHoverBg: string;
  buttonActiveBg: string;
  buttonDisabledBg: string;
  buttonDisabledFg: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  inputBg: string;
  inputFg: string;
  inputBorder: string;
  inputFocusBorder: string;
  tableHeaderBg: string;
  tableHeaderFg: string;
  tableRowBg: string;
  tableRowAltBg: string;
  tableRowHoverBg: string;
  tableBorder: string;
}

/** Complete Semantic Color Tokens */
export interface ColorTokens {
  canvas: string;          // Page background
  surface: string;         // Card/panel surface
  surfaceRaised: string;   // Modals, tooltips, flyouts
  text: string;            // Primary body text
  textMuted: string;       // Secondary labels, captions
  border: string;          // Neutral hairline borders
  borderSubtle: string;    // Soft dividers
  accent: string;          // Primary interactive action color
  onAccent: string;        // Text/icon atop accent
  focus: string;           // Accessible focus ring
  link: string;            // Text hyperlinks
  success: string;         // Positive confirmations
  warning: string;         // Notice banners, shortages
  danger: string;          // Errors, destructive actions
  disabled: string;        // Inactive controls
}

/** Aggregated Theme Tokens */
export interface ThemeTokens {
  color: ColorTokens;
  typography: TypographyTokens;
  layout: LayoutTokens;
  components: ComponentTokens;
}

/** Theme Pack Definition */
export interface ThemeDefinition {
  id: 'monochrome' | 'apple-inspired' | string;
  version: string;
  name: string;
  description: string;
  author: string;
  license: string;
  supportedModes: ThemeMode[];
  tokens: Record<ThemeMode, ThemeTokens>;
  pageAdapters: string[]; // List of supported PageAdapter IDs
  previewAsset: string;   // Relative path to local preview SVG/PNG
  uiAdapterContractVersion: string;
}

/** User Preferences Persisted in Extension Storage */
export interface UserPreferencesV1 {
  schemaVersion: 1;
  enabled: boolean;
  themeId: 'monochrome' | 'apple-inspired';
  mode: PreferenceMode;
  appearance: {
    textScale: 'default' | 'comfortable' | 'large';
    density: 'comfortable' | 'compact';
    fontFamilyOverride?: string;
  };
  pageOverrides: Record<string, {
    enabled: boolean;
    themeId?: string;
    mode?: PreferenceMode;
  }>;
  diagnosticsEnabled: boolean;
}

/** Ephemeral Live Preview Session State */
export interface PreviewSession {
  isActive: boolean;
  draftThemeId: string;
  draftMode: PreferenceMode;
  draftAppearance: {
    textScale: 'default' | 'comfortable' | 'large';
    density: 'comfortable' | 'compact';
  };
  originalPreferences: UserPreferencesV1;
}
```

### 4.2 Built-In Theme Palette Isolation Rules

The extension strictly enforces palette isolation between themes. Tokens must never intermix or cross-contaminate.

#### 1. Monochrome Theme (Grayscale 12-Step Scale)
Derived strictly from the verified reference image:

| Step Index | Light Token Value | Dark Token Value | Semantic Mapping |
| :---: | :---: | :---: | :--- |
| **Base** | `#FFFFFF` | `#000000` | Canvas / Window Background |
| **50** | `#FAFAFA` | `#0A0A0A` | Surface Raised / Side Menu |
| **100** | `#F5F5F5` | `#171717` | Card Background / Table Row Alt |
| **200** | `#E5E5E5` | `#262626` | Subtle Borders / Inactive Dividers |
| **300** | `#D4D4D4` | `#373737` | Input Borders / Hover Dividers |
| **400** | `#A3A3A3` | `#525252` | Disabled Text / Inactive Icons |
| **500** | `#737373` | `#8A8A8A` | Secondary Muted Text |
| **600** | `#525252` | `#A3A3A3` | Accent Default (Neutral) |
| **700** | `#404040` | `#D4D4D4` | Primary Text (Light) / Accent Hover |
| **800** | `#262626` | `#E5E5E5` | High-Contrast Headings (Light) |
| **900** | `#171717` | `#F5F5F5` | Primary Text (Dark) |
| **950** | `#0A0A0A` | `#FAFAFA` | High-Contrast Headings (Dark) |

#### 2. Apple-Inspired Theme (HIG Color & Spatial System)
Derived strictly from the unique Apple design specification:
- **Action Accent:** Action Blue `#0066cc` (Light) / `#2997ff` (Dark surfaces).
- **Focus Indicator:** Focus Blue `#0071e3`.
- **Light Surfaces:** White `#ffffff`, Parchment `#f5f5f7`, Pearl `#fafafc`.
- **Dark Surfaces:** Deep Obsidian `#000000`, Space Gray `#1d1d1f`, Graphite `#2c2c2e`.
- **Typography Stack:** Native system font hierarchy (`-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`).
- **Corner Radii:** Bounded scale of `0px`, `5px`, `8px`, `11px`, `18px`, and `9999px` (pill).
- **Isolation Enforcement:** Action Blue (`#0066cc`) must never appear in the Monochrome theme pack; Monochrome neutral grays must never overwrite Apple surface values.

---

## 5. Theme Studio User Experience & State Machines

### 5.1 Primary Workflows

```text
  [ User opens Popup / Theme Studio ]
                   │
                   ▼
       [ Selects Theme / Mode ]
                   │
                   ▼
        [ Triggers Live Preview ] ──► (Content script injects temporary --pas-* tokens)
                   │                  (data-pas-preview="true" set on :root)
         ┌─────────┴─────────┐        (Zero writes committed to storage)
         ▼                   ▼
    [ Cancel ]           [ Apply ]
         │                   │
         ▼                   ▼
(Tears down preview;   (Writes to browser.storage.local;
 restores saved state; removes data-pas-preview;
 no page reload)       theme remains active)
```

1. **Popup Launch:** Clicking the toolbar action opens a 360px x 480px popup. It checks the active tab URL. If on `https://www.pesuacademy.com/*`, it displays active theme, mode, text scale, quick-switch buttons, and a link to the full Theme Studio options page.
2. **Theme Selection:** Clicking a theme card (Monochrome or Apple-Inspired) instantly compiles the theme's token set.
3. **Mode Switching:** Clicking `Light`, `Dark`, or `System` toggles the active variant. In `System` mode, an OS media query listener is bound to react dynamically to system-level appearance changes.
4. **Advanced Appearance Adjustments:** User adjusts Text Scale (`default`, `comfortable`, `large`) or Layout Density (`comfortable`, `compact`) via segmented controls.
5. **Live Preview Trigger:** Changes apply immediately to the active portal tab in-memory with a `data-pas-preview="true"` attribute attached to the root document. No storage write occurs.
6. **Applying Changes:** Clicking "Apply & Save" writes the configuration to `browser.storage.local` and clears the preview flag.
7. **Cancelling Preview:** Clicking "Cancel" or closing the options page without saving removes temporary preview styles and reinstates previously saved tokens without reloading the page.
8. **Per-Page Override:** Navigating to an unstyled sub-route provides a toggle: *"Enable styling on this page"*. Disabling removes adapter-specific classes for that URL.
9. **Reset to Portal Defaults:**
   - *Reset Page:* Reverts custom overrides for the active route.
   - *Reset Theme Defaults:* Restores default scale and density for the active theme.
   - *Reset All:* Purges extension storage and restores native portal styles across all tabs.
10. **Diagnostics View:** A non-sensitive diagnostics panel displays extension version, detected route, matched adapter, active theme, and WCAG contrast pass status.

### 5.2 Edge Cases and Error State Machine

| Failure Condition | Detection Mechanism | System Behavior & Fallback Strategy | User-Facing Notification |
| :--- | :--- | :--- | :--- |
| **Storage API Failure** | `browser.storage.local.get()` rejects or throws exception. | Reverts in-memory to hardcoded safe defaults (Monochrome Light); does not crash content script. | Non-blocking toast: *"Settings could not be saved locally."* |
| **Theme Pack Corruption** | Zod validation fails on theme token JSON. | Content script rejects corrupted theme; safely falls back to default Monochrome pack. | Inline badge: *"Theme configuration error. Using Monochrome."* |
| **Unsupported Domain** | Tab URL does not match `https://www.pesuacademy.com/*`. | Extension remains completely inert; zero scripts or styles injected; popup shows disabled state. | Popup banner: *"MyPESU Themes is only active on PESU Academy."* |
| **Portal DOM Mutation** | University alters structural classes or table wrappers. | Page adapter `isSupported()` returns `false`; skips adapter styling; leaves raw page untouched. | Diagnostics indicator: *"Page layout not recognized. Custom styles skipped."* |
| **Mid-Navigation Switch**| User switches theme while portal is performing AJAX content load. | Debounced observer waits for DOM stability (150ms idle) before reapplying theme tokens idempotently. | None (smooth visual transition). |
| **Extension Uninstall** | User uninstalls or disables extension. | Chrome/Firefox automatically removes content scripts and stylesheets; portal immediately reverts to default. | Handled natively by browser extension lifecycle. |

---

## 6. Page Adapter Strategy & Academic Safeguards

### 6.1 Core vs Secondary vs Excluded Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        V1 P0 CORE ADAPTERS                             │
│   Global Shell  •  Student Dashboard  •  Course Materials Listings     │
│   (Applied only on verified routes; provisional selectors audited)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                  P1 SECONDARY ADAPTERS (POST-CORE)                     │
│   Timetable Matrix  •  Attendance Overview                            │
│   HARD INVARIANT: Numerical attendance %, hours, shortages read-only  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                      STRICTLY EXCLUDED WORKFLOWS                       │
│   Fee Payments  •  Exam Registrations  •  Auth/CAPTCHA  •  Grade Cards │
│   HARD INVARIANT: Content script immediately halts; ZERO CSS injected  │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Academic Data Invariants
1. **Zero Text & Value Mutation:** No extension code, style rule, or adapter may alter, replace, or obscure text nodes, numeric values, status badges, or timestamps.
2. **Attendance Integrity (P1 Scope):** When the P1 Attendance adapter is implemented, numerical attendance values (e.g. `84.5%`) and attendance shortage warning badges **MUST NEVER be shifted, hidden, recolored into low-contrast states, or altered**.
3. **Excluded Workflows (P0 Scope):** P0 automated tests must assert that visiting payment gateways (`/Academy/.*fee.*`), exam registration/submission flows (`/Academy/.*exam.*`), and grade cards (`/Academy/.*grade.*`) results in **zero CSS injected and zero DOM attributes attached**.

---

## 7. Cross-Browser Build Architecture (WXT)

### 7.1 Zero-Background Architecture
MyPESU Themes V1 operates without a background script:
* Settings persistence is managed directly by popup/options writing to `browser.storage.local`.
* Content scripts react to settings changes via `browser.storage.onChanged`.
* Eliminates the Manifest V3 background service worker (Chrome) vs background event page (Firefox) divergence.

### 7.2 Multi-Target Distribution
* `wxt build -b chrome`: Compiles Chrome distribution bundle into `.output/chrome-mv3/`.
* `wxt build -b firefox`: Compiles Firefox distribution bundle into `.output/firefox-mv3/`, injecting `browser_specific_settings.gecko.id` as required by AMO.

---

## 8. Permissions & Security Matrix

### 8.1 Declared Permissions
| Manifest Key | Declared Value | Provenance | Operational Justification |
| :--- | :--- | :---: | :--- |
| **`permissions`** | `["storage"]` | `RECOMMENDED_PENDING_CONFIRMATION` | Mandatory to store user preferences locally. |
| **`host_permissions`**| `["https://www.pesuacademy.com/*"]` | `RECOMMENDED_PENDING_CONFIRMATION` | Mandatory to execute content scripts and apply CSS custom properties on the official portal only. |

### 8.2 Prohibited Permissions
* `<all_urls>` / `*://*/*`: **PROHIBITED**
* `downloads`: **PROHIBITED**
* `cookies`: **PROHIBITED**
* `webRequest`: **PROHIBITED**
* `tabs`: **PROHIBITED**
* `scripting`: **PROHIBITED**

---

## 9. Observable PASS/FAIL Acceptance Criteria

### 9.1 Functional & Safety Test Matrix

| Test ID | Priority | Test Category | Scenario / Execution Input | Expected Observable Outcome | Verdict Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **AC-01** | **P0** | **Installation** | Install unpacked extension into clean Chrome & Firefox profiles. | Icon displays in browser toolbar; clicking opens Popup; no console errors or permission warnings. | PASS |
| **AC-02** | **P0** | **Default Theme**| Navigate to `https://www.pesuacademy.com/Academy/`. | Default Monochrome theme applies; surfaces match 12-step grayscale palette; FOUC within budget. | PASS |
| **AC-03** | **P0** | **Theme Switch** | Switch theme from Monochrome to Apple-Inspired in Popup. | Grayscale tokens removed completely; Apple tokens (Action Blue `#0066cc`) applied immediately without page reload. | PASS |
| **AC-04** | **P0** | **System Mode** | Set mode to `System` and toggle OS appearance between Light and Dark. | Document root `data-pas-mode` swaps automatically within budget; colors transition smoothly. | PASS |
| **AC-05** | **P0** | **Live Preview** | Open Theme Studio, select Apple Dark, adjust scale to `comfortable`. | Current tab updates live in-tab (`data-pas-preview="true"`); `browser.storage.local` remains unmodified. | PASS |
| **AC-06** | **P0** | **Cancel Preview**| Click "Cancel" in Theme Studio during active live preview. | Page instantly reverts to previously saved theme; temporary CSS custom properties removed; zero page refresh. | PASS |
| **AC-07** | **P0** | **Apply & Save** | Click "Apply & Save" in Theme Studio. | Preferences saved to `browser.storage.local`; `data-pas-preview` removed; theme persists across browser restarts. | PASS |
| **AC-08** | **P0** | **Text Scale** | Set Text Scale to `large` (120%) on Course Materials page. | Typography scales cleanly by 1.2x; table containers do not clip text or force horizontal page scroll. | PASS |
| **AC-09** | **P0** | **Density Mode** | Toggle Layout Density from `comfortable` to `compact`. | Table row vertical padding drops from 14px to 8px; table data remains legible with no overlapping rows. | PASS |
| **AC-10** | **P0** | **Page Override**| Disable styling for Dashboard template via per-page toggle. | Dashboard immediately reverts to native university CSS; Global Shell remains themed; preference persists. | PASS |
| **AC-11** | **P0** | **Reset Defaults**| Click "Reset All Preferences" in Theme Studio. | Storage purged and re-initialized; active tab reverts to native PESU portal appearance. | PASS |
| **AC-12** | **P0** | **Unknown Route**| Navigate to unmapped route (e.g. `/Academy/custom-portal-path`). | Shell adapter applies safely; unknown inner container is left untouched; diagnostics logs `UNMAPPED_ROUTE`. | PASS |
| **AC-13** | **P0** | **Unsupported** | Navigate to `https://google.com` or `https://files.pesuacademy.com`. | Content script does not inject; popup displays `"Unsupported Website"` status; zero CSS injected. | PASS |
| **AC-14** | **P0** | **Route Exclusion**| Navigate to Fee Payment (`/Academy/.*fee.*`) or Exam Submission gateway. | Content script detects excluded route; completely halts execution; zero CSS or attributes injected. | PASS |
| **AC-15** | **P0** | **Grade Exclusion**| Navigate to Grade Cards / Results (`/Academy/.*result.*`). | Results page defaults to NO STYLING in V1; grade cards render in pristine native portal styles. | PASS |
| **AC-16** | **P0** | **A11y Contrast**| Audit all theme combinations using automated WCAG analyzer. | 100% of body text and interactive controls achieve contrast ratio >= 4.5:1 (>= 3:1 for large text). | PASS |
| **AC-17** | **P0** | **Keyboard Nav** | Navigate Popup and Theme Studio using Tab, Arrow keys, and Enter. | All controls have visible focus rings; all actions can be executed without mouse interaction. | PASS |
| **AC-18** | **P0** | **Reduced Motion**| Enable `prefers-reduced-motion` in operating system. | All theme switching and modal transitions complete instantaneously with zero animation duration. | PASS |
| **AC-19** | **P0** | **Zero Network** | Monitor browser DevTools Network tab during extension operation. | Zero HTTP/HTTPS requests originating from extension origin; zero external CDN calls. | PASS |
| **AC-20** | **P1** | **Attendance Safety**| (P1 Release) Inspect Attendance & Timetable under active theme. | Numerical attendance percentages, shortage alerts, and class hours are 100% unaltered in value, position, and visibility. | GATED (P1) |

### 9.2 Measurable Performance Engineering Budgets
Tested on a defined reference mid-tier desktop environment (Quad-core CPU @ 2.5GHz, 8GB RAM, 1080p 60Hz display):

| Performance Parameter | Target (Median / p50) | 95th Percentile (p95) | Hard Failure Gate |
| :--- | :---: | :---: | :---: |
| **Theme Injection & Paint** | `< 75ms` | `< 150ms` | `> 300ms` |
| **Local Appearance Hydration** | `< 50ms` | `< 100ms` | `> 200ms` |
| **In-Tab Theme Switch Latency** | `< 75ms` | `< 150ms` | `> 300ms` |
| **Cold-Start FOUC Window** | `< 100ms` | `< 200ms` | `> 400ms` |
| **MutationObserver Callback Script Time** | `< 8ms` | `< 16ms` (1 frame) | `> 32ms` |
| **Max Observer Throttling Window** | 1 call / 150ms | 1 call / 150ms | `> 10 calls / sec` |
| **Safe Fallback Degradation** | `< 50ms` | `< 100ms` | `> 250ms` |

*Note:* All performance values represent unverified engineering targets to be measured and validated during Stage 7 testing; they are not hard timeout guarantees. Preference loading is strictly asynchronous. If preferences are delayed or fail to load, the portal remains 100% native unstyled (no partial theme is applied).

---

## 10. Student Pilot Validation Plan

### 10.1 Pilot Overview
- **Cohort Size:** 8 to 12 active PESU undergraduate students across multiple semesters and engineering streams.
- **Duration:** 7 days of daily academic portal usage.
- **Distribution:** Unpacked extension loaded into Chrome and Firefox profiles.
- **Focus Areas:** Readability during night study, table density comfort, live preview usability, and academic page safety.

### 10.2 Decision Rule (Continue / Pivot / Stop)
- **CONTINUE:** If >= 75% of participants report significant visual improvement, actively retain the extension after 7 days, and report **zero** academic or functional bugs.
- **PIVOT:** If participants demand specific styling adjustments (e.g. higher table contrast or alternative font sizes) but value the overall theme engine. Refine theme tokens before public launch.
- **STOP:** If students exhibit near-zero interest in an appearance-only tool without downloaders/calculators, or if university portal DOM shifts cause frequent catastrophic layout breakages.
