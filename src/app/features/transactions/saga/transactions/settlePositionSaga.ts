import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, providers } from 'ethers';
import isUndefined from 'lodash.isundefined';
import { DateTime } from 'luxon';
import { call, put, select } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { SettlePositionAction } from '../../../../types';
import { selectChainId } from '../../../network';
import { updateTransactionAction } from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* settlePositionSaga(action: SettlePositionAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();
  const chainId = (yield select(selectChainId)) as SupportedChainId;

  if (!signer || !chainId) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer, chainId);

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
