# Stage 4: Repository & Environment Reconnaissance Report

**Product Name:** MyPESU Themes  
**Product Tagline:** Your Academy. Your Style.  
**Document:** Repository & Environment Reconnaissance  
**File Name:** `17_REPOSITORY_RECONNAISSANCE.md`  
**Version:** 1.0  
**Stage:** Stage 4 — PREPARE  
**Date:** 12 November 2026  
**Status:** Verification Complete — Gated for Owner Sign-off  

---

## 1. Actual Project Root & Workspace Identity

### 1.1 Root Location Verification
- **Active Workspace Root:** `C:\Users\shrey\Downloads\mypesu themes`
- **Target Repository / Package Identifier:** `mypesu-themes` (planned project repository and package name)
- **Root Validation:** Confirmed by the physical presence of `00_START_HERE.md` and the complete specification document suite (`01` through `16`) directly at `C:\Users\shrey\Downloads\mypesu themes`.
- **Candidate Workspace Analysis:**
  - Sibling directory `C:\Users\shrey\Downloads\mypesu` exists on the host system but is isolated under standard sandbox access restrictions and does not contain the active specification files.
  - Sibling directory `C:\Users\shrey\Downloads\mypesu-migration-private` exists on the host system as a private migration folder.
  - Sibling directory `C:\Users\shrey\Downloads\PESU` exists on the host system.
  - No subfolder named `mypesu-themes` exists within `C:\Users\shrey\Downloads\mypesu themes`.
  - **Verdict:** `C:\Users\shrey\Downloads\mypesu themes` is the single authoritative workspace for MyPESU Themes. Directories must not be merged, moved, or deleted.

---

## 2. Documentation Inventory & Consistency Findings

### 2.1 Complete Document Inventory

| File Number & Name | Document Title | Current Version / Stage | Status | Notes & Cross-Reference |
| :--- | :--- | :---: | :---: | :--- |
| [00_START_HERE.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/00_START_HERE.md) | Start Here & Index | v1.3 (Stage 3.3) | Canonical | Central orientation guide and document roadmap. |
| [01_PRODUCT_BRIEF.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/01_PRODUCT_BRIEF.md) | Product Brief | v1.1 (Stage 3.3) | Canonical | Vision, JTBD, personas, non-goals, measurable budgets. |
| [02_PRD.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/02_PRD.md) | Product Requirements Document | v1.1 (Stage 3.3) | Canonical | Functional requirements, typed contracts, 20 acceptance criteria. |
| [03_DESIGN_SYSTEM.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/03_DESIGN_SYSTEM.md) | Core Design System Contract | v1.2 (Stage 3.3) | Canonical | CSS custom property architecture (`--pas-*`), token contracts. |
| [04_TECHNICAL_ARCHITECTURE.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/04_TECHNICAL_ARCHITECTURE.md) | Technical Architecture Spec | v1.2 (Stage 3.3) | Canonical | Zero-background V1 architecture, WXT multi-target, storage flow. |
| [05_IMPLEMENTATION_ROADMAP.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/05_IMPLEMENTATION_ROADMAP.md) | Implementation Roadmap | v1.0 (Stage 2) | Canonical | 9-stage lifecycle gates, milestones, deliverables. |
| [06_ANTIGRAVITY_PROMPTS.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/06_ANTIGRAVITY_PROMPTS.md) | Antigravity Prompt Suite | v1.0 (Stage 1) | Reference | Staged execution prompts for the Vibe Coding lifecycle. |
| [07_RESEARCH_AND_REFERENCES.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/07_RESEARCH_AND_REFERENCES.md) | Market & Technical Research | v1.0 (Stage 1) | Reference | PESU-MAX audit, community posts, WXT/AMO technical baselines. |
| [08_PAGE_ADAPTER_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/08_PAGE_ADAPTER_SPEC.md) | Page Adapter Specification | v1.1 (Stage 2.1) | Canonical | Global Shell, Dashboard, Courses adapters (all selectors PROVISIONAL). |
| [09_DECISION_REGISTER.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/09_DECISION_REGISTER.md) | Decision Register | v1.1 (Stage 2.1) | Canonical | Immutable log of DEC-01 to DEC-16 with owner provenance classification. |
| [10_THEME_ASSET_INVENTORY.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/10_THEME_ASSET_INVENTORY.md) | Theme Asset Inventory | v1.0 (Stage 3) | Canonical | Audit of palette image `jpg(7).jpg` and duplicate Apple specs. |
| `10_THEME_PACK_MONOCHROME.md` | Monochrome Theme Pack Spec | v1.0.0 (Early Draft) | **Duplicate Numbering** | Early draft of Monochrome spec; superseded by `11_MONOCHROME_THEME_SPEC.md`. |
| [11_MONOCHROME_THEME_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/11_MONOCHROME_THEME_SPEC.md) | Monochrome Theme Specification | v1.2 (Stage 3.3) | Canonical | 12-step grayscale, strict achromatic rule, 11 component states. |
| [12_APPLE_INSPIRED_THEME_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/12_APPLE_INSPIRED_THEME_SPEC.md) | Apple-Inspired Theme Spec | v1.3 (Stage 3.3) | Canonical | Action Blue (`#0066cc`), `#6e6e73` text, alpha-composited pill specs. |
| [13_THEME_STUDIO_UI_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/13_THEME_STUDIO_UI_SPEC.md) | Theme Studio & Popup UI Spec | v1.1 (Stage 3.1) | Canonical | Fluid Popup (320px-400px), Options page, Shadow DOM live preview. |
| [14_THEME_COMPONENT_LIBRARY_MATRIX.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/14_THEME_COMPONENT_LIBRARY_MATRIX.md) | Component Library Matrix | v1.0 (Stage 3) | Canonical | Extension vs portal component split; library `OWNER_INPUT_REQUIRED`. |
| [15_PORTAL_VISUAL_ADAPTER_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/15_PORTAL_VISUAL_ADAPTER_SPEC.md) | Portal Visual Adapter Spec | v1.0 (Stage 3) | Canonical | Visual specifications for Shell, Dashboard, and Course Materials. |
| [16_ACCESSIBILITY_AND_VISUAL_QA.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/16_ACCESSIBILITY_AND_VISUAL_QA.md) | Accessibility & Visual QA Spec | v1.3 (Stage 3.3) | Canonical | Mathematical contrast audit, alpha formulas, 12 test specs (`NOT RUN`). |

### 2.2 Consistency & Provenance Findings
1. **Duplicate File Prefix:** The workspace contains both `10_THEME_ASSET_INVENTORY.md` and `10_THEME_PACK_MONOCHROME.md`. The official document indexed in `00_START_HERE.md` is `10_THEME_ASSET_INVENTORY.md`, while `11_MONOCHROME_THEME_SPEC.md` serves as the canonical Monochrome specification. `10_THEME_PACK_MONOCHROME.md` is an unindexed early draft and should be retained as-is during Stage 4 to respect the read-only boundary.
2. **Hard Boundaries Preserved:**
   - **Appearance Only:** Guaranteed 0 academic data modifications, 0 scraping, 0 transaction interference.
   - **Target Browsers:** Chrome and Firefox Desktop via Manifest V3.
   - **Zero-Background V1:** No persistent service workers or event pages; `storage.onChanged` content-script sync.
   - **Local-First Privacy:** Zero remote network requests, analytics, or user accounts.
   - **Minimal Permissions:** Restricted strictly to API permission `["storage"]` and host match `["https://www.pesuacademy.com/*"]`.
   - **Excluded Routes:** Fee payments, exam registration/submission, authentication/CAPTCHA are 100% excluded.
   - **Provisional Selectors:** All DOM selectors in page adapters remain provisional pending manual owner inspection.
   - **P1 Features:** Timetable and Attendance remain deferred to P1 (post-core acceptance).
   - **Component Libraries:** Flagged as `OWNER_INPUT_REQUIRED`; no external UI packages assumed.
   - **Status Tokens:** Colored status tokens remain `[PROPOSED_SEMANTIC_TOKEN]`; neutral treatments remain the active default.

### 2.3 Review of Stage 3.3 Corrections
- **Mathematical Contrast Values:**
  - Raw against `#FFFFFF`: `#34C759` yields **2.22:1** (FAIL); `#FF9500` yields **2.20:1** (FAIL); `#FF3B30` yields **3.55:1** (FAIL normal text, PASS large text $\ge 18\text{pt}$).
  - Alpha-Composited Badges ($\alpha = 0.12$ over `#FFFFFF`):
    - Success `rgba(52, 199, 89, 0.12)` $\rightarrow$ `#E7F8EB` with text `#1B5E20` $\rightarrow$ **7.13:1** (PASS AAA).
    - Warning `rgba(255, 149, 0, 0.12)` $\rightarrow$ `#FFF2E0` with text `#8A4B00` $\rightarrow$ **6.16:1** (PASS AA).
    - Danger `rgba(255, 59, 48, 0.12)` $\rightarrow$ `#FFE7E6` with text `#D70015` $\rightarrow$ **4.57:1** (PASS AA).
  - Apple Secondary Text (`#6E6E73`): **5.07:1** on `#FFFFFF` (PASS AA); **4.66:1** on `#F5F5F7` (PASS AA).
- **Authentication Language Cleansing:** Grep verification confirms zero occurrences of `cached local session tokens`, `session tokens`, or `synchronous storage` in active specification files.

### 2.4 Detailed Analysis of "Revert upon $\ge 2$ Errors" Performance Target
The performance target specifies:
$$\text{Safe Fallback Degradation: Target median (p50) } < 50\text{ms}, \text{ 95th percentile (p95) } < 100\text{ms}, \text{ hard failure threshold } > 250\text{ms upon } \ge 2 \text{ consecutive styling errors.}$$

**Technical Ambiguities Identified for Implementation Planning:**
1. **Measurement Start Boundary:** Does the measurement clock start at the exact moment the second `try/catch` or `window.onerror` event is trapped by the content script, or when an adapter lifecycle method returns a failure state?
2. **Measurement End Boundary:** Does the measurement end when the `#pas-theme-styles` DOM element is removed from `<head>` (synchronous DOM mutation), or when the browser renders the unstyled paint frame (measured via `requestAnimationFrame` or `PerformanceObserver`)?
3. **Operational Context:** Does this fallback apply only after a theme has already been active on a page, or does it apply during initial bootstrap? *(Resolution from Stage 3.3: During initial bootstrap, if preferences fail to load or validate, styling is never injected in the first place, leaving the portal 100% native unstyled. Therefore, revert degradation specifically applies when a previously running adapter encounters dynamic mutation errors).*
4. **Error Accumulation Window:** Does "$\ge 2$ consecutive errors" reset on URL route changes, or does it persist across the session?
*Recommendation:* Document these questions as open architectural items to be formally coded in the content script lifecycle specification during Stage 5.

### 2.5 Canonical Test Case ID Audit
- In early conversational summaries, accessibility and visual test cases were occasionally referenced under working names like `TC-ACC-01..06` and `TC-VIS-01..06`.
- In the authoritative specification document [16_ACCESSIBILITY_AND_VISUAL_QA.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/16_ACCESSIBILITY_AND_VISUAL_QA.md), the test cases are canonically indexed as:
  - `VQA-01` (Baseline Portal)
  - `VQA-02` (Popup Monochrome)
  - `VQA-03` (Popup Apple-Inspired)
  - `VQA-04` (Options Page Layout)
  - `VQA-05` (Live Preview Bar)
  - `VQA-06` (Shell Monochrome)
  - `VQA-07` (Shell Apple-Inspired)
  - `VQA-08` (Dashboard Monochrome)
  - `VQA-09` (Dashboard Apple-Inspired)
  - `VQA-10` (Course Materials Monochrome)
  - `VQA-11` (Course Materials Apple-Inspired)
  - `VQA-12` (Revert / Instant Reset)
- **Status Verification:** All 12 test specifications remain explicitly marked:
  ```markdown
  Verification Status: NOT RUN (TEST SPECIFICATION)
  ```
  None are marked as passing. No test runs or benchmarks have been simulated or fabricated.

---

## 3. Git & Repository Status

A full inspection of the Git version control state was performed:
- **Git Repository Presence:** **DOES NOT EXIST.**
  - `Test-Path .git` returned `False`.
  - Executing `git status` returned: `fatal: not a git repository (or any of the parent directories): .git`.
  - There is no initialized Git repository, no commits, and no active branch in `C:\Users\shrey\Downloads\mypesu themes`.
- **Existing Version Control Assets:**
  - No `.gitignore` file is currently present in the directory.
  - No `AGENTS.md` file is currently present in the directory.
- **Tracked vs Untracked Files:** Because no Git repository exists, all 18 markdown specification files exist currently as unversioned local files.
- **Strict Boundary Confirmation:** In compliance with Stage 4 rules, no Git repository was initialized, no branches were created, and no commits were made.

---

## 4. Development Environment & Tooling Verification

All tool checks were performed using safe, read-only version and environment queries.

| Tool / Runtime | Available? | Exact Version | Detection Path / Evidence | Notes / Constraints |
| :--- | :---: | :---: | :--- | :--- |
| **Node.js** | **YES** | `v26.7.0` | `node -v` $\rightarrow$ `v26.7.0` | Exceeds minimum Node.js v18/v20 requirements for modern WXT. |
| **pnpm** | **YES** | `11.23.0` | `pnpm.cmd -v` $\rightarrow$ `11.23.0` | **CRITICAL:** On Windows PowerShell, `pnpm` must be invoked via `pnpm.cmd` due to execution policy restrictions. |
| **npm** | **YES** | `11.19.0` | `npm.cmd -v` $\rightarrow$ `11.19.0` | Available fallback package manager. Must be invoked via `npm.cmd`. |
| **Git** | **YES** | `2.55.0.windows.5` | `git --version` $\rightarrow$ `git version 2.55.0.windows.5` | Available to initialize repository when authorized in Stage 5. |
| **Google Chrome** | **YES** | `157.0.8103.51` | `C:\Program Files\Google\Chrome\Application\chrome.exe` | Stable desktop browser available for unpacked extension testing. |
| **Microsoft Edge** | **YES** | `157.0.4341.46` | `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` | Chromium-based alternative available on system. |
| **Mozilla Firefox** | **NO** | Not Installed | Standard registry and Program Files paths checked (`False`). | Firefox Desktop is not detected on host. Playwright can install headless Firefox in Stage 7, or user can install Firefox Desktop for manual verification. |
| **TypeScript Tooling** | **NO (Global)** | Not Installed Globally | `where.exe tsc` returned no file; not present in global pnpm/npm. | TypeScript compiler will be installed as a local devDependency in Stage 5. |

---

## 5. Existing Project Configuration & Dependency State

Inspection was conducted to verify whether any project files, build configurations, or dependencies currently exist in the workspace:

| Configuration / Manifest File | Exists? | Evidence |
| :--- | :---: | :--- |
| `package.json` | **NO** | `Test-Path package.json` $\rightarrow$ `False` |
| `package-lock.json` | **NO** | `Test-Path package-lock.json` $\rightarrow$ `False` |
| `pnpm-lock.yaml` | **NO** | `Test-Path pnpm-lock.yaml` $\rightarrow$ `False` |
| `tsconfig.json` | **NO** | `Test-Path tsconfig.json` $\rightarrow$ `False` |
| `wxt.config.ts` | **NO** | `Test-Path wxt.config.ts` $\rightarrow$ `False` |
| `manifest.json` | **NO** | `Test-Path manifest.json` $\rightarrow$ `False` |
| `.gitignore` | **NO** | `Test-Path .gitignore` $\rightarrow$ `False` |
| `AGENTS.md` (root level) | **NO** | `Test-Path AGENTS.md` $\rightarrow$ `False` |
| Application source code (`src/`, `entrypoints/`) | **NO** | No subdirectories exist in workspace. |

**Conclusion:** The workspace is in a pristine, pure specification state. No package installations, scaffolding, or code generation have occurred.

---

## 6. Implementation Readiness Matrix

| Area | Current State | Evidence | Readiness | Next Action |
| :--- | :--- | :--- | :---: | :--- |
| **Workspace & Directory** | Validated root with 18 specification documents | `C:\Users\shrey\Downloads\mypesu themes` confirmed | **READY** | Maintain active root; do not move or merge files. |
| **Git Version Control** | Uninitialized | No `.git` or `.gitignore` present | **READY AFTER STAGE 5 FOUNDATION** | Initialize Git repo and `.gitignore` during Slice 0. |
| **Node.js & Package Manager** | Node `v26.7.0`, pnpm `11.23.0` available | `node -v`, `pnpm.cmd -v` successful | **READY** | Standardize on `pnpm.cmd` for all Windows shell commands. |
| **TypeScript Configuration** | Not configured | No `tsconfig.json` | **READY AFTER STAGE 5 FOUNDATION** | Create strict `tsconfig.json` during Slice 0. |
| **WXT Framework Setup** | Not scaffolded | No `wxt.config.ts` | **READY AFTER STAGE 5 FOUNDATION** | Author `wxt.config.ts` for Chrome & Firefox MV3 multi-target. |
| **React UI Setup** | Not installed | No `react` / `react-dom` in `package.json` | **READY AFTER STAGE 5 FOUNDATION** | Add React 18+ to `package.json` dev/runtime dependencies. |
| **Chrome Build Target** | Manifest V3 planned | Specified in `04_TECHNICAL_ARCHITECTURE.md` | **READY AFTER STAGE 5 FOUNDATION** | Validate `.output/chrome-mv3` manifest output during Slice 0. |
| **Firefox MV3 Build Target** | Manifest V3 planned with gecko ID | Specified in `04_TECHNICAL_ARCHITECTURE.md` | **READY AFTER STAGE 5 FOUNDATION** | Validate `.output/firefox-mv3` manifest with `gecko.id`. |
| **Browser Storage Layer** | Pure specification | Types and Zod schemas defined in `02_PRD.md` | **READY AFTER STAGE 5 FOUNDATION** | Implement `src/core/preferences/` storage wrapper. |
| **Content Script Architecture** | Pure specification | Zero-background lifecycle in `04_TECHNICAL_ARCHITECTURE.md` | **READY AFTER STAGE 5 FOUNDATION** | Scaffold inert `entrypoints/pesu.content/` with DOM safety. |
| **Popup & Options UI** | Pure UX specification | Layouts specified in `13_THEME_STUDIO_UI_SPEC.md` | **READY AFTER STAGE 5 FOUNDATION** | Implement baseline foundation shells during Slice 0. |
| **Theme Token Packages** | Audited contracts ready | Monochrome (`11`) and Apple (`12`) specs complete | **READY AFTER STAGE 5 FOUNDATION** | Implement typed token dictionaries in `src/core/theme-registry/`. |
| **Portal Page Adapters** | Provisional selectors ready | `08_PAGE_ADAPTER_SPEC.md` specifies contracts | **OWNER INPUT REQUIRED** | Owner conducts manual DOM inspection before Stage 6. |
| **Theme UI Components** | Contract defined; packages pending | `14_THEME_COMPONENT_LIBRARY_MATRIX.md` | **OWNER INPUT REQUIRED** | Owner provides component library links/packages if desired. |
| **Automated Unit Tests** | Pure specification | Test criteria defined in PRD & architecture | **READY AFTER STAGE 5 FOUNDATION** | Set up Vitest and write schema/storage unit tests. |
| **Visual QA Infrastructure** | 12 test specs defined | Marked `NOT RUN (TEST SPECIFICATION)` in `16` | **READY AFTER STAGE 5 FOUNDATION** | Implement Playwright visual fixtures in Stage 7. |
| **Documentation & Guidance** | 18 markdown files complete | Stages 1 through 3.3 fully verified | **READY** | Use specifications as strict immutable contracts. |

---

## 7. Build Context & Recommended `AGENTS.md`

### 7.1 Analysis of Root-Level `AGENTS.md`
Currently, no `AGENTS.md` exists in `C:\Users\shrey\Downloads\mypesu themes`.
To maintain consistency and enforce strict boundaries across future coding sessions (especially during Stage 5 implementation), a root-level `AGENTS.md` should be created when implementation begins.

### 7.2 Recommended `AGENTS.md` Contents
```markdown
# MyPESU Themes — Agent Coding Guidelines & Constraints

## 1. Source-of-Truth Hierarchy
1. `00_START_HERE.md` — Core identity, boundaries, index.
2. `02_PRD.md` — Functional contracts, schema interfaces, acceptance criteria.
3. `03_DESIGN_SYSTEM.md` & `04_TECHNICAL_ARCHITECTURE.md` — Technical and token engine contracts.
4. `11_MONOCHROME_THEME_SPEC.md` & `12_APPLE_INSPIRED_THEME_SPEC.md` — Theme tokens and contrast rules.
5. `08_PAGE_ADAPTER_SPEC.md` — Provisional page adapters and DOM injection safeguards.

## 2. Inviolable Architectural Boundaries
- **Appearance Only:** Never modify official academic data, grades, attendance, exam submissions, fee payments, or authentication flows.
- **Minimal Permissions:** Manifest permissions must be strictly `["storage"]` and host match `["https://www.pesuacademy.com/*"]`. Never request `tabs`, `cookies`, `webRequest`, or `<all_urls>`.
- **Zero-Background V1:** Do not add background service workers or event pages. Content scripts synchronize via `browser.storage.onChanged`.
- **Local-First:** Zero external network calls, zero telemetry, zero remote accounts.
- **Windows Tooling Command Rule:** Always invoke package managers via `.cmd` (e.g. `pnpm.cmd`, `npm.cmd`).
```

---

## 8. Outstanding Owner Inputs & Dependencies

The following items require owner input or actions at specific project milestones:
1. **Theme UI Component Libraries:** Currently classified as `OWNER_INPUT_REQUIRED`. The owner has not yet supplied specific third-party React component packages. Slice 0 will use clean, self-contained semantic HTML/CSS for popup and options shells without external UI bloat.
2. **Additional Theme References:** Any future themes beyond Monochrome and Apple-Inspired must be provided by the owner before design or implementation.
3. **Manual Portal DOM Inspection:** Required **before Stage 6 (INTEGRATE)**. The owner must execute the sanitized inspection protocol documented in [08_PAGE_ADAPTER_SPEC.md](file:///c:/Users/shrey/Downloads/mypesu%20themes/08_PAGE_ADAPTER_SPEC.md) on an active, authenticated PESU Academy session to verify provisional selectors.
4. **Mozilla Firefox Installation:** Firefox Desktop is not currently installed on the host machine. While headless Firefox can be tested via Playwright, live manual verification of the Firefox MV3 build will require the owner to install Firefox or test in an environment where Firefox is available.

---

## 9. Recommended Stage 5 Foundation Scope (Slice 0)

Stage 5 represents **BUILD: Slice 0 — Foundation Only**. It must establish a clean, compileable, and testable extension foundation without jumping ahead into full portal styling or feature implementation.

### 9.1 Exact Recommended Foundation Deliverables
1. **Repository Setup:** Initialize Git repository and standard `.gitignore` (ignoring `.output`, `node_modules`, `.wxt`, `.dist`).
2. **Package Configuration:** Create `package.json` with React 18, TypeScript, WXT, Zod, and Vitest.
3. **TypeScript Configuration:** Create strict `tsconfig.json` with path aliases (`@/*`).
4. **WXT Configuration:** Create `wxt.config.ts` targeting both Chrome MV3 and Firefox MV3 with zero background keys and gecko ID.
5. **Core Preference Module:** Implement `src/core/preferences/` with Zod schema and type-safe `browser.storage.local` wrapper.
6. **Core Theme Registry Module:** Implement `src/core/theme-registry/` with typed token interfaces and primitive dictionaries for Monochrome and Apple-Inspired.
7. **Minimal UI Entrypoints:** Create basic, unstyled foundation shells for:
   - Browser Action Popup (`entrypoints/popup/`)
   - Options Page (`entrypoints/options/`)
8. **Inert Content Script:** Create `entrypoints/pesu.content/` with DOM route matching and safety fallback guards (no live portal styling injected yet).
9. **Unit Test Suite:** Add Vitest tests validating schema parsing, default preference creation, and token dictionary completeness.
10. **Build Verification:** Verify successful builds for both targets:
    - `pnpm.cmd build` $\rightarrow$ `.output/chrome-mv3`
    - `pnpm.cmd build:firefox` $\rightarrow$ `.output/firefox-mv3`
    - Inspect output manifests to verify zero background entries.

---

## 10. Stage 5 Entry Conditions

To authorize advancement to Stage 5, the following conditions must be satisfied:
- [x] Stage 3 (DESIGN) complete, mathematically audited, and approved.
- [x] Stage 4 (PREPARE) environment reconnaissance complete with exact tool versions confirmed.
- [x] Node.js (`v26.7.0`) and pnpm (`11.23.0`) operational.
- [x] Zero application source code or unverified scaffolding present in the workspace.
- [ ] Product Owner review and explicit approval of this `17_REPOSITORY_RECONNAISSANCE.md` report.

---

## 11. Final Readiness Verdict

**PASS — STAGE 4 COMPLETE, READY FOR STAGE 5**

