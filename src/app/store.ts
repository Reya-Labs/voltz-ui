import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { alphaPassClaimFlowReducer } from './features/alpha-pass-claim-flow';
import { alphaPassVerificationFlowReducer } from './features/alpha-pass-verification-flow';
import { aMMsReducer } from './features/aMMs';
import { cashflowCalculatorReducer } from './features/cashflow-calculator';
import { depositFlowReducer } from './features/deposit-flow';
import { deprecatedCashflowCalculatorReducer } from './features/deprecated/cashflow-calculator';
import { lpFormReducer } from './features/forms/lps/lp';
import { rolloverLpFormReducer } from './features/forms/lps/rollover-lp';
import { deprecatedSwapFormReducer } from './features/forms/trader/deprecated/swap';
import { rolloverSwapFormReducer } from './features/forms/trader/rollover-swap';
import { swapFormReducer } from './features/forms/trader/swap';
import { historicalRatesReducer } from './features/historical-rates';
import { lpOptimisersReducer } from './features/lp-optimisers';
import { marginAccountsForSwapLpReducer } from './features/margin-accounts-for-swap-lp';
import { networkReducer } from './features/network';
import { portfolioReducer } from './features/portfolio';
import { positionDetailsReducer } from './features/position-details';
import { redirectsReducer } from './features/redirects';
import { settleFlowReducer } from './features/settle-flow';
import { tradingLeagueReducer } from './features/trading-league';
import { voyageReducer } from './features/voyage';

const rootReducer = combineReducers({
  lpOptimisers: lpOptimisersReducer,
  aMMs: aMMsReducer,
  network: networkReducer,
  deprecatedSwapForm: deprecatedSwapFormReducer,
  swapForm: swapFormReducer,
  historicalRates: historicalRatesReducer,
  tradingLeague: tradingLeagueReducer,
  lpForm: lpFormReducer,
  deprecatedCashflowCalculator: deprecatedCashflowCalculatorReducer,
  cashflowCalculator: cashflowCalculatorReducer,
  rolloverSwapForm: rolloverSwapFormReducer,
  settleFlow: settleFlowReducer,
  rolloverLpForm: rolloverLpFormReducer,
  voyage: voyageReducer,
  portfolio: portfolioReducer,
  positionDetails: positionDetailsReducer,
  redirects: redirectsReducer,
  alphaPassClaimFlow: alphaPassClaimFlowReducer,
  alphaPassVerificationFlow: alphaPassVerificationFlowReducer,
  depositFlow: depositFlowReducer,
  marginAccountsForSwapLp: marginAccountsForSwapLpReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(logger),
    preloadedState,
  });
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
