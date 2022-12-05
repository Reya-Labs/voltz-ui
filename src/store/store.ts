import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { ecosystemReducer } from './features/ecosystem';
import { transactionsReducer } from './features/transactions/reducer/transactions/transactionsReducer';
import { saga } from './features/transactions/saga/saga';

const reducer = combineReducers({
  transactions: transactionsReducer,
  ecosystem: ecosystemReducer,
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
