# Installation

1. Run `yarn`
2. Create `.env` file in the `voltz-ui` directory with the following:

```
REACT_APP_SUBGRAPH_URL= <<URL OF LOCAL SUBGRAPH>>
```

3. Install AWS Amplify CLI: `yarn global add @aws-amplify/cli`
4. Initialise Amplify with `staging` environment:

```
~$ amplify init

   ╭────────────────────────────────────────────────────╮
   │                                                    │
   │         Update available 7.6.13 → 7.6.24           │
   │   Run yarn global add @aws-amplify/cli to update   │
   │                                                    │
   ╰────────────────────────────────────────────────────╯

Note: It is recommended to run this command from the root of your app directory
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: staging
Using default provider  awscloudformation
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

...

```

# Run

1. Run `yarn start`

## If SDK code changes

1. Run `yalc update @voltz/v1-sdk`
2. Remove `node_modules`
3. Run `yarn`
4. Run `yarn start`

(Or if you can find a way around the caching problem, stopping and starting `yarn start` should be sufficient)
