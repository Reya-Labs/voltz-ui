# Installation

1. Run `yarn`
2. Ensure that you have a `.env` file in the `voltz-ui` directory with the following:

```
REACT_APP_SUBGRAPH_URL=<<URL OF LOCAL SUBGRAPH>>
REACT_APP_DEFAULT_PROVIDER_NETWORK=<<RPC ENDPOINT FOR BLOCKCHAIN>
REACT_APP_METAMASK_NETWORK_ID=<<NETWORK ID>>
```

`REACT_APP_METAMASK_NETWORK_ID` is used by the app to check that the connected Metamask wallet is using the correct network. Use `1` for Ethereum Mainnet (live), or `42` for Kovan Testnet (dev). See https://eth.wiki/json-rpc/API#net_version for more network IDs.

# Run

1. Run `yarn start`

## If SDK code changes

1. Run `yalc update @voltz/v1-sdk`
2. Remove `node_modules`
3. Run `yarn`
4. Run `yarn start`

(Or if you can find a way around the caching problem, stopping and starting `yarn start` should be sufficient)
