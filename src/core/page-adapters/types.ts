import type { UserPreferences } from '../types/preferences';

export interface PageAdapter {
  /** Unique identifier for the adapter (e.g. 'shell') */
  readonly id: string;

  /** Human-readable name */
  readonly name: string;

  /** Verification status of structural selectors */
  readonly status: 'PROVISIONAL' | 'VERIFIED';

  /** URL pathname regex required to activate this adapter */
  readonly routePattern: RegExp;

  /** Allowed hostnames for production portal */
  readonly allowedHostnames: readonly string[];

  /**
   * Structural sanity check verifying expected container nodes exist and are unique.
   * If any selector is missing, ambiguous, or unexpected, returns false.
   */
  isSupported(doc: Document): boolean;

  /**
   * Mounts the adapter: compiles and injects scoped CSS rules into the document.
   * Returns true on successful mount, false if preconditions are not met.
   */
  mount(doc: Document, preferences: UserPreferences): boolean;

  /**
   * Unmounts the adapter: removes injected style tags and cleans up extension attributes.
   */
  unmount(doc: Document): void;

  /**
   * Updates CSS variables and theme attributes when preferences or system theme change.
   */
  update(doc: Document, preferences: UserPreferences): void;
}
