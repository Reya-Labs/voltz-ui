import { providers, Wallet } from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM, { InfoPostSwap } from '../amm';
import { TickMath } from '../../utils/tickMath';
import {
  VAMM__factory as vammFactory,
} from '../../typechain';
import { Price } from '../fractions/price';
import { TokenAmount } from '../fractions/tokenAmount';

describe('amm', () => {
  describe('amm init', () => {
    let amm: AMM;
    let wallet: Wallet;

    beforeAll(async () => {
      const vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
      const marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
      const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
      const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
      wallet = new Wallet(privateKey, provider);
      amm = new AMM({
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
          decimals: 18
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
      await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(0).toString()); // for periphery tests
      // await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(-7000).toString()); // for fcm tests
    });

    it.skip('fcm', async () => {
      const fixedLow = 1
      const fixedHigh = 2

      const mint_req = await amm.getMinimumMarginRequirementPostMint({
        recipient: wallet.address,
        fixedLow: fixedLow,
        fixedHigh: fixedHigh,
        margin: 0,
        notional: 100000,
      }) as number;
      console.log("pre-mint req", mint_req);

      await amm.mint({
        recipient: wallet.address,
        fixedLow: fixedLow,
        fixedHigh: fixedHigh,
        margin: mint_req + 10,
        notional: 100000,
      });
      console.log("mint done");

      await amm.FCMSwap({
        notional: 50000
      });
      console.log("fcm swap done");

      await amm.FCMUnwind({
        notionalToUnwind: 50000
      });
      console.log("fcm unwind done");

      await amm.FCMSwap({
        notional: 50000
      });
      console.log("fcm swap 2 done");
    });

    it.skip('fcm settlement', async () => {
      await amm.settleFCMTrader();
      console.log("fcm settlement done");
    });

    it('mints and swaps', async () => {
      const fixedLowMinter = 8
      const fixedHighMinter = 12
      const fixedLowSwapper = 3
      const fixedHighSwapper = 6

      const mint_req = await amm.getMinimumMarginRequirementPostMint({
        recipient: wallet.address,
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter,
        margin: 0,
        notional: 100000,
      }) as number;
      console.log("pre-mint req", mint_req);

      const underlyingToken = new Token(
        {
          id: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          name: "Voltz",
          decimals: 18
        }
      );

      const _notionalFraction = Price.fromNumber(100000.5);
      const _notionalTA = TokenAmount.fromFractionalAmount(underlyingToken, _notionalFraction.numerator, _notionalFraction.denominator);
      console.log("_notionalTA", _notionalTA.numerator, _notionalTA.denominator);

      const _notional = _notionalTA.scale()
      
      console.log(_notional.toString());

      // MarginLessThanMinimum(618177714030561395808)
      await amm.mint({
        recipient: wallet.address,
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter,
        margin: 620,
        notional: 100000,
      });
      console.log("mint done");

      const {marginRequirement: swap_req,
            availableNotional: swap_notional,
            fee: swap_fee,
            slippage: swap_slippage } = await amm.getInfoPostSwap({
        recipient: wallet.address,
        isFT: false,
        notional: 50000,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper
      }) as InfoPostSwap;

      console.log("pre-swap req", swap_req);
      console.log("pre-swap notional", swap_notional);
      console.log("pre-swap fee", swap_fee);
      console.log("pre-swap slippage", swap_slippage);

      await amm.swap({
        recipient: wallet.address,
        isFT: false,
        notional: 50000,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper,
        margin: swap_req + 10,
      });
      console.log("swap done");
    });

    it.skip('liquidation thresholds', async () => {
      const fixedLowMinter = 1
      const fixedHighMinter = 2
      const fixedLowSwapper = 3
      const fixedHighSwapper = 6

      const liquidation_threshold_position = await amm.getLiquidationThreshold({
        owner: wallet.address,
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter
      }) as number;
      console.log("liquidation threshold position", liquidation_threshold_position);

      const liquidation_threshold_trader = await amm.getLiquidationThreshold({
        owner: wallet.address,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper
      }) as number;
      console.log("liquidation threshold trader", liquidation_threshold_trader);
    })

    it.skip('settle positions', async () => {
      const fixedLowMinter = 1
      const fixedHighMinter = 2
      const fixedLowSwapper = 3
      const fixedHighSwapper = 6

      console.log("settling position...")

      await amm.settlePosition({
        owner: wallet.address,
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter
      });

      await amm.settlePosition({
        owner: wallet.address,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper
      });
    });
  });

  describe('amm getters', () => {
    let amm: AMM;
    let wallet: Wallet;

    beforeAll(() => {
      const vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
      const marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
      const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
      const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
      wallet = new Wallet(privateKey, provider);
      amm = new AMM({
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
          decimals: 18
        }),
        sqrtPriceX96: 0,
        termEndTimestamp: '1649458800000000000000000000',
        termStartTimestamp: '1646856441000000000000000000',
        tick: '0',
        tickSpacing: '1000',
        txCount: 0,
        updatedTimestamp: '1646856471',
      });
    });

    it.skip('gets fixed rate from 0 sqrtPriceX96', () => {
      expect(amm.fixedRate.toNumber()).toEqual(0);
      console.log(amm.endDateTime);
    });
  });
});
