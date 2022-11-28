import { ContractReceipt, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';

import { RolloverSwapAction } from '../../types';
import { deserializeAmm, getSigner } from '../../utilities';
import * as actions from '../../actions';
import { getErrorMessage } from '../../../utilities/getErrorMessage';

import { AMMRolloverWithSwapArgs } from '@voltz-protocol/v1-sdk';

function* rolloverSwapSaga(action: RolloverSwapAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const { id, fixedRateLimit, isFT, notional, margin, marginEth, newMarginEngine } =
    action.payload.transaction;

  let result: ContractReceipt | void;
  try {
    const args: AMMRolloverWithSwapArgs = {
      fixedLow: 1,
      fixedHigh: 999,
      fixedRateLimit,
      isFT,
      notional,
      margin,
      marginEth,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
      owner: yield call([signer, 'getAddress']),
      newMarginEngine,
      oldFixedLow: 1,
      oldFixedHigh: 999,
      validationOnly: !!process.env.REACT_APP_ROLLOVER_VALIDATE_ONLY,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'rolloverWithSwap'], args);
  } catch (error) {
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

export default rolloverSwapSaga;
