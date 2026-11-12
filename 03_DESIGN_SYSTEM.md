# MyPESU Themes — Design System & Theme Engine Contract

**Product Name:** MyPESU Themes  
**Tagline:** Your Academy. Your Style.  
**Version:** 1.3 (Stage 3.1 Audit Update)  
**Status:** Audited Design System Contract  
**Date:** 6 November 2026

---

## 1. Design System Philosophy: Pluggable Theme Packs

MyPESU Themes is architected as an **extensible theme platform**. The extension core does not impose a single hardcoded aesthetic across the portal. Instead, visual styling is defined through self-contained, typed **Theme Packs** that declare semantic tokens, typography scales, spatial densities, and component surface rules.

### Core Architectural Separation
1. **Core Runtime Shell:** Manages browser extension lifecycle, local preference storage via `browser.storage.local`, dynamic CSS variable compilation, OS color scheme detection, and Shadow DOM isolation under a **Zero-Background Architecture (CONFIRMED_BY_OWNER)**.
2. **Theme Packs:** Replaceable, declarative token bundles containing complete color palettes, typography hierarchies, component shape definitions, and contrast metadata.
3. **Page Adapters:** Modular DOM binding definitions that map semantic theme variables (`--pas-*`) to specific portal templates (Shell, Dashboard, Courses) without leaking into unrelated pages. **All selectors remain PROVISIONAL until owner manual inspection is executed.**

---

## 2. Typed Conceptual Schemas

```ts
/** Appearance Modes */
export type ThemeMode = 'light' | 'dark';
export type PreferenceMode = 'light' | 'dark' | 'system';

/** Typography Token Contract */
export interface TypographyTokens {
  fontFamily: string;
  displayFamily?: string;
  sizeXs: string;   // 12px (Captions, timestamps)
  sizeSm: string;   // 14px (Table secondary text, metadata labels)
  sizeMd: string;   // 16px / 17px (Primary body text, inputs)
  sizeLg: string;   // 20px (Section headers, accordion titles)
  sizeXl: string;   // 28px (Page titles, primary headings)
  lineHeightNormal: string;      // 1.4 - 1.5
  lineHeightComfortable: string; // 1.6 - 1.7
  weightRegular: number;         // 400
  weightMedium: number;          // 500 / 600
  weightBold: number;            // 700
  letterSpacing?: string;
}

/** Spatial & Shape Token Contract */
export interface LayoutTokens {
  spaceXs: string;   // 4px
  spaceSm: string;   // 8px
  spaceMd: string;   // 16px / 17px
  spaceLg: string;   // 24px
  spaceXl: string;   // 32px
  pageGutter: string;
  radiusSm: string;  // 4px / 5px
  radiusMd: string;  // 6px / 8px
  radiusLg: string;  // 10px / 11px
  radiusPill: string; // 9999px
  borderWidth: string; // 1px
}

/** Semantic Color Token Contract */
export interface ColorTokens {
  canvas: string;          // Main window / viewport background
  surface: string;         // Cards, content panels, primary containers
  surfaceRaised: string;   // Modals, dropdowns, navigation drawers
  text: string;            // Primary high-contrast body text
  textMuted: string;       // Secondary text, subtitles, disabled icons
  border: string;          // Default container and card dividers
  borderSubtle: string;    // Soft table separators, hairline borders
  accent: string;          // Primary interactive buttons, active indicators
  onAccent: string;        // Text/icons placed atop accent background
  focus: string;           // Accessible keyboard focus ring
  link: string;            // Text hyperlinks
  success: string;         // [PROPOSED] Positive status / passing indicator
  warning: string;         // [PROPOSED] Shortage alerts / warning notices
  danger: string;          // [PROPOSED] Errors / critical alerts
  disabled: string;        // Inactive control background
}

/** Component Surface & State Token Contract */
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

/** Complete Theme Tokens */
export interface ThemeTokens {
  color: ColorTokens;
  typography: TypographyTokens;
  layout: LayoutTokens;
  components: ComponentTokens;
}

/** Theme Pack Specification */
export interface ThemeDefinition {
  id: string;
  version: string;
  name: string;
  description: string;
  author: string;
  license: string;
  supportedModes: ThemeMode[];
  tokens: Record<ThemeMode, ThemeTokens>;
  pageAdapters: string[];
  previewAsset: string;
  uiAdapterContractVersion: string;
}

/** Theme UI Adapter Contract (For Extension-Owned Surfaces) */
export interface ThemeUiAdapter {
  themeId: string;
  PopupContainer: React.ComponentType<{ children: React.ReactNode }>;
  OptionsContainer: React.ComponentType<{ children: React.ReactNode }>;
  ThemeCard: React.ComponentType<any>;
  ModeSelector: React.ComponentType<any>;
  SliderControl: React.ComponentType<any>;
}
```

---

## 3. Audited Theme Specifications (V1 Core)

Full detailed specifications are established in:
- [**`11_MONOCHROME_THEME_SPEC.md`**](file:///c:/Users/shrey/Downloads/mypesu%20themes/11_MONOCHROME_THEME_SPEC.md) (Exact 12-step grayscale palette `#FFFFFF` to `#000000`).
- [**`12_APPLE_INSPIRED_THEME_SPEC.md`**](file:///c:/Users/shrey/Downloads/mypesu%20themes/12_APPLE_INSPIRED_THEME_SPEC.md) (Action Blue `#0066cc`, audited accessible secondary text `#6e6e73`, and HIG spatial hierarchy).

### Summary of Primitive & Audited Semantic Color Token Mappings

| Semantic Role | Monochrome Light | Monochrome Dark | Apple-Inspired Light | Apple-Inspired Dark |
| :--- | :---: | :---: | :---: | :---: |
| `color.canvas` | `#FFFFFF` | `#000000` | `#f5f5f7` | `#000000` |
| `color.surface` | `#FAFAFA` | `#0A0A0A` | `#ffffff` | `#1d1d1f` |
| `color.surfaceRaised` | `#F5F5F5` | `#171717` | `#fafafc` | `#2c2c2e` |
| `color.text` | `#171717` | `#F5F5F5` | `#1d1d1f` | `#ffffff` |
| `color.textMuted` | `#737373` | `#8A8A8A` | **`#6e6e73`** (Audited) | `#a1a1a6` |
| `color.border` | `#E5E5E5` | `#262626` | `#d2d2d7` | `#333336` |
| `color.borderSubtle` | `#F5F5F5` | `#171717` | `#e5e5ea` | `#242426` |
| `color.accent` | `#262626` | `#E5E5E5` | `#0066cc` | `#2997ff` |
| `color.onAccent` | `#FFFFFF` | `#000000` | `#ffffff` | `#000000` |
| `color.focus` | `#525252` | `#A3A3A3` | `#0071e3` | `#0071e3` |
| `color.link` | `#262626` | `#E5E5E5` | `#0066cc` | `#2997ff` |

---

## 4. Strict Palette Isolation Enforcement

To maintain uncompromising visual identity for each theme, the following isolation rules are enforced at build time:
1. **Zero Cross-Contamination:** Blue accent tokens (`#0066cc`, `#0071e3`, `#2997ff`) must **never** be injected into the Monochrome theme. Monochrome must remain strictly neutral grayscale.
2. **Deterministic CSS Variable Clean-Up:** When switching between themes, the content script completely flushes the previous theme's variables before attaching the new token set to `:root`.
3. **No Hybrid Fallbacks:** If a theme token is undefined, the build system throws a compilation error rather than silently falling back to a different theme's color.

---

## 5. CSS Custom Property Architecture & Scoping

All CSS variables are namespaced using the `--pas-*` prefix (PESU Academy Styles) to prevent collisions with the portal's internal or legacy stylesheets.

```css
/* Document Root Attribute Bindings */
:root[data-pas-theme="monochrome"][data-pas-mode="dark"] {
  --pas-canvas: #000000;
  --pas-surface: #0a0a0a;
  --pas-surface-raised: #171717;
  --pas-text: #f5f5f5;
  --pas-text-muted: #8a8a8a;
  --pas-border: #262626;
  --pas-accent: #e5e5e5;
  --pas-on-accent: #000000;
  --pas-focus: #a3a3a3;
  --pas-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --pas-radius: 6px;
  --pas-spacing-unit: 8px;
}

:root[data-pas-theme="apple-inspired"][data-pas-mode="light"] {
  --pas-canvas: #f5f5f7;
  --pas-surface: #ffffff;
  --pas-surface-raised: #fafafc;
  --pas-text: #1d1d1f;
  --pas-text-muted: #6e6e73;
  --pas-border: #d2d2d7;
  --pas-accent: #0066cc;
  --pas-on-accent: #ffffff;
  --pas-focus: #0071e3;
  --pas-font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  --pas-radius: 8px;
  --pas-spacing-unit: 8px;
}
```

---

## 6. Accessibility & Contrast Verification (WCAG 2.2 Level AA)

1. **Contrast Standards:** Every text/background token pairing satisfies **WCAG 2.2 Level AA**:
   - Body text & labels: Minimum contrast ratio of **4.5:1**.
   - Large headings (>= 18pt or 14pt bold): Minimum contrast ratio of **3.0:1**.
   - Interactive components & borders: Minimum contrast ratio of **3.0:1**.
2. **Audited Secondary Text Tone:** For Apple-Inspired Light, body secondary text uses `#6e6e73` (**5.07:1** contrast on `#ffffff` and **4.66:1** on `#f5f5f7`) instead of the failing `#86868b` (3.64:1 on white). Both pairings pass WCAG 2.2 AA for normal text.
3. **Keyboard Focus Affordance:** Focus rings use `--pas-focus` with an outline width of at least `2px` and an offset of `2px`. Outline is never set to `none`.
4. **Reduced Motion:** If `@media (prefers-reduced-motion: reduce)` is detected, all transition durations (`--pas-duration`) are set to `0ms`.
5. **Color Independence:** Status indicators never rely on color alone. Icons, text badges, and weights accompany color shifts.
