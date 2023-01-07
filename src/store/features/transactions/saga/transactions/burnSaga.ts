import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { BurnAction } from '../../../../types';
import { updateTransaction } from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* burnSaga(action: BurnAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const { id, fixedLow, fixedHigh, notional } = action.payload.transaction;
  if (!fixedLow || !fixedHigh || notional > 0) {
    return;
  }

  const burntNotional = -notional;

  let result: ContractReceipt | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'burn'], {
      fixedLow,
      fixedHigh,
      notional: burntNotional,
    });
  } catch (error) {
    getSentryTracker().captureException(error);
    yield put(
      updateTransaction({
        id,
        failedAt: DateTime.now().toISO(),
        failureMessage: getErrorMessage(error),
      }),
    );

    return;
  }

  if (!result) {
    yield put(
      updateTransaction({
        id,
        failedAt: DateTime.now().toISO(),
        failureMessage: 'error',
      }),
    );
  } else {
    yield put(
      updateTransaction({
        id,
        succeededAt: DateTime.now().toISO(),
        txid: result.transactionHash,
      }),
    );
  }
}
