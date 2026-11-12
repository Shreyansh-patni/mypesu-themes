# MyPESU Themes — Manual Inspection Worksheet: Course Overview & Detail Views

**Document:** Manual Inspection Worksheet: Course Overview & Detail Views  
**File Name:** `30_PORTAL_MONOCHROME_COVERAGE_WORKSHEET.md`  
**Version:** 1.0  
**Stage:** Stage 6B.4 — Monochrome Visual Refinement & Portal-Wide Coverage  
**Date:** 12 November 2026  
**Audience:** Product Owner (Manual Browser DevTools Inspection)  

---

## 1. Important Privacy & Security Guardrails

> [!CAUTION]
> **STRICT PRIVACY MANDATE — ZERO PERSONAL OR ACADEMIC DATA COLLECTION**  
> Under no circumstances should sensitive student information or university records be copied, recorded, or committed to this repository.

### Rules for Inspection:
- **ZERO Credentials:** Do NOT inspect, copy, or record passwords, OTPs, session cookies, auth tokens, or authorization headers.
- **ZERO Academic Records:** Do NOT record course names, course codes, grades, marks, attendance, or student identifiers (SRN/PRN).
- **ZERO Content Harvesting:** Do NOT copy course slide contents, faculty handouts, or announcement text.
- **ZERO Action URLs:** Do NOT copy or record direct file download URLs or script parameter IDs.
- **STRUCTURAL EVIDENCE ONLY:** Record **only** HTML tags, static element IDs, CSS classes, parent-child relationships, display modes, and candidate CSS selectors.

---

## 2. DevTools Inspection Instructions (How to Inspect)

Execute this protocol in **Google Chrome** desktop in your authenticated PESU Academy session (`https://www.pesuacademy.com/*`):

1. **Open Elements Inspector:** Press `F12` or `Ctrl + Shift + I` (Windows) / `Cmd + Option + I` (Mac).
2. **Inspect Target:** Press `Ctrl + Shift + C` and click the target container on the portal page.
3. **Verify Selector Uniqueness in Console:** Run `document.querySelectorAll('<candidate_selector>').length`.
4. **Evaluate Selector Stability:** Prefer static IDs or framework classes (e.g., `.nav-tabs`, `.breadcrumb`). Avoid generated dynamic hashes or volatile positional paths.

---

## 3. Inspection Area A: My Courses Overview List Template

Navigate to the **My Courses** main menu list (the table listing all enrolled subjects for the semester).

### 1. Page Header & Semester Filter Bar
* **Expected Purpose:** The header wrapper containing the "My Courses" heading and semester selector dropdown.
* **Provisional Hypothesis:** `.page-header`, `.semester-filter`, `select.form-control`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Courses Overview Table Container
* **Expected Purpose:** The table element displaying Course Code, Course Title, Type, Status, and Action buttons.
* **Provisional Hypothesis:** `table#myCoursesTable`, `table.courses-table`, `table.table`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 3. Action Buttons / View Details Links
* **Expected Purpose:** The link/button in each course row that navigates to the course detail/materials page.
* **Provisional Hypothesis:** `.btn-view-course`, `a.btn-info`, `a[onclick*="viewCourse"]`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 4. Inspection Area B: Individual Course Detail & Tabs View

Navigate into an individual course view (where Unit tabs, Syllabus, and Learning Resources are rendered).

### 1. Breadcrumb / Course Header Title Area
* **Expected Purpose:** The breadcrumb bar or title strip indicating course hierarchy (e.g. My Courses > CS101).
* **Provisional Hypothesis:** `.breadcrumb`, `.course-breadcrumb`, `.page-title`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Primary Horizontal Navigation Tabs
* **Expected Purpose:** The top horizontal tab row (Course Units, Introduction, Objectives, Outcomes, Outline, Syllabus, References).
* **Provisional Hypothesis:** `ul.nav-tabs`, `.course-main-tabs`, `.nav.nav-pills`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Active Tab Class (e.g. `.active`):** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 3. Secondary Horizontal Unit/Topic Tab Row
* **Expected Purpose:** The second tab strip allowing students to toggle between Unit 1, Unit 2, Unit 3, Unit 4, etc.
* **Provisional Hypothesis:** `.unit-tabs`, `.topic-tabs`, `ul.sub-nav-tabs`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Active State Class (e.g. `.active`):** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 4. Learning-Material Resource Matrix Table
* **Expected Purpose:** The wide table containing class content, AV summary, live videos, slides, notes, assignments, and icon buttons.
* **Provisional Hypothesis:** `table.learning-matrix`, `table.materials-grid`, `table.table`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 5. Protected Elements Verification Checklist

| Protected Element | Description | Candidate Excluded Selector | Verified Safe? |
| :--- | :--- | :--- | :---: |
| **Course Action / Download Anchors** | Direct material links or slide download triggers | `td.text-center > a`, `a[download]` | [ ] |
| **Resource Action Icons** | Observed action icon fonts (`.pesu-icon-*`) | `.pesu-icon-*` | [ ] |
| **Semester Selection Dropdown** | Native form select dropdown for academic semesters | `select.form-control` | [ ] |
| **Faculty / Instructor Names** | Academic author text (strictly read-only) | `.faculty-name`, `.instructor-title` | [ ] |

---

## 6. Next Steps

1. Owner performs Chrome DevTools inspection on both views and records candidate selectors.
2. Verified selectors will be added to `08_PAGE_ADAPTER_SPEC.md` and `15_PORTAL_VISUAL_ADAPTER_SPEC.md`.
3. Adapters will be implemented as discrete, isolated modules ensuring zero collision between Overview and Detail views.

