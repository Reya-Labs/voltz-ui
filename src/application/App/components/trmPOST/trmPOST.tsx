import { useWallet } from '@hooks';
import React, { useEffect } from 'react';

async function postWalletData(walletId: string) {
    const result = await fetch('https://api.trmlabs.com/public/v2/screening/addresses', {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    Authorization: 'Basic ' + btoa('<api key>:<api key>')
                    },
                    body: JSON.stringify([ {
                            address: walletId,
                            chain: 'ethereum' } ])
        });

        if(result.ok) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data = await result.json();
            // eslint-disable-next-line
            console.log(data);
         } else {
           const txt = await result.text();
           // eslint-disable-next-line
           console.log(txt);
         }
}

const TrmPOST: React.FunctionComponent = () => {

	const wallet = useWallet();

    useEffect( () => {
        if (wallet.account) {
            postWalletData(wallet.account)
        }    
    }, [wallet?.account]) // ? covers if wallet is not defined
return null; //if I don't want to render anything I have to return null

}

export default TrmPOST;

// when someone tries to connect, send their address to trm, check, allow connection if safe: correct way 
// when someone connects, let them connect but also check whether their address is sactioned: bad way 