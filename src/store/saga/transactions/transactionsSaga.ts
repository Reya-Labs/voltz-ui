import { takeLatest } from 'redux-saga/effects';

import mintSaga from './mintSaga';
import settlePositionSaga from './settlePositionSaga';
import swapSaga from './swapSaga';
import updatePositionMarginSaga from './updatePositionMarginSaga';
import fcmSwapSaga from './fcmSwapSaga';

function* transactionsSaga() {
  yield takeLatest('mint', mintSaga);
  yield takeLatest('swap', swapSaga);
  yield takeLatest('updatePositionMargin', updatePositionMarginSaga);
  yield takeLatest('settlePosition', settlePositionSaga);
  yield takeLatest('fcmSwap', fcmSwapSaga);
}

export default transactionsSaga;
