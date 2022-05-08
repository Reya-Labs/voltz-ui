/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ContractReceipt, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';

import { Agents } from '@components/contexts';
import { getErrorMessage } from '@utilities';
import { SwapAction } from '../../types';
import { deserializeAmm, getSigner, serializeAmm, postTransactionData } from '../../utilities'; // import the post trm api utility
import * as actions from '../../actions';
import { useWallet } from '@hooks';

function* swapSaga(action: SwapAction) { // function * means it is async function
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const { id, agent, notional, margin } = action.payload.transaction;
  const ammInformation = serializeAmm(amm)

  let result: ContractReceipt | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call([amm, 'swap'], {
      isFT: agent === Agents.FIXED_TRADER,
      notional,
      margin,
      fixedLow: 1,
      fixedHigh: 2.01,
    });

    //  CALLING API FOR TX MONITORING HERE
    if (amm.signer) {
      amm.signer.getAddress().then((signerAddress) => {
        if (result) {
          postTransactionData(
            signerAddress,
            ammInformation.rateOracle.token.name.toLowerCase(),
            margin.toString(),
            ammInformation.marginEngineAddress,
            id,
            result.transactionHash,
            DateTime.now().toISO(),
            'CRYPTO_DEPOSIT'
          ).then()
        }
      })
    }

  } catch (error) {
    yield put(
      actions.updateTransaction({
        id,
        failedAt: DateTime.now().toISO(),
        failureMessage: getErrorMessage(error)
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
      actions.updateTransaction({ id, succeededAt: DateTime.now().toISO(), txid: result.transactionHash }),
    );
  }
}

export default swapSaga;
