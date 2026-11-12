# MyPESU Themes — Product Brief

**Product Name:** MyPESU Themes  
**Tagline:** Your Academy. Your Style.  
**Repository / Directory:** `mypesu-themes`  
**Version:** 1.1 (Stage 2.1 Audit Update)  
**Status:** Audited Executable Product Brief  
**Date:** 6 November 2026  
**Methodology:** *Vibe Coding Engineering*, 2nd Edition (Nine-Stage Lifecycle)

---

## 1. Executive Product Vision

**MyPESU Themes** is an independent, privacy-first browser extension for Google Chrome and Mozilla Firefox that provides a premium visual customization layer for the official PES University portal (`https://www.pesuacademy.com/*`).

Students spend extended hours on PESU Academy navigating syllabi, tracking attendance, and reviewing course slide decks. The legacy portal layout presents a high-glare, dense, unpadded interface with no native dark mode, causing significant visual fatigue during late-night study sessions. 

MyPESU Themes empowers students to personalize portal themes, colors, typography, spacing, and layout density through curated, accessible design systems with zero disruption to underlying academic operations.

### Core Value Proposition
1. **Design-Led Craftsmanship:** High-fidelity theme packs (Monochrome grayscale and Apple-inspired) that preserve visual hierarchy and table contrast rather than crude filter inversions.
2. **Reversible Live Previews:** In-tab Theme Studio allowing real-time preview of themes and density before committing changes, with instant 1-click revert.
3. **Absolute Non-Interference:** Changes presentation only. Completely excludes payment gateways, exam submissions, and authentication gateways. Default-off on grade records.
4. **Local-First Privacy:** Zero user accounts, zero remote analytics, zero credential reading, and zero network calls. All preferences remain on the student's local machine.

---

## 2. Target User & Core Job

### 2.1 Target Audience
* **Primary Persona:** PES University undergraduate and postgraduate students who access PESU Academy multiple times daily on desktop browsers (Chrome and Firefox) and desire a glare-free, refined reading experience.
* **Secondary Persona:** Students with specific accessibility requirements who need increased typographic hierarchy, enlarged text scaling (up to 120%), or reduced visual density to read dense academic tables comfortably.
* **Explicit Non-Target:** Faculty, university administration, or students seeking scraping, workflow automation, or grade manipulation.

### 2.2 Core Job-to-be-Done (JTBD)
> *"When I open PESU Academy for study sessions, course reviews, or daily check-ins, I want the portal to display in a comfortable, aesthetic, accessible theme of my choice, with my preferences seamlessly remembered across visits, while ensuring that all official academic notices, course materials, buttons, and submissions function identically without risk of error or data loss."*

---

## 3. Competitive Landscape & Defensible Differentiation

### 3.1 Market Context & Competitive Evidence
Community feedback on [r/PESU](https://www.reddit.com/r/PESU/comments/1wyxadr/pesu_max_appearance_update/) confirms widespread demand for dark mode and cleaner portal aesthetics. Existing tools, notably **PESU-MAX** (v3.0.6, updated Oct 2026), introduced basic dark mode and font pickers alongside academic productivity utilities.

However, existing extensions focus primarily on utilities (parallel slide downloaders, SGPA/CGPA calculators, attendance trackers) and require expansive permissions (`downloads`, multiple host domains, external IPs, and PDF conversion services), alongside disclosing access to authentication data and user content.

### 3.2 Product Differentiation

| Differentiation Pillar | Existing Utility Extensions (e.g. PESU-MAX) | Generic Inversion Extensions (Dark Reader) | **MyPESU Themes** |
| :--- | :--- | :--- | :--- |
| **Product Purpose** | Broad academic utility & downloader | Generic brute-force CSS filter inversion | **Dedicated, premium presentation & accessibility** |
| **Theme Quality** | Utilitarian dark mode, basic font/color pickers | Frequently inverts diagrams, photos, and icons | **Bespoke curated theme packs with verified WCAG 2.1 AA contrast** |
| **Live Preview Workflow** | Toggle and reload | Global toggle across all open tabs | **In-page Theme Studio with instant preview & 1-click non-destructive cancel** |
| **Page-Level Control** | Global domain injection | Domain-level toggle | **Granular page-type adapters with per-page disable overrides** |
| **Permission Footprint** | `downloads`, multiple domains, external IP, PDF tools | `<all_urls>` (broadest risk) | **Minimal: `storage` + `https://www.pesuacademy.com/*` only** |
| **Privacy Guarantee** | Discloses access to auth data & web content | Inspects DOM of every browsed site | **Local-first; zero network calls; zero credential or grade inspection** |
| **Academic Safety** | Intercepts navigation and API payloads | Inverts tables indiscriminately | **Strict exclusion of transactional flows; read-only DOM adaptation** |

### 3.3 What MyPESU Themes Will NEVER Duplicate
To maintain an uncompromising focus on design quality, security, and student trust, MyPESU Themes explicitly rejects:
- Slide or course material parallel downloaders.
- SGPA / CGPA calculators.
- Attendance shortage or bunk calculators.
- PDF merging, compression, or conversion utilities.
- Automated CAPTCHA solving or auto-login tools.
- Grading curve analyzers or scraping bots.

---

## 4. Problem & Evidence Ladder Status

Adhering to the *Vibe Coding Engineering* standard, market evidence is classified strictly by rung:

1. **Idea:** **SUPPORTED.** Documented in project brief and design references.
2. **Problem Report:** **SUPPORTED.** Verifiable complaints on r/PESU regarding eye strain, stark white backgrounds, dense unpadded tables, and visual fatigue during late-night usage.
3. **Workaround:** **SUPPORTED.** Documented adoption of Dark Reader and PESU-MAX appearance updates despite visual defects on charts and tables.
4. **Commitment:** **SUPPORTED.** Demonstrated willingness to install browser extensions specifically for portal appearance updates.
5. **Repeated Use (Theme-Only):** **UNPROVEN ASSUMPTION.** Existing retention is entangled with utility features (downloaders, calculators). Whether students retain a *standalone appearance extension* long-term is an explicit hypothesis to be measured during the student pilot.

---

## 5. Scope & Delivery Priority

### 5.1 Must-Have (P0 — Core V1 MVP)
- WXT cross-browser framework targeting Google Chrome and Mozilla Firefox with a **Zero-Background Architecture**.
- Monochrome Theme Pack (Light and Dark) from verified 12-step grayscale palette.
- Apple-Inspired Theme Pack (Light and Dark) with Action Blue (`#0066cc`) and HIG typography/spacing.
- Appearance Modes: `Light`, `Dark`, and `System` (auto-sync with OS `prefers-color-scheme`).
- Real-time in-tab Live Preview with instant non-destructive Cancel/Revert.
- Core Page Adapters: Global Portal Shell, Student Dashboard, Course Material Listings (provisional selectors to be verified via manual protocol).
- Complete exclusion of fee payment, exam submission, auth/CAPTCHA, and grade card routes.
- Bounded Text Scaling (`default` 100%, `comfortable` 110%, `large` 120%) and Layout Density (`comfortable`, `compact`).
- Per-page enable/disable override toggles.
- Deterministic Reset (Reset page override, Reset theme defaults, Reset all).
- Extension Popup and full-screen Options Page (Theme Studio).
- Local-only settings storage via `browser.storage.local`.
- Zero-leakage CSS Custom Property architecture (`--pas-*`) and Shadow DOM for extension overlays.

### 5.2 Should-Have (P1 — Post-Core Acceptance)
- Read-only Timetable and Attendance page adapters (subject to visual safety sign-off, ensuring numerical attendance percentages and shortage alerts are never altered).
- Declarative JSON preferences export/import (strictly schema-validated, rejecting executable code).
- Customizable theme accent picker within predefined WCAG AA contrast constraints.
- Theme presets / favorites bar.
- Additional owner-supplied theme packs.

### 5.3 Later (V2+ — Explicitly Deferred)
- Community theme gallery/marketplace.
- User-authored in-browser custom CSS editors.
- Cloud preference synchronization across devices.
- Mobile browser support (Safari iOS, Firefox Android).

---

## 6. Measurable Performance Engineering Budgets & Guardrails

### 6.1 Performance Budgets (Tested on Reference Desktop Environment)
* **Theme Switching Latency:** Median (p50) `< 75ms`, 95th percentile (p95) `< 150ms`.
* **Cold-Start FOUC Window:** Median (p50) `< 100ms`, 95th percentile (p95) `< 200ms`, verified by real screenshot comparisons.
* **MutationObserver Callback Script Time:** Maximum execution time `< 16ms` (1 frame at 60Hz), throttled to max 1 invocation per 150ms window.
* **Storage Read/Write Overhead:** Median (p50) `< 15ms`, 95th percentile (p95) `< 30ms`.
* **Safe Fallback Mode:** Automatic revert to native portal styling (target median p50 `< 50ms`, p95 `< 100ms`) upon >= 2 consecutive styling errors. Native portal is left completely unchanged with zero partial styling.

### 6.2 Qualitative Safety Guardrails
* **Zero Academic Corruption:** 0 instances of obscured, shifted, or unreadable academic notices, course links, or attendance metrics.
* **Zero Privacy Leakage:** 0 external HTTP requests, 0 access to cookies, auth headers, or passwords.
* **Zero Functional Blockage:** 100% of official buttons, tabs, and course accordions remain fully clickable and operable.

---

## 7. Pilot Validation Strategy

Before store release, an ethical student experiment will be conducted with **8 to 12 PESU undergraduates**:
- **Setup:** Unpacked development extension tested across Chrome and Firefox on active student accounts.
- **Test Focus:** Visual satisfaction with Monochrome and Apple-Inspired themes, readability of dense course listings, ease of live preview/cancel, and performance impact.
- **Decision Gate:** Progression to public store launch requires a **>= 75% positive rating** on visual readability and **zero critical defects** reported on academic page operations.
