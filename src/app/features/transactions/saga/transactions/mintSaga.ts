import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { MintAction } from '../../../../types';
import { updateTransactionAction } from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* mintSaga(action: MintAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();

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
    getSentryTracker().captureException(error);
    yield put(
      updateTransactionAction({
        id,
        failedAt: DateTime.now().toISO(),
        failureMessage: getErrorMessage(error),
      }),
    );

    return;
  }

  if (!result) {
    yield put(
      updateTransactionAction({ id, failedAt: DateTime.now().toISO(), failureMessage: 'error' }),
    );
  } else {
    yield put(
      updateTransactionAction({
        id,
        succeededAt: DateTime.now().toISO(),
        txid: result.transactionHash,
      }),
    );
  }
}
