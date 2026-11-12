# MyPESU Themes — Start Here

**Working Product Name:** MyPESU Themes  
**Product Tagline:** Your Academy. Your Style.  
**Repository / Directory:** `mypesu-themes`  
**Product Type:** Independent browser extension  
**Initial Browser Targets:** Google Chrome and Mozilla Firefox (Desktop)  
**Specification Status:** Stage 6B.5 (INTEGRATE — MONOCHROME COVERAGE AUDIT & VISUAL SYSTEM CORRECTION) Complete — Gated for Owner Sign-off  
**Date:** 6 November 2026

---

## 1. The Product in One Sentence

**MyPESU Themes** is an independent, privacy-first browser extension that allows PES University students to personalize the visual appearance, typography, spacing, and density of the official PESU Academy portal (`https://www.pesuacademy.com/*`) through curated theme packs with live preview and instant revert, while leaving the university's academic data, forms, and workflows completely untouched.

---

## 2. Key Approved Source References

1. **Methodology:** *Vibe Coding Engineering: A Professional Guide to Building Software with AI Agents*, Second Edition (2026). Development strictly follows the nine-stage lifecycle with one testable outcome per prompt and explicit owner approval gates.
2. **Official Extension Brand & Icon:** Approved Black & White compass mark (`asset/brand/pesu-compass-bw-source.png`) integrated into standard extension icon sizes (16, 24, 32, 48, 96, 128) with 100% pure black (`#000000`) and pure white (`#FFFFFF`) pixel normalization.
3. **Monochrome Theme Source:** Verified 12-step grayscale Light/Dark palette reference image (`jpg(7).jpg`).
4. **Apple-Inspired Theme Source:** Approved Apple design specification (`DESIGN(2).md` / `DESIGN-apple(3).md`), featuring Action Blue (`#0066cc`), Focus Blue (`#0071e3`), dark link blue (`#2997ff`), and audited accessible secondary text (`#6e6e73`).
5. **Zero-Background Architecture:** Content scripts synchronize directly with `browser.storage.local` via `storage.onChanged`, eliminating background service worker and event page overhead in V1 (DEC-05).
6. **Extension UI Framework:** Approved shadcn/ui and Tailwind CSS v4 for extension-owned interfaces (Popup, Options), with independent `extensionUiAppearance` decoupling.

---

## 3. Strict Scope & Safety Boundaries

- **Presentation Only:** Modifies visual presentation only. Strictly prohibits scraping, automated submissions, attendance calculators, GPA tools, or parallel slide downloaders (DEC-03).
- **Consequential Route Exclusions:** Fee payments, payment gateways, exam registrations/submissions, and authentication/CAPTCHA flows are **100% excluded**. Results, grade cards, and hall tickets default to **no styling in V1** (DEC-10).
- **Provisional Selectors:** All DOM selectors in page adapters remain **PROVISIONAL** until verified via the owner's manual evidence-collection protocol (DEC-08).
- **100% Local-First Privacy:** Zero user accounts, zero remote analytics, zero tracking, and zero external network traffic (DEC-11).
- **Minimal Permissions:** Restricted strictly to API permission `["storage"]` and host match `["https://www.pesuacademy.com/*"]` (DEC-12).

---

## 4. Documentation Index

### Core Specifications (Stages 1 & 2)
- `01_PRODUCT_BRIEF.md` — Product vision, primary user, JTBD, competitive differentiation, non-goals, and measurable performance budgets.
- `02_PRD.md` — Executable V1 requirements, typed schemas, 10 primary workflows, edge cases, academic invariants, and 20 observable PASS/FAIL acceptance criteria.
- `03_DESIGN_SYSTEM.md` — Core theme engine contract, semantic token definitions, palette isolation rules, and CSS custom property architecture (`--pas-*`).
- `04_TECHNICAL_ARCHITECTURE.md` — Zero-Background Architecture, WXT multi-target specifics, storage lifecycle, measurable engineering budgets, and Playwright/Vitest test ladder.
- `05_IMPLEMENTATION_ROADMAP.md` — Nine-stage implementation plan with milestones, deliverables, and release gates.
- `06_ANTIGRAVITY_PROMPTS.md` — Staged prompts for the Vibe Coding lifecycle.
- `07_RESEARCH_AND_REFERENCES.md` — Sourced market research on PESU-MAX, r/PESU community evidence, and official technical references.
- `08_PAGE_ADAPTER_SPEC.md` — Detailed specifications for Global Shell, Dashboard, and Courses adapters, marking all selectors as PROVISIONAL and detailing the manual evidence collection protocol.
- `09_DECISION_REGISTER.md` — Immutable log auditing decision provenance into `CONFIRMED_BY_OWNER`, `RECOMMENDED_PENDING_CONFIRMATION`, and `OPEN_DECISION`.

### Design Deliverables (Stage 3, 3.1, 3.2 & 3.3)
- `10_THEME_ASSET_INVENTORY.md` — Full de-duplication audit, asset licensing, and missing reference inventory.
- `11_MONOCHROME_THEME_SPEC.md` — Audited specification for Monochrome (12-step grayscale, 11 component states, WCAG AAA contrast).
- `12_APPLE_INSPIRED_THEME_SPEC.md` — Audited specification for Apple-Inspired (Action Blue `#0066cc`, audited accessible text `#6e6e73`, HIG spatial hierarchy, 11 component states).
- `13_THEME_STUDIO_UI_SPEC.md` — UX specification for responsive Popup (320px-400px fluid), Theme Studio Options page, and Shadow DOM live preview overlay.
- `14_THEME_COMPONENT_LIBRARY_MATRIX.md` — Extension-owned vs portal-owned separation, 10-point UI library checklist, and adapter interface.
- `15_PORTAL_VISUAL_ADAPTER_SPEC.md` — Visual specifications for Global Shell, Dashboard, and Course Materials listings.
- `16_ACCESSIBILITY_AND_VISUAL_QA.md` — Audited WCAG 2.2 AA contrast matrix, 6 standard viewports, and 12 visual QA test cases marked `NOT RUN (TEST SPECIFICATION)`.

### Preparation Deliverables (Stage 4)
- `17_REPOSITORY_RECONNAISSANCE.md` — Workspace, Git, and environment reconnaissance report, implementation readiness matrix, and Slice 0 scope.

### Build Foundation Deliverables (Stage 5 — Slice 0, Addenda 5.1 & 5.1-B)
- `18_STAGE5_FOUNDATION_REPORT.md` — Complete verification report for Slice 0: project foundation, dependencies, manifest audit, preference and theme registries, and test results.
- `19_STAGE5_UI_FOUNDATION_ADDENDUM_REPORT.md` — Verification report for Stage 5.1: shadcn/ui and Tailwind CSS v4 integration, decoupled extension UI appearance mode, and appearance controls.
- `20_STAGE5_ICON_INTEGRATION_REPORT.md` — Complete verification report for official black-and-white compass icon integration across Chrome and Firefox MV3.

### Extension UI Deliverables (Stage 6A & 6A.1 Polish)
- `21_STAGE6A_EXTENSION_UI_REPORT.md` — Complete verification report for Stage 6A: production-quality Popup and Theme Studio Options page, independent appearance systems, live storage sync, verified screenshots, and dual-target builds.
- `22_STAGE6A_SCROLLBAR_POLISH_REPORT.md` — Complete verification report for Stage 6A.1: custom slimline scrollbar design, dual-mode tokens, Chrome and Firefox CSS properties, and overflow verification.

### Portal Integration Deliverables (Stage 6B.0 & 6B.1)
- `23_STAGE6B_PORTAL_INSPECTION_PREPARATION_REPORT.md` — Complete preparation report for Stage 6B: content script lifecycle audit, P0 scope, sanitized fixture plan, integration risks, and prerequisites.
- `24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md` — Canonical manual inspection worksheet executed by the product owner in Chrome DevTools.
- `26_STAGE6B1_MONOCHROME_SHELL_REPORT.md` — Complete verification report for Slice 6B.1: Monochrome Global Shell Adapter, table-based layout preservation, verified selectors, and fixture test suite.

---

## 5. Current Gate & Next Immediate Action

* **Current Status:** Stage 6B.1 (INTEGRATE: Monochrome Global Shell Adapter) is complete.
* **Next Action:** The product owner reviews [26_STAGE6B1_MONOCHROME_SHELL_REPORT.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/26_STAGE6B1_MONOCHROME_SHELL_REPORT.md). Once approved, proceed to **Stage 6B Slice 6.2 (INTEGRATE: In-Tab Live Preview & State Machine)**.
* **Strict Rule:** DO NOT implement live preview or inner template adapters until authorized by the owner.
