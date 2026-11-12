# MyPESU Themes — Manual Portal Selector Inspection Worksheet

**Document:** Manual Portal Selector Inspection Worksheet  
**File Name:** `24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md`  
**Version:** 1.0  
**Stage:** Stage 6B.0 — PREPARATION: Portal Inspection Protocol  
**Date:** 12 November 2026  
**Audience:** Product Owner (Manual Browser Execution)  

---

## 1. Important Privacy & Security Guardrails

> [!CAUTION]
> **STRICT PRIVACY MANDATE — ZERO PERSONAL OR ACADEMIC DATA COLLECTION**  
> Under no circumstances should sensitive student information or university records be copied, recorded, or committed to this repository.

### Rules for Inspection:
- **ZERO Credentials:** Do NOT inspect, copy, or record passwords, OTPs, session cookies, auth tokens, or authorization headers.
- **ZERO Personal Identifiers:** Do NOT record student names, SRN, PRN, branch, section, email addresses, or phone numbers.
- **ZERO Academic Records:** Do NOT record grades, marks, attendance percentages, GPA, or exam scores.
- **ZERO Content Harvesting:** Do NOT copy course slide contents, faculty handouts, or announcement text.
- **ZERO Full-Page Screenshots:** Do NOT capture or upload screenshots that reveal student account details or session markers.
- **STRUCTURAL EVIDENCE ONLY:** Record **only** HTML tags, static element IDs, CSS classes, parent-child relationships, display modes, and candidate CSS selectors.

---

## 2. DevTools Inspection Instructions (How to Inspect)

Execute this protocol in **Google Chrome** on desktop in your standard authenticated PESU Academy session (`https://www.pesuacademy.com/*`):

### Step 1: Open Elements Inspector
- Press `F12` or `Ctrl + Shift + I` (Windows) / `Cmd + Option + I` (Mac) to open Chrome DevTools.
- Select the **Elements** panel.

### Step 2: Select the Target Element
- Press `Ctrl + Shift + C` (or click the inspect arrow icon in the top-left of DevTools).
- Click on the target container on the page (e.g., the top navigation header or sidebar).
- Examine the highlighted element in the DOM tree.

### Step 3: Verify Selector Uniqueness in the Console
- Switch to the **Console** tab in DevTools.
- Test your candidate selector using `document.querySelectorAll('<candidate_selector>').length`.
- **Target Container Rules:**
  - Unique containers (e.g. Header, Sidebar, Main Content area) must match **exactly 1** element (`length === 1`).
  - Repeated elements (e.g. Metric Cards, Table Rows) should match the expected count `N`.

### Step 4: Evaluate Selector Stability
- **PREFER:** Meaningful semantic IDs (e.g., `#header`, `#sidebar`, `#main-content`), stable framework classes (e.g., `.navbar`, `.sidebar-menu`, `.panel-default`, `.table-striped`).
- **AVOID:**
  - Dynamic or generated hashes (e.g., `_ngcontent-c12`, `css-123xyz`, `class="s-a8f3b"`).
  - Volatile positional selectors (e.g., `div > div:nth-child(3) > table > tbody > tr:nth-child(2)`).
  - Fragile text-based selectors.

---

## 3. Inspection Worksheet: P0 Core Target Areas

---

### Part A: Global Portal Shell (`shell`)

The persistent outer layout visible across authenticated portal pages.

#### 1. Top Header Container
* **Expected Purpose:** The persistent top bar containing university branding, notifications, and profile menu.
* **Provisional Hypothesis:** `#header`, `.navbar`, `.header-top`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Parent Container:** `____________________`
* **Display Mode:** `[ ] flex   [ ] grid   [ ] block   [ ] other: _______`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console (`querySelectorAll`):** `_______`
* **Stability Notes:** `____________________`

#### 2. Navigation Sidebar / Drawer Container
* **Expected Purpose:** The left-hand navigation menu or drawer listing modules (Dashboard, Courses, etc.).
* **Provisional Hypothesis:** `#sidebar`, `.sidebar-wrapper`, `.menu-wrapper`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Parent Container:** `____________________`
* **Display Mode:** `[ ] flex   [ ] block   [ ] other: _______`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`
* **Collapsible State Attribute/Class (if any):** `____________________`

#### 3. Individual Sidebar Navigation Items
* **Expected Purpose:** The clickable menu links / list items inside the sidebar.
* **Provisional Hypothesis:** `.menu-item`, `.nav-link`, `.sidebar-menu li`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Active State Class (e.g. `.active`):** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 4. Main Content Viewport / Canvas Wrapper
* **Expected Purpose:** The outer container into which dynamic route content is rendered.
* **Provisional Hypothesis:** `#content-area`, `.main-content-wrapper`, `.page-container`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 5. Page Footer Container (if present)
* **Expected Purpose:** The persistent bottom copyright / status bar.
* **Provisional Hypothesis:** `#footer`, `.footer-wrapper`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

### Part B: Student Dashboard Template (`dashboard`)

Navigate to the Student Dashboard route (e.g. `/Academy/dashboard` or home portal screen).

#### 1. Main Dashboard Container
* **Expected Purpose:** The bounding container for all dashboard widgets.
* **Provisional Hypothesis:** `.dashboard-content`, `.home-container`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 2. Metric / Summary Card Containers
* **Expected Purpose:** Individual summary cards (e.g. Courses enrolled, semester info).
* **Provisional Hypothesis:** `.card`, `.panel-default`, `.metric-card`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Parent Grid / Flex Wrapper:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 3. Announcement / Campus Notice List Wrapper
* **Expected Purpose:** The container wrapping university announcements or notices.
* **Provisional Hypothesis:** `.announcements-section`, `.notice-box`, `.announcement-list`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 4. Individual Announcement Items
* **Expected Purpose:** Repeated rows or cards for each announcement item.
* **Provisional Hypothesis:** `.announcement-item`, `.notice-item`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

### Part C: Course & Learning Materials Template (`courses`)

Navigate to the Course Materials / Syllabi page.

#### 1. Course Selection / Dropdown Container
* **Expected Purpose:** The bar or container where the user selects the subject/course.
* **Provisional Hypothesis:** `.course-selector-bar`, `.course-dropdown`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 2. Unit or Topic Accordion / Section Header
* **Expected Purpose:** The clickable section/unit headers (Unit 1, Unit 2, etc.).
* **Provisional Hypothesis:** `.unit-header`, `.panel-heading`, `.accordion-title`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Expanded/Collapsed Attribute (if any):** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 3. Materials / Slides Table Wrapper
* **Expected Purpose:** The table element displaying topics, dates, and download buttons.
* **Provisional Hypothesis:** `table.materials-table`, `table.table-striped`
* **Recorded Tag Name:** `____________________`
* **Element ID (if static):** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 4. Slide / Handout Table Rows
* **Expected Purpose:** The repeated rows inside `<tbody>` listing downloadable materials.
* **Provisional Hypothesis:** `table.materials-table tbody tr`, `.slide-row`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

#### 5. Action / Download Buttons
* **Expected Purpose:** The download icon or button in each table row.
* **Provisional Hypothesis:** `.btn-download`, `a.download-link`, `.glyphicon-download`
* **Recorded Tag Name:** `____________________`
* **CSS Class Names:** `____________________`
* **Candidate CSS Selector:** `____________________`
* **Match Count in Console:** `_______`

---

## 4. Protected Elements Verification Checklist

Ensure the following elements are explicitly identified so that Page Adapters will **protect them from modification**:

| Protected Element | Description | Candidate Excluded Selector | Verified Safe? |
| :--- | :--- | :--- | :---: |
| **University Logo** | University crest/logo in the header (must maintain aspect ratio, zero inversion). | `img.university-logo` | [ ] |
| **Notification Badge** | Notification counter (must keep distinct alert visibility). | `.notification-badge` | [ ] |
| **Logout Button** | Logout action button and session termination form. | `.btn-logout`, `a[href*="logout"]` | [ ] |
| **Download Links** | Actual file download buttons/actions (must preserve click handlers). | `button[onclick*="download"]`, `a[download]` | [ ] |

---

## 5. Submission & Next Steps

1. After completing inspection in Chrome DevTools, record the verified selectors directly into this document.
2. If providing sanitized structural HTML snippets, ensure **all text is replaced with generic placeholder words** (`Item 1`, `Topic Title`, etc.) and all account IDs/numbers are removed.
3. Once this worksheet is populated and approved by the owner, Stage 6B Slice 6.1 (Monochrome Shell Adapter) implementation will begin.

