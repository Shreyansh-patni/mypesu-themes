import type { PageAdapter } from './types';
import type { UserPreferences } from '../types/preferences';
import { MonochromeTheme } from '../theme-registry/monochrome';
import { resolveEffectiveMode, ALLOWED_PORTAL_HOSTS } from './shell.adapter';

export const DASHBOARD_STYLE_ELEMENT_ID = 'pas-dashboard-styles';
export const DASHBOARD_ROUTE_PATTERN = /^\/Academy\/s\/studentProfilePESU(?:\/.*)?$/;

/**
 * Structural signature selectors for unambiguous Dashboard identification.
 * Crucial: Dashboard and Courses share the same pathname (/Academy/s/studentProfilePESU).
 * Therefore, structural presence of #announcements-carousel and .info-contents.announcements
 * within #StudentProfilePESUContent unambiguously indicates the Dashboard view.
 */
export const DASHBOARD_REQUIRED_SELECTORS = [
  '#StudentProfilePESUContent',
  '#announcements-carousel',
  '.info-contents.announcements',
] as const;

/**
 * Performs unambiguous structural DOM verification of the Student Dashboard.
 * Returns true only if:
 * 1. #StudentProfilePESUContent exists exactly once.
 * 2. #announcements-carousel exists exactly once.
 * 3. .info-contents.announcements exists exactly once.
 * 4. Conflict safeguard: No conflicting view signatures (e.g. course-materials-table) exist.
 */
export function verifyDashboardSelectors(doc: Document): boolean {
  if (!doc) return false;
  try {
    const spaContent = doc.querySelectorAll('#StudentProfilePESUContent');
    const carousel = doc.querySelectorAll('#announcements-carousel');
    const announcements = doc.querySelectorAll('.info-contents.announcements');

    if (spaContent.length !== 1 || carousel.length !== 1 || announcements.length !== 1) {
      return false;
    }

    // Conflict safeguard: if course-materials markers are present, conflict exists -> return false
    const conflictingCourseMarkers = doc.querySelectorAll(
      '.materials-table, .course-materials-table, #course-materials-container'
    );
    if (conflictingCourseMarkers.length > 0) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Generates scoped CSS rules for the Monochrome Dashboard.
 * Strictly scopes all rules under html[data-pas-theme="monochrome"] #StudentProfilePESUContent.
 * Preserves carousel layout and click/touch behaviors while applying surface, border, and text tokens.
 */
export function generateMonochromeDashboardCss(
  effectiveMode: 'light' | 'dark',
  density: 'comfortable' | 'compact',
  fontScale: number
): string {
  const tokens = MonochromeTheme.modes[effectiveMode];
  const { colors, typography, layout } = tokens;

  const itemPadding = density === 'compact' ? '8px 12px' : '14px 16px';
  const itemGap = density === 'compact' ? '6px' : '10px';

  return `
/* MyPESU Themes — Monochrome Dashboard Adapter (Stage 6B.2) */
html[data-pas-theme="monochrome"] #StudentProfilePESUContent {
  /* 1. Announcements Carousel Widget */
  #announcements-carousel {
    background-color: ${colors.surfaceRaised} !important;
    border: 1px solid ${colors.border} !important;
    border-radius: ${layout.radiusMedium} !important;
    overflow: hidden !important;
    margin-bottom: 20px !important;
  }

  .carousel-inner {
    border-radius: ${layout.radiusMedium} !important;
  }

  .carousel-inner .item {
    background-color: ${colors.surfaceRaised} !important;
  }

  .carousel-indicators li {
    background-color: ${colors.border} !important;
    border-color: ${colors.accent} !important;
  }

  .carousel-indicators .active {
    background-color: ${colors.accent} !important;
  }

  .carousel-control {
    color: ${colors.text} !important;
    background-image: none !important;
    opacity: 0.6 !important;
    transition: opacity 0.15s ease-in-out !important;
  }

  .carousel-control:hover,
  .carousel-control:focus {
    color: ${colors.text} !important;
    opacity: 1 !important;
  }

  .carousel-caption {
    background: ${effectiveMode === 'dark' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.85)'} !important;
    color: ${colors.text} !important;
    border-radius: ${layout.radiusSmall} !important;
    padding: 8px 12px !important;
    border: 1px solid ${colors.border} !important;
  }

  /* 2. Events & Announcements Section */
  .info-content-wrapper {
    background-color: ${colors.canvas} !important;
    border: 1px solid ${colors.border} !important;
    border-radius: ${layout.radiusMedium} !important;
    padding: 16px !important;
    margin-bottom: 20px !important;
  }

  .events-announcements {
    background-color: transparent !important;
  }

  .info-contents.announcements {
    background-color: transparent !important;
  }

  .announcements-inner {
    display: flex !important;
    flex-direction: column !important;
    gap: ${itemGap} !important;
  }

  /* Repeated Announcement Items */
  .announcements-inner .anc-item,
  .info-contents.announcements tr,
  .announcements-inner > div {
    background-color: ${colors.surface} !important;
    border: 1px solid ${colors.borderSubtle} !important;
    border-radius: ${layout.radiusSmall} !important;
    padding: ${itemPadding} !important;
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out !important;
  }

  .announcements-inner .anc-item:hover,
  .info-contents.announcements tr:hover,
  .announcements-inner > div:hover {
    background-color: ${colors.surfaceRaised} !important;
    border-color: ${colors.border} !important;
  }

  /* Announcement Icon */
  .anc-icon {
    color: ${colors.accent} !important;
    background-color: ${colors.surfaceRaised} !important;
    border: 1px solid ${colors.border} !important;
    border-radius: ${layout.radiusSmall} !important;
  }

  /* Announcement Text & Headings */
  .anc-text {
    color: ${colors.text} !important;
    font-family: ${typography.fontFamily} !important;
  }

  .anc-text a,
  .anc-text .anc-title {
    color: ${colors.text} !important;
    font-weight: ${typography.fontWeightMedium} !important;
    text-decoration: none !important;
  }

  .anc-text a:hover {
    color: ${colors.accent} !important;
    text-decoration: underline !important;
  }

  .anc-text p,
  .anc-text .anc-desc {
    color: ${colors.textMuted} !important;
    margin: 4px 0 0 0 !important;
    font-size: 0.95em !important;
    line-height: ${typography.lineHeightBase} !important;
  }

  /* Published Date */
  .published-date.text-right,
  .published-date {
    color: ${colors.textMuted} !important;
    font-size: 0.85em !important;
    font-family: ${typography.fontFamily} !important;
  }
}
`.trim();
}

/**
 * DashboardAdapter: Manages the styling lifecycle for the Student Dashboard.
 */
export const DashboardAdapter: PageAdapter = {
  id: 'dashboard',
  name: 'Student Dashboard',
  status: 'VERIFIED',
  routePattern: DASHBOARD_ROUTE_PATTERN,
  allowedHostnames: ALLOWED_PORTAL_HOSTS,

  isSupported(doc: Document): boolean {
    return verifyDashboardSelectors(doc);
  },

  mount(doc: Document, preferences: UserPreferences): boolean {
    if (!doc || !preferences) return false;

    // Strict boundary: Only mount when Monochrome theme is selected in Stage 6B.2
    if (preferences.themeId !== 'monochrome') {
      this.unmount(doc);
      return false;
    }

    if (!this.isSupported(doc)) {
      this.unmount(doc);
      return false;
    }

    const effectiveMode = resolveEffectiveMode(preferences.appearanceMode);
    const css = generateMonochromeDashboardCss(
      effectiveMode,
      preferences.layoutDensity,
      preferences.fontScale
    );

    let styleEl = doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = DASHBOARD_STYLE_ELEMENT_ID;
      styleEl.setAttribute('data-pas-adapter', 'dashboard');
      (doc.head || doc.documentElement).appendChild(styleEl);
    }

    styleEl.textContent = css;

    const contentRoot = doc.getElementById('StudentProfilePESUContent');
    if (contentRoot) {
      contentRoot.setAttribute('data-pas-view', 'dashboard');
    }

    return true;
  },

  unmount(doc: Document): void {
    if (!doc) return;

    const styleEl = doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID);
    if (styleEl?.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }

    const contentRoot = doc.getElementById('StudentProfilePESUContent');
    if (contentRoot && contentRoot.getAttribute('data-pas-view') === 'dashboard') {
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
