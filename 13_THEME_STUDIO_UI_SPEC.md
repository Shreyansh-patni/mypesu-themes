# MyPESU Themes — Theme Studio UI & UX Specification

**Product Name:** MyPESU Themes  
**Document:** Theme Studio UI & UX Specification (Stage 3.1 Audit Update)  
**File Name:** `13_THEME_STUDIO_UI_SPEC.md`  
**Version:** 1.1 (Responsive Popup Sizing & Reconciled Budgets)  
**Stage:** Stage 3.1 — DESIGN AUDIT  
**Date:** 6 November 2026

---

## 1. Overview & Architecture of Extension-Owned Surfaces

The extension-owned user interface consists of two distinct surfaces:
1. **Browser Action Popup (`popup/`):** A fluid, responsive popover window designed for rapid theme and mode switching during active portal browsing.
2. **Theme Studio Options Page (`options/`):** A full-screen canvas designed for in-depth customization, live preview management, per-page overrides, accessibility diagnostics, and preference backup.
3. **In-Tab Live Preview Bar (Shadow DOM):** A floating, non-intrusive preview controller mounted directly in the active portal tab during live preview sessions.

### 1.1 Decoupled Appearance Architecture: Extension UI vs Portal Theme
The extension implements two strictly decoupled appearance models:
1. **Extension UI Appearance (`extensionUiAppearance`):** Controls the color scheme (`light`, `dark`, `system`) of the Popup and Options / Theme Studio interface itself. Built with shadcn/ui and Tailwind CSS v4. Synchronized reactively across extension views via `browser.storage.onChanged` and media query listeners.
2. **PESU Portal Theme Appearance (`appearanceMode` & `themeId`):** Controls how the official university portal (`https://www.pesuacademy.com/*`) is visually restyled.
*Architectural Invariant:* Changing the Extension UI appearance never alters the portal's theme mode, and customizing the portal never unexpectedly shifts the extension UI's appearance. Each has its own dedicated, typed preference.

---

## 2. Browser Action Popup (`popup/`) — Responsive Specification

> [!IMPORTANT]
> **POPUP SIZING AUDIT:** The previously stated `360px x 480px` dimensions represent a **reference design target**, not a rigid universal fixed container. Browser action popup containers vary between Chromium and Gecko depending on display scaling (DPI) and window boundaries.

### 2.1 Dimensional & Responsive Rules:
* **Reference Target:** `360px` width by `480px` height.
* **Fluid Bounds:**
  - Minimum Usable Width: `320px` (guarantees zero horizontal scroll on small displays).
  - Maximum Bounded Width: `400px`.
  - Maximum Bounded Height: `600px` (or maximum browser viewport allowance).
* **Layout Discipline:**
  - Flexbox column layout (`flex-direction: column; overflow-x: hidden; overflow-y: auto;`).
  - Text and segmented control buttons use relative percentage widths with `min-width: 0` to prevent clipping or text truncation.
  - Interactive touch/click targets maintain a minimum dimension of `40px` (preferably `44px`).
* **Browser-Specific Container Considerations:**
  - **Chrome:** Uses standard Chromium popup frame; respects `body { width: 360px; min-height: 440px; max-height: 580px; }`.
  - **Firefox:** Gecko popup window sizes dynamically to root content; requires `html, body { overflow-x: hidden; }` to prevent unwanted horizontal scrollbars.

```text
┌──────────────────────────────────────────────┐
│  MyPESU Themes                 [⚙ Options]   │
│  Your Academy. Your Style.                   │
├──────────────────────────────────────────────┤
│  STATUS: ● Active on pesuacademy.com         │
├──────────────────────────────────────────────┤
│  APPEARANCE MODE                             │
│  [  ☀ Light  ] [  ☾ Dark  ] [  💻 System  ]  │
├──────────────────────────────────────────────┤
│  ACTIVE THEME                                │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │   MONOCHROME     │  │  APPLE-INSPIRED  │  │
│  │   [Active ✓]     │  │   [Select]       │  │
│  └──────────────────┘  └──────────────────┘  │
├──────────────────────────────────────────────┤
│  QUICK READABILITY CONTROLS                  │
│  Text Scale:    [ 100% ]  [ 110% ]  [ 120% ] │
│  Table Density: [ Comfortable ]  [ Compact ] │
├──────────────────────────────────────────────┤
│  [ Open Full Theme Studio & Live Preview → ] │
└──────────────────────────────────────────────┘
```

---

## 3. Full Theme Studio Options Page (`options/`)

The Options page is a responsive, spacious desktop canvas structured with an Apple-style navigation rail on the left and a content panel on the right.

### 3.1 Layout Hierarchy
```text
┌──────────────┬─────────────────────────────────────────────────────────┐
│ MyPESU       │ THEME GALLERY                                           │
│ Themes       │ Choose a curated design system for PESU Academy:        │
│              │                                                         │
│ ❖ Gallery    │ ┌────────────────────────┐  ┌────────────────────────┐  │
│ ⚡ Preview    │ │ Monochrome             │  │ Apple-Inspired         │  │
│ ⚙ Appearance │ │ [Live Preview Card]    │  │ [Live Preview Card]    │  │
│ 📄 Pages     │ │ Neutral 12-step gray   │  │ HIG Blue Accents & Sys │  │
│ 🔒 Privacy   │ │ [ Apply ] [ Preview ]  │  │ [ Apply ] [ Preview ]  │  │
│ ℹ About      │ └────────────────────────┘  └────────────────────────┘  │
│              │                                                         │
│              │ ADVANCED READABILITY                                    │
│              │ Text Scale:   [========o====] 110% (Comfortable)        │
│              │ Density:      (•) Comfortable    ( ) Compact            │
│              │ Font Stack:   [ System Default (San Francisco/Segoe) ▾] │
│              ├─────────────────────────────────────────────────────────┤
│              │ PER-PAGE OVERRIDES                                      │
│              │ [✓] Global Navigation Shell                             │
│              │ [✓] Student Dashboard                                   │
│              │ [✓] Course Materials & Slides                           │
│              │ [ ] Timetable & Attendance (P1 - Coming Soon)           │
│              ├─────────────────────────────────────────────────────────┤
│              │ DANGER ZONE / RECOVERY                                  │
│              │ [ Reset Current Page ] [ Reset All Settings to Default ]│
└──────────────┴─────────────────────────────────────────────────────────┘
```

---

## 4. In-Tab Live Preview Workflow (Shadow DOM Overlay)

When the user initiates a Live Preview from the Popup or Theme Studio, an ephemeral preview controller is injected into the active portal tab:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 👁 PREVIEWING: Apple-Inspired (Dark)  [Scale: 110%]    [ Cancel ] [ Apply & Save ]│
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Live Preview Lifecycle:
1. **Mounting:** Injected into `<div id="pas-preview-bar">` wrapped in a closed Shadow Root (`mode: 'closed'`).
2. **Ephemeral Token Injection:** Sets `data-pas-preview="true"` on `:root`. Injects draft CSS custom properties into `#pas-theme-styles`. **Zero writes committed to `browser.storage.local`.**
3. **Cancellation (1-Click Revert):**
   - User clicks **"Cancel"** or presses `Escape`.
   - The preview bar is removed; `data-pas-preview` is cleared.
   - The content script re-reads saved storage preferences and restores the previous theme within performance budget (< 75ms p50).
   - **Zero page reload required.**
4. **Commitment (Apply & Save):**
   - User clicks **"Apply & Save"**.
   - Storage writes the draft configuration to `browser.storage.local`.
   - `data-pas-preview` is removed; theme becomes active.

---

## 5. Reconciled Performance Engineering Budgets

Evaluated on a reference mid-tier desktop environment (Quad-core CPU @ 2.5GHz, 8GB RAM, 1080p 60Hz display):
* **In-Tab Theme Switch Latency:** Target median (p50) `< 75ms`, 95th percentile (p95) `< 150ms`. Hard failure threshold: `> 300ms`.
* **Cold-Start FOUC Window:** Target median (p50) `< 100ms`, 95th percentile (p95) `< 200ms`. Hard failure threshold: `> 400ms`.
* **MutationObserver Script Time:** Maximum callback execution time `< 16ms` (1 frame at 60Hz), throttled to 1 call per 150ms window.
* **Storage Read/Write Overhead:** Target median (p50) `< 15ms`, 95th percentile (p95) `< 30ms`.
