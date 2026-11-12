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
        ▼ [ GATE: Owner Approval of Stage 3 Required to Proceed to Stage 4 ]
[ Stage 4: Prepare ] ──► PENDING (Read-only environment check, package plan)
        │
[ Stage 5: Build ] ──► PENDING (Zero-background WXT scaffold, local storage, empty shell)
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

### Stage 4 — Prepare: Repository & Environment Plan
* **Status:** **NEXT IMMEDIATE STAGE (PENDING STAGE 3 APPROVAL)**
* **Objective:** Read-only inspection of the project folder; prepare WXT configuration and dependency plan.
* **Deliverables:** `RECON.md`, baseline checks, command verification (`pnpm install`, `pnpm build`), and environment matrix.
* **Strict Rule:** Read-only. No dependencies installed; no repository initialized.

### Stage 5 — Build: Shared Extension Foundation Slice
* **Status:** **PENDING STAGE 4 APPROVAL**
* **Objective:** Scaffold clean WXT extension targeting Chrome and Firefox under the Zero-Background Architecture.
* **Deliverables:**
  - WXT project scaffold with TypeScript and React.
  - Extension Popup and Theme Studio options page shells.
  - Type-safe `browser.storage.local` preference provider with Zod validation.
  - Domain guard restricting content script to `https://www.pesuacademy.com/*`.
* **Gate:** Extension builds and loads cleanly in Chrome and Firefox with zero console errors. No portal styles injected yet.

### Stage 6 — Integrate: Theme Engine & Core Page Adapters
* **Status:** **PENDING STAGE 5 APPROVAL & MANUAL SELECTOR VERIFICATION**
* **Objective:** Wire theme packs to verified portal page adapters.
* **Prerequisite:** Owner executes manual evidence collection protocol on authorized portal and verifies provisional selectors.
* **Deliverables:**
  - Slice 6.1: Monochrome Light & Dark on Global Portal Shell.
  - Slice 6.2: In-tab Live Preview, Apply, and Cancel/Revert state machine.
  - Slice 6.3: Apple-Inspired Theme Pack integration with Action Blue (`#0066cc`).
  - Slice 6.4: Student Dashboard and Course Materials page adapters.
  - Slice 6.5: Text scaling (100%-120%) and density toggles.
* **Gate:** Every slice passes focused visual and unit test verifications before next slice begins.

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
