/* How to test
* 1. deploy long term contracts -> factoryAddress, peripheryAddress, rateOracle, token .....
// // (let it run in the background) - voltz-core: $ yarn deploy:localhost
* 2.0 modify irsInstance.ts task to deploy pool of one mmonth duration
* 2.1 deploy 1st irs pool -> marginEngineAddress, vammAddress, fcmAddress, start and end 
// // $ npx hardhat createIrsInstance --network localhost --rate-oracle MockCompoundRateOracle
* 3. mint underlying tokens to all 3 addresses below: 
// // $ npx hardhat mintTestTokens --network localhost --beneficiaries <account> --token-address <tknAddress> --amount 10000
* 4.0 modify irsInsance.ts too deploy pool of one year
* 4.1 deploy second IRS pool -> newMArginEngineAddress
* run tests (unskip them 1st) - v1-sdk: $ yarn test src/entities
*/

import { BigNumber, providers, Wallet} from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM, { InfoPostSwap } from '../amm';
import JSBI from 'jsbi';
import { advanceTimeAndBlock } from '../../utils/time'

describe('amm', () => {
  describe.skip('amm rollovers - stable coin', () => {
    let amm_wallet_0: AMM, amm_wallet_1: AMM, amm_wallet_2: AMM;
    let wallet_0: Wallet, wallet_1: Wallet, wallet_2: Wallet;

    let provider: providers.JsonRpcProvider;

    // old pool - to be complted
    const marginEngineAddress = '0x09Df20712491189de6607Fb27bB1DeE53ACB8555'; 
    const vammAddress = '0x84D6E95B602df56E3637210F5Dbcc6d23a20C467'; 
    const fcmAddress = '0x57E1Fa3f9Bf8f4822A8590df964adFf6fd823c37';
    const termStartTimestamp =JSBI.BigInt('1668442775000000000000000000');
    const termEndTimestamp = JSBI.BigInt('1671034775000000000000000000');

    // new pool - to be completed
    const newMarginEngineAddress = '0xC366737A5E66127E2dD410aF9D341945a889eF2E';

    beforeAll(async () => {
      provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
      wallet_0 = new Wallet(
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        provider); // at address - 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      wallet_1 = new Wallet(
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
        provider,
      ); // at address - 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
      wallet_2 = new Wallet(
        '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
        provider,
      ); // at address - 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

      amm_wallet_0 = new AMM({
        id: vammAddress,
        signer: wallet_0,
        provider: provider,
        environment: 'LOCALHOST_SDK',
        factoryAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        peripheryAddress: '0xf5059a5D33d5853360D16C683c16e67980206f36',
        marginEngineAddress: marginEngineAddress,
        fcmAddress: fcmAddress, 
        rateOracle: new RateOracle({
          id: '0x9A676e781A523b5d0C0e43731313A708CB607508',
          protocolId: 2,
        }),
        updatedTimestamp: JSBI.BigInt('1658089957000000000000000000'), // not used
        termEndTimestamp: termEndTimestamp, 
        termStartTimestamp: termStartTimestamp,
        underlyingToken: new Token({
          id: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
          name: 'USDC',
          decimals: 18,
        }),
        tick: 0,
        tickSpacing: 60,
        txCount: 0,
        totalNotionalTraded: JSBI.BigInt('0'),
        totalLiquidity: JSBI.BigInt('0')
      });

      amm_wallet_1 = new AMM({
        id: vammAddress,
        signer: wallet_1,
        provider: provider,
        environment: amm_wallet_0.environment,
        factoryAddress: amm_wallet_0.factoryAddress,
        peripheryAddress: amm_wallet_0.peripheryAddress,
        marginEngineAddress: marginEngineAddress,
        fcmAddress: amm_wallet_0.fcmAddress,
        rateOracle: amm_wallet_0.rateOracle,
        updatedTimestamp: amm_wallet_0.updatedTimestamp,
        termEndTimestamp: amm_wallet_0.termEndTimestamp,
        termStartTimestamp: amm_wallet_0.termStartTimestamp,
        underlyingToken: amm_wallet_0.underlyingToken,
        tick: amm_wallet_0.tick,
        tickSpacing: amm_wallet_0.tickSpacing,
        txCount: amm_wallet_0.txCount,
        totalNotionalTraded: amm_wallet_0.totalNotionalTraded,
        totalLiquidity: amm_wallet_0.totalLiquidity
      });

      amm_wallet_2 = new AMM({
        id: vammAddress,
        signer: wallet_2,
        provider: provider,
        environment: amm_wallet_0.environment,
        factoryAddress: amm_wallet_0.factoryAddress,
        peripheryAddress: amm_wallet_0.peripheryAddress,
        marginEngineAddress: marginEngineAddress,
        fcmAddress: amm_wallet_0.fcmAddress,
        rateOracle: amm_wallet_0.rateOracle,
        updatedTimestamp: amm_wallet_0.updatedTimestamp,
        termEndTimestamp: amm_wallet_0.termEndTimestamp,
        termStartTimestamp: amm_wallet_0.termStartTimestamp,
        underlyingToken: amm_wallet_0.underlyingToken,
        tick: amm_wallet_0.tick,
        tickSpacing: amm_wallet_0.tickSpacing,
        txCount: amm_wallet_0.txCount,
        totalNotionalTraded: amm_wallet_0.totalNotionalTraded,
        totalLiquidity: amm_wallet_0.totalLiquidity
      });

      await amm_wallet_0.approveUnderlyingTokenForPeriphery();
      await amm_wallet_1.approveUnderlyingTokenForPeriphery();
      await amm_wallet_2.approveUnderlyingTokenForPeriphery();

      // const vammContract = vammFactory.connect(vammAddress, wallet_0);
      // await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(0).toString()); // for periphery tests
      // await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(-7000).toString()); // for fcm tests
    });

    /*it.skip('fcm', async () => {
      const fixedLow = 1;
      const fixedHigh = 2;

      const mint_req = (await amm_wallet.getMinimumMarginRequirementPostMint({
        fixedLow: fixedLow,
        fixedHigh: fixedHigh,
        margin: 0,
        notional: 100000,
      })) as number;
      console.log('pre-mint req', mint_req);

      await amm_wallet.mint({
        fixedLow: fixedLow,
        fixedHigh: fixedHigh,
        margin: mint_req + 10,
        notional: 100000,
      });
      console.log('mint done');

      await amm_other.fcmSwap({
        notional: 50000,
      });
      console.log('fcm swap done');

      await amm_other.fcmUnwind({
        notionalToUnwind: 50000,
      });
      console.log('fcm unwind done');

      await amm_other.fcmSwap({
        notional: 50000,
      });
      console.log('fcm swap 2 done');
    });

    it.skip('fcm settlement', async () => {
      await amm_other.settleFCMTrader();
      console.log('fcm settlement done');
    });

    it.skip("update position margin", async () => {

      const fixedLow = 8;
      const fixedHigh = 12;

      await amm_wallet.updatePositionMargin(
        {
          owner: wallet.address,
          fixedLow: fixedLow,
          fixedHigh: fixedHigh,
          marginDelta: 2.0
        }
      );


      await amm_wallet.updatePositionMargin(
        {
          owner: wallet.address,
          fixedLow: fixedLow,
          fixedHigh: fixedHigh,
          marginDelta: -1.0
        }
      );



      console.log("hi");

    })
    
    it.skip('mints and swaps', async () => {
      const fixedLowMinter = 8;
      const fixedHighMinter = 12;
      const fixedLowSwapper = 3;
      const fixedHighSwapper = 6;

      const mint_req = (await amm_wallet.getMinimumMarginRequirementPostMint({
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter,
        margin: 0,
        notional: 100000,
      })) as number;
      console.log('pre-mint req', mint_req);

      const underlyingToken = new Token({
        id: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
        name: 'Voltz',
        decimals: 18,
      });

      const _notionalFraction = Price.fromNumber(100000.5);
      const _notionalTA = TokenAmount.fromFractionalAmount(
        underlyingToken,
        _notionalFraction.numerator,
        _notionalFraction.denominator,
      );
      console.log(
        '_notionalTA',
        JSBI.toNumber(_notionalTA.numerator),
        JSBI.toNumber(_notionalTA.denominator),
      );

      const _notional = _notionalTA.scale();

      console.log(_notional.toString());

      await amm_wallet.mint({
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter,
        margin: mint_req + 10,
        notional: 100000
      });
      console.log('mint done');

      const {
        marginRequirement: swap_req,
        availableNotional: swap_notional,
        fee: swap_fee,
        slippage: swap_slippage,
      } = (await amm_other.getInfoPostSwap({
        isFT: false,
        notional: 50000,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper,
      })) as InfoPostSwap;

      console.log('pre-swap req', swap_req);
      console.log('pre-swap notional', swap_notional);
      console.log('pre-swap fee', swap_fee);
      console.log('pre-swap slippage', swap_slippage);

      await amm_other.swap({
        isFT: false,
        notional: 50000,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper,
        margin: swap_req + 10,
      });
      console.log('swap done');
    });

    it.skip('liquidation thresholds', async () => {
      const fixedLowMinter = 1;
      const fixedHighMinter = 2;
      const fixedLowSwapper = 3;
      const fixedHighSwapper = 6;

      const liquidation_threshold_position = (await amm_other.getLiquidationThreshold({
        owner: wallet.address,
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter,
      })) as number;
      console.log('liquidation threshold position', liquidation_threshold_position);

      const liquidation_threshold_trader = (await amm_other.getLiquidationThreshold({
        owner: other.address,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper,
      })) as number;
      console.log('liquidation threshold trader', liquidation_threshold_trader);
    });

    it.skip('settle positions', async () => {
      const fixedLowMinter = 1;
      const fixedHighMinter = 2;
      const fixedLowSwapper = 3;
      const fixedHighSwapper = 6;

      console.log('settling position...');

      await amm_wallet.settlePosition({
        owner: wallet.address,
        fixedLow: fixedLowMinter,
        fixedHigh: fixedHighMinter,
      });

      await amm_other.settlePosition({
        owner: other.address,
        fixedLow: fixedLowSwapper,
        fixedHigh: fixedHighSwapper,
      });
    }); */

    describe('position rollover', () =>{
      jest.setTimeout(30000);

      it('LP mint old pool', async () => {

        const block = await provider.getBlockNumber();

        const timestamp = (await provider.getBlock(block)).timestamp;
        console.log(timestamp);
      
        const marginRequirement = await amm_wallet_0.getInfoPostMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 10000
        }) as number;
  
        await amm_wallet_0.mint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 10000,
          margin: marginRequirement + 10
        });
      });

      it('FT swap old pool', async () => {
        // FT position 

        const {
          marginRequirement: ft_swap_req,
        } = (await amm_wallet_1.getInfoPostSwap({
          isFT: false,
          notional: 5000,
          fixedLow: 2,
          fixedHigh: 3,
        })) as InfoPostSwap;
  
        console.log('FT pre-swap req', ft_swap_req);

        await amm_wallet_1.swap({
          isFT: true,
          notional: 5000,
          fixedLow: 2,
          fixedHigh: 3,
          margin: ft_swap_req + 10,
        });
      });

      it('VT swap old pool', async () => {
        // VT position

        const {
          marginRequirement: vt_swap_req,
        } = (await amm_wallet_2.getInfoPostSwap({
          isFT: false,
          notional: 1000,
          fixedLow: 2,
          fixedHigh: 3,
        })) as InfoPostSwap;
  
        console.log('VT pre-swap req', vt_swap_req);

        await amm_wallet_2.swap({
          isFT: true,
          notional: 1000,
          margin: vt_swap_req + 10,
          fixedLow: 2,
          fixedHigh: 3
        });
      });

      it('did not reach maturity - faild rollover', async () => {

        await expect( amm_wallet_0.rolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 100,
          margin: 1000,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        })).rejects.toThrowError('Cannot settle before maturity');

        await expect(amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError('Cannot settle before maturity');

        await expect(amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError('Cannot settle before maturity');
        
      });

      it('advance time', async () => {
        const block = await provider.getBlockNumber();

        const timestamp = (await provider.getBlock(block)).timestamp;
        console.log(timestamp);

       await advanceTimeAndBlock(BigNumber.from(2592000*2), 1); // two months - 1st pool reached maturity

        const block2 = await provider.getBlockNumber();

        const timestamp2 = (await provider.getBlock(block2)).timestamp;
        console.log(timestamp2);
      });

      it('pool not initialised - faild rollover', async () => {

        await expect(amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError('The pool has not been initialized yet');

        await expect(amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError('The pool has not been initialized yet');
        
      });
  
      it('rollover with mint for new pool', async () => {

        const marginRequirement = await amm_wallet_0.getInfoPostRolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 300,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        }) as number;

        console.log('LP pre-mint req', marginRequirement);

        await amm_wallet_0.rolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 300,
          margin: marginRequirement + 10,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        });

      });

      it('not enough margin - failed rollover', async () => {
 
         await expect(amm_wallet_1.rolloverWithSwap({
           isFT: true,
           margin: 0,
           notional: 6000,
           fixedLow: 1,
           fixedHigh: 2,
           owner: wallet_1.address,
           newMarginEngine: newMarginEngineAddress,
           oldFixedLow: 2,
           oldFixedHigh: 3
         })).rejects.toThrowError('No enough margin for this operation');
 
         await expect(amm_wallet_2.rolloverWithSwap({
           isFT: false,
           margin: 0,
           notional: 6000,
           fixedLow: 1,
           fixedHigh: 2,
           owner: wallet_2.address,
           newMarginEngine: newMarginEngineAddress,
           oldFixedLow: 2,
           oldFixedHigh: 3
         })).rejects.toThrowError('No enough margin for this operation');
 
      });
  
      it.skip('rollover with swap ft for new pool', async () => {
        const {
          marginRequirement: ft_swap_req,
        } = (await amm_wallet_1.getInfoPostRolloverWithSwap({
          isFT: true,
          notional: 200,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3,
        })) as InfoPostSwap;

        console.log('FT pre-swap req', ft_swap_req);

        await amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: ft_swap_req + 10,
          notional: 200,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        });

      });
  
      it.skip('rollover with swap vt for new pool', async () => {

        const {
          marginRequirement: vt_swap_req,
        } = (await amm_wallet_2.getInfoPostRolloverWithSwap({
          isFT: false,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3,
        })) as InfoPostSwap;

        console.log('VT pre-swap req', vt_swap_req);

        await amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: vt_swap_req + 10,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        });

      });

      it.skip('position already settled - faild rollover', async () => {

        expect(await amm_wallet_0.rolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 100,
          margin: 1000,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        })).toThrow('Position already settled');

        expect(await amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).toThrow('Position already settled');

        expect(await amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).toThrow('Position already settled');
        
      });
    })

  });

  describe('amm rollovers - eth', () => {

    let amm_wallet_0: AMM, amm_wallet_1: AMM, amm_wallet_2: AMM;
    let wallet_0: Wallet, wallet_1: Wallet, wallet_2: Wallet;

    let provider: providers.JsonRpcProvider;

    // old pool - to be complted
    const marginEngineAddress = '0xF45bcaDCc83dea176213Ae4E22f5aF918d08647b'; 
    const vammAddress = '0xeCaE6Cc78251a4F3B8d70c9BD4De1B3742338489'; 
    const fcmAddress = '0x0000000000000000000000000000000000000000';
    const termStartTimestamp =JSBI.BigInt('1668467301000000000000000000');
    const termEndTimestamp = JSBI.BigInt('1671059301000000000000000000');

    // new pool - to be completed
    const newMarginEngineAddress = '0x09fe532dFA5FfcaD188ce19A70BB7645ce31a1C8';

    beforeAll(async () => {
      provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
      wallet_0 = new Wallet(
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        provider); // at address - 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      wallet_1 = new Wallet(
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
        provider,
      ); // at address - 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
      wallet_2 = new Wallet(
        '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
        provider,
      ); // at address - 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

      amm_wallet_0 = new AMM({
        id: vammAddress,
        signer: wallet_0,
        provider: provider,
        environment: 'LOCALHOST_SDK',
        factoryAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        peripheryAddress: '0x4c5859f0F772848b2D91F1D83E2Fe57935348029',
        marginEngineAddress: marginEngineAddress,
        fcmAddress: fcmAddress, 
        rateOracle: new RateOracle({
          id: '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
          protocolId: 3,
        }),
        updatedTimestamp: JSBI.BigInt('1658089957000000000000000000'), // not used
        termEndTimestamp: termEndTimestamp, 
        termStartTimestamp: termStartTimestamp,
        underlyingToken: new Token({
          id: '0x0165878A594ca255338adfa4d48449f69242Eb8F', 
          name: 'ETH',
          decimals: 18,
        }),
        tick: 0,
        tickSpacing: 60,
        txCount: 0,
        totalNotionalTraded: JSBI.BigInt('0'),
        totalLiquidity: JSBI.BigInt('0'),
        wethAddress: '0x0165878A594ca255338adfa4d48449f69242Eb8F'
      });

      amm_wallet_1 = new AMM({
        id: vammAddress,
        signer: wallet_1,
        provider: provider,
        environment: amm_wallet_0.environment,
        factoryAddress: amm_wallet_0.factoryAddress,
        peripheryAddress: amm_wallet_0.peripheryAddress,
        marginEngineAddress: marginEngineAddress,
        fcmAddress: amm_wallet_0.fcmAddress,
        rateOracle: amm_wallet_0.rateOracle,
        updatedTimestamp: amm_wallet_0.updatedTimestamp,
        termEndTimestamp: amm_wallet_0.termEndTimestamp,
        termStartTimestamp: amm_wallet_0.termStartTimestamp,
        underlyingToken: amm_wallet_0.underlyingToken,
        tick: amm_wallet_0.tick,
        tickSpacing: amm_wallet_0.tickSpacing,
        txCount: amm_wallet_0.txCount,
        totalNotionalTraded: amm_wallet_0.totalNotionalTraded,
        totalLiquidity: amm_wallet_0.totalLiquidity,
        wethAddress: amm_wallet_0.wethAddress
      });

      amm_wallet_2 = new AMM({
        id: vammAddress,
        signer: wallet_2,
        provider: provider,
        environment: amm_wallet_0.environment,
        factoryAddress: amm_wallet_0.factoryAddress,
        peripheryAddress: amm_wallet_0.peripheryAddress,
        marginEngineAddress: marginEngineAddress,
        fcmAddress: amm_wallet_0.fcmAddress,
        rateOracle: amm_wallet_0.rateOracle,
        updatedTimestamp: amm_wallet_0.updatedTimestamp,
        termEndTimestamp: amm_wallet_0.termEndTimestamp,
        termStartTimestamp: amm_wallet_0.termStartTimestamp,
        underlyingToken: amm_wallet_0.underlyingToken,
        tick: amm_wallet_0.tick,
        tickSpacing: amm_wallet_0.tickSpacing,
        txCount: amm_wallet_0.txCount,
        totalNotionalTraded: amm_wallet_0.totalNotionalTraded,
        totalLiquidity: amm_wallet_0.totalLiquidity,
        wethAddress: amm_wallet_0.wethAddress
      });

      await amm_wallet_0.approveUnderlyingTokenForPeriphery();
      await amm_wallet_1.approveUnderlyingTokenForPeriphery();
      await amm_wallet_2.approveUnderlyingTokenForPeriphery();

      // const vammContract = vammFactory.connect(vammAddress, wallet_0);
      // await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(0).toString()); // for periphery tests
      // await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(-7000).toString()); // for fcm tests
    });

    describe('position rollover', () =>{
      jest.setTimeout(30000);

      it.skip('LP mint old pool - both WETH and ETH', async () => {

        const block = await provider.getBlockNumber();

        const timestamp = (await provider.getBlock(block)).timestamp;
        console.log(timestamp);
      
        const marginRequirement = await amm_wallet_0.getInfoPostMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 10000
        }) as number;

        await amm_wallet_0.mintWithWeth({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 10000,
          margin: marginRequirement/2,
          marginEth: marginRequirement/2 + 1
        });
      });

      it.skip('FT swap old pool - only WETH', async () => {
        // FT position 

        const {
          marginRequirement: ft_swap_req,
        } = (await amm_wallet_1.getInfoPostSwap({
          isFT: false,
          notional: 5000,
          fixedLow: 2,
          fixedHigh: 3,
        })) as InfoPostSwap;
  
        console.log('FT pre-swap req', ft_swap_req);

        await amm_wallet_1.swapWithWeth({
          isFT: true,
          notional: 5000,
          fixedLow: 2,
          fixedHigh: 3,
          margin: ft_swap_req + 10
        });
      });

      it.skip('VT swap old pool - only ETH', async () => {
        // VT position

        const {
          marginRequirement: vt_swap_req,
        } = (await amm_wallet_2.getInfoPostSwap({
          isFT: false,
          notional: 1000,
          fixedLow: 2,
          fixedHigh: 3,
        })) as InfoPostSwap;
  
        console.log('VT pre-swap req', vt_swap_req);

        await amm_wallet_2.swapWithWeth({
          isFT: true,
          notional: 1000,
          marginEth: vt_swap_req + 10,
          margin: 0,
          fixedLow: 2,
          fixedHigh: 3
        });
      });

      it.skip('did not reach maturity - faild rollover', async () => {

        await expect( amm_wallet_0.rolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 100,
          margin: 1000,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        })).rejects.toThrowError();

        await expect(amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError();

        await expect(amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError();
        
      });

      it.skip('advance time', async () => {
        const block = await provider.getBlockNumber();

        const timestamp = (await provider.getBlock(block)).timestamp;
        console.log(timestamp);

       await advanceTimeAndBlock(BigNumber.from(2592000*2), 1); // two months - 1st pool reached maturity

        const block2 = await provider.getBlockNumber();

        const timestamp2 = (await provider.getBlock(block2)).timestamp;
        console.log(timestamp2);
      });

      it.skip('pool not initialised - faild rollover', async () => {

        await expect(amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError();

        await expect(amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).rejects.toThrowError();
        
      });
  
      it.skip('rollover with mint for new pool - only ETH', async () => {

        const marginRequirement = await amm_wallet_0.getInfoPostRolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 300,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        }) as number;

        console.log('LP pre-mint req', marginRequirement);

        await amm_wallet_0.rolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 300,
          margin: 0,
          marginEth: marginRequirement + 10,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        });

      });

      it.skip('not enough margin - failed rollover', async () => {
 
         await expect(amm_wallet_1.rolloverWithSwap({
           isFT: true,
           margin: 0,
           notional: 6000,
           fixedLow: 1,
           fixedHigh: 2,
           owner: wallet_1.address,
           newMarginEngine: newMarginEngineAddress,
           oldFixedLow: 2,
           oldFixedHigh: 3
         })).rejects.toThrowError('No enough margin for this operation');
 
         await expect(amm_wallet_2.rolloverWithSwap({
           isFT: false,
           margin: 0,
           notional: 6000,
           fixedLow: 1,
           fixedHigh: 2,
           owner: wallet_2.address,
           newMarginEngine: newMarginEngineAddress,
           oldFixedLow: 2,
           oldFixedHigh: 3
         })).rejects.toThrowError('No enough margin for this operation');
 
      });
  
      it.skip('rollover with swap ft for new pool - ETH and WETH', async () => {
        const {
          marginRequirement: ft_swap_req,
        } = (await amm_wallet_1.getInfoPostRolloverWithSwap({
          isFT: true,
          notional: 200,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3,
        })) as InfoPostSwap;

        console.log('FT pre-swap req', ft_swap_req);

        await amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: ft_swap_req/2 + 10,
          marginEth: ft_swap_req/2,
          notional: 200,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        });

      });
  
      it.skip('rollover with swap vt for new pool - only WETH', async () => {

        const {
          marginRequirement: vt_swap_req,
        } = (await amm_wallet_2.getInfoPostRolloverWithSwap({
          isFT: false,
          notional: 10,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3,
        })) as InfoPostSwap;

        console.log('VT pre-swap req', vt_swap_req);

        await amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: vt_swap_req + 10,
          notional: 10,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        });

      });

      it.skip('position already settled - faild rollover', async () => {

        expect(await amm_wallet_0.rolloverWithMint({
          fixedLow: 1,
          fixedHigh: 2,
          notional: 100,
          margin: 1000,
          owner: wallet_0.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 1,
          oldFixedHigh: 2
        })).toThrow('Position already settled');

        expect(await amm_wallet_1.rolloverWithSwap({
          isFT: true,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_1.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).toThrow('Position already settled');

        expect(await amm_wallet_2.rolloverWithSwap({
          isFT: false,
          margin: 1000,
          notional: 100,
          fixedLow: 1,
          fixedHigh: 2,
          owner: wallet_2.address,
          newMarginEngine: newMarginEngineAddress,
          oldFixedLow: 2,
          oldFixedHigh: 3
        })).toThrow('Position already settled');
        
      });
    })

  });

});

