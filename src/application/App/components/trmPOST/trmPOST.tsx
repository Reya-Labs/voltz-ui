import { useWallet } from '@hooks';
import React from 'react';

// const TrmPOST: React.FunctionComponent = () => {

// 	const wallet = useWallet();
// 	async function postWalletData() {
// 			const result = await fetch('https://api.trmlabs.com/public/v2/screening/addresses', {
// 					method: 'POST',
// 					mode: 'no-cors',
// 					headers: { 
// 							'Accept': 'application/json',
// 							'Content-type': 'application/json',
// 							Authorization: 'Basic ' + Buffer.from('bf651cf7-a699-483c-9fab-93aedd74536c:bf651cf7-a699-483c-9fab-93aedd74536c').toString('base64')
// 							},
// 							body: JSON.stringify({
// 									walletAddress: wallet.connect, })
// 				});

// 		const data = await result.json();
// 		console.log(data)
			
// 		}
// 		postWalletData();

// }
// export default TrmPOST;