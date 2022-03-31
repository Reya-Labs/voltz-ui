import { ContractTransaction, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';

import { MintAction } from '../../types';
import { deserializeAmm, getMessageError, getSigner } from '../../utilities';
import * as actions from '../../actions';

function* mintSaga(action: MintAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const { id, fixedLow, fixedHigh, notional, margin } = action.payload.transaction;

  if (!fixedLow || !fixedHigh) {
    return;
  }

  let result: ContractTransaction | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'mint'], {
      fixedLow,
      fixedHigh,
      notional,
      margin,
    });
  } catch (error) {
    yield put(
      actions.updateTransaction({
        id,
        failedAt: DateTime.now().toISO(),
        failureMessage: getMessageError(error),
      }),
    );

    return;
  }

  if (!result) {
    yield put(
      actions.updateTransaction({ id, failedAt: DateTime.now().toISO(), failureMessage: 'error' }),
    );
  } else {
    yield put(
      actions.updateTransaction({ id, succeededAt: DateTime.now().toISO(), txid: result.hash }),
    );
  }
}

export default mintSaga;
