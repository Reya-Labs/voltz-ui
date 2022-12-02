import { ContractReceipt, providers } from 'ethers';
import isUndefined from 'lodash/isUndefined';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { sentryTracker } from '../../../../../utilities/sentry';
import { SettlePositionAction } from '../../../../types';
import * as actions from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

function* settlePositionSaga(action: SettlePositionAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm || !amm.signer) {
    return;
  }

  const { id, fixedLow, fixedHigh, source } = action.payload.transaction;

  if (isUndefined(fixedLow) || isUndefined(fixedHigh) || isUndefined(source)) {
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

export default settlePositionSaga;
