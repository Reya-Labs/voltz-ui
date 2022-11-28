import React from 'react';
import { addDecorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '../src/theme/ThemeProvider/ThemeProvider';

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
  <ThemeProvider theme="dark">
    <div style={{ background: '#383545', height: '100vh', padding: 32 }}>
      <BrowserRouter>{story()}</BrowserRouter>
    </div>
  </ThemeProvider>
));
