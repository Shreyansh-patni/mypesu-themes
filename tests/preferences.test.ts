import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PREFERENCES,
  UserPreferencesSchema,
} from '../src/core/types/preferences';

describe('UserPreferences Schema & Defaults', () => {
  it('assigns exact PRD defaults for empty object', () => {
    const parsed = UserPreferencesSchema.parse({});
    expect(parsed).toEqual(DEFAULT_PREFERENCES);
    expect(parsed.themeId).toBe('monochrome');
    expect(parsed.appearanceMode).toBe('system');
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

