import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
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
import { VoltzGraphProvider } from './graphql';
import { ThemeProvider } from './theme';
import { AgentProvider, WalletProvider } from './components';
import { App } from './application';
import reportWebVitals from './reportWebVitals';

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
      <VoltzGraphProvider>
        <WalletProvider>
          <AgentProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </AgentProvider>
        </WalletProvider>
      </VoltzGraphProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
