import JSBI from 'jsbi';
import { DateTime } from 'luxon';
import { BigNumber, BigNumberish, ContractTransaction, Signer, utils } from 'ethers';

import { BigIntish, SwapPeripheryParams, MintOrBurnParams } from '../types';
import { Q192, PERIPHERY_ADDRESS, FACTORY_ADDRESS } from '../constants';
import { Price } from './fractions/price';
import {
  Periphery__factory as peripheryFactory,
  MarginEngine__factory as marginEngineFactory,
  Factory__factory as factoryFactory,
  VAMM__factory as vammFactory,
  // todo: not very elegant to use the mock as a factory
  ERC20Mock__factory as tokenFactory,
  AaveFCM__factory as fcmFactory
} from '../typechain';
import Token from './token';
import RateOracle from './rateOracle';
import { TickMath } from '../utils/tickMath';
import timestampWadToDateTime from '../utils/timestampWadToDateTime';
import { fixedRateToClosestTick, tickToFixedRate } from '../utils/priceTickConversions';
import { nearestUsableTick } from '../utils/nearestUsableTick';
import { toBn } from 'evm-bn';

export type AMMConstructorArgs = {
  id: string;
  signer: Signer | null;
  marginEngineAddress: string;
  fcmAddress: string;
  rateOracle: RateOracle;
  createdTimestamp: BigIntish;
  updatedTimestamp: BigIntish;
  termStartTimestamp: BigIntish;
  termEndTimestamp: BigIntish;
  underlyingToken: Token;
  sqrtPriceX96: BigIntish;
  liquidity: BigIntish;
  tick: BigIntish;
  tickSpacing: BigIntish;
  txCount: number;
};

export type AMMGetMinimumMarginRequirementArgs = {
  recipient: string;
  isFT: boolean;
  notional: BigNumberish;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
};

export type AMMUpdatePositionMarginArgs = {
  owner: string;
  fixedLow: number;
  fixedHigh: number;
  marginDelta: BigNumberish;
};

export type AMMLiquidatePositionArgs = {
  owner: string;
  fixedLow: number;
  fixedHigh: number;
}

export type AMMSettlePositionArgs = {
  owner: string;
  fixedLow: number;
  fixedHigh: number;
};

export type AMMSwapArgs = {
  recipient: string;
  isFT: boolean;
  notional: number;
  margin: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
};

export type FCMSwapArgs = {
  notional: BigNumberish;
  fixedRateLimit?: number;
}

export type FCMUnwindArgs = {
  notionalToUnwind: BigNumberish;
  fixedRateLimit?: number;
}

export type AMMMintArgs = {
  recipient: string;
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  margin: number;
};

export type AMMBurnArgs = Omit<AMMMintArgs, 'margin'>;

export type ClosestTickAndFixedRate = {
  closestUsableTick: number;
  closestUsableFixedRate: Price;
};

class AMM {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly marginEngineAddress: string;
  public readonly fcmAddress: string;
  public readonly rateOracle: RateOracle;
  public readonly createdTimestamp: JSBI;
  public readonly updatedTimestamp: JSBI;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public sqrtPriceX96: JSBI;
  public readonly liquidity: JSBI;
  public readonly tickSpacing: JSBI;
  public readonly tick: JSBI;
  public readonly txCount: JSBI;
  private _fixedRate?: Price;
  private _price?: Price;

  public constructor({
    id,
    signer,
    marginEngineAddress,
    fcmAddress,
    rateOracle,
    createdTimestamp,
    updatedTimestamp,
    termStartTimestamp,
    termEndTimestamp,
    underlyingToken,
    sqrtPriceX96,
    liquidity,
    tick,
    tickSpacing,
    txCount,
  }: AMMConstructorArgs) {
    this.id = id;
    this.signer = signer;
    this.marginEngineAddress = marginEngineAddress;
    this.fcmAddress = fcmAddress;
    this.rateOracle = rateOracle;
    this.createdTimestamp = JSBI.BigInt(createdTimestamp);
    this.updatedTimestamp = JSBI.BigInt(updatedTimestamp);
    this.termStartTimestamp = JSBI.BigInt(termStartTimestamp);
    this.termEndTimestamp = JSBI.BigInt(termEndTimestamp);
    this.underlyingToken = underlyingToken;
    this.sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96);
    this.liquidity = JSBI.BigInt(liquidity);
    this.tickSpacing = JSBI.BigInt(tickSpacing);
    this.tick = JSBI.BigInt(tick);
    this.txCount = JSBI.BigInt(txCount);
  }

  public async getMinimumMarginRequirementPostSwap({
    recipient,
    isFT,
    notional,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
  }: AMMGetMinimumMarginRequirementArgs) : Promise<number | void> {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    }
    else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString()
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString()
      }
    }

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      isFT,
      notional: toBn(notional.toString()),
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
    };

    let marginRequirement: BigNumber = BigNumber.from(0);

    await peripheryContract.callStatic.swap(swapPeripheryParams).then(
      async (result: any) => {
        marginRequirement = result[4];
      },
      (error) => {
        if (error.message.includes('MarginRequirementNotMet')) {
          const args: string[] = error.message.split("MarginRequirementNotMet")[1]
            .split('(')[1]
            .split(')')[0]
            .replaceAll(' ', '')
            .split(',');

          console.log(error.message);
          marginRequirement = BigNumber.from(args[0]);
        } else {
          console.log(error.message);
        }
      },
    );

    return parseFloat(utils.formatEther(marginRequirement));
  }

  public async getSlippagePostSwap({
    recipient,
    isFT,
    notional,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
  }: AMMGetMinimumMarginRequirementArgs) : Promise<number | void> {
    if (!this.signer) return;

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    }
    else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString()
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString()
      }
    }

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      isFT,
      notional: toBn(notional.toString()),
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
    };

    let tickBefore = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    let tickAfter = 0;

    await peripheryContract.callStatic.swap(swapPeripheryParams).then(
      async (result: any) => {
        tickAfter = parseInt(result[5]);
      },
      (error) => {
        if (error.message.includes('MarginRequirementNotMet')) {
          const args: string[] = error.message.split("MarginRequirementNotMet")[1]
            .split('(')[1]
            .split(')')[0]
            .replaceAll(' ', '')
            .split(',');

          console.log(error.message);
          tickAfter = parseInt(args[1]);
        } else {
          console.log(error.message);
        }
      },
    );

    console.log("ticks:", tickBefore, tickAfter);

    const fixedRateBefore = tickToFixedRate(tickBefore);
    const fixedRateAfter = tickToFixedRate(tickAfter);

    const fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
    const fixedRateDeltaRaw = fixedRateDelta.toNumber();

    return fixedRateDeltaRaw;
  }

  public async settlePosition({ owner, fixedLow, fixedHigh }: AMMSettlePositionArgs) : Promise<ContractTransaction | void>  {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const settlePositionReceipt = await marginEngineContract.settlePosition(
      tickLower,
      tickUpper,
      owner,
    );
    return settlePositionReceipt;
  }

  public async updatePositionMargin({
    owner,
    fixedLow,
    fixedHigh,
    marginDelta,
  }: AMMUpdatePositionMarginArgs) : Promise<ContractTransaction | void>  {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    await this.approveMarginEngine(toBn(marginDelta.toString()));

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const updatePositionMarginReceipt = await marginEngineContract.updatePositionMargin(
      owner,
      tickLower,
      tickUpper,
      toBn(marginDelta.toString())
    );

    return updatePositionMarginReceipt;
  }

  public async liquidatePosition({
    owner,
    fixedLow,
    fixedHigh,
  }: AMMLiquidatePositionArgs) : Promise<ContractTransaction | void>  {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const receipt = await marginEngineContract.liquidatePosition(
      tickLower,
      tickUpper,
      owner
    );

    return receipt;
  }

  public async getLiquidationThreshold({
    owner,
    fixedLow,
    fixedHigh,
  }: AMMLiquidatePositionArgs) : Promise<number | void>  {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const threshold = await marginEngineContract.callStatic.getPositionMarginRequirement(
      owner,
      tickLower,
      tickUpper,
      false
    );

    return parseFloat(utils.formatEther(threshold));
  }

  public async getMinimumMarginRequirementPostMint({ recipient, fixedLow, fixedHigh, notional }: AMMMintArgs): Promise<number | void> {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    await this.approvePeriphery()

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      tickLower,
      tickUpper,
      notional: toBn(notional.toString()),
      isMint: true,
    };

    let marginRequirement = BigNumber.from("0");
    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams)
      .then(
        (result) => {
          marginRequirement = BigNumber.from(result);
        },
        (error) => {
          if (error.message.includes("MarginLessThanMinimum")) {
            const args: string[] = error.message.split("MarginLessThanMinimum")[1]
              .split("(")[1]
              .split(")")[0]
              .replaceAll(" ", "")
              .split(",");

            marginRequirement = BigNumber.from(args[0]);
          } else {
            console.log(error);
          }
        }
      );

    return parseFloat(utils.formatEther(marginRequirement));
  }

  public async mint({ recipient, fixedLow, fixedHigh, notional, margin }: AMMMintArgs): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    if (!this.initialized) {
      const vammContract = vammFactory.connect(this.id, this.signer);

      await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(0).toString());
    }

    await this.updatePositionMargin({ owner: recipient, fixedLow, fixedHigh, marginDelta: margin });

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    await this.approvePeriphery();

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      tickLower,
      tickUpper,
      notional: toBn(notional.toString()),
      isMint: true,
    };

    return peripheryContract.mintOrBurn(mintOrBurnParams);
  }

  public async burn({ recipient, fixedLow, fixedHigh, notional }: AMMBurnArgs): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    await this.approvePeriphery();

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      tickLower,
      tickUpper,
      notional: toBn(notional.toString()),
      isMint: false,
    };

    return peripheryContract.mintOrBurn(mintOrBurnParams);
  }

  public async approvePeriphery(): Promise<ContractTransaction | void> {
    if (!this.signer) return;

    const factoryContract = factoryFactory.connect(FACTORY_ADDRESS, this.signer);
    const signerAddress = await this.signer.getAddress();

    const isApproved = await factoryContract.isApproved(signerAddress, PERIPHERY_ADDRESS);

    if (!isApproved) {
      return await factoryContract.setApproval(PERIPHERY_ADDRESS, true);
    } else {
      return;
    }
  }

  public async approveFCM(): Promise<ContractTransaction | void> {
    if (!this.signer) return;

    const factoryContract = factoryFactory.connect(FACTORY_ADDRESS, this.signer);
    const signerAddress = await this.signer.getAddress();

    const isApproved = await factoryContract.isApproved(signerAddress, this.fcmAddress);

    if (!isApproved) {
      return await factoryContract.setApproval(this.fcmAddress, true);
    } else {
      return;
    }

  }

  public async approveMarginEngine(
    marginDelta: BigNumberish
  ) {
    if (!this.signer) {
      return;
    }

    if (!this.underlyingToken.id) {
      return;
    }

    const token = tokenFactory.connect(this.underlyingToken.id, this.signer);

    await token.approve(this.marginEngineAddress, marginDelta);
  }

  public async swap({
    recipient,
    isFT,
    notional,
    margin,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
  }: AMMSwapArgs): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    await this.updatePositionMargin({ owner: recipient, fixedLow, fixedHigh, marginDelta: margin });

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    }
    else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
      }
    }

    await this.approvePeriphery();

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      isFT,
      notional: toBn(notional.toString()),
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
    };

    return peripheryContract.swap(swapPeripheryParams);
  }

  public async FCMswap({
    notional,
    fixedRateLimit
  }: FCMSwapArgs): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    await this.approveFCM();

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    }
    else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString()
    }

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    return fcmContract.initiateFullyCollateralisedFixedTakerSwap(toBn(notional.toString()), sqrtPriceLimitX96);
  }

  public async FCMunwind({
    notionalToUnwind,
    fixedRateLimit
  }: FCMUnwindArgs): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    }
    else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString()
    }

    await this.approveFCM();

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    return fcmContract.unwindFullyCollateralisedFixedTakerSwap(toBn(notionalToUnwind.toString()), sqrtPriceLimitX96);
  }

  public async settleFCMTrader() : Promise<ContractTransaction | void>  {
    if (!this.signer) {
      return;
    }

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    const receipt = await fcmContract.settleTrader();
    return receipt;
  }

  public get startDateTime(): DateTime {
    return timestampWadToDateTime(this.termStartTimestamp);
  }

  public get endDateTime(): DateTime {
    return timestampWadToDateTime(this.termEndTimestamp);
  }

  public get initialized(): boolean {
    return !JSBI.EQ(this.sqrtPriceX96, JSBI.BigInt(0));
  }

  public get fixedRate(): Price {
    if (!this._fixedRate) {
      if (!this.initialized) {
        return new Price(1, 0);
      }

      this._fixedRate = new Price(JSBI.multiply(this.sqrtPriceX96, this.sqrtPriceX96), Q192);
    }

    return this._fixedRate;
  }

  public get fixedApr(): number {
    return parseInt(this.fixedRate.toFixed(2));
  }

  public get price(): Price {
    if (!this._price) {
      this._price = new Price(Q192, JSBI.multiply(this.sqrtPriceX96, this.sqrtPriceX96));
    }

    return this._price;
  }

  public get variableApr(): number {
    return 0;
  }

  public get protocol(): string {
    const firstProtocolCharacter = this.rateOracle.protocol[0];
    const tokenName = this.underlyingToken.name;

    return `${firstProtocolCharacter.toLowerCase()}${tokenName}`;
  }

  public closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate {
    const fixedRatePrice = Price.fromNumber(fixedRate);
    const closestTick: number = fixedRateToClosestTick(fixedRatePrice);
    const closestUsableTick: number = nearestUsableTick(
      closestTick,
      JSBI.toNumber(this.tickSpacing),
    );
    const closestUsableFixedRate: Price = tickToFixedRate(closestUsableTick);

    return {
      closestUsableTick,
      closestUsableFixedRate,
    };
  }
}

export default AMM;
