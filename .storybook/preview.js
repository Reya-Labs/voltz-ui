import React from 'react';
import { addDecorator } from '@storybook/react';

import { ThemeProvider } from '@theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => <ThemeProvider>{story()}</ThemeProvider>);
