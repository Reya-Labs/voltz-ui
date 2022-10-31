import { createTheme } from '@mui/material/styles';

import colors from '../../colors';

// AB notes:
// this defines all the cokour overrides for different parts of the UI
// changes the colours for all of the UI
// the colours for agents: FT, VT and LP
// colours organised into themes, themes used in compoents and currently 1 theme
// also have a global context

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
      main: colors.wildStrawberry.base,
      darken025: colors.wildStrawberry.darken025,
      darken030: colors.wildStrawberry.darken030,
      darken035: colors.wildStrawberry.darken035,
      darken040: colors.wildStrawberry.darken040,
      dark: colors.wildStrawberry.darken020,
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
      default: colors.vzGreyDarker.base,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const fontSize = () => {
            if (ownerState.size === 'xs') return '14px';
            if (ownerState.size === 'vs') return '12px';
            if (ownerState.size === 'small') return '14px';
            return '18px';
          };
          const padding = () => {
            if (ownerState.size === 'large') return '16px 24px';
            if (ownerState.size === 'small') return '8px 10px';
            if (ownerState.size === 'vs') return '8px 10px';
            if (ownerState.size === 'xs') return '4px 8px';
            return '12px 18px';
          };

          return {
            fontFamily: 'PixelOperatorMono',
            fontSize: fontSize(),
            lineHeight: '14px',
            textTransform: 'uppercase',
            padding: padding(),
            minWidth: '0',
          };
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          cursor: ownerState.disabled ? 'not-allowed' : undefined,
        }),
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
        root: {
          width: '100%',
        },
        input: ({ ownerState, theme }) => {
          const color = () => {
            if (ownerState.disabled) {
              return colors.vzGreyDark.base;
            }

            if (ownerState.error) {
              return theme.palette.error.base;
            }

            return colors.vzGrey.base;
          };
          const borderColor = () => {
            if (ownerState.disabled) {
              return 'transparent';
            }

            if (ownerState.error) {
              return theme.palette.error.darken010;
            }

            return colors.vzGreyDark.base;
          };
          const padding = () => {
            if (ownerState.size === 'small') {
              return {
                padding: theme.spacing(1),
                paddingLeft: theme.spacing(2),
              };
            }

            return {
              padding: theme.spacing(4),
            };
          };

          return {
            fontFamily: 'PixelOperatorMono',
            backgroundColor: theme.palette.secondary.darken040,
            borderColor: borderColor(),
            borderRadius: theme.spacing(1),
            lineHeight: '14px',
            color: color(),
            minHeight: theme.spacing(8),
            fontSize: ownerState.size === 'small' ? 14 : 24,
            cursor: ownerState.disabled ? 'not-allowed' : undefined,
            ...padding(),
            '::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              '-moz-appearance': 'none',
              appearance: 'none',
            },
            '::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              '-moz-appearance': 'none',
              appearance: 'none',
            },
          };
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'PixelOperatorMono',
          fontSize: '12px',
          lineHeight: 1.2,
          marginBottom: '8px',
          color: colors.lavenderWeb.darken010,
          position: 'static',
          textTransform: 'uppercase',
          transform: 'none',
          overflow: 'visible',

          '&.Mui-focused': {
            color: colors.lavenderWeb.darken010,
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          marginBottom: '10px',
        },
        rail: {
          backgroundColor: colors.vzGreyDarkish.base,
          opacity: 1,
          border: 0,
          borderRadius: 0,
        },
        track: {
          backgroundColor: colors.vzGreyDarkish.base,
          opacity: 1,
          border: 0,
          borderRadius: 0,
        },
        thumb: ({ ownerState }) => ({
          height: '16px',
          width: '4px',
          borderRadius: '0',
          background: ownerState.disabled ? colors.lavenderWeb.darken015 : colors.lavenderWeb.base,
          '&:hover': {
            boxShadow: '0 0 0 8px rgba(229, 225, 249, 0.16)',
          },
          '&:active': {
            boxShadow: '0 0 0 12px rgba(229, 225, 249, 0.16)',
          },
        }),
        mark: ({ ownerState }) => ({
          height: '4px',
          width: '1px',
          borderRadius: '0',
          background: ownerState.disabled ? colors.lavenderWeb.darken015 : colors.lavenderWeb.base,
        }),
        markLabel: ({ ownerState }) => ({
          color: ownerState.disabled ? colors.vzGrey.base : undefined,
          fontSize: '10px',
          top: '24px',
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: colors.lavenderWeb.darken045,
          minHeight: 0,
          height: '14px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          marginTop: '8px',
        },
        list: {
          backgroundColor: colors.lavenderWeb.darken045,
          border: `1px solid ${colors.lavenderWeb.darken030}`,
          padding: '0',
          borderRadius: '4px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontFamily: 'PixelOperatorMono',
          fontSize: '16px',
          lineHeight: '14px',
          padding: '8px 14px',
          borderBottom: `1px solid ${colors.lavenderWeb.darken040}`,

          '&:last-child': {
            borderBottom: 'none',
          },

          '&:hover': {
            background: colors.lavenderWeb.darken040,
          },

          '&.Mui-selected': {
            background: colors.lavenderWeb.darken030,
            '&:hover': {
              background: colors.lavenderWeb.darken030,
            },
          },
        }),
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
    },
    h2: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '120%',
      color: colors.lavenderWeb.base,
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
    },
    subtitle1: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '140%',
      color: colors.lavenderWeb.base,
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
    },
    caption: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 12,
      lineHeight: '100%',
      color: colors.lavenderWeb.base,
    },
  },
});

export default dark;
