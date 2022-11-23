import React, { FunctionComponent } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { themes } from '../themes';

export type ThemeProviderProps = {
  theme: keyof typeof themes;
};

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children, theme }) => (
  <MuiThemeProvider theme={themes[theme]}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
