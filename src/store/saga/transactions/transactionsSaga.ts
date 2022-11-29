import { takeLatest } from 'redux-saga/effects';

import borrowSaga from './borrowSaga';
import burnSaga from './burnSaga';
import mintSaga from './mintSaga';
import rolloverMintSaga from './rolloverMintSaga';
import rolloverSwapSaga from './rolloverSwapSaga';
import settlePositionSaga from './settlePositionSaga';
import swapSaga from './swapSaga';
import updatePositionMarginSaga from './updatePositionMarginSaga';

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
