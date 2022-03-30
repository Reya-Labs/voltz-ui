import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), applyMiddleware(logger)),
);

sagaMiddleware.run(saga);

export default store;
