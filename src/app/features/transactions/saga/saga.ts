import { spawn } from 'redux-saga/effects';

import { transactionsSaga } from './transactions/transactionsSaga';

export function* saga() {
  yield spawn(transactionsSaga);
}
