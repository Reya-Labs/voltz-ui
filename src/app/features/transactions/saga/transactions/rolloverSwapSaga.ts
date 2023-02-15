import { AMMRolloverWithSwapArgs, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put, select } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { RolloverSwapAction } from '../../../../types';
import { selectChainId } from '../../../network';
import { updateTransactionAction } from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* rolloverSwapSaga(action: RolloverSwapAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();
  const chainId = (yield select(selectChainId)) as SupportedChainId;

  if (!signer || !chainId) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer, chainId);

  const { id, isFT, notional, margin, newMarginEngine, rolloverPosition } =
    action.payload.transaction;

  try {
    const args: AMMRolloverWithSwapArgs = {
      fixedLow: 1,
      fixedHigh: 999,
      isFT,
      notional,
      margin,
      newMarginEngine,
      rolloverPosition,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: ContractReceipt = yield call([amm, 'rolloverWithSwap'], args);

    yield put(
      updateTransactionAction({
        id,
        succeededAt: DateTime.now().toISO(),
        txid: result.transactionHash,
      }),
    );
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
}
