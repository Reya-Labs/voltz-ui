import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { sentryTracker } from '../../../../../utilities/sentry';
import { MintAction } from '../../../../types';
import * as actions from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

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

  let result: ContractReceipt | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'mint'], {
      fixedLow,
      fixedHigh,
      notional,
      margin,
    });
  } catch (error) {
    sentryTracker.captureException(error);
    yield put(
      actions.updateTransaction({
        id,
        failedAt: DateTime.now().toISO(),
        failureMessage: getErrorMessage(error),
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
      actions.updateTransaction({
        id,
        succeededAt: DateTime.now().toISO(),
        txid: result.transactionHash,
      }),
    );
  }
}

export default mintSaga;
