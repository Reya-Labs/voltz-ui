# Installation

1. Run `yarn`
2. Create `.env` file in the `voltz-ui` directory with the following:

```
REACT_APP_SUBGRAPH_URL= <<URL OF LOCAL SUBGRAPH>>
```

# Run

1. Run `yarn start`

## If SDK code changes

1. Run `yalc update @voltz/v1-sdk`
2. Remove `node_modules`
3. Run `yarn`
4. Run `yarn start`

(Or if you can find a way around the caching problem, stopping and starting `yarn start` should be sufficient)
