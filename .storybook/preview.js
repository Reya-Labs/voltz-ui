import React from 'react';
import { addDecorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { themes } from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};

addDecorator((story) => (
  <ThemeProvider theme={themes.dark}>
    <div style={{ background: '#383545', minHeight: '100vh', padding: 32 }}>
      <BrowserRouter>{story()}</BrowserRouter>
    </div>
  </ThemeProvider>
));
