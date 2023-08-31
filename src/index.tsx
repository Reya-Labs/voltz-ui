// eslint-disable-next-line no-restricted-imports
import 'brokoli-ui/dist/esm/index.css';
import 'normalize.css';

import { init as initSDKV1Stateless } from '@voltz-protocol/sdk-v1-stateless';
import { init } from '@voltz-protocol/v1-sdk';
import { Amplify } from 'aws-amplify';
import { GlobalScrollbarStyle, Notifications } from 'brokoli-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './app';
import { AppRoutes } from './AppRoutes';
import { WalletProvider } from './contexts/WalletContext/WalletProvider';
import { initSentryTracker } from './utilities/sentry';

try {
  if (process.env.CI_BUILD !== 'true' && process.env.NODE_ENV !== 'development') {
    Amplify.configure(require('./aws-exports'));
  }
} catch (_) {}

init();
initSDKV1Stateless();
initSentryTracker();

ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <GlobalScrollbarStyle />
    <ReduxProvider store={store}>
      <WalletProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </WalletProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
