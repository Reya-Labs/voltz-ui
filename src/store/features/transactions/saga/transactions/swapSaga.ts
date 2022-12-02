/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ContractReceipt, providers } from 'ethers';
import { DateTime } from 'luxon';
import { call, put } from 'redux-saga/effects';

import { Agents } from '../../../../../contexts/AgentContext/types';
import { getErrorMessage } from '../../../../../utilities/getErrorMessage';
import { getSentryTracker } from '../../../../../utilities/sentry';
import { SwapAction } from '../../../../types';
import * as actions from '../../actions';
import { deserializeAmm, getSigner } from '../../utilities';

function* swapSaga(action: SwapAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const { id, agent, notional, margin, fixedLow, fixedHigh, fullyCollateralisedVTSwap } =
    action.payload.transaction;

  let result: ContractReceipt | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'swap'], {
      isFT: agent === Agents.FIXED_TRADER,
      notional,
      margin,
      fixedLow: fixedLow ?? 1,
      fixedHigh: fixedHigh ?? 999,
      fullyCollateralisedVTSwap: fullyCollateralisedVTSwap,
    });
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

export default swapSaga;
