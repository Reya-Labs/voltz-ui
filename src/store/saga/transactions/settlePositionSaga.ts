import { ContractReceipt, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';
import { getErrorMessage } from '@utilities';
import { SettlePositionAction } from '../../types';
import { deserializeAmm, getSigner, postTransactionData, serializeAmm } from '../../utilities';
import * as actions from '../../actions';
import { isUndefined } from 'lodash';

function* settlePositionSaga(action: SettlePositionAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);
  const ammInformation = serializeAmm(amm)

  if (!amm || !amm.signer) {
    return;
  }

  const { id, fixedLow, fixedHigh, source, margin } = action.payload.transaction;

  if (isUndefined(fixedLow) || isUndefined(fixedHigh) || isUndefined(source)) {
    return;
  }

  let result: ContractReceipt | void;
  try {
    if (source.includes("FCM")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = yield call([amm, "settleFCMTrader"]);
    }
    else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = yield call(
        [amm, "settlePosition"], {
        fixedLow: fixedLow,
        fixedHigh: fixedHigh,
      }
      );
    }

    //  CALLING API FOR TX MONITORING HERE
    if (amm.signer) {
      amm.signer.getAddress().then((signerAddress) => {
        if (result) {
          postTransactionData(
            signerAddress,
            ammInformation.rateOracle.token.name.toLowerCase(),
            margin.toString(),
            signerAddress, // Destination address is user wallet for settling positions
            id,
            result.transactionHash,
            DateTime.now().toISO(),
            'CRYPTO_WITHDRAWAL'
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

export default settlePositionSaga;
