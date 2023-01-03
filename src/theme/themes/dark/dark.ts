import { createTheme } from '@mui/material/styles';

import { colors } from '../../colors';

const dark = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      light: colors.skyBlueCrayola,
      main: colors.skyBlueCrayola3,
      dark: colors.skyBlueCrayola7,
    },
    secondary: {
      light: colors.lavenderWeb,
      main: colors.lavenderWeb3,
      dark: colors.lavenderWeb7,
    },
    error: {
      light: colors.wildStrawberry,
      main: colors.wildStrawberry,
      dark: colors.wildStrawberry3,
    },
    warning: {
      light: colors.orangeYellow,
      main: colors.orangeYellow3,
      dark: colors.orangeYellow7,
    },
    background: {
      default: colors.lavenderWeb8,
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
              return colors.lavenderWeb6;
            }

            if (ownerState.error) {
              return colors.wildStrawberry;
            }

            return colors.lavenderWeb1;
          };
          const borderColor = () => {
            if (ownerState.disabled) {
              return 'transparent';
            }

            if (ownerState.error) {
              return colors.wildStrawberry1;
            }

            return colors.lavenderWeb6;
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
            backgroundColor: colors.lavenderWeb7,
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
          color: colors.lavenderWeb1,
          position: 'static',
          textTransform: 'uppercase',
          transform: 'none',
          overflow: 'visible',

          '&.Mui-focused': {
            color: colors.lavenderWeb1,
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
          backgroundColor: colors.lavenderWeb4,
          opacity: 1,
          border: 0,
          borderRadius: 0,
        },
        track: {
          backgroundColor: colors.lavenderWeb4,
          opacity: 1,
          border: 0,
          borderRadius: 0,
        },
        thumb: ({ ownerState }) => ({
          height: '16px',
          width: '4px',
          borderRadius: '0',
          background: ownerState.disabled ? colors.lavenderWeb2 : colors.lavenderWeb,
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
          background: ownerState.disabled ? colors.lavenderWeb2 : colors.lavenderWeb,
        }),
        markLabel: ({ ownerState }) => ({
          color: ownerState.disabled ? colors.lavenderWeb1 : undefined,
          fontSize: '10px',
          top: '24px',
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: colors.lavenderWeb8,
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
          backgroundColor: colors.lavenderWeb8,
          border: `1px solid ${colors.lavenderWeb5}`,
          padding: '0',
          borderRadius: '4px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: () => ({
          fontFamily: 'PixelOperatorMono',
          fontSize: '16px',
          lineHeight: '14px',
          padding: '8px 14px',
          borderBottom: `1px solid ${colors.lavenderWeb7}`,

          '&:last-child': {
            borderBottom: 'none',
          },

          '&:hover': {
            background: colors.lavenderWeb7,
          },

          '&.Mui-selected': {
            background: colors.lavenderWeb5,
            '&:hover': {
              background: colors.lavenderWeb5,
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
      color: colors.lavenderWeb,
    },
    h2: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '120%',
      color: colors.lavenderWeb,
    },
    h3: {
      fontFamily: 'DM Sans',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '120%',
      color: colors.lavenderWeb,
    },
    h4: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '130%',
      color: colors.lavenderWeb,
    },
    h5: {
      fontFamily: 'DM Sans',
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '130%',
      color: colors.lavenderWeb,
    },
    h6: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: '130%',
      color: colors.lavenderWeb,
    },
    subtitle1: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '140%',
      color: colors.lavenderWeb,
    },
    subtitle2: {
      fontFamily: 'DM Sans',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '160%',
      color: colors.lavenderWeb,
    },
    body1: {
      fontFamily: 'DM Sans',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '160%',
      color: colors.lavenderWeb,
    },
    body2: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '160%',
      color: colors.lavenderWeb,
    },
    caption: {
      fontFamily: 'PixelOperatorMono',
      fontWeight: 'normal',
      fontSize: 12,
      lineHeight: '100%',
      color: colors.lavenderWeb,
    },
  },
});

export default dark;
