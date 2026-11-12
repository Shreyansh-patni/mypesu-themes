# MyPESU Themes — Page Adapter Specification

**Product Name:** MyPESU Themes  
**Document:** Page Adapter Specification (Stage 2.1 Audit Update)  
**Version:** 1.1  
**Status:** Provisional Architectural Specification (Selectors Unverified)  
**Date:** 6 November 2026

---

## 1. Architectural Role of Page Adapters

To prevent CSS collisions and layout regressions on complex university ERP forms, MyPESU Themes rejects blanket global CSS selectors (`*`, `button`, `table`, `input`). 

Instead, styling is partitioned into modular **Page Adapters**. Each adapter encapsulates:
1. A route regex pattern matching specific portal URLs.
2. A structural DOM verification test (`isSupported`).
3. Scoped CSS selectors bound strictly to container elements.
4. A list of protected elements that must **never** be restyled or shifted.
5. An observer lifecycle handling single-page AJAX content replacement.

> [!WARNING]
> **PROVISIONAL STATUS OF ALL SELECTORS:**  
> Because the extension agents have **not** accessed an authenticated student portal session (in strict compliance with security and privacy mandates), **all CSS selectors, class names, and element IDs listed in this document are PROVISIONAL HYPOTHESES**. They must be verified via the manual evidence-collection protocol before adapter code is wired in Stage 6.

---

## 2. Manual Evidence-Collection Protocol

Before any page adapter is enabled or compiled into production builds, the product owner must execute the following non-invasive inspection protocol:

```text
[ Step 1: Owner opens authorized portal manually in standard browser ]
                           │
                           ▼
[ Step 2: Navigate to target template (e.g. Dashboard, Course Materials) ]
                           │
                           ▼
[ Step 3: Open browser DevTools (Elements Inspector) ]
                           │
                           ▼
[ Step 4: Record non-sensitive structural tags, container IDs & class names ]
                           │
                           ▼
[ Step 5: Update this specification; create sanitized HTML test fixtures ]
                           │
                           ▼
[ Step 6: Mark adapter status as VERIFIED; enable styling in Stage 6 ]
```

### Protocol Security Guardrails:
* **ZERO Data Harvesting:** Do NOT copy or record student names, roll numbers (SRN/PRN), grades, marks, attendance percentages, or notification text.
* **ZERO Credential Handling:** Absolute prohibition against copying passwords, OTPs, session cookies, auth tokens, or authorization headers.
* **Structural Only:** Record only layout containers (e.g. `div.content-wrapper`, `table.table-striped`, `nav.top-bar`).
* **Inertness Guard:** If an adapter encounters an unrecognized DOM structure on PESU Academy, its `isSupported()` method must return `false`, causing the extension to remain **completely inert** and leave the raw page unmodified.

---

## 3. Page Adapter Interface Definition

```ts
import { ThemeTokens } from '../shared/types';

export interface PageAdapter {
  /** Unique identifier for preference overrides (e.g. 'shell', 'dashboard') */
  id: string;

  /** Human-readable name displayed in Theme Studio */
  name: string;

  /** Verification status of structural selectors */
  status: 'PROVISIONAL' | 'VERIFIED';

  /** URL pathname regex required to activate this adapter */
  routePattern: RegExp;

  /** Structural sanity check verifying expected container nodes exist */
  isSupported: (doc: Document) => boolean;

  /** Primary container selector under which styles are scoped */
  containerSelector: string;

  /** Elements that MUST NOT be modified under any condition */
  excludedSelectors: string[];

  /** Compiles and injects adapter-scoped CSS rules */
  mount: (doc: Document, tokens: ThemeTokens) => void;

  /** Removes injected CSS rules and restores native appearance */
  unmount: (doc: Document) => void;

  /** Updates CSS variables when theme, mode, or density changes */
  updateTokens: (doc: Document, tokens: ThemeTokens) => void;
}
```

---

## 4. Supported Page Adapter Specifications (V1 P0 Core)

### 4.1 Global Portal Shell Adapter (`shell`)
* **ID:** `shell`
* **Name:** Global Navigation & Shell
* **Status:** `VERIFIED (Stage 6B.1 Monochrome Shell)`
* **Host & Route Gating:** Host `www.pesuacademy.com`, Route Pattern `/^\/Academy\/s\/studentProfilePESU(?:\/.*)?$/`
* **Verified Structural Selectors (Stage 6B.1):**
  - Top Navigation Bar: `nav#pge_menu` (count: 1)
  - Scoped Header Wrapper: `nav#pge_menu .container-fluid header` (count: 1)
  - Legacy Table Layout Wrapper: `.content-wrapper` (`display: table !important;`, count: 1)
  - Left Sidebar Cell: `.menu-left` (`display: table-cell !important;`, count: 1)
  - Sidebar Navigation List: `#studentProfilePESUHomeMenu` (count: 1)
  - Right Content Cell: `.content-right` (`display: table-cell !important;`, count: 1)
  - Inner Content Canvas Wrapper: `.content-right .content-right-wrapper` (count: 1)
  - SPA Content Root: `#StudentProfilePESUContent` (count: 1)
  - Scoped Footer Container: `.content-right footer` (count: 1)
* **Safe Styling Scope (Monochrome):**
  - Nav bar background (`--pas-surface-raised`), border (`--pas-border`).
  - Scoped header background and text colors.
  - Table-based layout display preservation (`table` / `table-cell`).
  - Sidebar cell background (`--pas-surface`) and border-right (`--pas-border`).
  - Right content cell background (`--pas-canvas`).
  - Scoped footer background (`--pas-surface-raised`) and border-top (`--pas-border`).
* **Protected & Excluded Elements:**
  - `img.university-logo`, `.navbar-brand img`: Aspect ratio preserved, zero CSS inversion.
  - `#notification-counter`, `.notification-badge`: Notification counter contents and click handlers.
  - User profile menu and logout action buttons (`.btn-logout`).
  - `#StudentProfilePESUContent`: Inner SPA content remains unstyled by Shell adapter.

### 4.2 Student Dashboard Adapter (`dashboard`)
* **ID:** `dashboard`
* **Name:** Student Dashboard
* **Status:** `PROVISIONAL` (Awaiting Owner Manual Inspection)
* **Route Pattern:** `^/Academy/.*dashboard.*$`
* **Provisional Target Selectors:**
  - Main Dashboard Wrapper: `.dashboard-content` / `.home-container` *(PROVISIONAL)*
  - Metric Summary Cards: `.card` / `.panel-default` *(PROVISIONAL)*
  - Announcement Items: `.announcement-item` / `.notice-box` *(PROVISIONAL)*
* **Safe Styling Scope:**
  - Metric summary cards: card surface (`--pas-surface`), border (`--pas-border`), corner radius (`--pas-radius`).
  - Announcement and notice list items: card dividers, timestamp text (`--pas-text-muted`), heading text (`--pas-text`).
  - Quick action links: button padding and hover highlights.
* **Protected & Excluded Elements:**
  - Notice text strings, official attachment download links, and emergency university broadcast alert banners.

### 4.3 Course Materials & Syllabi Adapter (`courses`)
* **ID:** `courses`
* **Name:** Course Materials & Slides
* **Status:** `PROVISIONAL` (Awaiting Owner Manual Inspection)
* **Route Pattern:** `^/Academy/.*course.*$|^/Academy/.*material.*$`
* **Provisional Target Selectors:**
  - Materials Table Container: `.materials-table` / `.course-materials-table` *(PROVISIONAL)*
  - Unit Accordions: `.unit-accordion` / `.panel-group` *(PROVISIONAL)*
  - Slide Rows: `.slide-row` / `.table-row` *(PROVISIONAL)*
* **Safe Styling Scope:**
  - Unit / Topic accordion headers: background (`--pas-surface-raised`), title typography (`--pas-font-family`).
  - Slide listing tables: alternating row backgrounds (`--pas-surface` / `--pas-canvas`), header backgrounds, row hover highlights.
  - Table cell padding: dynamic padding based on Layout Density (`compact`: 8px, `comfortable`: 14px).
* **Protected & Excluded Elements:**
  - Download action buttons, onclick listeners, and file format icons. Native download functionality must remain 100% intact.

---

## 5. Secondary & Excluded Adapter Specifications

### 5.1 Timetable & Attendance Presentation (`timetable-attendance` — P1 Secondary)
* **ID:** `timetable-attendance`
* **Priority:** **P1 (Should-Have — Post-Core Acceptance)**
* **Status:** `PROVISIONAL`
* **Route Pattern:** `^/Academy/.*attendance.*$|^/Academy/.*timetable.*$`
* **Scope Boundary:** Container backgrounds, card headers, and grid border lines.
* **HARD SAFETY INVARIANT:**
  - **Attendance Percentages & Warnings:** Numerical attendance percentages (e.g. `84.5%`), shortage warning badges, class counts, and timetable slot strings **MUST NEVER be modified, shifted, hidden, or recolored into low-contrast states**. 
  - Text nodes, table cells containing numeric records, and status labels are strictly read-only and non-recolorable.

### 5.2 Consequential & Sensitive Workflows (STRICTLY EXCLUDED IN V1)
The extension strictly blacklists the following workflows from styling:
* **Fee Payment & Gateways:** (`/Academy/.*fee.*`, `/Academy/.*payment.*`) — **100% EXCLUDED.**
* **Exam Registration & Submissions:** (`/Academy/.*exam-reg.*`, `/Academy/.*hallticket.*`) — **100% EXCLUDED.**
* **Grade Cards & Exam Results:** (`/Academy/.*result.*`, `/Academy/.*grade.*`) — **DEFAULT-OFF / EXCLUDED IN V1.**
* **Authentication Gateways & CAPTCHA:** (`/Academy/`, `/Academy/login.*`) — **100% EXCLUDED.**

When an excluded route is detected, the content script logs an internal safety event, injects zero CSS custom properties, and halts execution immediately.

---

## 6. Dynamic Page Behavior & MutationObserver Lifecycle

Because PESU Academy loads course content, slide lists, and notices asynchronously via AJAX without full page reloads, adapters must maintain dynamic DOM synchronization:

```ts
class AdapterLifecycleManager {
  private activeAdapter: PageAdapter | null = null;
  private observer: MutationObserver | null = null;
  private debounceTimer: number | null = null;

  public attach(adapter: PageAdapter, tokens: ThemeTokens) {
    this.detach();
    this.activeAdapter = adapter;

    // Only mount if adapter is supported and structural markers exist
    if (adapter.isSupported(document)) {
      adapter.mount(document, tokens);
    }

    // Debounced observer for client-side navigation and dynamic AJAX inserts
    this.observer = new MutationObserver(() => {
      if (this.debounceTimer) window.clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(() => {
        if (this.activeAdapter && this.activeAdapter.isSupported(document)) {
          this.activeAdapter.updateTokens(document, tokens);
        }
      }, 150); // 150ms debounce window limits maximum observer frequency to ~6.6 calls/sec
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }

  public detach() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.activeAdapter) {
      this.activeAdapter.unmount(document);
      this.activeAdapter = null;
    }
  }
}
```

---

## 7. Test Fixture Strategy for Automated Verification

To enable automated testing without accessing live university student accounts, mocked HTML fixtures representing the three P0 templates are maintained in the test suite:

1. `tests/fixtures/shell.html`: Mock navigation bar, drawer menu, and user identity header.
2. `tests/fixtures/dashboard.html`: Mock announcement list, quick link cards, and academic calendar widget.
3. `tests/fixtures/courses.html`: Mock unit accordion and course slide listing table with download links.

**Automated Test Invariants:**
- Vitest/Playwright runs against fixtures to assert that `--pas-*` variables bind correctly to container selectors.
- Verifies that `download` attributes and button click listeners in `courses.html` remain fully active after theme application.
- Verifies that calling `adapter.unmount()` restores the fixture DOM to its pristine original styles.
