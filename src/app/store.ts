import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { aMMsReducer } from './features/aMMs';
import { lpOptimisersReducer } from './features/lp-optimisers';
import { networkReducer } from './features/network';
import { statelessOptimisersReducer } from './features/stateless-optimisers';
import { saga, transactionsReducer } from './features/transactions';

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  lpOptimisers: lpOptimisersReducer,
  statelessOptimisers: statelessOptimisersReducer,
  aMMs: aMMsReducer,
  network: networkReducer,
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
