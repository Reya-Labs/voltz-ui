import { spawn } from 'redux-saga/effects';

import transactionsSaga from './transactions';

function* saga() {
  yield spawn(transactionsSaga);
}

export default saga;
