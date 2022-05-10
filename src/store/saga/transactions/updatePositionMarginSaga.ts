import { ContractReceipt, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';
import { getErrorMessage } from '@utilities';
import { UpdatePositionMarginAction } from '../../types';
import { deserializeAmm, getSigner, postTransactionData, serializeAmm } from '../../utilities';
import * as actions from '../../actions';
import { isUndefined } from 'lodash';

function* updatePositionMarginSaga(action: UpdatePositionMarginAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const signer: providers.JsonRpcSigner | null = yield getSigner();

  if (!signer) {
    return;
  }

  const amm = deserializeAmm(action.payload.amm, signer);

  if (!amm) {
    return;
  }

  const { id, margin, fixedLow, fixedHigh } = action.payload.transaction;
  const ammInformation = serializeAmm(amm)
  if (isUndefined(fixedLow) || isUndefined(fixedHigh)) {
    return;
  }

  let result: ContractReceipt | void;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = yield call(
      [amm, "updatePositionMargin"], {
      marginDelta: margin,
      fixedLow: fixedLow || 1,
      fixedHigh: fixedHigh || 2.01,
    });

    //  CALLING API FOR TX MONITORING HERE
    if (margin > 0) {
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

    } else {
      if (amm.signer) {
        amm.signer.getAddress().then((signerAddress) => {
          if (result) {
            postTransactionData(
              signerAddress,
              ammInformation.rateOracle.token.name.toLowerCase(),
              margin.toString(),
              signerAddress, // destination address is the wallet user
              id,
              result.transactionHash,
              DateTime.now().toISO(),
              'CRYPTO_WITHDRAWAL'
            ).then()
          }
        })
      }

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

export default updatePositionMarginSaga;
