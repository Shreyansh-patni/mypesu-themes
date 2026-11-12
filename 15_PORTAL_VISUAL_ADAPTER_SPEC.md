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

The Student Dashboard presents the announcements carousel and the verified campus events & notices feed within the SPA content root (`#StudentProfilePESUContent`).

```text
┌────────────────────────────────────────────────────────────────────────┐
│ #announcements-carousel (Carousel Slide View)                         │
│ [ < ] 🖼 Banner Image & Headline Caption                          [ > ]│
│                                                                        │
│ .info-content-wrapper                                                  │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 📢 Academic Schedule Announcement                     12 Nov 2026  │ │
│ │    Formal test seating plan published for current semester...      │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ ℹ️ Library Operational Hours Notice                   10 Nov 2026  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Visual Specification (Verified Stage 6B.2):
* **No Synthetic Wrappers:** Inspection confirmed zero generic `.card` or metric-card wrappers on the portal dashboard. Styling strictly binds to real observed DOM classes: `#announcements-carousel`, `.info-content-wrapper`, `.events-announcements`, `.info-contents.announcements`, `.announcements-inner`, `.anc-icon`, `.anc-text`, and `.published-date.text-right`.
* **Carousel Frame:** Subtle surface elevation (`--pas-surface-raised`), 1px border (`--pas-border`), rounded corners (`--pas-radius-medium`), and themed chevron controls. Image aspect ratios and slide timings are strictly preserved.
* **Announcements Feed:**
  - Outer Wrapper (`.info-content-wrapper`): `--pas-canvas` background, `--pas-border` outline, `--pas-radius-medium`.
  - Notice Items (`.anc-item`, `.announcements-inner > div`): Mounted on `--pas-surface` with `--pas-border-subtle` border and `--pas-radius-small`. Hover elevates to `--pas-surface-raised` with `--pas-border`.
  - Icon Badges (`.anc-icon`): Neutral elevated container with `--pas-accent` foreground.
  - Typography: Titles in `--pas-text` (medium weight); descriptions and timestamps in `--pas-text-muted`.
* **Protected Elements (Do NOT Touch):**
  - Carousel navigation controls (`data-slide="prev"`, `data-slide="next"`), anchor destinations (`href="#announcements-carousel"`), click listeners.
  - Announcement body text, link targets, and dates (zero string mutation or redaction).

---

## 4. Template 3: Course Materials & Syllabi Adapter (`courses`)

The Course Materials & Syllabi view presents the course title, unit badges, and a dense tabular view of lecture slide decks, syllabus documents, and learning resources.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ .short-title-container                                                 │
│ [ CS101: Systems Engineering ]  [ Unit 1 — Logic Foundations ]         │
│                                                                        │
│ table (Verified Visible Materials Table)                               │
│ ┌───┬───────────────────────────────┬──────┬──────┬───────┬──────┬───┐ │
│ │ # │ TOPIC / CHAPTER               │ UNIT │ TYPE │ DATE  │SLIDES│...│ │
│ ├───┼───────────────────────────────┼──────┼──────┼───────┼──────┼───┤ │
│ │ 1 │ Boolean Algebra & Minimization│Unit 1│Lecture12 Aug │ [📊] │...│ │
│ ├───┼───────────────────────────────┼──────┼──────┼───────┼──────┼───┤ │
│ │ 2 │ Combinational Circuit Design  │Unit 1│Notes  14 Aug │ [📄] │...│ │
│ └───┴───────────────────────────────┴──────┴──────┴───────┴──────┴───┘ │
│                                                                        │
│ .info-note-container                                                   │
│ ℹ️ Note: Course materials and references are synchronized with...       │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Visual Specification (Verified Stage 6B.3):
* **No Accordions or Cards:** Inspection verified zero visible `.accordion`, `.panel-group`, or `<details>` structures on this view. Styling strictly binds to real observed DOM elements: `.short-title`, `table thead th`, `table tbody tr`, `.topic-cell`, and `.info-note`.
* **Table Visual Hierarchy:**
  - Table Header (`thead th`): Elevated surface (`--pas-surface-raised`), bold primary text (`--pas-text`), 2px bottom border divider, uppercase letter-spacing.
  - Alternating Rows (`tbody tr:nth-child(even)`): Alternates with `--pas-surface` to facilitate horizontal scanning across wide multi-column tables.
  - Hover Feedback (`tbody tr:hover`): Restrained hover elevation (`--pas-surface-raised`) across safe non-action cells.
  - Cell Padding: Calibrated dynamically via Layout Density (`compact`: 8px/10px, `comfortable`: 12px/14px).
  - Borders: Clean monochrome borders (`--pas-border` outer, `--pas-border-subtle` internal gridlines).
* **Headings & Badges:**
  - Course / Unit Badges (`.short-title`): Rounded inline-block badges on `--pas-surface-raised` with subtle 1px border.
  - Footnotes (`.info-note`): Subtle surface background with a 3px accent left-border and muted typography.
* **Strictly Protected Action Elements (Do NOT Touch):**
  - Observed action icon classes: `.pesu-icon-play-button`, `.pesu-icon-presentation-graphs`, `.pesu-icon-open-book`, `.pesu-icon-document`, `.pesu-icon-doc-tick`, `.pesu-icon-faq`, `.pesu-icon-list-items`, `.pesu-icon-file`.
  - All action cells (`td.text-center`) and parent anchors (`<a>`): Aspect ratio, colors, destinations (`href`), event listeners, and download targets remain completely untouched. No downloads are triggered, intercepted, or read.

---

## 5. Responsive Portal Viewport Adaptations

| Portal Viewport | Screen Width | Visual & Structural Adaptations |
| :--- | :---: | :--- |
| **Desktop Wide** | `>= 1440px` | Max-width layout container (`1280px` centered); fixed sidebar navigation; comfortable density. |
| **Desktop Standard**| `1024px - 1439px`| Full-width fluid container with `24px` gutters; standard table cell padding. |
| **Tablet Viewport** | `768px - 1023px` | Sidebar collapses to icon-only rail or drawer toggle; tables scroll horizontally; font scale preserved. |
| **Mobile Viewport** | `< 768px` | Single-column stacked cards; table wraps in a dedicated horizontal scroll container; touch targets enforced >= 44px. |

