# MyPESU Themes — Developer & Coding Agent Guidelines

## 1. Project Identity & Purpose
- **Product:** MyPESU Themes (package: `mypesu-themes`)
- **Tagline:** Your Academy. Your Style.
- **Type:** Independent browser extension for Google Chrome and Mozilla Firefox.
- **Boundary:** Modifies visual presentation only. Strictly zero academic data processing, zero automated transactions, zero scraping, and zero authentication credential access.

## 2. Authoritative Source-of-Truth Hierarchy
Before proposing or implementing any changes, agents must consult the following canonical specifications in order:
1. `00_START_HERE.md` — Core identity, boundaries, architecture overview, and index.
2. `02_PRD.md` — Functional specifications, typed contracts, error states, and acceptance criteria.
3. `03_DESIGN_SYSTEM.md` & `04_TECHNICAL_ARCHITECTURE.md` — CSS variable contract (`--pas-*`), zero-background model, and storage lifecycle.
4. `11_MONOCHROME_THEME_SPEC.md` & `12_APPLE_INSPIRED_THEME_SPEC.md` — Exact audited theme color palettes, components, and contrast pairs.
5. `08_PAGE_ADAPTER_SPEC.md` & `15_PORTAL_VISUAL_ADAPTER_SPEC.md` — Page adapter interface, provisional DOM selectors, and visual rules.
6. `16_ACCESSIBILITY_AND_VISUAL_QA.md` — WCAG 2.2 AA contrast rules, alpha compositing specs, and visual QA test definitions.
7. `09_DECISION_REGISTER.md` — Decision log and provenance audit.

## 3. Strict Architectural Invariants
- **Appearance Only:** Never touch university records, forms, grades, attendance, exam submissions, or fee payments. Excluded routes (`/feePayment*`, `/exam*`, `/login*`) must remain 100% untouched.
- **Zero-Background V1:** No persistent service workers, event pages, or background scripts. Content scripts synchronize via `browser.storage.onChanged`.
- **Local-First Privacy:** All preferences stored exclusively in `browser.storage.local`. Zero remote API calls, analytics, telemetry, or external fonts/assets.
- **Minimal Permissions:** Manifest permissions restricted strictly to `["storage"]` and host match `["https://www.pesuacademy.com/*"]`. Never introduce `tabs`, `cookies`, `scripting`, `webRequest`, or `<all_urls>`.
- **Safe Fallback:** If preference resolution fails or errors occur, leave the native portal appearance completely unstyled. Never inject partial styles.
- **UI Architecture:** Extension-owned interfaces (Popup, Options) use **shadcn/ui** and **Tailwind CSS v4** (`@tailwindcss/vite`). Extension UI appearance (`extensionUiAppearance`) is strictly decoupled from portal theme appearance (`themeId`, `appearanceMode`).
- **Extension Branding & Icons:** The official extension mark is the black-and-white compass from `asset/brand/pesu-compass-bw-source.png`. Icons in `public/icon-*.png` must remain strictly normalized to pure black (`#000000`) and pure white (`#FFFFFF`) with zero grey or colored pixels.
- **Windows Tooling Rule:** Always invoke package managers via `.cmd` (e.g. `pnpm.cmd`, `npm.cmd`).

