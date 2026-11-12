# MyPESU Themes — Expanded Portal Page Structure Inspection Worksheet

**Document:** Expanded Portal Page Structure Inspection Worksheet  
**File Name:** `32_PORTAL_PAGE_STRUCTURE_INSPECTION_WORKSHEET.md`  
**Version:** 1.0  
**Stage:** Stage 6B.5 — Monochrome Coverage Audit & Visual System Correction  
**Date:** 12 November 2026  
**Audience:** Product Owner (Manual Browser DevTools Inspection)  

---

## 1. Important Privacy & Security Guardrails

> [!CAUTION]
> **STRICT PRIVACY MANDATE — ZERO PERSONAL OR ACADEMIC DATA COLLECTION**  
> Under no circumstances should sensitive student information or university records be copied, recorded, or committed to this repository.

### Absolute Rules for Inspection:
- **ZERO Credentials:** Do NOT inspect, copy, or record passwords, OTPs, session cookies, auth tokens, or authorization headers.
- **ZERO Academic Records:** Do NOT record course names, course codes, grades, marks, attendance, or student identifiers (SRN/PRN).
- **ZERO Content Harvesting:** Do NOT copy course slide contents, faculty handouts, or announcement text.
- **ZERO Action URLs:** Do NOT copy or record direct file download URLs or script parameter IDs.
- **STRUCTURAL EVIDENCE ONLY:** Record **only** HTML tags, static element IDs, CSS classes, parent-child relationships, display modes, and candidate CSS selectors.

---

## 2. DevTools Inspection Protocol (How to Inspect)

Execute this protocol in **Google Chrome** desktop in your authenticated PESU Academy session (`https://www.pesuacademy.com/*`):

1. **Open Elements Inspector:** Press `F12` or `Ctrl + Shift + I` (Windows) / `Cmd + Option + I` (Mac).
2. **Inspect Target:** Press `Ctrl + Shift + C` and click the target container on the portal page.
3. **Verify Selector Uniqueness in Console:** Run `document.querySelectorAll('<candidate_selector>').length`.
4. **Evaluate Selector Stability:** Prefer static IDs or framework classes (e.g., `.nav-tabs`, `.breadcrumb`). Avoid generated dynamic hashes or volatile positional paths.

---

## 3. Page Family A: My Courses Overview List

Navigate to the **My Courses** main menu list (the table listing all enrolled subjects for the semester).

### 1. Page Header & Semester Filter Bar
* **Expected Purpose:** The header wrapper containing the "My Courses" heading and semester selector dropdown.
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Courses Overview Table Container
* **Expected Purpose:** The table element displaying Course Code, Course Title, Type, Status, and Action buttons.
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 3. Action Buttons / View Details Links
* **Expected Purpose:** The link/button in each course row that navigates to the course detail/materials page.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 4. Page Family B: Individual Course Detail & Tab Structure

Navigate into an individual course view (where Unit tabs, Syllabus, and Learning Resources are rendered).

### 1. Breadcrumb / Course Header Title Area
* **Expected Purpose:** The breadcrumb bar or title strip indicating course hierarchy (e.g. My Courses > CS101).
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Primary Horizontal Navigation Tabs
* **Expected Purpose:** The top horizontal tab row (Course Units, Introduction, Objectives, Outcomes, Outline, Syllabus, References).
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Active Tab Class (e.g. `.active`):** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 3. Secondary Horizontal Unit/Topic Tab Row
* **Expected Purpose:** The second tab strip allowing students to toggle between Unit 1, Unit 2, Unit 3, Unit 4, etc.
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Active State Class (e.g. `.active`):** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 4. Learning-Material Resource Matrix Table
* **Expected Purpose:** The wide table containing class content, AV summary, live videos, slides, notes, assignments, and icon buttons.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 5. Page Family C: Weekly Timetable Grid

Navigate to the **Time Table** menu item.

### 1. Outer Timetable Wrapper
* **Expected Purpose:** The scrollable or responsive wrapper bounding the timetable.
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Table / Grid Structure
* **Expected Purpose:** The table or grid representing days (Mon-Sat) and time periods.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 3. Time-Slot & Class-Cell Wrappers
* **Expected Purpose:** The repeated cells representing individual lecture slots and breaks.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 6. Page Family D: Student Attendance Summary

Navigate to the **Attendance** menu item.

### 1. Main Page & Semester Filter Wrapper
* **Expected Purpose:** The container wrapping the semester selector dropdown and summary card.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Attendance Summary Table Container
* **Expected Purpose:** The table displaying course rows, total classes, attended classes, and percentage.
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 3. Percentage Column / Warning Badge Cell
* **Expected Purpose:** The specific cell or badge displaying the attendance percentage.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`
* **SAFETY CHECK:** Verify that this text will NOT be recolored or hidden.

---

## 7. Page Family E: Academic Calendar

Navigate to the **Calendar** menu item.

### 1. Calendar Outer Wrapper & Toolbar
* **Expected Purpose:** The wrapper bounding the calendar controls (Month/Week toggle, Prev/Next buttons).
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Calendar Month Grid / Event Cells
* **Expected Purpose:** The day cells and event badges within the calendar.
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 8. Page Family F: My Profile

Navigate to **My Profile**.

> [!WARNING]
> Personal student information (photo, name, address, parent details, phone, email) is present on this page.
> **DO NOT RECORD ANY VALUES.** Inspect ONLY the outer container and tab markers.

### 1. Outer Profile Container
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

### 2. Profile Section Cards / Panels
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 9. Protected Elements Verification Checklist

| Protected Element | Description | Candidate Excluded Selector | Verified Safe? |
| :--- | :--- | :--- | :---: |
| **Attendance Percentages** | Numeric attendance percentage values (e.g. `85.4%`) | `td.attendance-percentage`, `.shortage-badge` | [ ] |
| **Timetable Schedule Strings** | Faculty names, room numbers, class timings | `td.timetable-slot`, `.class-time` | [ ] |
| **Download & Resource Icons** | Action icons for learning resources | `.pesu-icon-*` | [ ] |
| **Profile Photos & Crests** | Student avatar, university branding | `img.profile-photo`, `img.university-logo` | [ ] |
| **Form Inputs & Action Buttons** | Submit, save, or edit form controls | `button[type="submit"]`, `input[type="submit"]` | [ ] |

---

## 10. Next Steps

1. Owner opens authenticated portal session in Google Chrome.
2. Owner performs non-invasive structural inspection using DevTools for target page families.
3. Owner records verified selectors directly into this document.
4. Agent implements discrete, verified page adapters in Stage 6B.6+.

