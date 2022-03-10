# Installation

1. Run `yarn`

# To publish via `yalc`

1. Anywhere -> Ensure `yalc` is installed `yarn global add yalc`
2. SDK -> Run `yarn build-release` (this prepares the JS build files)
3. SDK -> Run `yalc publish`
4. Another repo -> In the dependent repository, run `yalc add @voltz/v1-sdk`
5. To update another repo -> run `yalc update @voltz/v1-sdk`

# Run test functions

## Setup

First, set up the core using the following command:

```
(in core): yarn deploy:localhost
(in core): npx hardhat createIrsInstance --network localhost --rate-oracle TestRateOracle
```

Next, make a note of the first address created by the local node and mint some ERC20 tokens.

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

## Functions that need testing

```
amm.
  getMinimumMarginRequirementPostSwap
  settlePosition
  updatePositionMargin
  mint
  burn
  swap
```
