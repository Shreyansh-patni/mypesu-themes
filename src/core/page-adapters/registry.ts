import type { PageAdapter } from './types';
import type { UserPreferences } from '../types/preferences';
import { ShellAdapter } from './shell.adapter';

export const REGISTERED_ADAPTERS: readonly PageAdapter[] = Object.freeze([
  ShellAdapter,
]);

/**
 * Checks if the given URL location matches an adapter's allowed host and route pattern.
 */
export function isLocationMatched(
  adapter: PageAdapter,
  loc: { hostname: string; pathname: string }
): boolean {
  if (!adapter.allowedHostnames.includes(loc.hostname)) {
    return false;
  }
  return adapter.routePattern.test(loc.pathname);
}

/**
 * Evaluates active page adapters against the current document and location, mounting matched adapters.
 * If no adapter matches, or if conditions fail, ensures safe unmount.
 */
export function applyActiveAdapters(
  doc: Document,
  preferences: UserPreferences,
  locationObj?: { hostname: string; pathname: string }
): boolean {
  if (!doc) return false;

  const loc = locationObj || (typeof window !== 'undefined' ? window.location : null);
  if (!loc) {
    unmountAllAdapters(doc);
    return false;
  }

  let mountedAny = false;

  for (const adapter of REGISTERED_ADAPTERS) {
    if (isLocationMatched(adapter, loc)) {
      if (adapter.isSupported(doc)) {
        const success = adapter.mount(doc, preferences);
        if (success) {
          mountedAny = true;
        }
      } else {
        adapter.unmount(doc);
      }
    } else {
      adapter.unmount(doc);
    }
  }

  return mountedAny;
}

/**
 * Completely unmounts all page adapters and clears all extension attributes.
 */
export function unmountAllAdapters(doc: Document): void {
  if (!doc) return;
  for (const adapter of REGISTERED_ADAPTERS) {
    adapter.unmount(doc);
  }
}
