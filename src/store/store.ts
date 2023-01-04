import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { aMMsReducer } from './features/aMMs';
import { lpOptimisersReducer } from './features/lp-optimisers';
import { transactionsReducer } from './features/transactions/reducer/transactions/transactionsReducer';
import { saga } from './features/transactions/saga/saga';

const reducer = combineReducers({
  transactions: transactionsReducer,
  lpOptimisers: lpOptimisersReducer,
  aMMs: aMMsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
