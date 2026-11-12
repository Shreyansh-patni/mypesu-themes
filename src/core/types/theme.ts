import { ThemeId } from './preferences';

export type ColorMode = 'light' | 'dark';

export interface SemanticColorTokens {
  canvas: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  accent: string;
  onAccent: string;
  focus: string;
  link: string;
  // Neutral status treatments (active default)
  statusNeutralBorder: string;
  statusNeutralText: string;
  // Proposed semantic tokens (explicitly flagged, pending owner approval)
  proposedStatusSuccess?: string;
  proposedStatusWarning?: string;
  proposedStatusDanger?: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontSizeBase: string;
  lineHeightBase: string;
  fontWeightNormal: number;
  fontWeightMedium: number;
  fontWeightBold: number;
}

export interface LayoutTokens {
  radiusSmall: string;
  radiusMedium: string;
  radiusLarge: string;
  spacingUnit: string;
}

export interface ThemeModeTokens {
  colors: SemanticColorTokens;
  typography: TypographyTokens;
  layout: LayoutTokens;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  modes: {
    light: ThemeModeTokens;
    dark: ThemeModeTokens;
  };
}
