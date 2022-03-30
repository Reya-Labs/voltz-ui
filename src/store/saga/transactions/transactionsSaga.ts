import { takeLatest } from 'redux-saga/effects';

import mintSaga from './mintSaga';

function* transactionsSaga() {
  yield takeLatest('mint', mintSaga);
}

export default transactionsSaga;
