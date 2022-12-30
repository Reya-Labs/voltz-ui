import { AMMRolloverWithMintArgs } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { RolloverMintAction } from '../../../../types';
import * as actions from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

export function* rolloverMintSaga(action: RolloverMintAction) {
  const signer: providers.JsonRpcSigner | null = getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const {
    id,
    fixedLow,
    fixedHigh,
    notional,
    margin,
    marginEth,
    newMarginEngine,
    oldFixedHigh,
    oldFixedLow,
  } = action.payload.transaction;
  if (!fixedLow || !fixedHigh) {
    return;
  }

  let result: ContractReceipt | void;
  try {
    const args: AMMRolloverWithMintArgs = {
      fixedLow,
      fixedHigh,
      notional,
      margin,
      marginEth,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      owner: yield call([signer, 'getAddress']),
      newMarginEngine,
      oldFixedLow: oldFixedLow,
      oldFixedHigh: oldFixedHigh,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'rolloverWithMint'], args);
  } catch (error) {
    getSentryTracker().captureException(error);
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
