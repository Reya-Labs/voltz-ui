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

`REACT_APP_REQUIRED_ETHEREUM_NETWORK` is used by the app to check that the connected Metamask wallet is using the correct network. Use `mainnet` for Ethereum Mainnet (live), or `kovan` for Kovan Testnet (dev).

`REACT_APP_WALLETCONNECT_INFURA_ID` is used by the app when attempting to use the WalletConnect wallet option. Sign up for an account at https://infura.io/ and then create a new project. The 'infura id' is the same as the 'project id' in the keys section.

`REACT_APP_TOS_URL` This is the URL displayed in the terms of service (TOS) message that users must agree to before they can connect their wallet to the app.

`REACT_APP_TRM_API_KEY` This key is used to get a risk assessment from TRM for a wallet that is being connected to the app. This key is optional for development as if the risk assessment request fails, the app just skips the check.


# Run

1. Run `yarn start`

## If SDK code changes

1. Run `yalc update @voltz/v1-sdk`
2. Remove `node_modules`
3. Run `yarn`
4. Run `yarn start`


(Or if you can find a way around the caching problem, stopping and starting `yarn start` should be sufficient)