import { describe, expect, it } from 'vitest';
import {
  ShellAdapter,
  verifyShellSelectors,
  generateMonochromeShellCss,
  resolveEffectiveMode,
  SHELL_STYLE_ELEMENT_ID,
  SHELL_ROUTE_PATTERN,
  ALLOWED_PORTAL_HOSTS,
} from '../src/core/page-adapters/shell.adapter';
import {
  isLocationMatched,
  applyActiveAdapters,
  unmountAllAdapters,
} from '../src/core/page-adapters/registry';
import { DEFAULT_PREFERENCES, type UserPreferences } from '../src/core/types/preferences';
import { createMockShellDocument, MockElement } from './mocks/dom-mock';

describe('Stage 6B.1: Monochrome Global Shell Adapter', () => {
  it('unambiguously verifies all 9 observed structural shell selectors on valid fixture', () => {
    const doc = createMockShellDocument();
    const isSupported = verifyShellSelectors(doc as any);
    expect(isSupported).toBe(true);
    expect(ShellAdapter.isSupported(doc as any)).toBe(true);
  });

  it('rejects DOM when any required structural selector is missing', () => {
    // 1. Missing nav#pge_menu
    const doc1 = createMockShellDocument();
    const nav = doc1.getElementById('pge_menu');
    nav?.parentNode?.removeChild(nav);
    expect(verifyShellSelectors(doc1 as any)).toBe(false);
    expect(ShellAdapter.isSupported(doc1 as any)).toBe(false);

    // 2. Missing .content-wrapper
    const doc2 = createMockShellDocument();
    const contentWrapper = doc2.querySelectorAll('.content-wrapper')[0];
    contentWrapper?.parentNode?.removeChild(contentWrapper);
    expect(verifyShellSelectors(doc2 as any)).toBe(false);

    // 3. Missing footer inside .content-right
    const doc3 = createMockShellDocument();
    const footer = doc3.querySelectorAll('.content-right footer')[0];
    footer?.parentNode?.removeChild(footer);
    expect(verifyShellSelectors(doc3 as any)).toBe(false);
  });

  it('rejects DOM when structural selector matches ambiguously (duplicate nodes)', () => {
    const doc = createMockShellDocument();
    // Duplicate the .content-wrapper table
    const dupWrapper = doc.createElement('div');
    dupWrapper.setAttribute('class', 'content-wrapper');
    doc.body.appendChild(dupWrapper);

    expect(doc.querySelectorAll('.content-wrapper')).toHaveLength(2);
    expect(verifyShellSelectors(doc as any)).toBe(false);
  });

  it('strictly gates activation to exact portal route and allowed hostname', () => {
    // 1. Valid production URL
    const validLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/s/studentProfilePESU',
    };
    expect(isLocationMatched(ShellAdapter, validLoc)).toBe(true);

    // 2. Sub-route within studentProfilePESU
    const validSubLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/s/studentProfilePESU/home',
    };
    expect(isLocationMatched(ShellAdapter, validSubLoc)).toBe(true);

    // 3. Unrelated host (e.g. phishing or unauthorized domain)
    const invalidHost = {
      hostname: 'unauthorized-site.com',
      pathname: '/Academy/s/studentProfilePESU',
    };
    expect(isLocationMatched(ShellAdapter, invalidHost)).toBe(false);

    // 4. Excluded consequential route: fee payment
    const feePaymentLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/feePayment',
    };
    expect(isLocationMatched(ShellAdapter, feePaymentLoc)).toBe(false);

    // 5. Excluded consequential route: exam registration / submission
    const examLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/exam',
    };
    expect(isLocationMatched(ShellAdapter, examLoc)).toBe(false);

    // 6. Excluded route: login page
    const loginLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/login',
    };
    expect(isLocationMatched(ShellAdapter, loginLoc)).toBe(false);
  });

  it('generates correct Monochrome Light and Dark mode CSS tokens', () => {
    // Light Mode CSS
    const lightCss = generateMonochromeShellCss('light', 'comfortable', 100);
    expect(lightCss).toContain('--pas-canvas: #FFFFFF');
    expect(lightCss).toContain('--pas-surface: #FAFAFA');
    expect(lightCss).toContain('--pas-surface-raised: #F5F5F5');
    expect(lightCss).toContain('--pas-border: #E5E5E5');
    expect(lightCss).toContain('--pas-text: #171717');

    // Dark Mode CSS
    const darkCss = generateMonochromeShellCss('dark', 'comfortable', 100);
    expect(darkCss).toContain('--pas-canvas: #000000');
    expect(darkCss).toContain('--pas-surface: #0A0A0A');
    expect(darkCss).toContain('--pas-surface-raised: #171717');
    expect(darkCss).toContain('--pas-border: #262626');
    expect(darkCss).toContain('--pas-text: #F5F5F5');
  });

  it('strictly preserves table-based layout display semantics in generated CSS', () => {
    const css = generateMonochromeShellCss('light', 'comfortable', 100);

    // .content-wrapper MUST retain display: table
    expect(css).toContain('html[data-pas-theme="monochrome"] .content-wrapper');
    expect(css).toContain('display: table !important');

    // .menu-left MUST retain display: table-cell
    expect(css).toContain('html[data-pas-theme="monochrome"] .menu-left');
    expect(css).toContain('display: table-cell !important');

    // .content-right MUST retain display: table-cell
    expect(css).toContain('html[data-pas-theme="monochrome"] .content-right');
    expect(css).toContain('display: table-cell !important');

    // Universal and bare tag selectors are forbidden
    expect(css).not.toContain('\n* {');
    expect(css).not.toContain('body {');
    expect(css).not.toContain('button {');
    expect(css).not.toContain('table {');
    expect(css).not.toContain('a {');
  });

  it('mounts Monochrome shell adapter, sets data attributes and style tag', () => {
    const doc = createMockShellDocument();
    const prefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      themeId: 'monochrome',
      appearanceMode: 'light',
    };

    const mounted = ShellAdapter.mount(doc as any, prefs);
    expect(mounted).toBe(true);

    // Injected attributes
    expect(doc.documentElement.getAttribute('data-pas-theme')).toBe('monochrome');
    expect(doc.documentElement.getAttribute('data-pas-mode')).toBe('light');

    // Injected style tag
    const styleEl = doc.getElementById(SHELL_STYLE_ELEMENT_ID);
    expect(styleEl).not.toBeNull();
    expect(styleEl?.textContent).toContain('Monochrome Global Shell Adapter');
    expect(styleEl?.textContent).toContain('--pas-canvas: #FFFFFF');
  });

  it('unmounts cleanly, removing style element and all data-pas-* attributes', () => {
    const doc = createMockShellDocument();
    const prefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      themeId: 'monochrome',
      appearanceMode: 'dark',
    };

    ShellAdapter.mount(doc as any, prefs);
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).not.toBeNull();

    // Perform unmount
    ShellAdapter.unmount(doc as any);

    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeNull();
    expect(doc.documentElement.getAttribute('data-pas-theme')).toBeNull();
    expect(doc.documentElement.getAttribute('data-pas-mode')).toBeNull();
    expect(doc.documentElement.getAttribute('data-pas-density')).toBeNull();
  });

  it('refuses to mount when theme is not Monochrome (e.g. Apple-Inspired)', () => {
    const doc = createMockShellDocument();
    const prefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      themeId: 'apple-inspired', // Not handled by Monochrome adapter
    };

    const mounted = ShellAdapter.mount(doc as any, prefs);
    expect(mounted).toBe(false);
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeNull();
    expect(doc.documentElement.getAttribute('data-pas-theme')).toBeNull();
  });

  it('integrates with adapter registry and maintains inertness on unverified routes', () => {
    const doc = createMockShellDocument();
    const prefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      themeId: 'monochrome',
      appearanceMode: 'light',
    };

    // 1. Matches valid portal route -> mounts successfully
    const validLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/s/studentProfilePESU',
    };
    const result1 = applyActiveAdapters(doc as any, prefs, validLoc);
    expect(result1).toBe(true);
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).not.toBeNull();

    // 2. Navigation changes to excluded route -> unmounts cleanly
    const excludedLoc = {
      hostname: 'www.pesuacademy.com',
      pathname: '/Academy/feePayment',
    };
    const result2 = applyActiveAdapters(doc as any, prefs, excludedLoc);
    expect(result2).toBe(false);
    expect(doc.getElementById(SHELL_STYLE_ELEMENT_ID)).toBeNull();
  });

  it('preserves protected descendants without mutation', () => {
    const doc = createMockShellDocument();
    const prefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      themeId: 'monochrome',
    };

    ShellAdapter.mount(doc as any, prefs);

    // Protected university logo
    const logo = doc.querySelectorAll('img.university-logo')[0];
    expect(logo).not.toBeNull();
    expect(logo?.getAttribute('src')).toBe('logo.png');

    // Protected notification badge
    const notif = doc.getElementById('notification-counter');
    expect(notif).not.toBeNull();
    expect(notif?.classList.has('notification-badge')).toBe(true);

    // Protected logout action
    const logout = doc.querySelectorAll('.btn-logout')[0];
    expect(logout).not.toBeNull();
  });
});
