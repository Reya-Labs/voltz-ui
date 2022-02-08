import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './fonts/PixelOperator/PixelOperatorMono8.ttf';
import './fonts/PixelOperator/PixelOperatorMono8-Bold.ttf';
import './fonts/PixelOperator/PixelOperatorMono.ttf';
import './fonts/PixelOperator/PixelOperatorMono-Bold.ttf';
import './fonts/DM_Sans/DMSans-Bold.ttf';
import './fonts/DM_Sans/DMSans-BoldItalic.ttf';
import './fonts/DM_Sans/DMSans-Italic.ttf';
import './fonts/DM_Sans/DMSans-Medium.ttf';
import './fonts/DM_Sans/DMSans-MediumItalic.ttf';
import './fonts/DM_Sans/DMSans-Regular.ttf';
import './index.css';
import { ThemeProvider } from './theme';
import { WalletProvider } from './components';
import { App } from './application';
import reportWebVitals from './reportWebVitals';
import awsExports from './aws-exports';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <WalletProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
Amplify.configure(awsExports);
