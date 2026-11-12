import { describe, expect, it } from 'vitest';
import {
  AppleInspiredTheme,
  getThemeDefinition,
  listThemes,
  MonochromeTheme,
  THEME_REGISTRY,
} from '../src/core/theme-registry';

describe('Theme Registry & Palette Isolation', () => {
  it('registers all approved themes and no extra unapproved packs', () => {
    const themes = listThemes();
    expect(themes).toHaveLength(2);
    expect(themes.map((t) => t.id).sort()).toEqual(['apple-inspired', 'monochrome']);
  });

  it('retrieves themes by ID with fallback to Monochrome', () => {
    expect(getThemeDefinition('monochrome')).toBe(MonochromeTheme);
    expect(getThemeDefinition('apple-inspired')).toBe(AppleInspiredTheme);
    // Unrecognized ID safely resolves to Monochrome default
    expect(getThemeDefinition('non-existent' as any)).toBe(MonochromeTheme);
  });

  it('verifies Monochrome theme satisfies strict achromatic palette rules', () => {
    const { light, dark } = MonochromeTheme.modes;

    // Check Light values match verified 12-step grayscale
    expect(light.colors.canvas).toBe('#FFFFFF');
    expect(light.colors.surface).toBe('#FAFAFA');
    expect(light.colors.surfaceRaised).toBe('#F5F5F5');
    expect(light.colors.text).toBe('#171717');
    expect(light.colors.textMuted).toBe('#737373');
    expect(light.colors.border).toBe('#E5E5E5');
    expect(light.colors.accent).toBe('#262626');

    // Check Dark values match verified 12-step grayscale
    expect(dark.colors.canvas).toBe('#000000');
    expect(dark.colors.surface).toBe('#0A0A0A');
    expect(dark.colors.surfaceRaised).toBe('#171717');
    expect(dark.colors.text).toBe('#F5F5F5');
    expect(dark.colors.textMuted).toBe('#8A8A8A');
    expect(dark.colors.border).toBe('#262626');
    expect(dark.colors.accent).toBe('#E5E5E5');

    // Palette isolation: blue tokens must NEVER leak into Monochrome
    const forbiddenBlues = ['#0066cc', '#2997ff', '#0071e3'];
    const allMonochromeValues = [
      ...Object.values(light.colors),
      ...Object.values(dark.colors),
    ];

    for (const val of allMonochromeValues) {
      if (typeof val === 'string') {
        expect(forbiddenBlues).not.toContain(val.toLowerCase());
      }
    }
  });

  it('verifies Apple-Inspired theme includes approved Action Blue and audited text', () => {
    const { light, dark } = AppleInspiredTheme.modes;

    // Action Blue and Focus Blue presence
    expect(light.colors.accent).toBe('#0066cc');
    expect(light.colors.focus).toBe('#0071e3');
    expect(light.colors.link).toBe('#0066cc');
    expect(dark.colors.accent).toBe('#2997ff');
    expect(dark.colors.focus).toBe('#0071e3');
    expect(dark.colors.link).toBe('#2997ff');

    // Audited accessible secondary text (#6e6e73)
    expect(light.colors.textMuted).toBe('#6e6e73');
    expect(dark.colors.textMuted).toBe('#a1a1a6');

    // Canvas values
    expect(light.colors.canvas).toBe('#f5f5f7');
    expect(dark.colors.canvas).toBe('#000000');
  });
});

