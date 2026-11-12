# MyPESU Themes — Stage 6B.5 Root Cause Audit: Monochrome Coverage & Visual System Correction

**Document:** Stage 6B.5 Root Cause Audit  
**File Name:** `31_MONOCHROME_COVERAGE_ROOT_CAUSE_AUDIT.md`  
**Version:** 1.0  
**Stage:** Stage 6B.5 — Monochrome Coverage Audit & Visual System Correction  
**Date:** 12 November 2026  
**Status:** Verification Complete — Gated for Owner Sign-off  

---

## 1. Executive Summary

In Stage 6B.5, **MyPESU Themes** conducted a comprehensive cascade and coverage audit across the PESU Academy portal application.

While the foundation established in Stages 6B.1–6B.3 successfully styled the outer chrome (`nav#pge_menu`, `.content-wrapper`, `.menu-left`, `.content-right`), the announcements carousel, and the verified materials table, live owner testing revealed persistent visual inconsistencies on inner components and unstyled sub-views.

This audit diagnosed the root technical causes of these issues without resorting to broad, fragile universal selectors (`*` or `#StudentProfilePESUContent *`).

---

## 2. Root-Cause Analysis Matrix

| Observed Issue | Affected Template | Current Adapter Scope | Actual Technical Cause | Implemented / Proposed Correction | Selector Verification Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Native Blue Active Navigation Bar** | Global Shell Sidebar | `ShellAdapter` | The portal markup applies `.active` directly to `li` and inner `a` elements (`li.active`, `a.active`) with high-specificity vendor CSS (`#studentProfilePESUHomeMenu li.active a { background-color: #337ab7 }`). Previous selector targeted `.menu-item.active > a`, failing to match when the university markup omits `.menu-item` on child anchors. | Expanded scoped selector to include: `#studentProfilePESUHomeMenu .menu-item.active, #studentProfilePESUHomeMenu li.active, #studentProfilePESUHomeMenu .active, #studentProfilePESUHomeMenu a.active`. Enforced `var(--pas-surface-raised)` and `border-left: 3px solid var(--pas-accent) !important`. | **VERIFIED & CORRECTED** |
| **Pale / Low-Contrast Text on Light Surfaces** | Dashboard & Inner SPA views | `DashboardAdapter` | When dynamic portal views load elements without explicit color inheritance, browser defaults or university stylesheets inject `#333` on `#fff` alongside unstyled muted spans (`#999` or `#777`), which fail WCAG 2.2 AA contrast in Dark Mode or on custom surfaces. | Scoped explicit foreground tokens (`--pas-text` and `--pas-text-muted`) to all verified text nodes (`.anc-text`, `.anc-title`, `.topic-cell`, `.short-title`). | **VERIFIED & CORRECTED** |
| **Unstyled My Courses Overview List** | Course Overview | *None (Unimplemented)* | The existing `CoursesAdapter` activates strictly on an unambiguous visible materials table with `.short-title`. The My Courses Overview list has a completely distinct structure (semester dropdown + courses list table). | Kept completely unstyled to prevent misapplication. Added to `32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md` for owner DevTools inspection. | **AWAITING OWNER INSPECTION** |
| **Blue Horizontal Tabs & Unit Accents** | Individual Course Detail | *None (Unimplemented)* | Course detail sub-views render a two-tier horizontal tab system (`ul.nav-tabs`) and resource matrix that are structural children of `#StudentProfilePESUContent`, but are not yet scoped by `CoursesAdapter`. | Cataloged in `32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md`. Will be implemented as a dedicated sub-adapter upon owner inspection. | **AWAITING OWNER INSPECTION** |
| **Native Timetable Grid** | Timetable | *None (P1 Deferred)* | Weekly schedule grid has distinct table/day/period wrappers that have not been structurally mapped. | Priority elevated by owner request. Added to inspection worksheet with strict invariant: zero schedule data mutation. | **AWAITING OWNER INSPECTION** |
| **Native Attendance Summary** | Attendance | *None (P1 Deferred)* | Attendance table has not been structurally mapped. | Priority elevated by owner request. Added to inspection worksheet with strict invariant: attendance percentage is non-recolorable. | **AWAITING OWNER INSPECTION** |
| **Native Calendar Toolbar & Grid** | Calendar | *None (Unimplemented)* | Calendar view renders full-month grid with dynamic date cells outside current adapter scope. | Cataloged in inspection worksheet. | **AWAITING OWNER INSPECTION** |
| **Native Browser Scrollbars** | Content Area | `ShellAdapter` | Unstyled overflow in `.content-right-wrapper` and `#StudentProfilePESUContent`. | Added theme-aware 8px slim monochrome scrollbars in `ShellAdapter`. | **VERIFIED & CORRECTED** |

---

## 3. Strict Boundary Guarantees Upheld

1. **NO Universal Selectors:** No blanket rules (`*`, `div`, `span`, `p`, `table`) were injected at the root or under `#StudentProfilePESUContent`.
2. **NO Hardcoded Unstyled Overrides:** All adjustments leverage canonical Monochrome tokens (`--pas-surface`, `--pas-surface-raised`, `--pas-border`, `--pas-accent`, `--pas-text`).
3. **Protected Action Elements:** All 8 observed action icon classes (`.pesu-icon-play-button`, `.pesu-icon-presentation-graphs`, `.pesu-icon-open-book`, `.pesu-icon-document`, `.pesu-icon-doc-tick`, `.pesu-icon-faq`, `.pesu-icon-list-items`, `.pesu-icon-file`), their parent anchors, and download triggers remain 100% untouched.
4. **Attendance Invariant Guaranteed:** Attendance numbers, shortage badges, and timetable slots are explicitly designated as non-recolorable in specification and inspection documents.

---

## 4. Test Suite Execution & Verification Results

### 4.1 Vitest Unit Tests (`pnpm test`)
```text
 ✓ tests/theme-registry.test.ts (4 tests) 15ms
 ✓ tests/preferences.test.ts (9 tests) 13ms
 ✓ tests/storage.test.ts (6 tests) 26ms
 ✓ tests/extension-ui.test.ts (6 tests) 18ms
 ✓ tests/shell-adapter.test.ts (11 tests) 21ms
 ✓ tests/dashboard-adapter.test.ts (12 tests) 32ms
 ✓ tests/courses-adapter.test.ts (17 tests) 63ms

 Test Files  7 passed (7)
      Tests  65 passed (65)
   Duration  1.36s
```

### 4.2 TypeScript Typecheck (`pnpm run typecheck`)
- Command: `tsc --noEmit`
- Result: **0 errors, 0 warnings**.

### 4.3 Production Extension Builds
- **Google Chrome MV3 (`pnpm run build`):** Succeeded (`.output/chrome-mv3`, 473.59 kB).
- **Mozilla Firefox MV3 (`pnpm run build:firefox`):** Succeeded (`.output/firefox-mv3`, 473.68 kB).
- **Manifest Audit:** Permissions strictly `["storage"]`, host match `https://www.pesuacademy.com/*`, zero background service workers.

---

## 5. Implementation Roadmap for Upcoming Adapters

Upon receiving the owner's completed DevTools inspection from [`32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md`](file:///c:/Users/shrey/Downloads/mypesu%20themes/32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md), new adapters will be implemented in the following sequence:

1. **Stage 6B.6:** `CoursesOverviewAdapter` (My Courses Overview table, semester selector).
2. **Stage 6B.7:** `CourseDetailAdapter` (Breadcrumb, primary nav-tabs, secondary unit-tabs, learning-material matrix).
3. **Stage 6B.8:** `TimetableAdapter` (Weekly schedule grid, period headers, break slots; zero data mutation).
4. **Stage 6B.9:** `AttendanceAdapter` (Summary table, course rows; attendance percentage non-recolorable).
5. **Stage 6B.10:** `CalendarAdapter` (Toolbar, month grid, event chips).

---

## 6. Stage 6B.5 Verdict

### Official Verdict:
**`PASS — MONOCHROME COVERAGE AUDIT COMPLETE`**

