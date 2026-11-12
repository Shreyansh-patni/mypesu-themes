# MyPESU Themes — Sanitized Portal Fixtures Specification

## Purpose
This directory contains **synthetic, sanitized HTML/DOM fixtures** used for offline testing of Page Adapters in Vitest and Playwright.

## STRICT PRIVACY & DATA RULES
1. **ZERO REAL ACADEMIC OR STUDENT DATA:**
   - Fixtures must NEVER contain real student names, roll numbers (SRN / PRN), emails, phone numbers, or photos.
   - Fixtures must NEVER contain real grades, marks, attendance percentages, or confidential course slides/handouts.
2. **ZERO CREDENTIALS OR SESSION TOKENS:**
   - Fixtures must NEVER include session cookies, authorization headers, CSRF tokens, or login credentials.
3. **STRUCTURAL DOM EVIDENCE ONLY:**
   - Fixtures must contain only generic placeholder text (e.g., `Course 101`, `Announcement Title`, `Lorem ipsum`).
   - The DOM tree must strictly represent the element hierarchy, tag names, IDs, class names, and attributes verified by the product owner in `24_PORTAL_MANUAL_INSPECTION_WORKSHEET.md`.

## Directory Contents
- `shell.placeholder.html`: Structural template for the Global Navigation Shell (Header, Sidebar, Content Viewport, Footer).
- `dashboard.placeholder.html`: Structural template for the Student Dashboard (Metric Cards, Announcements, Quick Links).
- `courses.placeholder.html`: Structural template for Course Materials (Unit Accordions, Topic Listings, Materials Table).
