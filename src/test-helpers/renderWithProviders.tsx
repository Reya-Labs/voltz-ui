import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { initV1 } from '@voltz-protocol/v1-sdk';
import React, { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { AppStore, RootState, setupStore } from '../app';
import { getDefaultNetworkId } from '../components/interface/NetworkSelector/get-default-network-id';
import { getAlchemyKeyForNetwork } from '../utilities/get-alchemy-key-for-network';
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  initV1({
    network: getDefaultNetworkId(),
    alchemyApiKey: getAlchemyKeyForNetwork(getDefaultNetworkId()),
  });
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
