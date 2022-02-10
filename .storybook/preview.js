import React from 'react';
import { addDecorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Background } from '@components/atomic';
import { ThemeProvider } from '@theme';

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
  <ThemeProvider>
    <BrowserRouter>
      <Background sx={{ paddingRight: 2 }}>{story()}</Background>
    </BrowserRouter>
  </ThemeProvider>
));
