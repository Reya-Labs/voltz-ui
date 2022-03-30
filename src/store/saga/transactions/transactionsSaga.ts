import { takeLatest } from 'redux-saga/effects';

import mintSaga from './mintSaga';
import swapSaga from './swapSaga';

function* transactionsSaga() {
  yield takeLatest('mint', mintSaga);
  yield takeLatest('swap', swapSaga);
}

export default transactionsSaga;
