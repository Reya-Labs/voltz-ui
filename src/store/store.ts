import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), applyMiddleware(logger)),
);

sagaMiddleware.run(saga);

export default store;
