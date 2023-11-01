import type { PreloadedState } from '@reduxjs/toolkit';
// eslint-disable-next-line no-restricted-imports,import/no-extraneous-dependencies
import { render as testingLibraryRender, RenderOptions } from '@testing-library/react';
import { init } from '@voltz-protocol/v1-sdk';
import { ThemeProvider } from 'brokoli-ui';
import React, { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { AppStore, RootState, setupStore } from '../app';
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries' | 'wrapper'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// eslint-disable-next-line import/export,no-restricted-imports,import/no-extraneous-dependencies
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  init();
  const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <HashRouter>
        <ReduxProvider store={store}>
          <ThemeProvider theme="voltz">{children}</ThemeProvider>
        </ReduxProvider>
      </HashRouter>
    );
  };
  return { store, ...testingLibraryRender(ui, { wrapper, ...renderOptions }) };
}
