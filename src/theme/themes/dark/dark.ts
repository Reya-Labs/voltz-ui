import { createTheme } from '@mui/material/styles';

import colors from '../../colors';

const dark = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      base: colors.skyBlueCrayola.base,
      light: colors.skyBlueCrayola.base,
      darken010: colors.skyBlueCrayola.darken010,
      darken015: colors.skyBlueCrayola.darken015,
      darken020: colors.skyBlueCrayola.darken020,
      main: colors.skyBlueCrayola.darken020,
      darken025: colors.skyBlueCrayola.darken025,
      darken030: colors.skyBlueCrayola.darken030,
      darken035: colors.skyBlueCrayola.darken035,
      darken040: colors.skyBlueCrayola.darken040,
      dark: colors.skyBlueCrayola.darken040,
      darken045: colors.skyBlueCrayola.darken045,
      darken050: colors.skyBlueCrayola.darken050,
    },
    secondary: {
      base: colors.lavenderWeb.base,
      light: colors.lavenderWeb.base,
      darken010: colors.lavenderWeb.darken010,
      darken015: colors.lavenderWeb.darken015,
      darken020: colors.lavenderWeb.darken020,
      main: colors.lavenderWeb.darken020,
      darken025: colors.lavenderWeb.darken025,
      darken030: colors.lavenderWeb.darken030,
      darken035: colors.lavenderWeb.darken035,
      darken040: colors.lavenderWeb.darken040,
      dark: colors.lavenderWeb.darken040,
      darken045: colors.lavenderWeb.darken045,
      darken050: colors.lavenderWeb.darken050,
    },
    tertiary: {
      base: colors.ultramarineBlue.base,
      light: colors.ultramarineBlue.base,
      darken010: colors.ultramarineBlue.darken010,
      darken015: colors.ultramarineBlue.darken015,
      darken020: colors.ultramarineBlue.darken020,
      main: colors.ultramarineBlue.darken020,
      darken025: colors.ultramarineBlue.darken025,
      darken030: colors.ultramarineBlue.darken030,
      darken035: colors.ultramarineBlue.darken035,
      darken040: colors.ultramarineBlue.darken040,
      dark: colors.ultramarineBlue.darken040,
      darken045: colors.ultramarineBlue.darken045,
      darken050: colors.ultramarineBlue.darken050,
    },
    error: {
      base: colors.wildStrawberry.base,
      light: colors.wildStrawberry.base,
      darken010: colors.wildStrawberry.darken010,
      darken015: colors.wildStrawberry.darken015,
      darken020: colors.wildStrawberry.darken020,
      main: colors.wildStrawberry.darken020,
      darken025: colors.wildStrawberry.darken025,
      darken030: colors.wildStrawberry.darken030,
      darken035: colors.wildStrawberry.darken035,
      darken040: colors.wildStrawberry.darken040,
      dark: colors.wildStrawberry.darken040,
      darken045: colors.wildStrawberry.darken045,
      darken050: colors.wildStrawberry.darken050,
    },
    warning: {
      base: colors.orangeYellow.base,
      light: colors.orangeYellow.base,
      darken010: colors.orangeYellow.darken010,
      darken015: colors.orangeYellow.darken015,
      darken020: colors.orangeYellow.darken020,
      main: colors.orangeYellow.darken020,
      darken025: colors.orangeYellow.darken025,
      darken030: colors.orangeYellow.darken030,
      darken035: colors.orangeYellow.darken035,
      darken040: colors.orangeYellow.darken040,
      dark: colors.orangeYellow.darken040,
      darken045: colors.orangeYellow.darken045,
      darken050: colors.orangeYellow.darken050,
    },
    background: {
      default: colors.vzGreyDarker,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'PixelOperatorMono',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: ({ theme }) => ({
          fontFamily: 'PixelOperatorMono',
          fontSize: 14,
          lineHeight: '14px',
          padding: theme.spacing(2),
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: ({ ownerState, theme }) => {
          const color = () => {
            if (ownerState.disabled) {
              return colors.vzGreyDark;
            }

            if (ownerState.error) {
              return theme.palette.error.main;
            }

            return colors.vzGrey;
          };
          const borderColor = () => {
            if (ownerState.disabled) {
              return 'transparent';
            }

            if (ownerState.error) {
              return theme.palette.error.main;
            }

            return colors.vzGreyDark;
          };

          return {
            fontFamily: 'PixelOperatorMono',
            backgroundColor: colors.vzGreyDarkest,
            borderColor: borderColor(),
            color: color(),
          };
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'PixelOperatorMono',
          fontSize: 12,
          lineHeight: '14px',
          color: colors.lavenderWeb.darken010,
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: '160%',
      color: colors.lavenderWeb.base,
      marginLeft: -3,
    },
    h2: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '120%',
      color: colors.lavenderWeb.base,
      marginLeft: -2,
    },
    h3: {
      fontFamily: 'DM Sans',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '120%',
      color: colors.lavenderWeb.base,
    },
    h4: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '130%',
      color: colors.lavenderWeb.base,
      marginLeft: -2,
    },
    h5: {
      fontFamily: 'DM Sans',
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '130%',
      color: colors.lavenderWeb.base,
    },
    h6: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: '130%',
      color: colors.lavenderWeb.base,
      marginLeft: -1,
    },
    subtitle1: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '140%',
      color: colors.lavenderWeb.base,
      marginLeft: -1,
    },
    subtitle2: {
      fontFamily: 'DM Sans',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '160%',
      color: colors.lavenderWeb.base,
    },
    body1: {
      fontFamily: 'DM Sans',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '160%',
      color: colors.lavenderWeb.base,
    },
    body2: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '160%',
      color: colors.lavenderWeb.base,
      marginLeft: -1,
    },
  },
});

export default dark;
