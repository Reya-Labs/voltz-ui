import { takeLatest } from 'redux-saga/effects';

import mintSaga from './mintSaga';
import settlePositionSaga from './settlePositionSaga';
import swapSaga from './swapSaga';
import updatePositionMarginSaga from './updatePositionMarginSaga';
import burnSaga from './burnSaga';
import rolloverMintSaga from './rolloverMintSaga';
import rolloverSwapSaga from './rolloverSwapSaga';
import borrowSaga from './borrowSaga';

function* transactionsSaga() {
  yield takeLatest('mint', mintSaga);
  yield takeLatest('swap', swapSaga);
  yield takeLatest('updatePositionMargin', updatePositionMarginSaga);
  yield takeLatest('settlePosition', settlePositionSaga);
  yield takeLatest('burn', burnSaga);
  yield takeLatest('rolloverMint', rolloverMintSaga);
  yield takeLatest('rolloverSwap', rolloverSwapSaga);
  yield takeLatest('borrow', borrowSaga);
}

export default transactionsSaga;
