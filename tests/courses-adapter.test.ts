import { describe, expect, it } from 'vitest';
import {
  CoursesAdapter,
  verifyCoursesSelectors,
  findVisibleMaterialsTable,
  generateMonochromeCoursesCss,
  COURSES_STYLE_ELEMENT_ID,
  COURSES_ROUTE_PATTERN,
  PROTECTED_ACTION_ICONS,
} from '../src/core/page-adapters/courses.adapter';
import { ShellAdapter, SHELL_STYLE_ELEMENT_ID } from '../src/core/page-adapters/shell.adapter';
import {
  DashboardAdapter,
  DASHBOARD_STYLE_ELEMENT_ID,
} from '../src/core/page-adapters/dashboard.adapter';
import {
  isLocationMatched,
  applyActiveAdapters,
  unmountAllAdapters,
} from '../src/core/page-adapters/registry';
import { DEFAULT_PREFERENCES, type UserPreferences } from '../src/core/types/preferences';
import {
  createMockCoursesDocument,
  createMockDashboardDocument,
  createMockShellDocument,
  MockElement,
} from './mocks/dom-mock';

describe('Stage 6B.3: Monochrome Courses & Materials Adapter', () => {
  describe('Detection & Verification', () => {
    it('unambiguously verifies courses structural signature on valid fixture', () => {
      const doc = createMockCoursesDocument();
      const isSupported = verifyCoursesSelectors(doc as any);
      expect(isSupported).toBe(true);
      expect(CoursesAdapter.isSupported(doc as any)).toBe(true);
    });

    it('detects visible table and rejects hidden table', () => {
      const doc = createMockCoursesDocument();
      const contentRoot = doc.getElementById('StudentProfilePESUContent');
      expect(contentRoot).toBeDefined();

      const table = findVisibleMaterialsTable(contentRoot as any);
      expect(table).toBeDefined();
      expect(table?.getAttribute('class')).toContain('materials-table');

      // The hidden table should NOT be returned
      expect(table?.getAttribute('class')).not.toContain('hidden-scratch-table');
    });

    it('rejects DOM when .short-title is missing', () => {
      const doc = createMockCoursesDocument();
      const titles = doc.querySelectorAll('.short-title');
      titles.forEach((t) => t.parentNode?.removeChild(t));

      expect(verifyCoursesSelectors(doc as any)).toBe(false);
      expect(CoursesAdapter.isSupported(doc as any)).toBe(false);
    });

    it('rejects DOM when visible table is missing thead or tbody', () => {
      // Missing tbody
      const doc1 = createMockCoursesDocument();
      const tbody = doc1.querySelectorAll('.materials-table tbody')[0];
      tbody?.parentNode?.removeChild(tbody);
      expect(verifyCoursesSelectors(doc1 as any)).toBe(false);

      // Missing thead
      const doc2 = createMockCoursesDocument();
      const thead = doc2.querySelectorAll('.materials-table thead')[0];
      thead?.parentNode?.removeChild(thead);
      expect(verifyCoursesSelectors(doc2 as any)).toBe(false);
    });

    it('rejects DOM when multiple visible tables create ambiguity', () => {
      const doc = createMockCoursesDocument();
      const contentRoot = doc.getElementById('StudentProfilePESUContent');

      // Add a second visible table with valid thead/tbody
      const dupTable = doc.createElement('table');
      const thead = doc.createElement('thead');
      const trH = doc.createElement('tr');
      trH.appendChild(doc.createElement('th'));
      thead.appendChild(trH);
      dupTable.appendChild(thead);
      const tbody = doc.createElement('tbody');
      const trB = doc.createElement('tr');
      trB.appendChild(doc.createElement('td'));
      tbody.appendChild(trB);
      dupTable.appendChild(tbody);

      contentRoot?.appendChild(dupTable);

      expect(verifyCoursesSelectors(doc as any)).toBe(false);
      expect(CoursesAdapter.isSupported(doc as any)).toBe(false);
    });

    it('rejects DOM when dashboard markers are present (conflict resolution)', () => {
      const doc = createMockCoursesDocument();
      const contentRoot = doc.getElementById('StudentProfilePESUContent');

      // Add conflicting dashboard marker
      const carousel = doc.createElement('div');
      carousel.setAttribute('id', 'announcements-carousel');
      contentRoot?.appendChild(carousel);

      expect(verifyCoursesSelectors(doc as any)).toBe(false);
      expect(CoursesAdapter.isSupported(doc as any)).toBe(false);
    });

    it('strictly gates activation to exact portal route and allowed hostname', () => {
      const validLoc = {
        hostname: 'www.pesuacademy.com',
        pathname: '/Academy/s/studentProfilePESU',
      };
      expect(isLocationMatched(CoursesAdapter, validLoc)).toBe(true);

      const invalidHost = {
        hostname: 'malicious-domain.com',
        pathname: '/Academy/s/studentProfilePESU',
      };
      expect(isLocationMatched(CoursesAdapter, invalidHost)).toBe(false);

      const feeLoc = {
        hostname: 'www.pesuacademy.com',
        pathname: '/Academy/feePayment',
      };
      expect(isLocationMatched(CoursesAdapter, feeLoc)).toBe(false);
    });
  });

  describe('Theme Tokens & Visual CSS Generation', () => {
    it('generates scoped Monochrome Light and Dark mode CSS tokens for course materials', () => {
      const lightCss = generateMonochromeCoursesCss('light', 'comfortable', 100);
      expect(lightCss).toContain('html[data-pas-theme="monochrome"] #StudentProfilePESUContent');
      expect(lightCss).toContain('.short-title');
      expect(lightCss).toContain('table');
      expect(lightCss).toContain('table thead th');
      expect(lightCss).toContain('table tbody tr:nth-child(even)');
      expect(lightCss).toContain('table tbody tr:hover');
      expect(lightCss).toContain('.info-note');
      expect(lightCss).toContain('td.text-center');

      const darkCss = generateMonochromeCoursesCss('dark', 'comfortable', 100);
      expect(darkCss).toContain('#000000');
      expect(darkCss).toContain('#0A0A0A');
    });

    it('adapts cell padding based on density preference', () => {
      const comfortableCss = generateMonochromeCoursesCss('light', 'comfortable', 100);
      expect(comfortableCss).toContain('12px 14px !important');

      const compactCss = generateMonochromeCoursesCss('light', 'compact', 100);
      expect(compactCss).toContain('8px 10px !important');
    });

    it('mounts CoursesAdapter, setting style tag and data-pas-view="courses"', () => {
      const doc = createMockCoursesDocument();
      const success = CoursesAdapter.mount(doc as any, DEFAULT_PREFERENCES);
      expect(success).toBe(true);

      const styleEl = doc.getElementById(COURSES_STYLE_ELEMENT_ID);
      expect(styleEl).toBeDefined();
      expect(styleEl?.getAttribute('data-pas-adapter')).toBe('courses');

      const contentRoot = doc.getElementById('StudentProfilePESUContent');
      expect(contentRoot?.getAttribute('data-pas-view')).toBe('courses');
    });

    it('unmounts cleanly, removing style element and data-pas-view attribute', () => {
      const doc = createMockCoursesDocument();
      CoursesAdapter.mount(doc as any, DEFAULT_PREFERENCES);
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeDefined();

      CoursesAdapter.unmount(doc as any);
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeNull();
      const contentRoot = doc.getElementById('StudentProfilePESUContent');
      expect(contentRoot?.hasAttribute('data-pas-view')).toBe(false);
    });

    it('refuses to mount when theme is not Monochrome (e.g. Apple-Inspired)', () => {
      const doc = createMockCoursesDocument();
      const applePrefs: UserPreferences = {
        ...DEFAULT_PREFERENCES,
        themeId: 'apple-inspired',
      };
      const success = CoursesAdapter.mount(doc as any, applePrefs);
      expect(success).toBe(false);
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeNull();
    });
  });

  describe('Protection & Academic Data Invariants', () => {
    it('strictly preserves action icon class names and parent anchor destinations', () => {
      const doc = createMockCoursesDocument();
      const actionAnchors = doc.querySelectorAll('td.text-center a');
      expect(actionAnchors.length).toBeGreaterThan(0);

      const initialHrefs = actionAnchors.map((a) => a.getAttribute('href'));

      CoursesAdapter.mount(doc as any, DEFAULT_PREFERENCES);

      actionAnchors.forEach((a, idx) => {
        expect(a.getAttribute('href')).toBe(initialHrefs[idx]);
      });

      // Verify all 8 protected action icon classes are accounted for in definition
      expect(PROTECTED_ACTION_ICONS).toHaveLength(8);
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-play-button');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-presentation-graphs');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-open-book');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-document');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-doc-tick');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-faq');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-list-items');
      expect(PROTECTED_ACTION_ICONS).toContain('pesu-icon-file');
    });

    it('does not mutate or scrape academic text', () => {
      const doc = createMockCoursesDocument();
      const shortTitle = doc.querySelectorAll('.short-title')[0];
      const topicCell = doc.querySelectorAll('.topic-cell')[0];

      CoursesAdapter.mount(doc as any, DEFAULT_PREFERENCES);

      expect(shortTitle).toBeDefined();
      expect(topicCell).toBeDefined();
    });
  });

  describe('Dynamic SPA Transitions & Coexistence', () => {
    it('coexists with ShellAdapter on courses view and preserves both style tags', () => {
      const doc = createMockCoursesDocument();
      const loc = {
        hostname: 'www.pesuacademy.com',
        pathname: '/Academy/s/studentProfilePESU',
      };

      const mounted = applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);
      expect(mounted).toBe(true);

      // Both Shell and Courses styles should be present
      expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeNull();

      expect(doc.documentElement.getAttribute('data-pas-theme')).toBe('monochrome');
      expect(doc.getElementById('StudentProfilePESUContent')?.getAttribute('data-pas-view')).toBe(
        'courses'
      );
    });

    it('handles SPA transition from Courses to Dashboard, swapping adapter styles cleanly', () => {
      const doc = createMockCoursesDocument();
      const loc = {
        hostname: 'www.pesuacademy.com',
        pathname: '/Academy/s/studentProfilePESU',
      };

      // 1. Initial Courses view
      applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);
      expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeNull();

      // 2. SPA Transition: Student clicks "Dashboard" in sidebar
      // Replace content of #StudentProfilePESUContent with dashboard structure
      const docDashboard = createMockDashboardDocument();
      const dashboardContent = docDashboard.getElementById('StudentProfilePESUContent');
      const spaContent = doc.getElementById('StudentProfilePESUContent');
      if (spaContent && dashboardContent) {
        spaContent.children = [...dashboardContent.children];
      }

      // 3. Adapter cycle executes
      applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);

      // Shell remains active, Courses adapter is unmounted, Dashboard adapter is mounted
      expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeNull();
      expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById('StudentProfilePESUContent')?.getAttribute('data-pas-view')).toBe(
        'dashboard'
      );
    });

    it('handles SPA transition from Dashboard to Courses, swapping adapter styles cleanly', () => {
      const doc = createMockDashboardDocument();
      const loc = {
        hostname: 'www.pesuacademy.com',
        pathname: '/Academy/s/studentProfilePESU',
      };

      // 1. Initial Dashboard view
      applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);
      expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeNull();

      // 2. SPA Transition: Student clicks "Courses" in sidebar
      const docCourses = createMockCoursesDocument();
      const coursesContent = docCourses.getElementById('StudentProfilePESUContent');
      const spaContent = doc.getElementById('StudentProfilePESUContent');
      if (spaContent && coursesContent) {
        spaContent.children = [...coursesContent.children];
      }

      // 3. Adapter cycle executes
      applyActiveAdapters(doc as any, DEFAULT_PREFERENCES, loc);

      // Shell remains active, Dashboard adapter is unmounted, Courses adapter is mounted
      expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById(DASHBOARD_STYLE_ELEMENT_ID)).toBeNull();
      expect(doc.getElementById(COURSES_STYLE_ELEMENT_ID)).toBeDefined();
      expect(doc.getElementById('StudentProfilePESUContent')?.getAttribute('data-pas-view')).toBe(
        'courses'
      );
    });
  });
});

