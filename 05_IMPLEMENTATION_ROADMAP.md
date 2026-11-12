# MyPESU Themes — Implementation Roadmap

**Product Name:** MyPESU Themes  
**Tagline:** Your Academy. Your Style.  
**Version:** 1.2 (Stage 3 DESIGN Update)  
**Methodology:** *Vibe Coding Engineering*, 2nd Edition (Nine-Stage Lifecycle)  
**Status:** Stage 3 Design Complete / Gated for Owner Sign-off

---

## 1. Lifecycle Overview & Gate Progression

```text
[ Stage 1: Think ] ──► COMPLETE (Reconnaissance report approved; problem validated)
        │
        ▼
[ Stage 2: Define ] ──► COMPLETE (PRD, schemas, adapter specs, and decision register locked)
        │
        ▼
[ Stage 3: Design ] ──► COMPLETE (Theme specs, Theme Studio UX, WCAG QA matrix, UI matrix)
        │
[ Stage 4: Prepare ] ──► COMPLETE (Reconnaissance report 17_REPOSITORY_RECONNAISSANCE.md approved)
        │
        ▼
[ Stage 5: Build ] ──► SLICE 0 COMPLETE (Foundation shell, Zod preferences, typed registry, MV3 dual builds)
        │                 [ GATE: Owner Review of Slice 0 Foundation Report ]
        │
[ Stage 6: Integrate ] ─► PENDING (Monochrome + Apple packs, verified page adapters)
        │
[ Stage 7: Verify ] ──► PENDING (Multi-browser test ladder, student pilot validation)
        │
[ Stage 8: Launch ] ──► PENDING (Chrome Web Store & Mozilla Add-ons distribution)
        │
[ Stage 9: Iterate ] ──► PENDING (Post-launch feedback and P1 features)
```

---

## 2. Stage-by-Stage Plan & Deliverables

### Stage 1 — Think: Market & Technical Reconnaissance
* **Status:** **COMPLETE** (Report delivered 2026-11-06).
* **Key Achievements:** Verified competitive differentiation against PESU-MAX; confirmed WXT cross-browser viability; proved least-privilege permission profile.

### Stage 2 — Define: Freeze Executable Contracts (Stage 2.1 Audit)
* **Status:** **COMPLETE** (Audited & owner confirmed 2026-11-06).
* **Key Achievements:** Locked DEC-01 through DEC-08; established Zero-Background Architecture; confirmed Firefox MV3 target; marked selectors provisional.

### Stage 3 — Design: Theme Pack Extraction & UI Specification
* **Status:** **COMPLETE / GATED FOR OWNER SIGN-OFF**
* **Deliverables Produced:**
  - `10_THEME_ASSET_INVENTORY.md` (De-duplication audit, asset licensing, missing inputs).
  - `11_MONOCHROME_THEME_SPEC.md` (Exact 12-step grayscale, semantic tokens, 11 component states, WCAG AAA contrast).
  - `12_APPLE_INSPIRED_THEME_SPEC.md` (Action Blue `#0066cc`, HIG spatial hierarchy, native system typography, 11 component states).
  - `13_THEME_STUDIO_UI_SPEC.md` (Popup, Theme Studio options page, Shadow DOM live preview overlay).
  - `14_THEME_COMPONENT_LIBRARY_MATRIX.md` (Extension-owned vs portal-owned separation, UI library checklist, adapter contract).
  - `15_PORTAL_VISUAL_ADAPTER_SPEC.md` (Visual hierarchy for Global Shell, Dashboard, and Course Materials).
  - `16_ACCESSIBILITY_AND_VISUAL_QA.md` (WCAG 2.2 AA audit, 6 standard viewports, 12 visual QA test cases).
* **Gate Requirement:** Owner reviews and signs off on Stage 3 design package before initiating Stage 4.

### Stage 4 — Prepare: Repository & Environment Reconnaissance
* **Status:** **COMPLETE** (Report delivered in `17_REPOSITORY_RECONNAISSANCE.md`).
* **Key Achievements:** Verified workspace root, confirmed tool versions (Node `v26.7.0`, pnpm `11.23.0`, Git `2.55`), confirmed zero premature code/scaffolding, established implementation readiness matrix.

### Stage 5 — Build: Shared Extension Foundation (Slice 0 & Addendum 5.1)
* **Status:** **STAGE 5 COMPLETE (FOUNDATION & UI ADDENDUM) / GATED FOR OWNER REVIEW**
* **Objective:** Scaffold clean, minimal WXT extension targeting Chrome and Firefox under the Zero-Background Architecture, extended with shadcn/ui and Tailwind CSS for extension-owned surfaces.
* **Deliverables:**
  - WXT project foundation targeting Chrome MV3 and Firefox MV3 (`wxt.config.ts`).
  - Git initialized with `.gitignore` and developer guidelines (`AGENTS.md`).
  - Strict TypeScript configuration (`tsconfig.json`) and Vitest configuration (`vitest.config.ts`).
  - shadcn/ui and Tailwind CSS v4 integration (`@tailwindcss/vite`, `src/styles/globals.css`, `src/lib/utils.ts`).
  - Decoupled `extensionUiAppearance` preference (`light`, `dark`, `system`) with reactive theme switching hook (`useExtensionUiTheme`).
  - Functional appearance control in Options using shadcn/ui Select; synchronized across Popup.
  - Type-safe `browser.storage.local` preference provider with Zod validation (`src/core/preferences/`).
  - Typed theme registry for Monochrome and Apple-Inspired themes (`src/core/theme-registry/`).
  - Inert content script shell (`entrypoints/pesu.content/`) scoped strictly to `https://www.pesuacademy.com/*`.
  - Comprehensive unit test suite (19 tests in 3 files) passing 100%.
  - Production builds verified for Chrome MV3 (`.output/chrome-mv3`) and Firefox MV3 (`.output/firefox-mv3`).
* **Gate:** Owner review of `19_STAGE5_UI_FOUNDATION_ADDENDUM_REPORT.md` before proceeding to Stage 6.

### Stage 6 — Integrate: Extension UI & Portal Page Adapters
* **Status:** **STAGE 6A, 6A.1, 6B.0 & 6B.1 COMPLETE / GATED FOR OWNER REVIEW (SLICE 6.2 PENDING)**
* **Objective:** Implement production-quality extension UI (Stage 6A), custom scrollbar polish (Stage 6A.1), portal inspection preparation (Stage 6B.0), followed by portal DOM page adapters and CSS injection engine (Stage 6B.1+).
* **Stage 6A Deliverables (Extension UI — COMPLETE):**
  - Fluid, responsive Browser Action Popup (320px–400px fluid, ~580px max-height) with active theme selection, portal appearance segmented controls, quick readability toggles, and direct Theme Studio shortcut.
  - Full-screen Theme Studio Options page with Apple-style navigation rail (Overview, Themes, Appearance, Preferences, About).
  - Two decoupled appearance systems: Extension UI appearance (`extensionUiAppearance`) vs PESU portal appearance (`appearanceMode`).
  - Active theme selection between Monochrome (12-step grayscale) and Apple-Inspired (Action Blue `#0066cc`, Dark Blue `#2997ff`) with live palette swatches derived directly from canonical theme registries.
  - Preferences management with Information Density (`comfortable` vs `compact`), bounded Font Scaling (`100%` to `120%`), and factory reset with confirmation dialog.
  - Official Black & White compass mark integration across Popup, Options rail, and About view.
  - Reactive cross-context synchronization between Popup and Options via `browser.storage.onChanged`.
  - Production Chrome MV3 and Firefox MV3 builds verified; 5 genuine screenshots captured.
* **Stage 6A.1 Deliverables (Custom Scrollbar Polish — COMPLETE):**
  - Refined, slim 8px custom scrollbar design across all scrollable containers in Popup and Theme Studio.
  - Fully rounded 9999px pill thumb with subtle neutral track and smooth hover transitions.
  - Dynamic dual-mode scrollbar tokens (`--scrollbar-track`, `--scrollbar-thumb`, `--scrollbar-thumb-hover`) following `extensionUiAppearance` in Light and Dark modes.
  - WebKit pseudo-elements (`::-webkit-scrollbar*`) for Chromium and standard properties (`scrollbar-width`, `scrollbar-color`) for Firefox.
  - Respects `@media (prefers-reduced-motion: reduce)` by disabling transitions.
  - Verified with 5 genuine Chrome-rendered screenshots in `asset/screenshots/`.
* **Stage 6B.0 Deliverables (Portal Inspection Preparation — COMPLETE):**
  - Manual inspection worksheet created in `24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md` with step-by-step Chrome DevTools instructions and strict zero-academic-data privacy guardrails.
  - Preparation report delivered in `23_STAGE6B_PORTAL_INSPECTION_PREPARATION_REPORT.md` auditing content script lifecycle, reversible CSS custom property injection, and integration risks.
  - Sanitized fixture architecture established in `tests/fixtures/portal/` with synthetic templates (`shell`, `dashboard`, `courses`).
* **Stage 6B.1 Deliverables (Monochrome Global Shell Adapter — COMPLETE):**
  - Implemented `ShellAdapter` ([`src/core/page-adapters/shell.adapter.ts`](file:///c:/Users/shrey/Downloads/mypesu%20themes/src/core/page-adapters/shell.adapter.ts)) using verified structural selectors.
  - Strict route & hostname gating (`www.pesuacademy.com`, `/Academy/s/studentProfilePESU`).
  - Complete preservation of legacy table-based layout semantics (`.content-wrapper: table`, `.menu-left: table-cell`, `.content-right: table-cell`).
  - Scoped CSS rules applying Monochrome Light and Dark mode tokens without global selector spill.
  - Protected elements (logos, notification badge, user profile, logout button) guarded from mutation.
  - Dynamic system appearance resolution and live storage synchronization via `browser.storage.onChanged`.
  - Comprehensive unit test suite expanded to 36 tests across 5 test suites; 100% passing.
  - Production Chrome MV3 (458.60 kB) and Firefox MV3 (458.70 kB) builds verified.
* **Stage 6B.2 Deliverables (Monochrome Student Dashboard Adapter — COMPLETE):**
  - Implemented `DashboardAdapter` ([`src/core/page-adapters/dashboard.adapter.ts`](file:///c:/Users/shrey/Downloads/mypesu%20themes/src/core/page-adapters/dashboard.adapter.ts)) using owner-inspected structural selectors.
  - Structural signature detection via `#announcements-carousel` and `.info-contents.announcements` within `#StudentProfilePESUContent`.
  - Conflict resolution preventing activation if course materials signatures are present.
  - Scoped Monochrome Light and Dark styling for carousel container, indicators, chevrons, captions, announcements list, icon badges, and published date timestamps.
  - Strict preservation of carousel transition timings, links, and click handlers.
  - Dynamic SPA lifecycle managed via debounced, narrowly-scoped `MutationObserver` on `#StudentProfilePESUContent`.
  - Unit test suite expanded to 48 tests across 6 test suites; 100% passing.
  - Production Chrome MV3 (464.56 kB) and Firefox MV3 (464.65 kB) builds verified.
* **Stage 6B.3 Deliverables (Monochrome Course Materials & Syllabi Adapter — COMPLETE):**
  - Implemented `CoursesAdapter` ([`src/core/page-adapters/courses.adapter.ts`](file:///c:/Users/shrey/Downloads/mypesu%20themes/src/core/page-adapters/courses.adapter.ts)) completing the triad of initial P0 Monochrome portal adapters.
  - Structural signature detection verifying `#StudentProfilePESUContent`, exactly one visible materials table (`thead th` + `tbody tr`), and `.short-title`. Rejects unrendered hidden tables and conflicting dashboard markers.
  - Coherent visual transformation for materials tables: bold uppercase headers with border divider, subtle alternating row surfaces (`tbody tr:nth-child(even)`), restrained hover feedback, and calibrated density cell padding.
  - Styled `.short-title` unit/course badges and `.info-note` footnotes using canonical Monochrome tokens.
  - Strict preservation of protected action icon classes (`.pesu-icon-play-button`, `.pesu-icon-presentation-graphs`, `.pesu-icon-open-book`, `.pesu-icon-document`, `.pesu-icon-doc-tick`, `.pesu-icon-faq`, `.pesu-icon-list-items`, `.pesu-icon-file`) and parent `td.text-center` anchors.
  - Zero scraping, zero URL reading, and zero download triggering.
  - Dynamic SPA transitions between Dashboard and Courses verified with clean adapter unmount/mount.
  - Unit test suite expanded to 65 tests across 7 test suites; 100% passing.
  - Production Chrome MV3 (471.05 kB) and Firefox MV3 (471.14 kB) builds verified.
* **Stage 6B.4 & 6B.5 Deliverables (Monochrome Refinement & Root Cause Audit — COMPLETE):**
  - Paused Apple-Inspired integration per product owner directive to achieve complete, high-quality Monochrome coverage across verified portal pages.
  - Root cause audit conducted in `31_MONOCHROME_COVERAGE_ROOT_CAUSE_AUDIT.md`: eliminated active sidebar navigation blue leak and introduced 8px custom monochrome scrollbars.
  - Expanded DevTools inspection worksheet delivered in `32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md` covering 6 candidate page families: My Courses Overview, Course Detail Tabs & Matrix, Timetable, Attendance, Calendar, and Profile.
  - Maintained strict safety exclusions (fee payments, exams, grade cards, authentication).
  - Preserved protected action icons, anchors, and non-recolorable attendance percentage invariants.
  - Unit test suite: 65 tests passing across 7 suites; typecheck 0 errors; dual MV3 builds clean.
* **Stage 6B.6+ Deliverables (Expanded Page Adapters & Live Preview — NEXT):**
  - Slice 6.6: `CoursesOverviewAdapter` upon owner DevTools inspection.
  - Slice 6.7: `CourseDetailAdapter` (unit tabs, syllabus tabs, learning matrix).
  - Slice 6.8: `TimetableAdapter` (schedule grid; zero schedule data mutation).
  - Slice 6.9: `AttendanceAdapter` (attendance summary; non-recolorable percentage).
  - Slice 6.10: `CalendarAdapter` (calendar toolbar and month grid).
* **Gate:** Owner review of `31_MONOCHROME_COVERAGE_ROOT_CAUSE_AUDIT.md` and submission of verified selectors via `32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md`.

### Stage 7 — Verify: Independent Test Ladder & Pilot
* **Status:** **PENDING STAGE 6 APPROVAL**
* **Objective:** Rigorous multi-browser verification and ethical student pilot.
* **Deliverables:**
  - Automated test suite (Vitest + Playwright) passing 100% of P0 acceptance criteria against HTML fixtures.
  - Automated WCAG 2.2 AA contrast audit across all modes.
  - 7-day student pilot with 8-12 PESU undergraduates.
  - Pilot report with Continue/Pivot/Stop determination.
* **Gate:** >= 75% student satisfaction and zero academic/transactional defects reported.

### Stage 8 — Launch: Packaging & Store Submission
* **Status:** **PENDING STAGE 7 APPROVAL**
* **Objective:** Package production zip distributions and publish store listings.
* **Deliverables:**
  - Verified Chrome Web Store distribution package.
  - Verified Mozilla Add-ons distribution package.
  - Store listing metadata, screenshots, privacy policy, and prominent non-affiliation disclaimers.
* **Gate:** Explicit human owner approval before submitting to either add-on store.

### Stage 9 — Iterate: Post-Launch & P1 Features
* **Status:** **FUTURE**
* **Objective:** Monitor stability, fix reported portal styling defects, and implement P1 enhancements (Timetable/Attendance adapters, custom accent picker, JSON export/import).
