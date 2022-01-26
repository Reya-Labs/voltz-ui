import { createTheme } from '@mui/material/styles';

import colors from '../colors';
import { Agents } from '../types';

const dark = createTheme({
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
  },
  typography: {
    h1: {
      fontFamily: 'PixelOperatorMono8',
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: '160%',
      color: colors.lavenderWeb.base,
    },
    h2: {
      fontFamily: 'PixelOperatorMono8',
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: '160%',
      color: colors.lavenderWeb.base,
    },
  },
});

export default dark;
