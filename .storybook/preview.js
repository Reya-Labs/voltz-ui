import React from 'react';
import { addDecorator } from '@storybook/react';

import { Background, ThemeProvider } from '@theme';

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
    <Background sx={{ paddingRight: 2 }}>{story()}</Background>
  </ThemeProvider>
));
