import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Amplify from 'aws-amplify';

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
import store from './store';
import { VoltzGraphProvider } from './graphql';
import { ThemeProvider } from './theme';
import { AgentProvider, WalletProvider } from './contexts';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AMMsProvider from './contexts/AMMsContext/AMMsContext';

// the root of the react app 

try {
  if (process.env.NODE_ENV !== 'development') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const awsExports = require('./aws-exports');

    Amplify.configure(awsExports);
  }
} catch (_error) {}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ReduxProvider store={store}>
        <VoltzGraphProvider>
          <WalletProvider>
            <AgentProvider>
              <HashRouter>
                <AMMsProvider>
                  <App />
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

reportWebVitals();
