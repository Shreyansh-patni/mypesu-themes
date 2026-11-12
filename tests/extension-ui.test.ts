import { describe, expect, it, beforeEach } from 'vitest';
import {
  getPreferences,
  savePreferences,
  resetPreferences,
  PREFERENCES_STORAGE_KEY,
  type StorageArea,
} from '../src/core/preferences/storage';
import {
  DEFAULT_PREFERENCES,
  type UserPreferences,
} from '../src/core/types/preferences';
import { listThemes, getThemeDefinition } from '../src/core/theme-registry';

/** In-memory storage mock implementing StorageArea with change listener support */
class MemoryStorage implements StorageArea {
  private data: Record<string, any> = {};
  public changeListeners: Array<(changes: Record<string, any>, areaName: string) => void> = [];

  async get(keys?: string | string[] | Record<string, any> | null): Promise<Record<string, any>> {
    if (!keys) return { ...this.data };
    if (typeof keys === 'string') {
      return { [keys]: this.data[keys] };
    }
    if (Array.isArray(keys)) {
      const res: Record<string, any> = {};
      for (const k of keys) {
        res[k] = this.data[k];
      }
      return res;
    }
    return { ...this.data };
  }

  async set(items: Record<string, any>): Promise<void> {
    const changes: Record<string, any> = {};
    for (const [k, v] of Object.entries(items)) {
      changes[k] = { oldValue: this.data[k], newValue: v };
      this.data[k] = v;
    }
    for (const listener of this.changeListeners) {
      listener(changes, 'local');
    }
  }

  async clear(): Promise<void> {
    this.data = {};
  }
}

describe('Stage 6A: Extension UI Preference Synchronization & Contracts', () => {
  let memoryStorage: MemoryStorage;

  beforeEach(() => {
    memoryStorage = new MemoryStorage();
  });

  it('verifies theme registry contains exactly Monochrome and Apple-Inspired themes', () => {
    const themes = listThemes();
    expect(themes).toHaveLength(2);
    expect(themes.map((t) => t.id)).toEqual(['monochrome', 'apple-inspired']);

    const monochrome = getThemeDefinition('monochrome');
    expect(monochrome.modes.light.colors.canvas).toBe('#FFFFFF');
    expect(monochrome.modes.dark.colors.canvas).toBe('#000000');

    const apple = getThemeDefinition('apple-inspired');
    expect(apple.modes.light.colors.accent).toBe('#0066cc');
    expect(apple.modes.dark.colors.accent).toBe('#2997ff');
  });

  it('guarantees complete independence between extensionUiAppearance and portal appearanceMode', async () => {
    // 1. Initial defaults
    const initial = await getPreferences(memoryStorage);
    expect(initial.extensionUiAppearance).toBe('system');
    expect(initial.appearanceMode).toBe('system');

    // 2. User changes Extension UI appearance to "dark"
    const step1: UserPreferences = {
      ...initial,
      extensionUiAppearance: 'dark',
    };
    await savePreferences(step1, memoryStorage);

    const afterStep1 = await getPreferences(memoryStorage);
    expect(afterStep1.extensionUiAppearance).toBe('dark');
    // Invariant: Portal appearance mode remains completely untouched!
    expect(afterStep1.appearanceMode).toBe('system');

    // 3. User changes Portal appearance mode to "light"
    const step2: UserPreferences = {
      ...afterStep1,
      appearanceMode: 'light',
    };
    await savePreferences(step2, memoryStorage);

    const afterStep2 = await getPreferences(memoryStorage);
    // Invariant: Extension UI appearance remains dark!
    expect(afterStep2.extensionUiAppearance).toBe('dark');
    expect(afterStep2.appearanceMode).toBe('light');
  });

  it('persists theme selection between monochrome and apple-inspired', async () => {
    const initial = await getPreferences(memoryStorage);
    expect(initial.themeId).toBe('monochrome');

    await savePreferences({ ...initial, themeId: 'apple-inspired' }, memoryStorage);
    const updated = await getPreferences(memoryStorage);
    expect(updated.themeId).toBe('apple-inspired');
  });

  it('synchronizes storage updates to registered storage change listeners', async () => {
    let capturedChanges: Record<string, any> | null = null;
    memoryStorage.changeListeners.push((changes, area) => {
      if (area === 'local') {
        capturedChanges = changes;
      }
    });

    const initial = await getPreferences(memoryStorage);
    await savePreferences({ ...initial, density: 'compact', fontScale: 110 }, memoryStorage);

    expect(capturedChanges).not.toBeNull();
    expect(capturedChanges![PREFERENCES_STORAGE_KEY].newValue.density).toBe('compact');
    expect(capturedChanges![PREFERENCES_STORAGE_KEY].newValue.fontScale).toBe(110);
  });

  it('resets all preferences to factory defaults cleanly', async () => {
    // Write customized preferences
    await savePreferences(
      {
        schemaVersion: 1,
        themeId: 'apple-inspired',
        appearanceMode: 'dark',
        extensionUiAppearance: 'light',
        density: 'compact',
        fontScale: 120,
        pageOverrides: {},
      },
      memoryStorage
    );

    const customized = await getPreferences(memoryStorage);
    expect(customized.themeId).toBe('apple-inspired');
    expect(customized.fontScale).toBe(120);

    // Reset to defaults
    const defaults = await resetPreferences(memoryStorage);
    expect(defaults).toEqual(DEFAULT_PREFERENCES);

    const reRead = await getPreferences(memoryStorage);
    expect(reRead).toEqual(DEFAULT_PREFERENCES);
    expect(reRead.themeId).toBe('monochrome');
    expect(reRead.appearanceMode).toBe('system');
    expect(reRead.extensionUiAppearance).toBe('system');
  });

  it('safely recovers to default preferences on corrupted storage data', async () => {
    await memoryStorage.set({
      [PREFERENCES_STORAGE_KEY]: {
        themeId: 'non-existent-theme',
        fontScale: 9999,
      },
    });

    const fallback = await getPreferences(memoryStorage);
    expect(fallback).toEqual(DEFAULT_PREFERENCES);
  });
});

