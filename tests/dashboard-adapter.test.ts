import { describe, expect, it } from 'vitest';
import {
  DashboardAdapter,
  verifyDashboardSelectors,
  generateMonochromeDashboardCss,
  DASHBOARD_STYLE_ELEMENT_ID,
  DASHBOARD_ROUTE_PATTERN,
} from '../src/core/page-adapters/dashboard.adapter';
import { ShellAdapter, SHELL_STYLE_ELEMENT_ID } from '../src/core/page-adapters/shell.adapter';
import {
  isLocationMatched,
  applyActiveAdapters,
  unmountAllAdapters,
} from '../src/core/page-adapters/registry';
import { DEFAULT_PREFERENCES, type UserPreferences } from '../src/core/types/preferences';
import {
  createMockDashboardDocument,
  createMockShellDocument,
  MockElement,
} from './mocks/dom-mock';

describe('Stage 6B.2: Monochrome Dashboard Adapter', () => {
  it('unambiguously verifies dashboard structural markers on valid fixture', () => {
    const doc = createMockDashboardDocument();
    const isSupported = verifyDashboardSelectors(doc as any);
    expect(isSupported).toBe(true);
    expect(DashboardAdapter.isSupported(doc as any)).toBe(true);
  });

  it('rejects DOM when required dashboard structural markers are missing', () => {
    // 1. Missing #announcements-carousel
    const doc1 = createMockDashboardDocument();
    const carousel = doc1.getElementById('announcements-carousel');
    carousel?.parentNode?.removeChild(carousel);
    expect(verifyDashboardSelectors(doc1 as any)).toBe(false);
    expect(DashboardAdapter.isSupported(doc1 as any)).toBe(false);

    // 2. Missing .info-contents.announcements
    const doc2 = createMockDashboardDocument();
    const anc = doc2.querySelectorAll('.info-contents.announcements')[0];
    anc?.parentNode?.removeChild(anc);
    expect(verifyDashboardSelectors(doc2 as any)).toBe(false);
    expect(DashboardAdapter.isSupported(doc2 as any)).toBe(false);

    // 3. Plain Shell fixture without dashboard content
    const docShell = createMockShellDocument();
    expect(verifyDashboardSelectors(docShell as any)).toBe(false);
    expect(DashboardAdapter.isSupported(docShell as any)).toBe(false);
  });

  it('rejects DOM when conflicting course markers are present', () => {
    const doc = createMockDashboardDocument();
    const spaContent = doc.getElementById('StudentProfilePESUContent');

    // Simulate conflicting course materials table injection
    const table = doc.createElement('table');
    table.setAttribute('class', 'materials-table');
    spaContent?.appendChild(table);

    expect(verifyDashboardSelectors(doc as any)).toBe(false);
    expect(DashboardAdapter.isSupported(doc as any)).toBe(false);
  });

  it('strictly gates activation to exact portal route and allowed hostname', () => {
    const validLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/s/studentProfilePESU',
    };
    expect(isLocationMatched(DashboardAdapter, validLoc)).toBe(true);

    const invalidHost = {
      hostname: 'malicious-site.com',
      pathname: '/Academy/s/studentProfilePESU',
    };
    expect(isLocationMatched(DashboardAdapter, invalidHost)).toBe(false);

    const feeLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/feePayment',
    };
    expect(isLocationMatched(DashboardAdapter, feeLoc)).toBe(false);
  });

  it('generates scoped Monochrome Light and Dark mode CSS tokens for dashboard widgets', () => {
    const lightCss = generateMonochromeDashboardCss('light', 'comfortable', 100);
    expect(lightCss).toContain('html[data-pas-theme="monochrome"] #StudentProfilePESUContent');
    expect(lightCss).toContain('#announcements-carousel');
    expect(lightCss).toContain('.carousel-indicators');
    expect(lightCss).toContain('.carousel-control');
    expect(lightCss).toContain('.info-content-wrapper');
    expect(lightCss).toContain('.events-announcements');
    expect(lightCss).toContain('.info-contents.announcements');
    expect(lightCss).toContain('.announcements-inner');
    expect(lightCss).toContain('.anc-icon');
    expect(lightCss).toContain('.anc-text');
    expect(lightCss).toContain('.published-date.text-right');

    const darkCss = generateMonochromeDashboardCss('dark', 'comfortable', 100);
    expect(darkCss).toContain('rgba(0, 0, 0, 0.75)');
    expect(darkCss).toContain('#000000');
  });

  it('mounts DashboardAdapter, setting style tag and data-pas-view="dashboard"', () => {
    const doc = createMockDashboardDocument();
    const success = DashboardAdapter.mount(doc as any, DEFAULT_PREFERENCES);
    expect(success).toBe(true);

    const styleEl = doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID);
    expect(styleEl).toBeDefined();
    expect(styleEl?.getAttribute('data-pas-adapter')).toBe('dashboard');

    const contentRoot = doc.getElementById('StudentProfilePESUContent');
    expect(contentRoot?.getAttribute('data-pas-view')).toBe('dashboard');
  });

  it('unmounts cleanly, removing style element and data-pas-view attribute', () => {
    const doc = createMockDashboardDocument();
    DashboardAdapter.mount(doc as any, DEFAULT_PREFERENCES);
    expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeDefined();

    DashboardAdapter.unmount(doc as any);
    expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeNull();
    const contentRoot = doc.getElementById('StudentProfilePESUContent');
    expect(contentRoot?.hasAttribute('data-pas-view')).toBe(false);
  });

  it('refuses to mount when theme is not Monochrome (e.g. Apple-Inspired)', () => {
    const doc = createMockDashboardDocument();
    const applePrefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      themeId: 'apple-inspired',
    };
    const success = DashboardAdapter.mount(doc as any, applePrefs);
    expect(success).toBe(false);
    expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeNull();
  });

  it('coexists with ShellAdapter on dashboard view and preserves both style tags', () => {
    const doc = createMockDashboardDocument();
    const loc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/s/studentProfilePESU',
    };

    const mounted = applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);
    expect(mounted).toBe(true);

    // Both Shell and Dashboard styles should be injected
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
    expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeDefined();

    // Check data attributes
    expect(doc.documentElement.getAttribute('data-pas-theme')).toBe('monochrome');
    expect(doc.getElementById('StudentProfilePESUContent')?.getAttribute('data-pas-view')).toBe(
      'dashboard'
    );
  });

  it('handles SPA view transition from Dashboard to Courses, unmounting Dashboard style while keeping Shell', () => {
    const doc = createMockDashboardDocument();
    const loc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/s/studentProfilePESU',
    };

    // 1. Initial Dashboard view
    applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
    expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeDefined();

    // 2. SPA Transition: user clicks "Courses" in sidebar -> AJAX replaces content in #StudentProfilePESUContent
    const spaContent = doc.getElementById('StudentProfilePESUContent');
    if (spaContent) {
      spaContent.children = [];
      const courseWrapper = doc.createElement('div');
      courseWrapper.setAttribute('id', 'course-materials-container');
      const table = doc.createElement('table');
      table.setAttribute('class', 'materials-table');
      courseWrapper.appendChild(table);
      spaContent.appendChild(courseWrapper);
    }

    // 3. Rerun adapter cycle (as triggered by MutationObserver)
    applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);

    // Shell remains active, but Dashboard adapter has unmounted!
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
    expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeNull();
    expect(doc.getElementById('StudentProfilePESUContent')?.hasAttribute('data-pas-view')).toBe(false);
  });

  it('preserves protected carousel functionality and controls', () => {
    const doc = createMockDashboardDocument();
    const leftCtrl = doc.querySelectorAll('.left.carousel-control')[0];
    const rightCtrl = doc.querySelectorAll('.right.carousel-control')[0];

    expect(leftCtrl?.getAttribute('href')).toBe('#announcements-carousel');
    expect(leftCtrl?.getAttribute('data-slide')).toBe('prev');
    expect(rightCtrl?.getAttribute('data-slide')).toBe('next');

    // Mount adapter
    DashboardAdapter.mount(doc as any, DEFAULT_PREFERENCES);

    // Verify controls and attributes were not overwritten or stripped
    expect(leftCtrl?.getAttribute('href')).toBe('#announcements-carousel');
    expect(leftCtrl?.getAttribute('data-slide')).toBe('prev');
    expect(rightCtrl?.getAttribute('data-slide')).toBe('next');
  });

  it('strictly isolates academic content from mutation', () => {
    const doc = createMockDashboardDocument();
    const titles = doc.querySelectorAll('.anc-title');
    const dates = doc.querySelectorAll('.published-date');

    DashboardAdapter.mount(doc as any, DEFAULT_PREFERENCES);

    // Confirm that titles and dates nodes are intact and untouched
    expect(doc.querySelectorAll('.anc-title')).toHaveLength(titles.length);
    expect(doc.querySelectorAll('.published-date')).toHaveLength(dates.length);
  });
});
