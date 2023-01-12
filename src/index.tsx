import './fonts/PixelOperator/PixelOperatorMono8.woff';
import './fonts/PixelOperator/PixelOperatorMono8-Bold.woff';
import './fonts/PixelOperator/PixelOperatorMono.woff';
import './fonts/PixelOperator/PixelOperatorMono-Bold.woff';
import './fonts/DM_Sans/DMSans-Bold.woff';
import './fonts/DM_Sans/DMSans-BoldItalic.woff';
import './fonts/DM_Sans/DMSans-Italic.woff';
import './fonts/DM_Sans/DMSans-Medium.woff';
import './fonts/DM_Sans/DMSans-MediumItalic.woff';
import './fonts/DM_Sans/DMSans-Regular.woff';
import './index.css';

import { init as initSDK } from '@voltz-protocol/v1-sdk';
import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './app';
import { AppRoutes } from './AppRoutes';
import { AgentProvider } from './contexts/AgentContext/AgentProvider';
import { AMMsProvider } from './contexts/AMMsContext/AMMsContext';
import { WalletProvider } from './contexts/WalletContext/WalletProvider';
import { VoltzGraphProvider } from './graphql';
import { ThemeProvider } from './theme/ThemeProvider/ThemeProvider';
import { initSentryTracker } from './utilities/sentry';

try {
  if (process.env.CI_BUILD !== 'true' && process.env.NODE_ENV !== 'development') {
    Amplify.configure(require('./aws-exports'));
  }
} catch (_) {}

initSDK();
initSentryTracker();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme="dark">
      <ReduxProvider store={store}>
        <VoltzGraphProvider>
          <WalletProvider>
            <AgentProvider>
              <HashRouter>
                <AMMsProvider>
                  <AppRoutes />
                </AMMsProvider>
              </HashRouter>
            </AgentProvider>
          </WalletProvider>
        </VoltzGraphProvider>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
