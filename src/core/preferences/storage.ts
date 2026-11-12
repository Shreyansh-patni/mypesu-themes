import { browser } from 'wxt/browser';
import {
  DEFAULT_PREFERENCES,
  UserPreferencesSchema,
  type UserPreferences,
} from '../types/preferences';

export const PREFERENCES_STORAGE_KEY = 'mypesu_preferences';

/** Storage area interface compatible with browser.storage.local and test mocks */
export interface StorageArea {
  get(keys?: string | string[] | Record<string, any> | null): Promise<Record<string, any>>;
  set(items: Record<string, any>): Promise<void>;
  remove?(keys: string | string[]): Promise<void>;
  clear?(): Promise<void>;
}

/** Resolves the runtime browser.storage.local or provided storage instance */
function resolveStorageArea(customStorage?: StorageArea): StorageArea | null {
  if (customStorage) {
    return customStorage;
  }
  try {
    if (typeof browser !== 'undefined' && browser.storage?.local) {
      return browser.storage.local;
    }
  } catch {
    // Non-extension environment (e.g. unit tests without injected storage)
  }
  return null;
}

/**
 * Reads and validates user preferences from local storage.
 * If preferences are missing, malformed, or storage is inaccessible,
 * safely returns DEFAULT_PREFERENCES.
 *
 * NOTE: Never accesses or returns PESU credentials, cookies, or session tokens.
 */
export async function getPreferences(storageArea?: StorageArea): Promise<UserPreferences> {
  const storage = resolveStorageArea(storageArea);
  if (!storage) {
    return { ...DEFAULT_PREFERENCES };
  }

  try {
    const result = await storage.get(PREFERENCES_STORAGE_KEY);
    const raw = result?.[PREFERENCES_STORAGE_KEY];

    if (!raw) {
      return { ...DEFAULT_PREFERENCES };
    }

    const parseResult = UserPreferencesSchema.safeParse(raw);
    if (!parseResult.success) {
      console.warn(
        '[MyPESU Themes] Stored preferences failed schema validation. Falling back to defaults.',
        parseResult.error.format()
      );
      return { ...DEFAULT_PREFERENCES };
    }

    return parseResult.data;
  } catch (error) {
    console.warn(
      '[MyPESU Themes] Failed to read preferences from storage. Using safe defaults.',
      error
    );
    return { ...DEFAULT_PREFERENCES };
  }
}

/**
 * Validates and persists user preferences to local storage.
 * Returns true on success, false on failure.
 */
export async function savePreferences(
  preferences: UserPreferences,
  storageArea?: StorageArea
): Promise<boolean> {
  const parseResult = UserPreferencesSchema.safeParse(preferences);
  if (!parseResult.success) {
    console.error(
      '[MyPESU Themes] Cannot save invalid preferences payload.',
      parseResult.error.format()
    );
    return false;
  }

  const storage = resolveStorageArea(storageArea);
  if (!storage) {
    console.error('[MyPESU Themes] No storage area available to persist preferences.');
    return false;
  }

  try {
    await storage.set({ [PREFERENCES_STORAGE_KEY]: parseResult.data });
    return true;
  } catch (error) {
    console.error('[MyPESU Themes] Storage write operation failed.', error);
    return false;
  }
}

/**
 * Resets preferences to factory defaults in local storage.
 */
export async function resetPreferences(storageArea?: StorageArea): Promise<UserPreferences> {
  const defaults = { ...DEFAULT_PREFERENCES };
  await savePreferences(defaults, storageArea);
  return defaults;
}
