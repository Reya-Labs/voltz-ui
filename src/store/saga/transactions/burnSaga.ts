import { ContractReceipt, providers } from 'ethers';
import { call, put } from 'redux-saga/effects';
import { DateTime } from 'luxon';

import { BurnAction } from '../../types';
import { deserializeAmm, getSigner, postTransactionData, serializeAmm } from '../../utilities';
import * as actions from '../../actions';
import { getErrorMessage } from '@utilities';

function* burnSaga(action: BurnAction) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const signer: providers.JsonRpcSigner | null = yield getSigner();

    if (!signer) {
        return;
    }

    const amm = deserializeAmm(action.payload.amm, signer);

    if (!amm) {
        return;
    }

    const { id, fixedLow, fixedHigh, notional, margin } = action.payload.transaction;
    const ammInformation = serializeAmm(amm)
    if (!fixedLow || !fixedHigh || notional > 0) {
        return;
    }

    const burntNotional = -notional;

    let result: ContractReceipt | void;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result = yield call([amm, 'burn'], {
            fixedLow,
            fixedHigh,
            notional: burntNotional
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
                failureMessage: getErrorMessage(error),
            }),
        );

        return;
    }

    if (!result) {
        yield put(
            actions.updateTransaction({
                id,
                failedAt: DateTime.now().toISO(),
                failureMessage: 'error'
            }),
        );
    } else {
        yield put(
            actions.updateTransaction({
                id,
                succeededAt: DateTime.now().toISO(),
                txid: result.transactionHash
            }),
        );
    }
}

export default burnSaga;