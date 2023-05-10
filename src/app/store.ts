import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { aMMsReducer } from './features/aMMs';
import { cashflowCalculatorReducer } from './features/cashflow-calculator';
import { lpFormReducer } from './features/forms/lp-form';
import { rolloverSwapFormReducer } from './features/forms/trader/rollover-swap-form';
import { swapFormReducer } from './features/forms/trader/swap-form';
import { historicalRatesReducer } from './features/historical-rates';
import { lpOptimisersReducer } from './features/lp-optimisers';
import { networkReducer } from './features/network';
import { settleFlowReducer } from './features/settle-flow';
import { tradingLeagueReducer } from './features/trading-league';
import { saga, transactionsReducer } from './features/transactions';

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  lpOptimisers: lpOptimisersReducer,
  aMMs: aMMsReducer,
  network: networkReducer,
  swapForm: swapFormReducer,
  historicalRates: historicalRatesReducer,
  tradingLeague: tradingLeagueReducer,
  lpForm: lpFormReducer,
  cashflowCalculator: cashflowCalculatorReducer,
  rolloverSwapForm: rolloverSwapFormReducer,
  settleFlow: settleFlowReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(logger)
        .concat(sagaMiddleware),
    preloadedState,
  });
  sagaMiddleware.run(saga);
  return store;
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
