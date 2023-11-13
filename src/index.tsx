// eslint-disable-next-line no-restricted-imports
import 'brokoli-ui/dist/esm/index.css';
import 'normalize.css';

import { init as initSDKV1Stateless } from '@voltz-protocol/sdk-v1-stateless';
import { init } from '@voltz-protocol/v1-sdk';
import { Amplify } from 'aws-amplify';
import { GlobalScrollbarStyle, Notifications, ThemeProvider } from 'brokoli-ui';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './app';
import { AppRoutes } from './AppRoutes';
import { WalletProvider } from './ui/contexts/WalletContext/WalletProvider';
import { initSentryTracker } from './utilities/sentry';

try {
  if (process.env.CI_BUILD !== 'true' && process.env.NODE_ENV !== 'development') {
    Amplify.configure(require('./aws-exports'));
  }
} catch (_) {}

init();
initSDKV1Stateless();
initSentryTracker();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <WalletProvider>
        <HashRouter>
          <ThemeProvider theme="voltz">
            <Notifications />
            <GlobalScrollbarStyle />
            <AppRoutes />
          </ThemeProvider>
        </HashRouter>
      </WalletProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
