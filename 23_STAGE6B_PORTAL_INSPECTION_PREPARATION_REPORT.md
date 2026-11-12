# MyPESU Themes — Stage 6B.0 Verification Report: Portal Inspection Preparation

**Document:** Stage 6B.0 Verification Report  
**File Name:** `23_STAGE6B_PORTAL_INSPECTION_PREPARATION_REPORT.md`  
**Version:** 1.0  
**Stage:** Stage 6B.0 — PREPARATION: Portal Inspection Protocol & Fixture Architecture  
**Date:** 12 November 2026  
**Status:** Preparation Complete — Gated for Owner Inspection Execution  

---

## 1. Executive Summary

Stage 6B initiates the appearance integration between the **MyPESU Themes** engine and the official PES University portal (`https://www.pesuacademy.com/*`).

In strict compliance with *Vibe Coding Engineering* (Second Edition), architectural security invariants, and ethical development guidelines, **no portal styles, selectors, or MutationObservers may be implemented before the structural DOM selectors are formally verified by the human product owner**.

This milestone delivers the complete preparation framework:
1. **Manual Inspection Worksheet:** [`24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md) established for owner execution in Chrome DevTools.
2. **Sanitized Fixture Architecture:** [`tests/fixtures/portal/`](file:///c:/Users/shrey/Downloads/mypesu%20themes/tests/fixtures/portal) directory created with structural placeholder templates (`shell`, `dashboard`, `courses`) free of personal student data.
3. **Integration Architecture Audit:** Reviewed content script lifecycle, reversible CSS custom property injection (`--pas-*`), `data-pas-*` HTML attributes, and safe fallback invariants.
4. **Scope Enclosure:** Strictly confirmed P0 core scopes, P1 deferred modules, and 100% excluded transactional/consequential routes.

---

## 2. Files Inspected & Baseline Readiness

| Inspected Document / Source | Canonical Role | Stage 6B Impact |
| :--- | :--- | :--- |
| [`AGENTS.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/AGENTS.md) | Coding Agent Guidelines & Strict Invariants | Enforces presentation-only, zero academic data processing, minimal permissions, and safe fallback. |
| [`08_PAGE_ADAPTER_SPEC.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/08_PAGE_ADAPTER_SPEC.md) | Page Adapter Interface & Provisional Selectors | Defines adapter lifecycle (`isSupported`, `mount`, `unmount`), route patterns, and protected elements. |
| [`15_PORTAL_VISUAL_ADAPTER_SPEC.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/15_PORTAL_VISUAL_ADAPTER_SPEC.md) | Template Visual Rules & Palette Mapping | Maps Monochrome & Apple-Inspired tokens to Shell, Dashboard, and Course Materials. |
| [`04_TECHNICAL_ARCHITECTURE.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/04_TECHNICAL_ARCHITECTURE.md) | Zero-Background Engine & DOM Lifecycle | Outlines content script execution flow at `document_start`, isolated world, and FOUC prevention. |
| [`02_PRD.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/02_PRD.md) | Functional Requirements & Acceptance Criteria | Governs P0 vs P1 scope priority and non-goals. |
| [`src/entrypoints/pesu.content/index.ts`](file:///c:/Users/shrey/Downloads/mypesu%20themes/src/entrypoints/pesu.content/index.ts) | Content Script Entrypoint | Currently strictly inert; verified zero DOM touching or network calls. |

---

## 3. Scope Partitioning for Stage 6B

### 3.1 P0 Core Target Scope (Stage 6B Slices 6.1 – 6.4)
1. **Global Portal Shell (`shell`):**
   - Top navigation header container.
   - Collapsible sidebar drawer and navigation menu items.
   - Main content viewport wrapper.
   - Footer container and copyright text.
2. **Student Dashboard (`dashboard`):**
   - Main dashboard bounding container.
   - Summary / metric cards grid.
   - Recent announcements and notices listing.
   - Quick action link containers.
3. **Course & Learning Materials (`courses`):**
   - Course selection dropdown bar.
   - Unit and topic accordion headers.
   - Materials table, alternating table row styling, and download icon wrappers.

### 3.2 P1 Deferred Modules (Post-Core Acceptance)
- **Timetable (`timetable`):** Weekly schedule grid and lecture time blocks.
- **Attendance (`attendance`):** Attendance summary indicators (strictly read-only presentation; no prediction calculators).

### 3.3 Completely Excluded Routes (100% Forbidden)
The extension architecture strictly prohibits touching, styling, or executing on the following sensitive, transactional, and academic submission flows:
- **Authentication & Security:** `/login*`, password resets, OTP modals, CAPTCHA challenges.
- **Financial Transactions:** `/feePayment*`, fee receipts, payment gateways.
- **Examinations:** `/exam*`, exam registration, exam submissions, hall tickets.
- **Academic Results:** Grade cards, provisional results, CGPA/SGPA score sheets (default to **no styling in V1**).

---

## 4. Provisional Selectors Requiring Owner Verification

All selectors identified in earlier design documentation are provisional hypotheses that must be checked against the live portal DOM:

| Target Template | Target Element | Provisional Selector Hypothesis | Verification Requirement |
| :--- | :--- | :--- | :---: |
| **Shell** | Header Bar | `#header`, `.navbar`, `.header-top` | Verify exact tag, static ID, class, and `length === 1`. |
| **Shell** | Navigation Sidebar | `#sidebar`, `.sidebar-wrapper`, `.menu-wrapper` | Verify container ID and collapsed/expanded class state. |
| **Shell** | Menu Links | `.menu-item`, `.nav-link`, `.sidebar-menu li` | Verify link tag, active class (e.g. `.active`). |
| **Shell** | Main Viewport | `#content-area`, `.main-content-wrapper` | Verify outer container surrounding dynamic AJAX viewports. |
| **Shell** | University Logo | `img.university-logo`, `.navbar-brand img` | **PROTECTED:** Confirm selector to ensure aspect ratio is preserved. |
| **Dashboard** | Dashboard Wrapper | `.dashboard-content`, `.home-container` | Verify unique container ID or root class. |
| **Dashboard** | Metric Cards | `.card`, `.panel-default`, `.metric-card` | Verify card container classes and flex/grid parent. |
| **Dashboard** | Announcements | `.announcement-list`, `.notice-box` | Verify list container and individual notice row elements. |
| **Courses** | Unit Accordion | `.unit-accordion`, `.panel-group`, `.panel-heading` | Verify accordion header and expanded/collapsed body classes. |
| **Courses** | Materials Table | `table.materials-table`, `table.table-striped` | Verify table tag, `thead`, `tbody`, and alternating row classes. |
| **Courses** | Download Action | `.btn-download`, `a[download]`, `.glyphicon-download` | **PROTECTED:** Ensure download click handlers remain 100% intact. |

---

## 5. Manual Inspection Protocol & Privacy Safeguards

The product owner will manually perform the inspection documented in [`24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md).

### Absolute Privacy Safeguards:
1. **Zero Credential Access:** The inspection is strictly client-side within the owner's manual browser session. No session cookies, tokens, or auth headers are ever collected.
2. **Zero Academic Record Harvesting:** Student roll numbers (SRN/PRN), names, attendance counts, marks, and announcement details are strictly excluded from notes and worksheets.
3. **Selector Verification Command:** The owner verifies uniqueness in the Chrome DevTools Console via standard DOM queries:
   ```js
   // Expected output: 1 for unique containers
   document.querySelectorAll('candidate_selector').length;
   ```
4. **Stability Standard:** Selectors must be semantic and resilient against portal rebuilds. Automated hash classes (e.g. `css-123xyz`) and deep positional paths (`:nth-child`) are rejected.

---

## 6. Sanitized Fixture Architecture

To support Vitest unit tests and Playwright offline integration testing without accessing live university infrastructure, the following sanitized fixture tree has been established in [`tests/fixtures/portal/`](file:///c:/Users/shrey/Downloads/mypesu%20themes/tests/fixtures/portal):

```text
tests/fixtures/portal/
├── README.md                      # Privacy guidelines & structural rules
├── shell.placeholder.html         # Synthetic Global Shell template
├── dashboard.placeholder.html     # Synthetic Student Dashboard template
└── courses.placeholder.html       # Synthetic Course Materials template
```

All fixtures use generic placeholder strings (`CS101`, `Topic Title`, `Lorem ipsum`) and reflect clean, realistic structural DOM hierarchies without real university data.

---

## 7. Content Script & DOM Mutation Lifecycle Audit

When Stage 6B implementation begins, the content script will execute according to the following audited lifecycle:

```text
Portal Document Load (https://www.pesuacademy.com/*)
       │
       ▼
[ run_at: document_start ]
       │ ──► Asynchronously read preferences from browser.storage.local
       │     If preferences valid:
       │       Set data-pas-theme, data-pas-mode, data-pas-density on <html>
       │       Inject base CSS custom properties (--pas-*) into <style id="pas-theme-styles">
       │       (Eliminates Flash of Unstyled Content)
       │     If preferences corrupted, delayed, or error:
       │       Leave native portal styling 100% untouched (Safe Fallback)
       ▼
[ DOMContentLoaded ]
       │ ──► Check window.location.pathname against PageAdapterRegistry
       │     If route matches and adapter.isSupported(document) === true:
       │       Mount matched Page Adapter (e.g. ShellAdapter)
       │     If route unrecognized or unsupported:
       │       Remain completely inert
       ▼
[ Dynamic Single-Page AJAX Mutations ]
       │ ──► Debounced MutationObserver (150ms window, <= 16ms script budget)
       │     Re-verify DOM container markers
       │     Re-apply scoped adapter rules idempotently
       ▼
[ Storage Changed (storage.onChanged) ]
       │ ──► User changes theme or mode in Popup / Theme Studio
       │     Update data-pas-* attributes and CSS tokens instantaneously (< 75ms p50)
       │     Zero page reload required
```

---

## 8. Key Integration Risks & Mitigation Strategies

| Identified Integration Risk | Root Cause in Academic Portals | Engineered Mitigation Strategy |
| :--- | :--- | :--- |
| **Single-Page AJAX Navigation** | Academic portals swap table and card contents dynamically via jQuery AJAX without triggering standard page reloads. | Debounced `MutationObserver` (150ms window) throttles execution; re-verifies adapter readiness idempotently without duplicate style tags. |
| **Generated / Dynamic Class Hashing** | Modern frontend bundles may append randomized hashes to class names during university deployments. | Prefer semantic structural IDs, stable attribute selectors (`[role="..."]`, `[aria-label="..."]`), and parent-child hierarchy instead of raw hashed classes. |
| **Flash of Unstyled Content (FOUC)** | Waiting for asynchronous storage read after DOM render causes brief flicker of default styles. | Content script runs at `document_start`, applies `data-pas-*` attributes to `document.documentElement` before child DOM elements parse. |
| **CSS Specificity Collisions** | University portal stylesheets contain `!important` or high-specificity IDs. | Adapter styles scoped strictly under `html[data-pas-theme] containerSelector` with cleanly managed specificity cascade. |
| **Protected Control Breakage** | Inadvertently styling or hiding download action buttons, pagination controls, or university crests. | Mandatory `excludedSelectors` array in every Page Adapter contract; verified protected elements checklist. |

---

## 9. Conditions Required Before Stage 6B Implementation

1. **Owner Approval of Stage 6B.0:** Review and formal sign-off on this preparation report.
2. **Worksheet Execution:** Product owner executes [`24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md) on live `https://www.pesuacademy.com/*` in Chrome DevTools.
3. **Selector Baseline Lock:** Record verified selectors for Shell, Dashboard, and Course Materials; mark status as `VERIFIED` in `08_PAGE_ADAPTER_SPEC.md`.
4. **Slice 6.1 Authorization:** Formal owner authorization to begin Slice 6.1 (Monochrome Global Shell Adapter).

---

## 10. Final Verdict

```text
============================================================
PASS — STAGE 6B.0 PREPARATION COMPLETE
============================================================
```
