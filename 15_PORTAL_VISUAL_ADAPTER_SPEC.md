# MyPESU Themes — Portal Visual Adapter Specification

**Product Name:** MyPESU Themes  
**Document:** Portal Visual Adapter Specification  
**File Name:** `15_PORTAL_VISUAL_ADAPTER_SPEC.md`  
**Version:** 1.0  
**Stage:** Stage 3 — DESIGN  
**Date:** 6 November 2026

---

## 1. Architectural Safeguards & Visual Scope

This specification defines the visual styling rules for the three core P0 page families on PESU Academy:
1. **Global Portal Shell**
2. **Student Dashboard**
3. **Course Materials & Slides**

### Strict Guardrails:
* **PROVISIONAL STATUS:** All CSS selectors listed herein are **PROVISIONAL HYPOTHESES**. They will be verified and locked by the owner using the approved manual inspection protocol before Stage 6 (Integration).
* **Zero Academic Data Modification:** Numerical attendance percentages, grades, SGPA/CGPA, exam seat numbers, and official timestamps must **never** be modified, moved, hidden, or recolored into illegible states.
* **Strict Route Exclusions:** Fee payments, payment gateways, exam registrations/submissions, and authentication/CAPTCHA are **100% excluded**. Results and grade cards receive **no styling in V1**.
* **Zero Asset Inversion:** University crests, faculty profile photos, and document icons must never be inverted with CSS `filter: invert()`.

---

## 2. Template 1: Global Portal Shell Adapter (`shell`)

The Global Portal Shell encompasses the persistent layout chrome across authenticated PESU Academy routes: the top utility header, brand banner, collapsible sidebar navigation drawer, and footer.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [≡] PES UNIVERSITY            [Notifications 🔔]  [Student Profile ▾] │
├──────────────┬─────────────────────────────────────────────────────────┤
│ ❖ Dashboard  │ MAIN CONTENT VIEWPORT                                   │
│ 📚 Courses   │ (Container for dynamic route templates)                 │
│ 📅 Timetable │                                                         │
│ 📊 Attendance│                                                         │
│ ⚙ Settings   │                                                         │
├──────────────┴─────────────────────────────────────────────────────────┤
│ © PES University Portal • Independent Styling Active (MyPESU Themes)  │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Visual Specification & Layout Architecture:
* **Verified Table-Based Layout Architecture (Stage 6B.1):**
  - Outer Wrapper: `.content-wrapper` (`display: table !important; width: 100%;`).
  - Left Sidebar Column: `.menu-left` (`display: table-cell !important; width: 220px; vertical-align: top;`).
  - Right Content Column: `.content-right` (`display: table-cell !important; vertical-align: top;`).
  - *Invariant:* Must NEVER be transformed to CSS flex or grid. Native table layout semantics must be strictly preserved.
* **Visual Hierarchy:** Clean separation between navigation chrome and content canvas. Header (`nav#pge_menu`) and footer use `--pas-surface-raised` to establish subtle elevation above the `--pas-canvas` page foundation.
* **Surfaces:**
  - *Monochrome Light:* Canvas `#FFFFFF`, Header `#F5F5F5`, Sidebar `#FAFAFA`, Border `#E5E5E5`, Text `#171717`.
  - *Monochrome Dark:* Canvas `#000000`, Header `#171717`, Sidebar `#0A0A0A`, Border `#262626`, Text `#F5F5F5`.
  - *Apple Light:* Canvas `#f5f5f7`, Header `#ffffff`, Sidebar `#fafafc`, Border `#d2d2d7`.
  - *Apple Dark:* Canvas `#000000`, Header `#1d1d1f`, Sidebar `#141416`, Border `#333336`.
* **Typography:** System platform font stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`), base 14px, lineHeight 1.5.
* **Protected Elements (Do NOT Touch):**
  - University crest / logo image (`img.university-logo`, `.navbar-brand img`): Aspect ratio and dimensions preserved; zero CSS filter inversion.
  - Notification alert counter badge (`#notification-counter`, `.notification-badge`): Contents and click handlers untouched.
  - Profile dropdown logout action (`.btn-logout`): Session termination handlers untouched.
  - SPA Content Viewport (`#StudentProfilePESUContent`): Inner views untouched by shell adapter.

---

## 3. Template 2: Student Dashboard Adapter (`dashboard`)

The Student Dashboard presents summary metric cards, recent announcements, timetable snippets, and quick action links.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ WELCOME BACK, STUDENT                                                  │
│                                                                        │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐      │
│ │ Enrolled Courses  │ │ Current Semester  │ │ Campus Notices    │      │
│ │ 6 Active Subjects │ │ Semester 5        │ │ 3 Unread Notices  │      │
│ └───────────────────┘ └───────────────────┘ └───────────────────┘      │
│                                                                        │
│ RECENT ANNOUNCEMENTS                                                   │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ ● CIE-2 Schedule Announced                       Nov 04, 2026      │ │
│ │   Please check the formal examination seating plan in academic...  │ │
│ │   [ Download Attachment 📄 ]                                       │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ ● Guest Lecture on Advanced Agentic Systems       Nov 02, 2026      │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Visual Specification:
* **Visual Hierarchy:** Prominent greeting and quick-metric cards at the top, followed by chronological announcement cards with clear timestamps.
* **Surfaces & Cards:** Metric cards and announcements mount on `--pas-surface` with a 1px border (`--pas-border`) and theme-calibrated corner radius (`--pas-radius`).
* **Typography:** Announcement titles styled in `sizeLg` (20px, semi-bold); timestamps styled in `sizeXs` (12px) with `--pas-text-muted`.
* **Buttons & Links:** Attachment download links styled with `--pas-link`, retaining an explicit underline affordance on hover.
* **Protected Elements (Do NOT Touch):**
  - Announcement body text content, official download URLs, and emergency university alert banners.

---

## 4. Template 3: Course Materials & Slides Adapter (`courses`)

The Course Materials view displays subject accordions, unit syllabus breakdowns, and tabular lists of lecture slide decks and reference notes.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ COURSE MATERIALS: CS301 — ADVANCED ALGORITHMS                          │
│                                                                        │
│ ▼ Unit 1: Graph Traversal & Network Flow               [ 4 Resources ] │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Topic / Lecture Title      Date Uploaded   Format   Action         │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ Lecture 01: DFS & BFS      Aug 15, 2026    PDF      [ Download ⤓ ] │ │
│ │ Lecture 02: Max-Flow       Aug 20, 2026    PDF      [ Download ⤓ ] │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ▶ Unit 2: Linear Programming                           [ 3 Resources ] │
│ ▶ Unit 3: Approximation Algorithms                     [ 5 Resources ] │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Visual Specification:
* **Visual Hierarchy:** Distinct accordion headers for each academic unit, expanding into alternating tabular rows of course files.
* **Accordions:** Unit headers styled with `--pas-surface-raised` and clean chevron expand/collapse indicators.
* **Tables:**
  - Table header: Styled with `--pas-surface-raised`, uppercase tracking, and bold text.
  - Alternating rows: Alternates between `--pas-surface` and `--pas-canvas` to enhance row scanning.
  - Padding: Dynamically adjusted via Layout Density (`compact`: 8px vertical padding; `comfortable`: 14px vertical padding).
* **Protected Elements (Do NOT Touch):**
  - **Native Slide Download Buttons:** Download buttons, `onclick` handlers, and direct file download URLs must remain completely unblocked and unaltered. The extension customizes button colors and borders only; it never intercepts or overrides file requests.

---

## 5. Responsive Portal Viewport Adaptations

| Portal Viewport | Screen Width | Visual & Structural Adaptations |
| :--- | :---: | :--- |
| **Desktop Wide** | `>= 1440px` | Max-width layout container (`1280px` centered); fixed sidebar navigation; comfortable density. |
| **Desktop Standard**| `1024px - 1439px`| Full-width fluid container with `24px` gutters; standard table cell padding. |
| **Tablet Viewport** | `768px - 1023px` | Sidebar collapses to icon-only rail or drawer toggle; tables scroll horizontally; font scale preserved. |
| **Mobile Viewport** | `< 768px` | Single-column stacked cards; table wraps in a dedicated horizontal scroll container; touch targets enforced >= 44px. |

