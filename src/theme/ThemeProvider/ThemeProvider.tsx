import React, { FunctionComponent, SetStateAction } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useStateMemo } from '@hooks';
import { Themes, themes } from '../themes';

export const ThemeContext = React.createContext((_themeName: SetStateAction<Themes>): void => {});

export type ThemeProviderProps = {
  theme?: Themes;
};

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  theme: defaultThemeName,
}) => {
  const [themeName, _setThemeName] = useStateMemo(defaultThemeName || Themes.DARK);
  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={_setThemeName}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; //
