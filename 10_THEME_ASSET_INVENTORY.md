# MyPESU Themes — Design Asset & Source Inventory

**Document:** Theme Asset Inventory  
**File Name:** `10_THEME_ASSET_INVENTORY.md`  
**Version:** 1.0  
**Stage:** Stage 3 — DESIGN  
**Date:** 6 November 2026

---

## 1. Asset Inventory Summary

This inventory catalogues all visual source assets, design specifications, palette files, and component references inspected across the workspace and user environment. It audits duplication, provenance, licensing boundaries, and missing assets.

| Asset Identifier / File Name | File Type | Theme Association | Operational Purpose | Design Source | Duplicate Status | Approval Status | Licensing / Intellectual Property Constraints | Missing Elements / Required Inputs |
| :--- | :---: | :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| **`jpg(7).jpg`** (Grayscale Palette Reference) | Image (`.jpg`) | **Monochrome** | Primary color specification for 12-step Light and Dark neutral palettes. | Owner upload (reference palette) | Unique reference | **APPROVED** (DEC-04) | Neutral color values; public domain/free use. AAA badge on image treated as unverified claim pending automated audit. | Typography scale, radii, and component shapes not defined in image (Implementation defaults proposed). |
| **`DESIGN(2).md`** | Markdown (`.md`) | **Apple-Inspired** | Comprehensive design specification for Apple-inspired typography, blue action accents, spacing, and layout. | Owner upload (design brief) | **Duplicate (1 of 2)** (Matches `DESIGN-apple(3).md`) | **APPROVED** (DEC-04) | Apple Human Interface Guidelines-inspired. Proprietary SF Pro font binaries must NOT be distributed. System font stacks used. | Specific React component library package/links not supplied (`OWNER_INPUT_REQUIRED`). |
| **`DESIGN-apple(3).md`** | Markdown (`.md`) | **Apple-Inspired** | Identical duplicate of `DESIGN(2).md` (identical SHA-256 hash). | Owner upload (design brief) | **Duplicate (2 of 2)** (Matches `DESIGN(2).md`) | **APPROVED** (DEC-04) | Counted as single design reference with `DESIGN(2).md`. | See `DESIGN(2).md`. |
| **`03_DESIGN_SYSTEM.md`** | Markdown (`.md`) | **Shared Engine** | Core theme engine design system, token schemas, isolation rules, and CSS custom property architecture (`--pas-*`). | Project repository document | Canonical architecture spec | **APPROVED** (Stage 2) | Open source MIT-compatible internal architecture. | None for V1 architecture. |
| **Theme UI Libraries** (React packages / component kits) | Package / URL | **Both Themes** | Extension-owned UI components for Browser Action Popup and Theme Studio Options page. | Owner to provide | None supplied | `OWNER_INPUT_REQUIRED` | Dependent on owner-selected packages. Must be evaluated for React compatibility, bundle size, and extension CSP. | **MISSING**: Owner has not yet provided specific UI library links/packages. |
| **Portal Visual Fixtures** | HTML / CSS | **Page Adapters** | Mock representations of PESU Academy Shell, Dashboard, and Course Materials for visual testing. | Engineering mock based on ERP conventions | Pending Owner Verification | `PROVISIONAL` | Non-sensitive structural markup only. No personal academic or student data. | **PENDING**: Manual owner selector inspection on live authorized portal. |

---

## 2. Key Inventory Findings & Architecture Rules

1. **De-duplication Enforcement:**
   - `DESIGN(2).md` and `DESIGN-apple(3).md` are byte-for-byte identical. They define **one** design language, referred to exclusively as **Apple-Inspired** (`apple-inspired`). They are not two separate themes.
2. **Palette Isolation:**
   - `jpg(7).jpg` supplies the 12-step grayscale palette for the **Monochrome** theme (`monochrome`).
   - The Apple-Inspired theme retains its Action Blue (`#0066cc`, `#2997ff`) and Focus Blue (`#0071e3`).
   - These palettes must remain strictly separate. Grayscale steps must not be tinted with blue, and blue accents must never leak into Monochrome.
3. **No Fabricated Assets:**
   - The owner has indicated that theme-specific UI libraries will be provided. Because no package URLs or tarballs were uploaded with this prompt, the extension architecture establishes a clean, modular **Theme UI Adapter Contract** and flags library selection as `OWNER_INPUT_REQUIRED`.
   - No third-party UI framework (e.g. Radix, Mantine, MUI, shadcn) will be assumed or installed into the extension shell without explicit owner authorization.

