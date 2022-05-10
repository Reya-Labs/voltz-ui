/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Transaction } from '../types';

async function postTransactionData(
    accountExternalId: string,
    asset: string,
    assetAmount: string,
    destinationAddress: string,
    externalId: string,
    onchainReference: string,
    timestamp: string,
    transferType: string) {

    const response = await fetch(`https://api.trmlabs.com/public/v2/tm/transfers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(process.env.REACT_APP_TRM_API_KEY || '')
        },
        body: JSON.stringify({
            accountExternalId: accountExternalId,   //'Client1234', // what do we put for this?                                                | wallet address
            asset: asset,                           //'btc', //aUSDC, cUSDC, uUSDC?                                                            | amm.rateOracle.token.name
            assetAmount: assetAmount,               //'0.03506012',                                                                            | margin
            chain: 'ethereum',                          // for now this is going to be the case for all txs                                    | predefined 
            destinationAddress: destinationAddress, //'1LBVuSig83hEBzEuvf7KPyB6dYvAQdfBXQ',                                                    | marginEngineAddress for all operations except fcm (fcm contract address for these)
            externalId: externalId,                 //'a614a6b3-75b2-4a75-bb4b-5f4801b2ebdc', // unique transfer ID which can't be the tx hash | transaction.id 
            fiatCurrency: 'USD',                    // this has to be USD                                                                      | predefined
            fiatValue: null,                   //'13124.53', // value of tx in fiat USD, could be null                                    | null
            onchainReference: onchainReference,     //'35150e9824c7536ed694ba4e96046c0417047cc25690880b3274d65dfbdf4d09',                      | txid (hash)
            timestamp: timestamp,                   //'2021-03-14T20:21:00.000Z', // need this in ISO-8601 UTC datetime.                       | succeededAt 
            transferType: transferType              //'CRYPTO_WITHDRAWAL' // this will depend on the type of transaction users do.             | deposit is for: fcmSwap, swap and positive margin update and withdrawal is for: fcmUnwind, fcmSettlement, negative margin update
        })
    }
    );
    const data = await response.json();
    // eslint-disable-next-line
    console.log(data);
}

export default postTransactionData;