import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { FunctionComponent } from 'react';

import { themes } from '../themes';

export type ThemeProviderProps = {
  theme: keyof typeof themes;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children, theme }) => (
  <MuiThemeProvider theme={themes[theme]}>{children}</MuiThemeProvider>
);
