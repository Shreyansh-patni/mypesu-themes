import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PREFERENCES,
  UserPreferencesSchema,
} from '../src/core/types/preferences';

describe('UserPreferences Schema & Defaults', () => {
  it('assigns exact PRD & Stage 5.1 defaults for empty object', () => {
    const parsed = UserPreferencesSchema.parse({});
    expect(parsed).toEqual(DEFAULT_PREFERENCES);
    expect(parsed.themeId).toBe('monochrome');
    expect(parsed.appearanceMode).toBe('system');
    expect(parsed.extensionUiAppearance).toBe('system');
    expect(parsed.density).toBe('comfortable');
    expect(parsed.fontScale).toBe(100);
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.pageOverrides).toEqual({});
  });

  it('validates a complete valid preference configuration', () => {
    const custom = {
      schemaVersion: 1,
      themeId: 'apple-inspired',
      appearanceMode: 'dark',
      extensionUiAppearance: 'light',
      density: 'compact',
      fontScale: 115,
      pageOverrides: {
        '/academy/courses': {
          density: 'compact',
          fontScale: 110,
        },
      },
    };
    const parsed = UserPreferencesSchema.parse(custom);
    expect(parsed).toEqual(custom);
  });

  it('preserves independence between extension UI appearance and portal theme appearance', () => {
    const parsed = UserPreferencesSchema.parse({
      appearanceMode: 'dark',             // Portal appearance: Dark
      extensionUiAppearance: 'light',      // Extension UI: Light
    });
    expect(parsed.appearanceMode).toBe('dark');
    expect(parsed.extensionUiAppearance).toBe('light');
  });

  it('accepts valid extension UI appearance values', () => {
    expect(UserPreferencesSchema.parse({ extensionUiAppearance: 'light' }).extensionUiAppearance).toBe('light');
    expect(UserPreferencesSchema.parse({ extensionUiAppearance: 'dark' }).extensionUiAppearance).toBe('dark');
    expect(UserPreferencesSchema.parse({ extensionUiAppearance: 'system' }).extensionUiAppearance).toBe('system');
  });

  it('rejects invalid extension UI appearance values', () => {
    const result = UserPreferencesSchema.safeParse({ extensionUiAppearance: 'midnight-blue' });
    expect(result.success).toBe(false);
  });

  it('rejects unapproved theme IDs', () => {
    const result = UserPreferencesSchema.safeParse({ themeId: 'neon-cyberpunk' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid appearance modes', () => {
    const result = UserPreferencesSchema.safeParse({ appearanceMode: 'high-contrast-neon' });
    expect(result.success).toBe(false);
  });

  it('rejects font scales outside bounded range [100, 120]', () => {
    const tooLow = UserPreferencesSchema.safeParse({ fontScale: 90 });
    const tooHigh = UserPreferencesSchema.safeParse({ fontScale: 130 });
    expect(tooLow.success).toBe(false);
    expect(tooHigh.success).toBe(false);
  });

  it('rejects unsupported schema versions', () => {
    const result = UserPreferencesSchema.safeParse({ schemaVersion: 99 });
    expect(result.success).toBe(false);
  });
});
