import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { aMMsReducer } from './features/aMMs';
import { historicalRatesReducer } from './features/historical-rates';
import { lpOptimisersReducer } from './features/lp-optimisers';
import { networkReducer } from './features/network';
import { swapFormReducer } from './features/swap-form';
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
});

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger).concat(sagaMiddleware),
    preloadedState,
  });
  sagaMiddleware.run(saga);
  return store;
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
