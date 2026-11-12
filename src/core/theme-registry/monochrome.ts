import type { ThemeDefinition } from '../types/theme';

/**
 * Monochrome Theme Specification
 * Derived directly from the verified 12-step grayscale palette (jpg(7).jpg).
 * Strictly achromatic. Saturated accents are forbidden.
 */
export const MonochromeTheme: ThemeDefinition = {
  id: 'monochrome',
  name: 'Monochrome',
  description: 'Distraction-free minimalist grayscale aesthetic emphasizing tonal contrast and razor-sharp hierarchy.',
  modes: {
    light: {
      colors: {
        canvas: '#FFFFFF',
        surface: '#FAFAFA',
        surfaceRaised: '#F5F5F5',
        text: '#171717',
        textMuted: '#737373',
        border: '#E5E5E5',
        borderSubtle: '#F5F5F5',
        accent: '#262626',
        onAccent: '#FFFFFF',
        focus: '#525252',
        link: '#262626',
        statusNeutralBorder: '#262626',
        statusNeutralText: '#171717',
      },
      typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSizeBase: '14px',
        lineHeightBase: '1.5',
        fontWeightNormal: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
      },
      layout: {
        radiusSmall: '4px',
        radiusMedium: '6px',
        radiusLarge: '8px',
        spacingUnit: '8px',
      },
    },
    dark: {
      colors: {
        canvas: '#000000',
        surface: '#0A0A0A',
        surfaceRaised: '#171717',
        text: '#F5F5F5',
        textMuted: '#8A8A8A',
        border: '#262626',
        borderSubtle: '#171717',
        accent: '#E5E5E5',
        onAccent: '#000000',
        focus: '#A3A3A3',
        link: '#E5E5E5',
        statusNeutralBorder: '#E5E5E5',
        statusNeutralText: '#F5F5F5',
      },
      typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSizeBase: '14px',
        lineHeightBase: '1.5',
        fontWeightNormal: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
      },
      layout: {
        radiusSmall: '4px',
        radiusMedium: '6px',
        radiusLarge: '8px',
        spacingUnit: '8px',
      },
    },
  },
};
