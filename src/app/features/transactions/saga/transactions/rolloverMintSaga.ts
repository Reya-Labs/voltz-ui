import { AMMRolloverWithMintArgs } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { RolloverMintAction } from '../../../../types';
import { updateTransactionAction } from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* rolloverMintSaga(action: RolloverMintAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  const { id, fixedLow, fixedHigh, notional, margin, newMarginEngine, rolloverPosition } =
    action.payload.transaction;

  if (!fixedLow || !fixedHigh) {
    return;
  }

  try {
    const args: AMMRolloverWithMintArgs = {
      fixedLow,
      fixedHigh,
      notional,
      margin,
      newMarginEngine,
      rolloverPosition,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: ContractReceipt = yield call([amm, 'rolloverWithMint'], args);

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
