import { ContractReceipt, providers } from 'ethers';
import isUndefined from 'lodash.isundefined';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { SettlePositionAction } from '../../../../types';
import { updateTransaction } from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* settlePositionSaga(action: SettlePositionAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm || !amm.signer) {
    return;
  }

  const { id, fixedLow, fixedHigh } = action.payload.transaction;

  if (isUndefined(fixedLow) || isUndefined(fixedHigh)) {
    return;
  }

  let result: ContractReceipt | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'settlePosition'], {
      fixedLow: fixedLow,
      fixedHigh: fixedHigh,
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
    yield put(updateTransaction({ id, failedAt: DateTime.now().toISO(), failureMessage: 'error' }));
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
