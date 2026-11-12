# MyPESU Themes — Owner Decision Register

**Product Name:** MyPESU Themes  
**Tagline:** Your Academy. Your Style.  
**Document:** Owner Decision Register (Stage 3 Update)  
**Version:** 1.2 (Stage 3 Design Update)  
**Status:** Audited Source of Truth  
**Date:** 6 November 2026

---

## 1. Decision Provenance Classifications

In strict adherence to *Vibe Coding Engineering* (Second Edition), decision provenance must distinguish verified human owner sign-offs from architectural recommendations and unresolved questions.

Every item in this register is classified under one of three statuses:
* **`CONFIRMED_BY_OWNER`**: Explicitly approved and confirmed by the product owner. Immutable constraint.
* **`RECOMMENDED_PENDING_CONFIRMATION`**: Proposed by the engineering architecture team based on best practices; requires formal owner sign-off.
* **`OPEN_DECISION`**: Explicitly unresolved choice requiring human decision before implementation.

---

## 2. Decision Log & Provenance Audit

| ID | Category | Item / Question | Provenance Classification | Approved Decision / Recommendation Details | Date Confirmed |
| :---: | :--- | :--- | :---: | :--- | :---: |
| **DEC-01** | **Branding** | Product Name & Identity | **`CONFIRMED_BY_OWNER`** | Named **MyPESU Themes** with tagline *"Your Academy. Your Style."* Must display a prominent disclaimer that it is an independent student project, not affiliated with, endorsed by, or sponsored by PES University. | 2026-11-06 |
| **DEC-02** | **Platforms** | Primary Target Browsers | **`CONFIRMED_BY_OWNER`** | Primary targets are **Google Chrome and Mozilla Firefox desktop**. Mobile browser targets (Safari iOS, Firefox Android) are deferred to V2+. | 2026-11-06 |
| **DEC-03** | **Product Scope**| Presentation-Only Boundary | **`CONFIRMED_BY_OWNER`** | Product direction is **appearance customization only**. Modifies presentation only; strictly prohibits altering or replacing academic functionality, data, authentication, or submissions. | 2026-11-06 |
| **DEC-04** | **Theme Sources**| Initial Visual Sources | **`CONFIRMED_BY_OWNER`** | Initial theme sources are the supplied **Monochrome** (grayscale palette image) and **Apple-Inspired** design specifications. Themes are strictly isolated; Action Blue (`#0066cc`) must never leak into Monochrome. | 2026-11-06 |
| **DEC-05** | **Architecture**| Zero-Background Engine (V1) | **`CONFIRMED_BY_OWNER`** | Adopt **Zero-Background Architecture for V1** (relying on reactive `browser.storage.onChanged`). Completely eliminates service worker vs event page discrepancies between Chrome and Firefox. | 2026-11-06 |
| **DEC-06** | **Scope Priority**| Timetable & Attendance | **`CONFIRMED_BY_OWNER`** | **Timetable and Attendance adapters remain P1 (Post-Core Acceptance)**. V1 P0 focuses exclusively on Global Shell, Dashboard, and Courses. Attendance numeric values are strictly read-only. | 2026-11-06 |
| **DEC-07** | **Manifest** | Firefox Manifest Target | **`CONFIRMED_BY_OWNER`** | **Mozilla Firefox targets Manifest V3** (matching Chrome MV3). WXT config enforces `browser_specific_settings.gecko.id` without background script complexity. | 2026-11-06 |
| **DEC-08** | **DOM Evidence**| Manual Selector Protocol | **`CONFIRMED_BY_OWNER`** | **Sanitized manual portal selector inspection protocol is approved**. Owner inspects structural tags in standard browser session without extracting academic or auth data. | 2026-11-06 |
| **DEC-09** | **Host Scope** | Allowed Portal Domain | **`RECOMMENDED_PENDING_CONFIRMATION`** | Statically restrict host permissions strictly to `https://www.pesuacademy.com/*`. Subdomains like `files.pesuacademy.com`, `staff.pes.edu`, and external IPs are excluded. | 2026-11-06 |
| **DEC-10** | **Safety** | Consequential Page Exclusions | **`RECOMMENDED_PENDING_CONFIRMATION`** | Completely exclude fee payment gateways, exam registration/submission portals, and authentication/CAPTCHA pages from styling. Results, grade cards, and hall tickets default to **NO STYLING** in V1. | 2026-11-06 |
| **DEC-11** | **Privacy** | Data & Storage Architecture | **`RECOMMENDED_PENDING_CONFIRMATION`** | **100% Local-First**. Zero user accounts, zero remote preference sync, zero analytics, zero external backends, and zero outbound network traffic. Preferences stored in `browser.storage.local`. | 2026-11-06 |
| **DEC-12** | **Permissions** | Extension Permissions | **`RECOMMENDED_PENDING_CONFIRMATION`** | Minimum permissions: API permission `["storage"]` and host match `["https://www.pesuacademy.com/*"]`. Prohibits `downloads`, `cookies`, `webRequest`, `tabs`, and `<all_urls>`. | 2026-11-06 |
| **DEC-13** | **Typography** | Font Licensing & Stacks | **`RECOMMENDED_PENDING_CONFIRMATION`** | Use native platform font stacks (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`) with Inter fallback. Absolute prohibition against distributing proprietary Apple SF Pro font binaries. | 2026-11-06 |
| **DEC-14** | **UI Libraries**| Theme UI Component Libraries | **`RECOMMENDED_PENDING_CONFIRMATION`** | Defer freezing final popup/options component libraries until the owner provides theme-specific design MDs and UI library packages. Shell UI remains headless/clean in early stages. | 2026-11-06 |
| **DEC-15** | **Scope** | Non-Goals & Excluded Utilities | **`RECOMMENDED_PENDING_CONFIRMATION`** | Strict prohibition against academic utilities: no slide downloaders, no SGPA/CGPA calculators, no attendance shortage estimators, no scraping bots, and no workflow automation. | 2026-11-06 |
| **DEC-16** | **Design QA** | Contrast Standard Target | **`RECOMMENDED_PENDING_CONFIRMATION`** | Adopt **WCAG 2.2 AA** (>= 4.5:1 body, >= 3.0:1 large/UI) as mandatory design release gate across all theme modes. | 2026-11-06 |

---

## 3. Strict Scope & Change Management Rules

1. **Owner Authority:** Decisions marked `CONFIRMED_BY_OWNER` are permanent architectural baselines.
2. **Provisional Selector Rule:** All CSS selectors in page adapters remain provisional until the owner executes the manual evidence collection protocol and records verified DOM structures.
3. **Zero-Code Enforcement:** No code, package installations, or repository scaffolding are permitted during Stage 3 (Design).
