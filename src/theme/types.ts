export type BaseColors =
  | 'liberty'
  | 'liberty1'
  | 'liberty2'
  | 'liberty3'
  | 'liberty4'
  | 'liberty5'
  | 'liberty6'
  | 'liberty7'
  | 'liberty8'
  | 'lavenderWeb'
  | 'lavenderWeb1'
  | 'lavenderWeb2'
  | 'lavenderWeb3'
  | 'lavenderWeb4'
  | 'lavenderWeb5'
  | 'lavenderWeb6'
  | 'lavenderWeb7'
  | 'lavenderWeb8'
  | 'wildStrawberry'
  | 'wildStrawberry1'
  | 'wildStrawberry2'
  | 'wildStrawberry3'
  | 'wildStrawberry4'
  | 'wildStrawberry5'
  | 'wildStrawberry6'
  | 'wildStrawberry7'
  | 'wildStrawberry8'
  | 'orangeYellow'
  | 'orangeYellow1'
  | 'orangeYellow2'
  | 'orangeYellow3'
  | 'orangeYellow4'
  | 'orangeYellow5'
  | 'orangeYellow6'
  | 'orangeYellow7'
  | 'orangeYellow8'
  | 'skyBlueCrayola'
  | 'skyBlueCrayola1'
  | 'skyBlueCrayola2'
  | 'skyBlueCrayola3'
  | 'skyBlueCrayola4'
  | 'skyBlueCrayola5'
  | 'skyBlueCrayola6'
  | 'skyBlueCrayola7'
  | 'skyBlueCrayola8'
  | 'ultramarineBlue'
  | 'ultramarineBlue1'
  | 'ultramarineBlue2'
  | 'ultramarineBlue3'
  | 'ultramarineBlue4'
  | 'ultramarineBlue5'
  | 'ultramarineBlue6'
  | 'ultramarineBlue7'
  | 'ultramarineBlue8';

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
