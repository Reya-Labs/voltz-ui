import { BaseColorTokens } from 'brokoli-ui';

export const MODE_COLOR_TOKEN_MAP: Record<'fixed' | 'variable', BaseColorTokens> = {
  fixed: 'skyBlueCrayola',
  variable: 'ultramarineBlue',
};

export const MODE_TEXT_MAP: Record<'fixed' | 'variable', string> = {
  fixed: 'Fixed Taker',
  variable: 'Variable Taker',
};
