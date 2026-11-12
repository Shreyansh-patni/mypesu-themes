# MyPESU Themes — Theme Component Library & Integration Matrix

**Product Name:** MyPESU Themes  
**Document:** Theme Component Library & Integration Matrix  
**File Name:** `14_THEME_COMPONENT_LIBRARY_MATRIX.md`  
**Version:** 1.0  
**Stage:** Stage 3 — DESIGN  
**Date:** 6 November 2026

---

## 1. Architectural Distinction: Extension-Owned UI vs Portal-Owned UI

A fundamental architectural principle of MyPESU Themes is the strict separation between **Extension-Owned UI surfaces** and **Portal-Owned UI surfaces**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        SURFACE ARCHITECTURE                            │
├───────────────────────────────────┬────────────────────────────────────┤
│ A. EXTENSION-OWNED UI             │ B. PORTAL-OWNED UI                │
│ • Browser Action Popup            │ • Global Navigation Header/Drawer  │
│ • Theme Studio Options Page       │ • Student Dashboard Metrics/Notices│
│ • Floating Live Preview Bar       │ • Course Materials & Slide Tables  │
│ • Preference Controls & Dialogs   │ • Timetable & Attendance Grids     │
├───────────────────────────────────┼────────────────────────────────────┤
│ IMPLEMENTATION:                   │ IMPLEMENTATION:                    │
│ Independent React 18/19 components│ Scoped CSS Custom Properties       │
│ rendered inside extension origins │ (`--pas-*`) bound to verified      │
│ or Shadow DOM. May use approved   │ portal DOM containers. NEVER       │
│ theme UI libraries.               │ replaces university components.    │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Critical Implementation Rules:
1. **Portal-Owned UI:** The extension **never** injects a heavy third-party UI framework (like MUI, Mantine, or Radix) into the live university portal. Doing so would bloat page memory, conflict with ERP JavaScript, and risk breaking official academic forms. Portal UI is customized **strictly via scoped CSS custom properties and lightweight container class overrides**.
2. **Extension-Owned UI:** The Popup and Options Page are extension-origin documents where theme-specific UI component libraries can be safely mounted, provided they satisfy bundle size, extension CSP, and licensing constraints.

---

## 2. Theme-to-Library Compatibility Matrix

The product owner has explicitly approved **shadcn/ui** and **Tailwind CSS v4** (`@tailwindcss/vite`) for all extension-owned interfaces (`DEC-14`). The framework provides accessible Radix primitives, zero runtime CSS-in-JS overhead, and full support for independent Light/Dark/System appearance modes:

| Evaluation Criterion | Theme A: Monochrome | Theme B: Apple-Inspired | Future Theme Packs (V2) |
| :--- | :---: | :---: | :---: |
| **Approved Component Architecture** | **shadcn/ui (Radix Primitives)** | **shadcn/ui (Radix Primitives)** | shadcn/ui modular adapter |
| **Styling Engine** | **Tailwind CSS v4 (`@tailwindcss/vite`)** | **Tailwind CSS v4 (`@tailwindcss/vite`)** | Tailwind CSS v4 |
| **Framework Target** | React 19 (`react@19.3.1`) | React 19 (`react@19.3.1`) | React 19 |
| **TypeScript Compatibility** | Strict types (`typescript@5.9.3`) | Strict types (`typescript@5.9.3`) | Mandatory strict types |
| **Styling Paradigm** | Tailwind utility classes + CSS vars | Tailwind utility classes + CSS vars | Utility classes + CSS vars |
| **Accessibility (a11y)** | WCAG 2.2 AA (Built-in ARIA & Focus) | WCAG 2.2 AA (Built-in ARIA & Focus) | WCAG 2.2 AA compliant |
| **License Permissibility** | MIT (Permissive) | MIT (Permissive) | MIT / Apache 2.0 required |
| **Extension CSP Compliance** | Zero `eval()`, zero inline scripts | Zero `eval()`, zero inline scripts | No `eval()` |
| **Bundle Size Impact** | ~18 KB CSS; tree-shaken JS | ~18 KB CSS; tree-shaken JS | `< 250 KB` gzipped |
| **CSS Leakage Prevention** | Isolated extension origin / Shadow DOM | Isolated extension origin / Shadow DOM | Shadow DOM |

---

## 3. UI Library Evaluation & Acceptance Protocol

When the product owner supplies specific UI component library packages or URLs, each library must be audited against this 10-point checklist before adoption:

1. **Official URL / Package Identity:** Verifiable npm package and active source repository.
2. **Framework & Version Compatibility:** Seamless support for React 18/19 and Vite/WXT bundlers.
3. **TypeScript Support:** Complete first-party type definitions without compilation errors.
4. **Styling Approach:** Must support CSS variables or scoped modules; must not inject unscoped global CSS resets into the portal.
5. **Component Coverage:** Must provide core controls: Buttons, Segmented Controls, Toggles, Sliders, Cards, and Dialogs.
6. **Accessibility Capabilities:** Built-in ARIA support, keyboard navigation, and visible focus management.
7. **Permissive License:** Permissive open-source license (MIT, Apache 2.0, BSD). Zero viral copyleft (GPL) dependencies.
8. **Dependency Footprint:** Tree-shakeable; minimal transitive dependencies; bundle size within the `< 250 KB` budget.
9. **CSS Isolation Suitability:** Compatible with rendering inside closed Shadow DOM trees.
10. **Browser Extension CSP Compliance:** Zero dynamic code generation (`new Function()`, `eval()`), and zero remote asset fetching.

---

## 4. Theme UI Adapter Contract

To ensure that future owner-supplied UI libraries can be plugged in without modifying the core extension logic, the extension defines a typed adapter contract:

```ts
import React from 'react';

export interface ThemeUiAdapter {
  themeId: string;
  version: string;
  
  /** Root container for the Browser Action Popup */
  PopupContainer: React.ComponentType<{ children: React.ReactNode }>;
  
  /** Root container for the Options Page */
  OptionsContainer: React.ComponentType<{ children: React.ReactNode }>;
  
  /** Theme presentation card in the gallery */
  ThemeCard: React.ComponentType<{
    title: string;
    description: string;
    active: boolean;
    onSelect: () => void;
    onPreview: () => void;
  }>;
  
  /** Segmented control for Light / Dark / System */
  ModeSelector: React.ComponentType<{
    value: 'light' | 'dark' | 'system';
    onChange: (mode: 'light' | 'dark' | 'system') => void;
  }>;
  
  /** Bounded slider for text scale or density */
  SliderControl: React.ComponentType<{
    label: string;
    value: number | string;
    min?: number;
    max?: number;
    step?: number;
    onChange: (val: any) => void;
  }>;
}
```

*Note: In the absence of supplied libraries, Stages 4 and 5 will scaffold a lightweight, clean React component shell adhering strictly to this interface.*

