import { providers, Wallet } from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM, { InfoPostSwap } from '../amm';
import { TickMath } from '../../utils/tickMath';
import { VAMM__factory as vammFactory } from '../../typechain';

jest.setTimeout(60000);
it('setup rich irs instance', async () => {

  let amm_wallet: AMM, amm_other: AMM;
  let wallet: Wallet, other: Wallet;

  const vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
  const marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
  const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  wallet = new Wallet(privateKey, provider);
  other = new Wallet(
    '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    provider,
  );

  amm_wallet = new AMM({
    id: vammAddress,
    signer: wallet,
    provider: provider,
    createdTimestamp: '1646856471',
    fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
    liquidity: '0',
    marginEngineAddress,
    rateOracle: new RateOracle({
      id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
      protocolId: 1,
    }),
    underlyingToken: new Token({
      id: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
      name: 'USDC',
      decimals: 18,
    }),
    sqrtPriceX96: TickMath.getSqrtRatioAtTick(0).toString(),
    termEndTimestamp: '1649458800000000000000000000',
    termStartTimestamp: '1646856441000000000000000000',
    tick: '0',
    tickSpacing: '1000',
    txCount: 0,
    updatedTimestamp: '1646856471',
  });

  amm_other = new AMM({
    id: vammAddress,
    signer: other,
    provider: provider,
    createdTimestamp: '1646856471',
    fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
    liquidity: '0',
    marginEngineAddress,
    rateOracle: new RateOracle({
      id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
      protocolId: 1,
    }),
    underlyingToken: new Token({
      id: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
      name: 'USDC',
      decimals: 18,
    }),
    sqrtPriceX96: TickMath.getSqrtRatioAtTick(0).toString(),
    termEndTimestamp: '1649458800000000000000000000',
    termStartTimestamp: '1646856441000000000000000000',
    tick: '0',
    tickSpacing: '1000',
    txCount: 0,
    updatedTimestamp: '1646856471',
  });

  const vammContract = vammFactory.connect(vammAddress, wallet);
  await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(-23000).toString()); // 10%

  const fixedLowMinter = 8;
  const fixedHighMinter = 12;
  const fixedLowSwapper1 = 3;
  const fixedHighSwapper1 = 6;
  const fixedLowSwapper2 = 2;
  const fixedHighSwapper2 = 7;

  const mint_req = (await amm_wallet.getMinimumMarginRequirementPostMint({
    fixedLow: fixedLowMinter,
    fixedHigh: fixedHighMinter,
    margin: 0,
    notional: 200000,
  })) as number;

  await amm_wallet.mint({
    fixedLow: fixedLowMinter,
    fixedHigh: fixedHighMinter,
    margin: mint_req + 10,
    notional: 200000,
  });

  const {
    marginRequirement: swap_req1
  } = (await amm_other.getInfoPostSwap({
    isFT: false,
    notional: 50000,
    fixedLow: fixedLowSwapper1,
    fixedHigh: fixedHighSwapper1,
  })) as InfoPostSwap;

  await amm_other.swap({
    isFT: false,
    notional: 50000,
    fixedLow: fixedLowSwapper1,
    fixedHigh: fixedHighSwapper1,
    margin: swap_req1 + 10,
  });

  const {
    marginRequirement: swap_req2
  } = (await amm_other.getInfoPostSwap({
    isFT: true,
    notional: 25000,
    fixedLow: fixedLowSwapper2,
    fixedHigh: fixedHighSwapper2,
  })) as InfoPostSwap;

  await amm_other.swap({
    isFT: true,
    notional: 25000,
    fixedLow: fixedLowSwapper2,
    fixedHigh: fixedHighSwapper2,
    margin: swap_req2 + 10,
  });
});