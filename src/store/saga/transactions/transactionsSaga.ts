import { takeLatest } from 'redux-saga/effects';

import mintSaga from './mintSaga';
import swapSaga from './swapSaga';
import updatePositionMarginSaga from './updatePositionMarginSaga';

function* transactionsSaga() {
  yield takeLatest('mint', mintSaga);
  yield takeLatest('swap', swapSaga);
  yield takeLatest('updatePositionMargin', updatePositionMarginSaga);
}

export default transactionsSaga;
