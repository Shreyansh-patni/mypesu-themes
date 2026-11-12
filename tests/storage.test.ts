import { describe, expect, it } from 'vitest';
import {
  getPreferences,
  PREFERENCES_STORAGE_KEY,
  resetPreferences,
  savePreferences,
  type StorageArea,
} from '../src/core/preferences/storage';
import { DEFAULT_PREFERENCES, type UserPreferences } from '../src/core/types/preferences';

/** In-memory mock storage implementation */
function createMockStorage(initialData: Record<string, any> = {}): StorageArea {
  const store = { ...initialData };
  return {
    get: async (keys) => {
      if (typeof keys === 'string') {
        return { [keys]: store[keys] };
      }
      return { ...store };
    },
    set: async (items) => {
      Object.assign(store, items);
    },
    clear: async () => {
      for (const k of Object.keys(store)) {
        delete store[k];
      }
    },
  };
}

describe('Storage Wrapper (browser.storage.local)', () => {
  it('returns default preferences when storage is empty', async () => {
    const mockStorage = createMockStorage();
    const prefs = await getPreferences(mockStorage);
    expect(prefs).toEqual(DEFAULT_PREFERENCES);
  });

  it('persists and retrieves valid preferences', async () => {
    const mockStorage = createMockStorage();
    const customPrefs: UserPreferences = {
      schemaVersion: 1,
      themeId: 'apple-inspired',
      appearanceMode: 'light',
      density: 'compact',
      fontScale: 105,
      pageOverrides: {},
    };

    const saved = await savePreferences(customPrefs, mockStorage);
    expect(saved).toBe(true);

    const retrieved = await getPreferences(mockStorage);
    expect(retrieved).toEqual(customPrefs);
  });

  it('safely falls back to defaults when stored data fails schema validation', async () => {
    const mockStorage = createMockStorage({
      [PREFERENCES_STORAGE_KEY]: {
        themeId: 'corrupted-theme-id',
        fontScale: 9999,
      },
    });

    const prefs = await getPreferences(mockStorage);
    expect(prefs).toEqual(DEFAULT_PREFERENCES);
  });

  it('safely returns defaults when storage read throws an exception', async () => {
    const brokenStorage: StorageArea = {
      get: async () => {
        throw new Error('Disk read error / Access Denied');
      },
      set: async () => {},
    };

    const prefs = await getPreferences(brokenStorage);
    expect(prefs).toEqual(DEFAULT_PREFERENCES);
  });

  it('rejects saving invalid preference payloads', async () => {
    const mockStorage = createMockStorage();
    const invalidPayload = {
      themeId: 'unsupported',
      appearanceMode: 'dark',
    } as any;

    const saved = await savePreferences(invalidPayload, mockStorage);
    expect(saved).toBe(false);
  });

  it('resets preferences to factory defaults cleanly', async () => {
    const mockStorage = createMockStorage({
      [PREFERENCES_STORAGE_KEY]: {
        schemaVersion: 1,
        themeId: 'apple-inspired',
        appearanceMode: 'dark',
        density: 'compact',
        fontScale: 110,
        pageOverrides: {},
      },
    });

    const defaults = await resetPreferences(mockStorage);
    expect(defaults).toEqual(DEFAULT_PREFERENCES);

    const verified = await getPreferences(mockStorage);
    expect(verified).toEqual(DEFAULT_PREFERENCES);
  });
});

