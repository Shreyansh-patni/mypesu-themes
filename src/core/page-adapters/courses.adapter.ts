import type { PageAdapter } from './types';
import type { UserPreferences } from '../types/preferences';
import { MonochromeTheme } from '../theme-registry/monochrome';
import { resolveEffectiveMode, ALLOWED_PORTAL_HOSTS } from './shell.adapter';

export const COURSES_STYLE_ELEMENT_ID = 'pas-courses-styles';
export const COURSES_ROUTE_PATTERN = /^\/Academy\/s\/studentProfilePESU(?:\/.*)?$/;

/**
 * Observed course action icon classes that are strictly protected from modification.
 */
export const PROTECTED_ACTION_ICONS = [
  'pesu-icon-play-button',
  'pesu-icon-presentation-graphs',
  'pesu-icon-open-book',
  'pesu-icon-document',
  'pesu-icon-doc-tick',
  'pesu-icon-faq',
  'pesu-icon-list-items',
  'pesu-icon-file',
] as const;

/**
 * Checks whether an element is visible in the DOM using standard geometry and computed style checks.
 */
export function isElementVisible(el: any): boolean {
  if (!el) return false;

  // Check inline style or style object
  if (el.style) {
    if (el.style.display === 'none' || el.style.visibility === 'hidden') {
      return false;
    }
  }

  // Check style attribute string if present
  if (typeof el.getAttribute === 'function') {
    const styleAttr = el.getAttribute('style') || '';
    if (/display\s*:\s*none/i.test(styleAttr) || /visibility\s*:\s*hidden/i.test(styleAttr)) {
      return false;
    }
  }

  // Check if standard window.getComputedStyle is available
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    try {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }
    } catch {
      // Fallback for mocked or non-standard environments
    }
  }

  // Check client rect geometry if available
  if (typeof el.getClientRects === 'function') {
    try {
      const rects = el.getClientRects();
      if (rects && rects.length === 0) {
        if (typeof window !== 'undefined' && (window.innerWidth > 0 || window.innerHeight > 0)) {
          return false;
        }
      }
    } catch {
      // Safe fallback
    }
  }

  return true;
}

/**
 * Identifies the candidate visible materials table inside the content root.
 * Returns null if zero or multiple ambiguous visible tables exist.
 */
export function findVisibleMaterialsTable(contentRoot: Element): Element | null {
  const tables = contentRoot.querySelectorAll('table');
  const visibleTables: Element[] = [];

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    if (!table) continue;
    // Check element visibility
    if (isElementVisible(table)) {
      // Must contain visible thead th and tbody tr
      const theadTh = table.querySelectorAll('thead th');
      const tbodyTr = table.querySelectorAll('tbody tr');
      if (theadTh.length > 0 && tbodyTr.length > 0) {
        visibleTables.push(table);
      }
    }
  }

  if (visibleTables.length === 1 && visibleTables[0]) {
    return visibleTables[0];
  }

  return null;
}

/**
 * Performs unambiguous structural DOM verification of the Courses & Materials view.
 * Requirements:
 * 1. #StudentProfilePESUContent exists.
 * 2. Unambiguous visible materials table found (with thead th and tbody tr).
 * 3. At least one .short-title exists within the content hierarchy.
 * 4. Conflict check: No dashboard markers (#announcements-carousel, .info-contents.announcements) are present.
 */
export function verifyCoursesSelectors(doc: Document): boolean {
  if (!doc) return false;
  try {
    const spaContent = doc.querySelectorAll('#StudentProfilePESUContent');
    if (spaContent.length !== 1 || !spaContent[0]) return false;

    const contentRoot = spaContent[0];

    // Conflict safeguard: If dashboard markers exist, conflict -> return false
    const conflictingDashboard = contentRoot.querySelectorAll(
      '#announcements-carousel, .info-contents.announcements'
    );
    if (conflictingDashboard.length > 0) {
      return false;
    }

    // Must have at least one .short-title
    const shortTitles = contentRoot.querySelectorAll('.short-title');
    if (shortTitles.length === 0) {
      return false;
    }

    // Must find exactly one unambiguous visible materials table
    const materialsTable = findVisibleMaterialsTable(contentRoot);
    if (!materialsTable) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Generates scoped CSS rules for the Monochrome Courses & Materials Adapter.
 * Applies visual hierarchy, refined monochrome borders, alternating row surfaces,
 * and typography differentiation, while strictly excluding protected action cells.
 */
export function generateMonochromeCoursesCss(
  effectiveMode: 'light' | 'dark',
  density: 'comfortable' | 'compact',
  fontScale: number
): string {
  const tokens = MonochromeTheme.modes[effectiveMode];
  const { colors, typography, layout } = tokens;

  // Layout density calibration for table cells
  const cellPadding = density === 'compact' ? '8px 10px' : '12px 14px';
  const thPadding = density === 'compact' ? '9px 10px' : '12px 14px';

  // Subtle alternating row background: surface vs surfaceRaised (Dark) / canvas vs surface (Light)
  const alternateRowBg = effectiveMode === 'dark' ? colors.surface : colors.surface;
  const standardRowBg = effectiveMode === 'dark' ? colors.canvas : colors.canvas;
  const hoverRowBg = colors.surfaceRaised;

  return `
/* MyPESU Themes — Monochrome Courses & Materials Adapter (Stage 6B.3) */
html[data-pas-theme="monochrome"] #StudentProfilePESUContent {
  /* 1. Course Title & Unit Header Section (.short-title) */
  .short-title-container,
  .course-content-section {
    margin-bottom: 16px !important;
  }

  .short-title {
    display: inline-block !important;
    color: ${colors.text} !important;
    font-family: ${typography.fontFamily} !important;
    font-size: 1.1em !important;
    font-weight: ${typography.fontWeightBold} !important;
    margin-right: 12px !important;
    margin-bottom: 8px !important;
    padding: 4px 8px !important;
    background-color: ${colors.surfaceRaised} !important;
    border: 1px solid ${colors.border} !important;
    border-radius: ${layout.radiusSmall} !important;
  }

  /* 2. Course Materials Table Container & Structural Framing */
  table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    width: 100% !important;
    border: 1px solid ${colors.border} !important;
    border-radius: ${layout.radiusMedium} !important;
    overflow: hidden !important;
    margin-bottom: 20px !important;
    background-color: ${standardRowBg} !important;
  }

  /* Table Header Hierarchy */
  table thead th {
    background-color: ${colors.surfaceRaised} !important;
    color: ${colors.text} !important;
    font-family: ${typography.fontFamily} !important;
    font-weight: ${typography.fontWeightBold} !important;
    font-size: 0.85em !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    padding: ${thPadding} !important;
    border-bottom: 2px solid ${colors.border} !important;
    border-top: none !important;
    border-left: none !important;
    border-right: 1px solid ${colors.borderSubtle} !important;
    text-align: left !important;
    vertical-align: middle !important;
  }

  table thead th:last-child {
    border-right: none !important;
  }

  /* Table Body Rows & Alternating Surfaces */
  table tbody tr {
    background-color: ${standardRowBg} !important;
    transition: background-color 0.15s ease-in-out !important;
  }

  table tbody tr:nth-child(even) {
    background-color: ${alternateRowBg} !important;
  }

  /* Restrained hover treatment on content rows */
  table tbody tr:hover {
    background-color: ${hoverRowBg} !important;
  }

  /* Safe Content Cells (Strictly excluding action cells and cells with protected icons) */
  table tbody td:not(.text-center):not(:has(.pesu-icon-play-button)):not(:has(.pesu-icon-presentation-graphs)):not(:has(.pesu-icon-open-book)):not(:has(.pesu-icon-document)):not(:has(.pesu-icon-doc-tick)):not(:has(.pesu-icon-faq)):not(:has(.pesu-icon-list-items)):not(:has(.pesu-icon-file)) {
    padding: ${cellPadding} !important;
    color: ${colors.text} !important;
    font-family: ${typography.fontFamily} !important;
    font-size: 0.95em !important;
    line-height: ${typography.lineHeightBase} !important;
    border-top: 1px solid ${colors.borderSubtle} !important;
    border-left: none !important;
    border-right: 1px solid ${colors.borderSubtle} !important;
    border-bottom: none !important;
    vertical-align: middle !important;
  }

  table tbody td:last-child {
    border-right: none !important;
  }

  /* Specific styling for primary topic / chapter titles */
  table tbody td.topic-cell {
    font-weight: ${typography.fontWeightMedium} !important;
    color: ${colors.text} !important;
  }

  /* 3. Verified .info-note Styling */
  .info-note-container {
    margin-top: 12px !important;
  }

  .info-note {
    color: ${colors.textMuted} !important;
    font-family: ${typography.fontFamily} !important;
    font-size: 0.85em !important;
    line-height: ${typography.lineHeightBase} !important;
    padding: 8px 12px !important;
    background-color: ${colors.surface} !important;
    border-left: 3px solid ${colors.border} !important;
    border-radius: ${layout.radiusSmall} !important;
    margin: 8px 0 !important;
  }

  /* 4. Protected Action Cells Boundary & Invariant Guarantee */
  /* Action cells retain native alignment, anchor destinations, and icon styling */
  table tbody td.text-center {
    border-top: 1px solid ${colors.borderSubtle} !important;
    border-right: 1px solid ${colors.borderSubtle} !important;
    vertical-align: middle !important;
    text-align: center !important;
  }
}
`.trim();
}

/**
 * CoursesAdapter: Manages the styling lifecycle for Course Materials & Syllabi.
 */
export const CoursesAdapter: PageAdapter = {
  id: 'courses',
  name: 'Course Materials & Syllabi',
  status: 'VERIFIED',
  routePattern: COURSES_ROUTE_PATTERN,
  allowedHostnames: ALLOWED_PORTAL_HOSTS,

  isSupported(doc: Document): boolean {
    return verifyCoursesSelectors(doc);
  },

  mount(doc: Document, preferences: UserPreferences): boolean {
    if (!doc || !preferences) return false;

    // Strict boundary: Only mount when Monochrome theme is selected in Stage 6B.3
    if (preferences.themeId !== 'monochrome') {
      this.unmount(doc);
      return false;
    }

    if (!this.isSupported(doc)) {
      this.unmount(doc);
      return false;
    }

    const effectiveMode = resolveEffectiveMode(preferences.appearanceMode);
    const css = generateMonochromeCoursesCss(
      effectiveMode,
      preferences.density,
      preferences.fontScale
    );

    let styleEl = doc.getElementById(COURSES_STYLE_ELEMENT_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = COURSES_STYLE_ELEMENT_ID;
      styleEl.setAttribute('data-pas-adapter', 'courses');
      (doc.head || doc.documentElement).appendChild(styleEl);
    }

    styleEl.textContent = css;

    const contentRoot = doc.getElementById('StudentProfilePESUContent');
    if (contentRoot) {
      contentRoot.setAttribute('data-pas-view', 'courses');
    }

    return true;
  },

  unmount(doc: Document): void {
    if (!doc) return;

    const styleEl = doc.getElementById(COURSES_STYLE_ELEMENT_ID);
    if (styleEl?.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }

    const contentRoot = doc.getElementById('StudentProfilePESUContent');
    if (contentRoot && contentRoot.getAttribute('data-pas-view') === 'courses') {
      contentRoot.removeAttribute('data-pas-view');
    }
  },

  update(doc: Document, preferences: UserPreferences): void {
    if (!doc || !preferences) return;
    if (preferences.themeId !== 'monochrome' || !this.isSupported(doc)) {
      this.unmount(doc);
      return;
    }
    this.mount(doc, preferences);
  },
};
