import chroma from 'chroma-js';
import { createTheme } from '@mui/material/styles';

import colors from '../colors';
import { Agents } from '../types';

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: colors.vzPurpleLight,
      main: colors.vzGreyDarkish,
    },
    error: {
      main: colors.vzPink,
      dark: colors.vzRedDark,
    },
    warning: {
      main: colors.vzGoldLight,
      dark: colors.vzYellowDark,
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
});

export default dark;
