import { colors } from './colors';

export type BaseColors = keyof typeof colors;

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dark: true;
    'dark-link': true;
    darker: true;
    'darker-link': true;
    red: true;
    red2: true;
    healthy: true;
    warning: true;
    danger: true;
    rollover1: true;
    rollover2: true;
    rollover3: true;
  }
  interface ButtonPropsSizeOverrides {
    xs: true;
    vs: true;
    small: true;
    medium: true;
    large: true;
  }
}
