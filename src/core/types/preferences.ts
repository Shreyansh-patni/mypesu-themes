import { z } from 'zod';

export const ThemeIdSchema = z.enum(['monochrome', 'apple-inspired']);
export type ThemeId = z.infer<typeof ThemeIdSchema>;

export const AppearanceModeSchema = z.enum(['light', 'dark', 'system']);
export type AppearanceMode = z.infer<typeof AppearanceModeSchema>;

export const DensityModeSchema = z.enum(['comfortable', 'compact']);
export type DensityMode = z.infer<typeof DensityModeSchema>;

export const FontScaleSchema = z.number().int().min(100).max(120);
export type FontScale = z.infer<typeof FontScaleSchema>;

/** Page-specific override shape (bounded to supported routes) */
export const PageOverrideSchema = z.object({
  density: DensityModeSchema.optional(),
  fontScale: FontScaleSchema.optional(),
});
export type PageOverride = z.infer<typeof PageOverrideSchema>;

/** Complete User Preferences Schema */
export const UserPreferencesSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  themeId: ThemeIdSchema.default('monochrome'),
  appearanceMode: AppearanceModeSchema.default('system'),
  density: DensityModeSchema.default('comfortable'),
  fontScale: FontScaleSchema.default(100),
  pageOverrides: z.record(z.string(), PageOverrideSchema).default({}),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

/** Default User Preferences strictly matching PRD Section 3 */
export const DEFAULT_PREFERENCES: UserPreferences = Object.freeze({
  schemaVersion: 1,
  themeId: 'monochrome',
  appearanceMode: 'system',
  density: 'comfortable',
  fontScale: 100,
  pageOverrides: {},
});
