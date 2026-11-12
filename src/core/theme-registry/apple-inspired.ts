import { ThemeDefinition } from '../types/theme';

/**
 * Apple-Inspired Theme Specification
 * Aligned with Apple Human Interface Guidelines and DESIGN(2).md.
 * Action Blue (#0066cc / #2997ff) with audited accessible secondary text (#6e6e73).
 * Proposed status colors remain distinct; neutral treatments remain active default.
 */
export const AppleInspiredTheme: ThemeDefinition = {
  id: 'apple-inspired',
  name: 'Apple-Inspired',
  description: 'Clean spatial hierarchy inspired by Apple HIG, featuring signature Action Blue accents and subtle surface elevations.',
  modes: {
    light: {
      colors: {
        canvas: '#f5f5f7',
        surface: '#ffffff',
        surfaceRaised: '#fafafc',
        text: '#1d1d1f',
        textMuted: '#6e6e73', // Audited: 5.07:1 on white, 4.66:1 on canvas
        border: '#d2d2d7',
        borderSubtle: '#e5e5ea',
        accent: '#0066cc',
        onAccent: '#ffffff',
        focus: '#0071e3',
        link: '#0066cc',
        statusNeutralBorder: '#d2d2d7',
        statusNeutralText: '#1d1d1f',
        proposedStatusSuccess: '#1b5e20', // Over alpha pill #e7f8eb: 7.13:1
        proposedStatusWarning: '#8a4b00', // Over alpha pill #fff2e0: 6.16:1
        proposedStatusDanger: '#d70015',  // Over alpha pill #ffe7e6: 4.57:1
      },
      typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSizeBase: '14px',
        lineHeightBase: '1.47',
        fontWeightNormal: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
      },
      layout: {
        radiusSmall: '6px',
        radiusMedium: '8px',
        radiusLarge: '12px',
        spacingUnit: '8px',
      },
    },
    dark: {
      colors: {
        canvas: '#000000',
        surface: '#1d1d1f',
        surfaceRaised: '#2c2c2e',
        text: '#ffffff',
        textMuted: '#a1a1a6',
        border: '#333336',
        borderSubtle: '#242426',
        accent: '#2997ff',
        onAccent: '#000000',
        focus: '#0071e3',
        link: '#2997ff',
        statusNeutralBorder: '#333336',
        statusNeutralText: '#ffffff',
        proposedStatusSuccess: '#30d158', // Over alpha pill #203a28: 5.74:1
        proposedStatusWarning: '#ffd60a', // Over alpha pill #413b1c: 7.66:1
        proposedStatusDanger: '#ff453a',  // Over alpha pill #412323: 3.94:1
      },
      typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSizeBase: '14px',
        lineHeightBase: '1.47',
        fontWeightNormal: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
      },
      layout: {
        radiusSmall: '6px',
        radiusMedium: '8px',
        radiusLarge: '12px',
        spacingUnit: '8px',
      },
    },
  },
};
