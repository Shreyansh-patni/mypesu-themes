import type { ThemeId } from '../types/preferences';
import type { ThemeDefinition } from '../types/theme';
import { AppleInspiredTheme } from './apple-inspired';
import { MonochromeTheme } from './monochrome';

export { AppleInspiredTheme, MonochromeTheme };

export const THEME_REGISTRY: Record<ThemeId, ThemeDefinition> = {
  monochrome: MonochromeTheme,
  'apple-inspired': AppleInspiredTheme,
};

export function getThemeDefinition(themeId: ThemeId): ThemeDefinition {
  return THEME_REGISTRY[themeId] ?? MonochromeTheme;
}

export function listThemes(): ThemeDefinition[] {
  return [MonochromeTheme, AppleInspiredTheme];
}
