export type BaseColors =
  | 'lavenderWeb'
  | 'wildStrawberry'
  | 'orangeYellow'
  | 'skyBlueCrayola'
  | 'ultramarineBlue'
  // todo: Align with Brokoli to make it part of base colors
  | 'vzGrey'
  | 'vzGreyDarkish'
  | 'vzGreyDarkish2'
  | 'vzGreyDark'
  | 'vzGreyDarker'
  | 'vzCustomRed1'
  | 'vzCustomRed2'
  | 'vzCustomYellow1'
  | 'vzCustomGreen1'
  | 'vzCustomGreen2';

export type ColorVariations =
  | 'base'
  | 'darken010'
  | 'darken015'
  | 'darken020'
  | 'darken025'
  | 'darken030'
  | 'darken035'
  | 'darken040'
  | 'darken045'
  | 'darken050';

export type ColorSet = Record<ColorVariations, string>;

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
  }
  interface PaletteColor extends ColorSet {}
  interface SimplePaletteColorOptions extends ColorSet {}
}

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
