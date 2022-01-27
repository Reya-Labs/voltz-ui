import { createTheme } from '@mui/material/styles';

import colors from '../../colors';
import { Agents } from '../../types';

const dark = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      light: colors.lavenderWeb.base,
      main: colors.vzGreyDarkish,
    },
    error: {
      main: colors.wildStrawberry.base,
      dark: colors.wildStrawberry.darken040,
    },
    warning: {
      main: colors.vzGoldLight,
      dark: colors.vzYellowDark,
    },
    background: {
      default: colors.vzGreyDarker,
    },
  },
  agent: {
    [Agents.FIXED_TRADER]: {
      light: colors.vzBlueGreenLight,
      dark: colors.vzBlueGreenDark,
    },
    [Agents.VARIABLE_TRADER]: {
      light: colors.vzGoldLight,
      dark: colors.vzGoldDark,
    },
    [Agents.LIQUIDITY_PROVIDER]: {
      light: colors.vzBlueGreenLight,
      dark: colors.vzBlueGreenDark,
    },
  },
  components: {
    MuiButtonBase: {
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
