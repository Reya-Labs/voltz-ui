import React, { FunctionComponent, useState, SetStateAction } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { Themes, themes } from '../themes';

export const ThemeContext = React.createContext((_themeName: SetStateAction<Themes>): void => {});

const ThemeProvider: FunctionComponent = ({ children }) => {
  const [themeName, _setThemeName] = useState(Themes.DARK);
  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={_setThemeName}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
