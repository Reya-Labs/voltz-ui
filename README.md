# Installation

1. Run `yarn`
2. Ensure that you have a `.env` file in the `voltz-ui` directory with the following:

```
REACT_APP_SUBGRAPH_URL=<<URL OF LOCAL SUBGRAPH>>
REACT_APP_DEFAULT_PROVIDER_NETWORK=<<RPC ENDPOINT FOR BLOCKCHAIN>
REACT_APP_REQUIRED_ETHEREUM_NETWORK=<<ETHEREUM_NETWORK_NAME>>
REACT_APP_WALLETCONNECT_INFURA_ID=<<INFURA ID>>
REACT_APP_TOS_URL=https://www.voltz.xyz/t-cs
REACT_APP_TRM_API_KEY=<<TRM_API_KEY>>
```

Optional:
```
REACT_APP_SKIP_TOS_CHECK=Y
REACT_APP_SKIP_WALLET_SCREENING=Y
```

`REACT_APP_REQUIRED_ETHEREUM_NETWORK` is used by the app to check that the connected Metamask wallet is using the correct network. Use `homestead` for Ethereum Mainnet (live), or `kovan` for Kovan Testnet (dev).

`REACT_APP_WALLETCONNECT_INFURA_ID` is used by the app when attempting to use the WalletConnect wallet option. Sign up for an account at https://infura.io/ and then create a new project. The 'infura id' is the same as the 'project id' in the keys section.

`REACT_APP_TOS_URL` This is the URL displayed in the terms of service (TOS) message that users must agree to before they can connect their wallet to the app.

`REACT_APP_TRM_API_KEY` This key is used to get a risk assessment from TRM for a wallet that is being connected to the app. If you don't have an API key, you will need to disable wallet screening to able to use your wallet.

`REACT_APP_SKIP_TOS_CHECK` If this key exists, the app will not check that the user has agreed to the terms of service (TOS). It is intended to be used on dev/test environments.

`REACT_APP_SKIP_WALLET_SCREENING` If this key exists, the app will not check if the wallet is deemed risky (via TRM). It is intended to be used on dev/test environments.

`REACT_APP_WHITELIST` This key contains a subset of pools of all deployed pools. This subset should be visible in the production Voltz front-end. If you want to remove a pool from the production front-end remove it from this key, please. 
# Run

1. Run `yarn start`

## If SDK code changes

1. Run `yalc update @voltz/v1-sdk`
2. Remove `node_modules`
3. Run `yarn`
4. Run `yarn start`


(Or if you can find a way around the caching problem, stopping and starting `yarn start` should be sufficient)

# Terms & Conditions
The Voltz Protocol, and any products or services associated therewith, is offered only to persons (aged 18 years or older) or entities who are not residents of, citizens of, are incorporated in, owned or controlled by a person or entity in, located in, or have a registered office or principal place of business in any “Restricted Territory.”  

The term Restricted Territory includes the United States of America (including its territories), Algeria, Bangladesh, Bolivia, Belarus, Myanmar (Burma), Côte d’Ivoire (Ivory Coast), Egypt, Republic of  Crimea, Cuba, Democratic Republic of the Congo, Iran, Iraq, Liberia, Libya, Mali, Morocco, Nepal, North Korea, Oman, Qatar, Somalia, Sudan, Syria, Tunisia, Venezuela, Yemen, Zimbabwe; or any jurisdictions in which the sale of cryptocurrencies are prohibited, restricted or unauthorized in any form or manner whether in full or in part under the laws, regulatory requirements or rules in such jurisdiction; or any state, country, or region that is subject to sanctions enforced by the United States, such as the Specially Designed Nationals and Blocked Persons List (“SDN List”) and Consolidated Sanctions List (“Non-SDN Lists”), the United Kingdom, or the European Union.
