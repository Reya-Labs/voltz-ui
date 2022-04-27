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

Run `yarn test src/entities`


# To publish via `yalc`

1. Anywhere -> Ensure `yalc` is installed `yarn global add yalc`
2. SDK -> Run `yarn build-release` (this prepares the JS build files)
3. SDK -> Run `yalc publish`
4. Another repo -> In the dependent repository, run `yalc add @voltz-protocol/v1-sdk`
5. To update another repo -> run `yalc update @voltz-protocol/v1-sdk`
