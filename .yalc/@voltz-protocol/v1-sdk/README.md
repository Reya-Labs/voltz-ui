# Voltz SDK

This is the Typescript SDK for Voltz Protocol v1. The main functions of the SDK which interact with the smart contracts in the [voltz-core repository](https://github.com/Voltz-Protocol/voltz-core) are in the [amm.ts](https://github.com/Voltz-Protocol/v1-sdk/blob/main/src/entities/amm.ts) file. You can also find in-depth documentation on the functions in amm.ts [here](https://docs.voltz.xyz/sdk-and-subgraph/sdk).

# Installation before setup

1. Run `yarn`

# Setup

Before you can run the SDK you need to set up the core repository and spin up a local node using the following commands in the core repository.

```
(in core): yarn deploy:localhost
(in core): npx hardhat createIrsInstance --network localhost --rate-oracle MockTokenRateOracle
```

Note, you may get a `PF value already set` error after running the `npx hardhat createIrsInstance --network localhost --rate-oracle MockTokenRateOracle` command. This is expected as the PF variable (protocol fee) has already been setby default. The actual IRS instance gets deployed despite the error and we will in future releases account for this in a deployment script.

Next, make a note of the first address created (i.e. Account #0) by the local node and mint some ERC20 tokens.

```
...

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

...
```

The address should be included in `--beneficiaries`:

```
(in core): npx hardhat mintTestTokens --network localhost --beneficiaries 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --amount 10000
(in core): npx hardhat updatePositionMargin --network localhost --meaddress "0x75537828f2ce51be7289709686A69CbFDbB714F1"  --owner 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --tickupper 0 --ticklower -7000 --margindelta 100
```

## Run test functions

To run the tests execute `yarn test`. This runs all the tests inside the `/tests` directory.

# Testing local version in UI using `yalc`

1. SDK -> Run `yarn build-release` (this prepares the JS build files)
2. SDK -> Run `npx yalc publish`
3. UI repo, to test local version(link) -> run `npx yalc add @voltz-protocol/v1-sdk`
4. UI repo, to update local version(link) -> run `npx yalc update @voltz-protocol/v1-sdk`

# Terms & Conditions

The Voltz Protocol, and any products or services associated therewith, is offered only to persons (aged 18 years or older) or entities who are not residents of, citizens of, are incorporated in, owned or controlled by a person or entity in, located in, or have a registered office or principal place of business in any “Restricted Territory.”  

The term Restricted Territory includes the United States of America (including its territories), Algeria, Bangladesh, Bolivia, Belarus, Myanmar (Burma), Côte d’Ivoire (Ivory Coast), Egypt, Republic of  Crimea, Cuba, Democratic Republic of the Congo, Iran, Iraq, Liberia, Libya, Mali, Morocco, Nepal, North Korea, Oman, Qatar, Somalia, Sudan, Syria, Tunisia, Venezuela, Yemen, Zimbabwe; or any jurisdictions in which the sale of cryptocurrencies are prohibited, restricted or unauthorized in any form or manner whether in full or in part under the laws, regulatory requirements or rules in such jurisdiction; or any state, country, or region that is subject to sanctions enforced by the United States, such as the Specially Designed Nationals and Blocked Persons List (“SDN List”) and Consolidated Sanctions List (“Non-SDN Lists”), the United Kingdom, or the European Union.
