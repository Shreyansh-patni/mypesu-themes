import type { PageAdapter } from './types';
import type { UserPreferences, AppearanceMode } from '../types/preferences';
import { MonochromeTheme } from '../theme-registry/monochrome';

export const SHELL_STYLE_ELEMENT_ID = 'pas-shell-styles';
export const SHELL_ROUTE_PATTERN = /^\/Academy\/s\/studentProfilePESU(?:\/.*)?$/;
export const ALLOWED_PORTAL_HOSTS: readonly string[] = Object.freeze([
  'www.pesuacademy.com',
  // Test and fixture hostnames
  'localhost',
  '127.0.0.1',
]);

/**
 * Resolves the effective color mode ('light' | 'dark') from preferences.
 * Handles 'system' by inspecting window.matchMedia.
 */
export function resolveEffectiveMode(mode: AppearanceMode): 'light' | 'dark' {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Performs unambiguous structural DOM verification of the Global Shell.
 * Every verified selector must match exactly once.
 */
export function verifyShellSelectors(doc: Document): boolean {
  if (!doc) return false;
  try {
    const navMenu = doc.querySelectorAll('nav#pge_menu');
    const headerWrapper = doc.querySelectorAll('nav#pge_menu .container-fluid header');
    const contentWrapper = doc.querySelectorAll('.content-wrapper');
    const menuLeft = doc.querySelectorAll('.content-wrapper .menu-left, .content-wrapper > .menu-left');
    const sidebarList = doc.querySelectorAll('#studentProfilePESUHomeMenu');
    const contentRight = doc.querySelectorAll('.content-wrapper .content-right, .content-wrapper > .content-right');
    const innerWrapper = doc.querySelectorAll('.content-right .content-right-wrapper');
    const spaContentRoot = doc.querySelectorAll('#StudentProfilePESUContent');
    const footerWrapper = doc.querySelectorAll('.content-right footer');

    return (
      navMenu.length === 1 &&
      headerWrapper.length === 1 &&
      contentWrapper.length === 1 &&
      menuLeft.length === 1 &&
      sidebarList.length === 1 &&
      contentRight.length === 1 &&
      innerWrapper.length === 1 &&
      spaContentRoot.length === 1 &&
      footerWrapper.length === 1
    );
  } catch {
    return false;
  }
}

/**
 * Generates scoped CSS rules for the Monochrome Global Shell.
 * Strictly preserves table-based layout semantics (.content-wrapper: table, .menu-left: table-cell, .content-right: table-cell).
 */
export function generateMonochromeShellCss(
  effectiveMode: 'light' | 'dark',
  density: 'comfortable' | 'compact',
  fontScale: number
): string {
  const tokens = MonochromeTheme.modes[effectiveMode];
  const { colors, typography } = tokens;

  return `
/* MyPESU Themes — Monochrome Global Shell Adapter (Stage 6B.1) */
html[data-pas-theme="monochrome"] {
  --pas-canvas: ${colors.canvas};
  --pas-surface: ${colors.surface};
  --pas-surface-raised: ${colors.surfaceRaised};
  --pas-border: ${colors.border};
  --pas-border-subtle: ${colors.borderSubtle};
  --pas-text: ${colors.text};
  --pas-text-muted: ${colors.textMuted};
  --pas-accent: ${colors.accent};
  --pas-focus: ${colors.focus};
  --pas-font-family: ${typography.fontFamily};
  --pas-font-scale: ${fontScale}%;
}

/* 1. Verified Top Navigation & Scoped Header */
html[data-pas-theme="monochrome"] nav#pge_menu {
  background-color: var(--pas-surface-raised) !important;
  border-bottom: 1px solid var(--pas-border) !important;
}

html[data-pas-theme="monochrome"] nav#pge_menu .container-fluid header {
  background-color: var(--pas-surface-raised) !important;
  color: var(--pas-text) !important;
}

/* 2. Legacy Table-Based Layout Preservation (Strict Invariant) */
html[data-pas-theme="monochrome"] .content-wrapper {
  display: table !important;
  background-color: var(--pas-canvas) !important;
}

html[data-pas-theme="monochrome"] .menu-left {
  display: table-cell !important;
  background-color: var(--pas-surface) !important;
  border-right: 1px solid var(--pas-border) !important;
}

html[data-pas-theme="monochrome"] .content-right {
  display: table-cell !important;
  background-color: var(--pas-canvas) !important;
}

/* 3. Scoped Sidebar Navigation Menu */
html[data-pas-theme="monochrome"] #studentProfilePESUHomeMenu {
  background-color: var(--pas-surface) !important;
}

/* 4. Scoped Inner Content Canvas Wrapper */
html[data-pas-theme="monochrome"] .content-right .content-right-wrapper {
  background-color: var(--pas-canvas) !important;
  color: var(--pas-text) !important;
}

/* 5. Scoped Footer */
html[data-pas-theme="monochrome"] .content-right footer {
  background-color: var(--pas-surface-raised) !important;
  border-top: 1px solid var(--pas-border) !important;
  color: var(--pas-text-muted) !important;
}

/* 6. Protected Elements (Zero Inversion, Aspect Ratio Preserved) */
html[data-pas-theme="monochrome"] img.university-logo,
html[data-pas-theme="monochrome"] .navbar-brand img {
  filter: none !important;
  display: inline-block !important;
}
`.trim();
}

/**
 * Monochrome Global Shell Adapter
 */
export const ShellAdapter: PageAdapter = {
  id: 'shell',
  name: 'Monochrome Global Portal Shell',
  status: 'VERIFIED',
  routePattern: SHELL_ROUTE_PATTERN,
  allowedHostnames: ALLOWED_PORTAL_HOSTS,

  isSupported(doc: Document): boolean {
    return verifyShellSelectors(doc);
  },

  mount(doc: Document, preferences: UserPreferences): boolean {
    // 1. Strict Theme Gating: Only applies when Monochrome theme is selected
    if (preferences.themeId !== 'monochrome') {
      this.unmount(doc);
      return false;
    }

    // 2. Structural DOM Verification
    if (!this.isSupported(doc)) {
      this.unmount(doc);
      return false;
    }

    const effectiveMode = resolveEffectiveMode(preferences.appearanceMode);
    const css = generateMonochromeShellCss(
      effectiveMode,
      preferences.density,
      preferences.fontScale
    );

    // 3. Set namespaced data attributes on <html>
    const root = doc.documentElement;
    root.setAttribute('data-pas-theme', 'monochrome');
    root.setAttribute('data-pas-mode', effectiveMode);
    root.setAttribute('data-pas-density', preferences.density);

    // 4. Inject or update scoped style element
    let styleEl = doc.getElementById(SHELL_STYLE_ELEMENT_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = SHELL_STYLE_ELEMENT_ID;
      (doc.head || root).appendChild(styleEl);
    }
    styleEl.textContent = css;

    return true;
  },

  unmount(doc: Document): void {
    if (!doc) return;
    const styleEl = doc.getElementById(SHELL_STYLE_ELEMENT_ID);
    if (styleEl && styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
    const root = doc.documentElement;
    if (root) {
      root.removeAttribute('data-pas-theme');
      root.removeAttribute('data-pas-mode');
      root.removeAttribute('data-pas-density');
    }
  },

  update(doc: Document, preferences: UserPreferences): void {
    if (preferences.themeId !== 'monochrome') {
      this.unmount(doc);
      return;
    }
    if (!this.isSupported(doc)) {
      this.unmount(doc);
      return;
    }
    this.mount(doc, preferences);
  },
};
