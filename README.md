<p align="center">
  <a href="https://app.voltz.xyz/">
    <picture>
      <img src="./docs/voltz-background.jpeg" alt="Voltz" width="600" />
    </picture>
  </a>
</p>

<p align="center">Powering Voltz UI and beyond!!!</p>


<p align="center">
  <a href="https://discord.com/invite/NZgsbT8kWX">
    <img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=voltz_xyz">
    <img src="https://badgen.net/twitter/follow/voltz_xyz?icon=twitter&label=%voltz_xyz" alt="Official Twitter Handle" />
  </a>
  <img src="https://badgen.net/github/tag/Voltz-Protocol/voltz-ui" alt="Tag" />
  <img src="https://badgen.net/github/checks/Voltz-Protocol/voltz-ui/main" alt="Checks" />
  <img src="https://badgen.net/github/last-commit/Voltz-Protocol/voltz-ui/main" alt="Checks" />
</p>

<p align="center">
voltz-ui is a frontend repository powered by React. It is the home of all the pages and components that provide the UI/UX for <a href="https://app.voltz.xyz">app.voltz.xyz</a>.
</p>

<br />

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-23.62%25-red.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-12.55%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-20.47%25-red.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-23.56%25-red.svg?style=flat) |

# Installation

1. Run `yarn`
2. Ensure that you have a `.env` file in the `voltz-ui` directory with the following:

```
REACT_APP_DEFAULT_PROVIDER_NETWORK=<<RPC ENDPOINT FOR BLOCKCHAIN>
REACT_APP_REQUIRED_ETHEREUM_NETWORK=<<ETHEREUM_NETWORK_NAME>>
REACT_APP_SUBGRAPH_URL=<<URL OF LOCAL SUBGRAPH>>
REACT_APP_TOS_URL=https://www.voltz.xyz/t-cs
REACT_APP_TRM_API_KEY=<<TRM_API_KEY>>
REACT_APP_WALLETCONNECT_INFURA_ID=<<INFURA ID>>
```

Optional:
```
REACT_APP_ROLLOVER_VALIDATE_ONLY=Y
REACT_APP_SKIP_TOS_CHECK=Y
REACT_APP_SKIP_WALLET_SCREENING=Y
```

`REACT_APP_REQUIRED_ETHEREUM_NETWORK` is used by the app to check that the connected Metamask wallet is using the correct network. Use `homestead` for Ethereum Mainnet (live), or `goerli` for Kovan Testnet (dev).

`REACT_APP_WALLETCONNECT_INFURA_ID` is used by the app when attempting to use the WalletConnect wallet option. Sign up for an account at https://infura.io/ and then create a new project. The 'infura id' is the same as the 'project id' in the keys section.

`REACT_APP_TOS_URL` This is the URL displayed in the terms of service (TOS) message that users must agree to before they can connect their wallet to the app.

`REACT_APP_TRM_API_KEY` This key is used to get a risk assessment from TRM for a wallet that is being connected to the app. If you don't have an API key, you will need to disable wallet screening to able to use your wallet.

`REACT_APP_SKIP_TOS_CHECK` If this key exists, the app will not check that the user has agreed to the terms of service (TOS). It is intended to be used on dev/test environments.

`REACT_APP_SKIP_WALLET_SCREENING` If this key exists, the app will not check if the wallet is deemed risky (via TRM). It is intended to be used on dev/test environments.

`REACT_APP_WHITELIST` This key contains a subset of all deployed pools as a comma separated list of IDs. This subset should be visible in the production Voltz front-end. If you want to remove a pool from the production front-end remove it from this key, please.

`REACT_APP_ROLLOVER_VALIDATE_ONLY` If this is set, rollover operations will have the `validateOnly` flag set to true. This can be useful for testing / debugging.

# Run

1. Run `yarn start`

# Testing local version of SDK using `yalc`

Refer to documentation of this process found in `README.md` of SDK. Follow this [link](https://github.com/Voltz-Protocol/v1-sdk#testing-local-version-in-ui-using-yalc) for details.

# Contributing

## Branching model

UI needs to be available on both [https://test.voltz.xyz](test.voltz.xyz) and [https://app.voltz.xyz](app.voltz.xyz) at same time with different version of code. 
Hence, we need to have 2 branches each representing the env. we deploy to. `main` branch relates to `app.voltz.xyz` aka `production` and 
`develop` branch relates to `test.voltz.xyz` aka `test`.

In the UI world you should branch off develop when building a feature. 
So just go on `develop`, pull latest and then branch out of it. 
Create your PR against `develop`.

The `main` branch is just a snapshot of `develop` at given point in time, 
so no need to do any developing against `main`, 
and we just simple merge `develop` to `main` whenever we want to do a release.

Branch naming is quite standard, we tried to duplicate what we have done for 
the committing messages, following standard commit message format: [https://www.conventionalcommits.org/en/v1.0.0/].

Branch names can start with the prefixes found in the regex under '.husky/pre-commit'.

### Short summary:

**DEVELOPING**
  * create a branch from `develop`, follow the naming convention for a branch
  * wait for approval, resolve comments and make sure you have a green build
  * merge to `develop` using **Rebase and merge**

**RELEASING**

This section explains the process of creating a release candidate branch out of current `develop` and `main`.

**Important**: Make sure you have no changes on `develop` or `main`!

Short version:

At the root of repository, execute:
```shell
    FEATURE='my-release-feature' yarn git:create-release-branch
```

Long version:
 * create a branch from `develop`
   * name it `release/my-release-feature` (**important** since this branch will create AWS Amplify env. where you can test your build before you merge/release it!)
   * add proper description! Important since this will be automatically included in the merge commit message
   * good practice is to include the release date into branch name for visibility, in the format `YYYYMMDD` 
 * git merge `main` to that branch
   * if any conflicts, resolve them by accepting all changes from `release/YYYYMMDD`
 * create a PR against `main`
 * wait for approval, resolve comments and make sure you have a green build
 * merge to `main` using **Create a merge commit**

## AWS Amplify

Voltz UI uses AWS Amplify to create automate the process around creating builds that can be shared with the stakeholders.
What this means is that any push to a branch will create an environment for the team to test against!

### Rules

**Environment branches (main & develop)**
* merges to branch `main` always deploy to `app.voltz.xyz` with ENV variables specific for `main`
* merges to branch `develop` always deploy to `test.voltz.xyz` with ENV variables specific for `develop`

**Candidate branches:**
* commits on branches that follow the pattern `feat/*`, `fix/*`, `chore/*`, `refactor/*` and `test/*` generate a build with same ENV variables as `develop`
* commits on branches that follow the pattern `release/*` generate a build with same ENV variables as `main` 

## Tools

Helpful tools to install to improve your development life!
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=en)
* [Metamask Wallet](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)

For local development purposes it is advised to install `Metamask` wallet. You can install the Google Chrome extension for this.
Once you have the wallet setup you should enable the test networks for the `Metamask` wallet `Account Settings` -> `Advanced` -> `Show test networks`.
Next time around you want to test on localhost, just select the `goerli` test network from your wallet.

# Terms & Conditions
The Voltz Protocol, and any products or services associated therewith, is offered only to persons (aged 18 years or older) or entities who are not residents of, citizens of, are incorporated in, owned or controlled by a person or entity in, located in, or have a registered office or principal place of business in any “Restricted Territory.”

The term Restricted Territory includes the United States of America (including its territories), Algeria, Bangladesh, Bolivia, Belarus, Myanmar (Burma), Côte d’Ivoire (Ivory Coast), Egypt, Republic of  Crimea, Cuba, Democratic Republic of the Congo, Iran, Iraq, Liberia, Libya, Mali, Morocco, Nepal, North Korea, Oman, Qatar, Somalia, Sudan, Syria, Tunisia, Venezuela, Yemen, Zimbabwe; or any jurisdictions in which the sale of cryptocurrencies are prohibited, restricted or unauthorized in any form or manner whether in full or in part under the laws, regulatory requirements or rules in such jurisdiction; or any state, country, or region that is subject to sanctions enforced by the United States, such as the Specially Designed Nationals and Blocked Persons List (“SDN List”) and Consolidated Sanctions List (“Non-SDN Lists”), the United Kingdom, or the European Union.
