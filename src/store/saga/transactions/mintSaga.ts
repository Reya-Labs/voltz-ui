import { ContractTransaction, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';

import { MintAction } from '../../types';
import { deserializeAmm, getSigner } from '../../utilities';
import * as actions from '../../actions';

function* mintSaga(action: MintAction) {
  const signer: providers.JsonRpcSigner = yield getSigner();
  const amm = deserializeAmm(action.payload.amm, signer);

  if (!signer || !amm) {
    return;
  }

  const recipient: string = yield call([signer, 'getAddress']);
  const { id, fixedLow, fixedHigh, notional, margin } = action.payload.transaction;

  const result: ContractTransaction | void = yield call([amm, 'mint'], {
    recipient,
    fixedLow,
    fixedHigh,
    notional,
    margin,
  });

  if (!result) {
    yield put(actions.updateTransaction({ id, failedAt: DateTime.now().toISO() }));
  } else {
    yield put(
      actions.updateTransaction({ id, succeededAt: DateTime.now().toISO(), txid: result.hash }),
    );
  }
}

export default mintSaga;
