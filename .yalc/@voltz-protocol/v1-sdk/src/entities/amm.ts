import JSBI from 'jsbi';
import { constants, ethers, providers } from 'ethers';
import { DateTime } from 'luxon';
import { BigNumber, ContractReceipt, Signer, utils } from 'ethers';

import { SwapPeripheryParams, MintOrBurnParams } from '../types';
import {
  MIN_FIXED_RATE,
  MAX_FIXED_RATE,
  ONE_YEAR_IN_SECONDS,
  MaxUint256Bn,
  TresholdApprovalBn,
  getGasBuffer,
  WETH9,
} from '../constants';
import {
  Periphery__factory as peripheryFactory,
  MarginEngine__factory as marginEngineFactory,
  Factory__factory as factoryFactory,
  // todo: not very elegant to use the mock as a factory
  ERC20Mock__factory as tokenFactory,
  AaveFCM__factory as fcmAaveFactory,
  CompoundFCM__factory as fcmCompoundFactory,
  BaseRateOracle__factory,
  VAMM__factory,
  CompoundFCM,
  ICToken__factory,
} from '../typechain';
import RateOracle from './rateOracle';
import { TickMath } from '../utils/tickMath';
import timestampWadToDateTime from '../utils/timestampWadToDateTime';
import { fixedRateToClosestTick, tickToFixedRate } from '../utils/priceTickConversions';
import { nearestUsableTick } from '../utils/nearestUsableTick';
import Token from './token';
import { Price } from './fractions/price';
import { TokenAmount } from './fractions/tokenAmount';
import { decodeInfoPostMint, decodeInfoPostSwap, getReadableErrorMessage } from '../utils/errors/errorHandling';
import Position from './position';
import { isNumber, isUndefined } from 'lodash';

//1. Import coingecko-api
import CoinGecko from 'coingecko-api';
import { toBn } from 'evm-bn';

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make call to get the price of 1 eth in USD, so divide the value of USD by data
// queries the json response body with price of 1eth in usd
// returns the value of 1 eth in USD 
var geckoEthToUsd = async () => {
  let data = await CoinGeckoClient.simple.price({
    ids: ['ethereum'],
    vs_currencies: ['usd'],
  });
  return data.data.ethereum.usd;
};


export type AMMConstructorArgs = {
  id: string;
  signer: Signer | null;
  provider?: providers.Provider;
  environment: string;
  factoryAddress: string;
  marginEngineAddress: string;
  fcmAddress: string;
  rateOracle: RateOracle;
  updatedTimestamp: JSBI;
  termStartTimestamp: JSBI;
  termEndTimestamp: JSBI;
  underlyingToken: Token;
  tick: number;
  tickSpacing: number;
  txCount: number;
  totalNotionalTraded: JSBI;
  totalLiquidity: JSBI;
  wethAddress?: string;
};

// caps

export type CapInfo = {
  accumulated: number;
  cap: number;
}

// swap

export type AMMGetInfoPostSwapArgs = {
  isFT: boolean;
  notional: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
  margin?: number;
  expectedApr?: number;
};

export type AMMSwapArgs = {
  isFT: boolean;
  notional: number;
  margin: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
  validationOnly?: boolean;
};

export type AMMSwapWithWethArgs = {
  isFT: boolean;
  notional: number;
  margin: number;
  marginEth?: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
  validationOnly?: boolean;
};

export type InfoPostSwap = {
  marginRequirement: number;
  availableNotional: number;
  fee: number;
  slippage: number;
  averageFixedRate: number;
  expectedApy?: number;
};

// rollover with swap

export type AMMRolloverWithSwapArgs = {
  isFT: boolean;
  notional: number;
  margin: number;
  marginEth?: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
  owner: string;
  newMarginEngine: string;
  oldFixedLow: number;
  oldFixedHigh: number;
  validationOnly?: boolean;
};

export type AMMGetInfoPostRolloverWithSwapArgs = {
  isFT: boolean;
  notional: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
  margin?: number;
  owner: string;
  newMarginEngine: string;
  oldFixedLow: number;
  oldFixedHigh: number;
  expectedApr?: number;
};

// mint

export type AMMMintArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  margin: number;
  validationOnly?: boolean;
};

export type AMMMintWithWethArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  marginEth?: number;
  margin: number;
  validationOnly?: boolean;
};

export type AMMGetInfoPostMintArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
}

//rollover with swap

export type AMMRolloverWithMintArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  margin: number;
  marginEth?: number;
  owner: string;
  newMarginEngine: string;
  oldFixedLow: number;
  oldFixedHigh: number;
  validationOnly?: boolean;
};

export type AMMGetInfoPostRolloverWithMintArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  owner: string;
  newMarginEngine: string;
  oldFixedLow: number;
  oldFixedHigh: number;
}

// burn

export type AMMBurnArgs = Omit<AMMMintArgs, 'margin'>;

// update position margin

export type AMMUpdatePositionMarginArgs = {
  owner?: string;
  fixedLow: number;
  fixedHigh: number;
  marginDelta: number;
};

// liquidation

export type AMMLiquidatePositionArgs = {
  owner: string;
  fixedLow: number;
  fixedHigh: number;
};

// settlement

export type AMMSettlePositionArgs = {
  owner?: string;
  fixedLow: number;
  fixedHigh: number;
};

// fcm swap 

export type fcmSwapArgs = {
  notional: number;
  fixedRateLimit?: number;
};

// fcm unwind

export type fcmUnwindArgs = {
  notionalToUnwind: number;
  fixedRateLimit?: number;
};

// dynamic information about position

export type PositionInfo = {
  notionalInUSD: number;
  marginInUSD: number;
  margin: number;
  fees?: number;
  liquidationThreshold?: number;
  safetyThreshold?: number;
  accruedCashflowInUSD: number;
  accruedCashflow: number;
  variableRateSinceLastSwap?: number;
  fixedRateSinceLastSwap?: number;
  beforeMaturity: boolean;
  fixedApr?: number;
  healthFactor?: number;
}

export type ClosestTickAndFixedRate = {
  closestUsableTick: number;
  closestUsableFixedRate: Price;
};

class AMM {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider?: providers.Provider;
  public readonly environment: string;
  public readonly factoryAddress: string;
  public readonly marginEngineAddress: string;
  public readonly fcmAddress: string;
  public readonly rateOracle: RateOracle;
  public readonly updatedTimestamp: JSBI;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public readonly tickSpacing: number;
  public readonly tick: number;
  public readonly txCount: number;
  public readonly totalNotionalTraded: JSBI;
  public readonly totalLiquidity: JSBI;
  public readonly isETH: boolean;
  public readonly wethAddress?: string;
  public readonly isFCM: boolean;

  public constructor({
    id,
    signer,
    provider,
    environment,
    factoryAddress,
    marginEngineAddress,
    fcmAddress,
    rateOracle,
    updatedTimestamp,
    termStartTimestamp,
    termEndTimestamp,
    underlyingToken,
    tick,
    tickSpacing,
    txCount,
    totalNotionalTraded,
    totalLiquidity,
    wethAddress
  }: AMMConstructorArgs) {
    this.id = id;
    this.signer = signer;
    this.provider = provider || signer?.provider;
    this.environment = environment;
    this.factoryAddress = factoryAddress;
    this.marginEngineAddress = marginEngineAddress;
    this.fcmAddress = fcmAddress;
    this.rateOracle = rateOracle;
    this.updatedTimestamp = updatedTimestamp;
    this.termStartTimestamp = termStartTimestamp;
    this.termEndTimestamp = termEndTimestamp;
    this.underlyingToken = underlyingToken;
    this.tickSpacing = tickSpacing;
    this.tick = tick;
    this.txCount = txCount;
    this.totalNotionalTraded = totalNotionalTraded;
    this.totalLiquidity = totalLiquidity;

    if (this.underlyingToken.name === "ETH") {
      this.isETH = true;
      this.isFCM = false;
      if(typeof this.wethAddress !== 'undefined'){
        throw new Error("No WETH address");
      }
      this.wethAddress = wethAddress;
    }
    else {
      this.isETH = false;
      this.isFCM = true;
    }
  }

  // expected apy
  expectedApy = (ft:number, vt: number, margin: number, predictedApr: number) => {
    const timeInYears = 
      BigNumber.from(this.termEndTimestamp.toString())
        .sub(BigNumber.from(this.termStartTimestamp.toString()))
        .div(BigNumber.from(10).pow(15))
        .toNumber() / 1000 / ONE_YEAR_IN_SECONDS;
      
    const variableFactor = -Math.log(predictedApr) / Math.log(timeInYears) - 1;

    const expectedCashflow = ft * timeInYears * 0.01 + vt * variableFactor;

    const result = (1 + expectedCashflow / margin) ^ (1 / timeInYears) - 1;
    return result;
  };

  // rollover with swap

  public async rolloverWithSwap({
    isFT,
    notional,
    margin,
    marginEth,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    owner,
    newMarginEngine,
    oldFixedLow,
    oldFixedHigh,
    validationOnly,
  }: AMMRolloverWithSwapArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh && oldFixedLow >= oldFixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE && oldFixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE && oldFixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (margin < 0) {
      throw new Error('Amount of margin cannot be negative');
    }

    if(marginEth && marginEth < 0){
      throw new Error('Amount of margin in ETH cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    if (validationOnly) {
      return;
    }

    const effectiveOwner = (!owner) ? await this.signer.getAddress() : owner;

    const { closestUsableTick: oldTickUpper } = this.closestTickAndFixedRate(oldFixedLow);
    const { closestUsableTick: oldTickLower } = this.closestTickAndFixedRate(oldFixedHigh);

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
      }
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    let swapPeripheryParams: SwapPeripheryParams;
    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};
    

    if (this.isETH) {
      swapPeripheryParams = {
        marginEngine: newMarginEngine,
        isFT,
        notional: scaledNotional,
        sqrtPriceLimitX96,
        tickLower,
        tickUpper,
        marginDelta: '0',
      };

      tempOverrides.value = ethers.utils.parseEther(margin.toString());
    }
    else {
      const scaledMarginDelta = this.scale(margin);

      swapPeripheryParams = {
        marginEngine: newMarginEngine,
        isFT,
        notional: scaledNotional,
        sqrtPriceLimitX96,
        tickLower,
        tickUpper,
        marginDelta: scaledMarginDelta,
      };
    }

    await peripheryContract.callStatic.rolloverWithSwap(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      swapPeripheryParams,
      tempOverrides
    ).catch(async (error: any) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    })

    const estimatedGas = await peripheryContract.estimateGas.rolloverWithSwap(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      swapPeripheryParams,
      tempOverrides
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const swapTransaction = await peripheryContract.rolloverWithSwap(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      swapPeripheryParams,
      tempOverrides
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await swapTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  public async getInfoPostRolloverWithSwap({
    isFT,
    notional,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    margin,
    owner,
    newMarginEngine,
    oldFixedLow,
    oldFixedHigh,
    expectedApr
  }: AMMGetInfoPostRolloverWithSwapArgs): Promise<InfoPostSwap> {

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh && oldFixedLow >= oldFixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE && oldFixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE && oldFixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    const effectiveOwner = (!owner) ? await this.signer.getAddress() : owner;

    const { closestUsableTick: oldTickUpper } = this.closestTickAndFixedRate(oldFixedLow);
    const { closestUsableTick: oldTickLower } = this.closestTickAndFixedRate(oldFixedHigh);

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
      }
    }

    const scaledNotional = this.scale(notional);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngine: newMarginEngine,
      isFT,
      notional: scaledNotional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: 0
    };

    let tickBefore = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    let tickAfter = 0;
    let marginRequirement: BigNumber = BigNumber.from(0);
    let fee = BigNumber.from(0);
    let availableNotional = BigNumber.from(0);
    let fixedTokenDeltaUnbalanced = BigNumber.from(0);
    let fixedTokenDelta = BigNumber.from(0);

    await peripheryContract.callStatic.rolloverWithSwap(
        this.marginEngineAddress,
        effectiveOwner,
        oldTickLower,
        oldTickUpper,
        swapPeripheryParams
      ).then(
      (result: any) => {
        availableNotional = result[1];
        fee = result[2];
        fixedTokenDeltaUnbalanced = result[3];
        marginRequirement = result[4];
        tickAfter = parseInt(result[5]);
      },
      (error: any) => {
        const result = decodeInfoPostSwap(error, this.environment);
        marginRequirement = result.marginRequirement;
        tickAfter = result.tick;
        fee = result.fee;
        availableNotional = result.availableNotional;
        fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
        fixedTokenDelta = result.fixedTokenDelta;
      },
    );

    const fixedRateBefore = tickToFixedRate(tickBefore);
    const fixedRateAfter = tickToFixedRate(tickAfter);

    const fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
    const fixedRateDeltaRaw = fixedRateDelta.toNumber();

    const marginEngineContract = marginEngineFactory.connect(newMarginEngine, this.signer);
    const currentMargin = (
      await marginEngineContract.callStatic.getPosition(effectiveOwner, tickLower, tickUpper)
    ).margin;

    const scaledCurrentMargin = this.descale(currentMargin);
    const scaledAvailableNotional = this.descale(availableNotional);
    const scaledFee = this.descale(fee);
    const scaledMarginRequirement = (this.descale(marginRequirement) + scaledFee) * 1.01;

    const additionalMargin =
      scaledMarginRequirement > scaledCurrentMargin
        ? scaledMarginRequirement - scaledCurrentMargin
        : 0;

    const averageFixedRate = (availableNotional.eq(BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;

    const result: InfoPostSwap = {
      marginRequirement: additionalMargin,
      availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
      fee: scaledFee < 0 ? -scaledFee : scaledFee,
      slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
      averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
    };

    if (isNumber(expectedApr) && isNumber(margin)) {
      result.expectedApy = this.expectedApy(
        this.descale(fixedTokenDelta),
        scaledAvailableNotional,
        margin,
        expectedApr
      );
    }

    return result;
  }

  // rollover with mint

  public async rolloverWithMint({
    fixedLow,
    fixedHigh,
    notional,
    margin,
    marginEth,
    owner,
    newMarginEngine,
    oldFixedLow,
    oldFixedHigh,
    validationOnly,
  }: AMMRolloverWithMintArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh && oldFixedLow >= oldFixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE && oldFixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE && oldFixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (margin < 0) {
      throw new Error('Amount of margin cannot be negative');
    }

    if(marginEth && marginEth < 0){
      throw new Error('Amount of margin in ETH cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    if (validationOnly) {
      return;
    }

    const effectiveOwner = (!owner) ? await this.signer.getAddress() : owner;

    const { closestUsableTick: oldTickUpper } = this.closestTickAndFixedRate(oldFixedLow);
    const { closestUsableTick: oldTickLower } = this.closestTickAndFixedRate(oldFixedHigh);

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const _notional = this.scale(notional);

    let mintOrBurnParams: MintOrBurnParams;
    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};

    if (this.isETH && marginEth) {
      tempOverrides.value = ethers.utils.parseEther(marginEth.toString());
    }

    const scaledMarginDelta = this.scale(margin);

    mintOrBurnParams = {
      marginEngine: newMarginEngine,
      tickLower,
      tickUpper,
      notional: _notional,
      isMint: true,
      marginDelta: scaledMarginDelta,
    };
    

    await peripheryContract.callStatic.rolloverWithMint(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      mintOrBurnParams,
      tempOverrides
      ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.rolloverWithMint(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      mintOrBurnParams,
      tempOverrides
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const mintTransaction = await peripheryContract.rolloverWithMint(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      mintOrBurnParams,
      tempOverrides
      ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await mintTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  public async getInfoPostRolloverWithMint({
    fixedLow,
    fixedHigh,
    notional,
    owner,
    newMarginEngine,
    oldFixedLow,
    oldFixedHigh
  }: AMMGetInfoPostRolloverWithMintArgs): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh && oldFixedLow >= oldFixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE && oldFixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE && oldFixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    const effectiveOwner = (!owner) ? await this.signer.getAddress() : owner;

    const { closestUsableTick: oldTickUpper } = this.closestTickAndFixedRate(oldFixedLow);
    const { closestUsableTick: oldTickLower } = this.closestTickAndFixedRate(oldFixedHigh);

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);
    const mintOrBurnParams: MintOrBurnParams = {
      marginEngine: newMarginEngine,
      tickLower: tickLower,
      tickUpper: tickUpper,
      notional: scaledNotional,
      isMint: true,
      marginDelta: '0',
    };

    let marginRequirement = BigNumber.from('0');
    await peripheryContract.callStatic.rolloverWithMint(
      this.marginEngineAddress,
      effectiveOwner,
      oldTickLower,
      oldTickUpper,
      mintOrBurnParams
      ).then(
      (result) => {
        marginRequirement = BigNumber.from(result);
      },
      (error) => {
        const result = decodeInfoPostMint(error, this.environment);
        marginRequirement = result.marginRequirement;
      },
    );

    const marginEngineContract = marginEngineFactory.connect(newMarginEngine, this.signer);
    const currentMargin = (
      await marginEngineContract.callStatic.getPosition(effectiveOwner, tickLower, tickUpper)
    ).margin;

    const scaledCurrentMargin = this.descale(currentMargin);
    const scaledMarginRequirement = this.descale(marginRequirement) * 1.01;

    if (scaledMarginRequirement > scaledCurrentMargin) {
      return scaledMarginRequirement - scaledCurrentMargin;
    } else {
      return 0;
    }
  }

  // swap

  public async getInfoPostSwap({
    isFT,
    notional,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    margin,
    expectedApr
  }: AMMGetInfoPostSwapArgs): Promise<InfoPostSwap> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    const signerAddress = await this.signer.getAddress();

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
      }
    }

    const scaledNotional = this.scale(notional);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngine: this.marginEngineAddress,
      isFT,
      notional: scaledNotional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: '0',
    };

    let tickBefore = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    let tickAfter = 0;
    let marginRequirement: BigNumber = BigNumber.from(0);
    let fee = BigNumber.from(0);
    let availableNotional = BigNumber.from(0);
    let fixedTokenDeltaUnbalanced = BigNumber.from(0);
    let fixedTokenDelta = BigNumber.from(0);

    await peripheryContract.callStatic.swap(swapPeripheryParams).then(
      (result: any) => {
        availableNotional = result[1];
        fee = result[2];
        fixedTokenDeltaUnbalanced = result[3];
        marginRequirement = result[4];
        tickAfter = parseInt(result[5]);
      },
      (error: any) => {
        const result = decodeInfoPostSwap(error, this.environment);
        marginRequirement = result.marginRequirement;
        tickAfter = result.tick;
        fee = result.fee;
        availableNotional = result.availableNotional;
        fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
        fixedTokenDelta = result.fixedTokenDelta;
      },
    );

    const fixedRateBefore = tickToFixedRate(tickBefore);
    const fixedRateAfter = tickToFixedRate(tickAfter);

    const fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
    const fixedRateDeltaRaw = fixedRateDelta.toNumber();

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const currentMargin = (
      await marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)
    ).margin;

    const scaledCurrentMargin = this.descale(currentMargin);
    const scaledAvailableNotional = this.descale(availableNotional);
    const scaledFee = this.descale(fee);
    const scaledMarginRequirement = (this.descale(marginRequirement) + scaledFee) * 1.01;

    const additionalMargin =
      scaledMarginRequirement > scaledCurrentMargin
        ? scaledMarginRequirement - scaledCurrentMargin
        : 0;

    const averageFixedRate = (availableNotional.eq(BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;

    const result: InfoPostSwap = {
      marginRequirement: additionalMargin,
      availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
      fee: scaledFee < 0 ? -scaledFee : scaledFee,
      slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
      averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
    };

    if (isNumber(expectedApr) && isNumber(margin)) {
      result.expectedApy = this.expectedApy(
        this.descale(fixedTokenDelta),
        scaledAvailableNotional,
        margin,
        expectedApr
      );
    }

    return result;
  }

  public async swap({
    isFT,
    notional,
    margin,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    validationOnly,
  }: AMMSwapArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (margin < 0) {
      throw new Error('Amount of margin cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    if (validationOnly) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
      }
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    let swapPeripheryParams: SwapPeripheryParams;
    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};

    if (this.isETH) {
      swapPeripheryParams = {
        marginEngine: this.marginEngineAddress,
        isFT,
        notional: scaledNotional,
        sqrtPriceLimitX96,
        tickLower,
        tickUpper,
        marginDelta: 0, //
      };

      tempOverrides.value = ethers.utils.parseEther(margin.toString());
    }
    else {
      const scaledMarginDelta = this.scale(margin);

      swapPeripheryParams = {
        marginEngine: this.marginEngineAddress,
        isFT,
        notional: scaledNotional,
        sqrtPriceLimitX96,
        tickLower,
        tickUpper,
        marginDelta: scaledMarginDelta,
      };
    }

    await peripheryContract.callStatic.swap(swapPeripheryParams, tempOverrides).catch(async (error: any) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.swap(swapPeripheryParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const swapTransaction = await peripheryContract.swap(swapPeripheryParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await swapTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  public async swapWithWeth({
    isFT,
    notional,
    margin,
    marginEth,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    validationOnly,
  }: AMMSwapWithWethArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (margin < 0) {
      throw new Error('Amount of margin cannot be negative');
    }

    if(marginEth && marginEth < 0){
      throw new Error('Amount of margin in ETH cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    if (validationOnly) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
      }
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    let swapPeripheryParams: SwapPeripheryParams;
    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};

    if (this.isETH && marginEth) {
      tempOverrides.value = ethers.utils.parseEther(marginEth.toString());
    }

    const scaledMarginDelta = this.scale(margin);

    swapPeripheryParams = {
      marginEngine: this.marginEngineAddress,
      isFT,
      notional: scaledNotional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: scaledMarginDelta,
    };

    await peripheryContract.callStatic.swap(swapPeripheryParams, tempOverrides).catch(async (error: any) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.swap(swapPeripheryParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const swapTransaction = await peripheryContract.swap(swapPeripheryParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await swapTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // mint

  public async getInfoPostMint({
    fixedLow,
    fixedHigh,
    notional,
  }: AMMGetInfoPostMintArgs): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    const signerAddress = await this.signer.getAddress();
    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);
    const mintOrBurnParams: MintOrBurnParams = {
      marginEngine: this.marginEngineAddress,
      tickLower: tickLower,
      tickUpper: tickUpper,
      notional: scaledNotional,
      isMint: true,
      marginDelta: '0',
    };

    let marginRequirement = BigNumber.from('0');
    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).then(
      (result) => {
        marginRequirement = BigNumber.from(result);
      },
      (error) => {
        const result = decodeInfoPostMint(error, this.environment);
        marginRequirement = result.marginRequirement;
      },
    );

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const currentMargin = (
      await marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)
    ).margin;

    const scaledCurrentMargin = this.descale(currentMargin);
    const scaledMarginRequirement = this.descale(marginRequirement) * 1.01;

    if (scaledMarginRequirement > scaledCurrentMargin) {
      return scaledMarginRequirement - scaledCurrentMargin;
    } else {
      return 0;
    }
  }

  public async mint({
    fixedLow,
    fixedHigh,
    notional,
    margin,
    validationOnly,
  }: AMMMintArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (margin < 0) {
      throw new Error('Amount of margin cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    if (validationOnly) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const _notional = this.scale(notional);

    let mintOrBurnParams: MintOrBurnParams;
    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};

    if (this.isETH) {
      mintOrBurnParams = {
        marginEngine: this.marginEngineAddress,
        tickLower,
        tickUpper,
        notional: _notional,
        isMint: true,
        marginDelta: 0,
      };

      tempOverrides.value = ethers.utils.parseEther(margin.toString());
    }
    else {
      const scaledMarginDelta = this.scale(margin);

      mintOrBurnParams = {
        marginEngine: this.marginEngineAddress,
        tickLower,
        tickUpper,
        notional: _notional,
        isMint: true,
        marginDelta: scaledMarginDelta,
      };
    }

    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const mintTransaction = await peripheryContract.mintOrBurn(mintOrBurnParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await mintTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  public async mintWithWeth({
    fixedLow,
    fixedHigh,
    notional,
    margin,
    marginEth,
    validationOnly,
  }: AMMMintWithWethArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (margin < 0) {
      throw new Error('Amount of margin cannot be negative');
    }

    if(marginEth && marginEth < 0){
      throw new Error('Amount of margin in ETH cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    if (validationOnly) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const _notional = this.scale(notional);

    let mintOrBurnParams: MintOrBurnParams;
    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};

    if (this.isETH && marginEth) {
      tempOverrides.value = ethers.utils.parseEther(marginEth.toString());
    }
    
    const scaledMarginDelta = this.scale(margin);

    mintOrBurnParams = {
      marginEngine: this.marginEngineAddress,
      tickLower,
      tickUpper,
      notional: _notional,
      isMint: true,
      marginDelta: scaledMarginDelta,
    };
    

    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const mintTransaction = await peripheryContract.mintOrBurn(mintOrBurnParams, tempOverrides).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await mintTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // burn

  public async burn({
    fixedLow,
    fixedHigh,
    notional,
    validationOnly,
  }: AMMBurnArgs): Promise<ContractReceipt | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (fixedLow >= fixedHigh) {
      throw new Error('Lower Rate must be smaller than Upper Rate');
    }

    if (fixedLow < MIN_FIXED_RATE) {
      throw new Error('Lower Rate is too low');
    }

    if (fixedHigh > MAX_FIXED_RATE) {
      throw new Error('Upper Rate is too high');
    }

    if (notional <= 0) {
      throw new Error('Amount of notional must be greater than 0');
    }

    if (validationOnly) {
      return;
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    const _notional = this.scale(notional);

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngine: this.marginEngineAddress,
      tickLower,
      tickUpper,
      notional: _notional,
      isMint: false,
      marginDelta: '0',
    };

    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams);

    const burnTransaction = await peripheryContract.mintOrBurn(mintOrBurnParams, {
      gasLimit: getGasBuffer(estimatedGas)
    }).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    try {
      const receipt = await burnTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // update position margin

  public async updatePositionMargin({
    fixedLow,
    fixedHigh,
    marginDelta,
  }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt | void> {

    if (!this.signer) {
      return;
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (marginDelta === 0) {
      throw new Error('No margin delta to update');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let tempOverrides: {value?: BigNumber, gasLimit?: BigNumber} = {};
    let scaledMarginDelta: string;

    if (this.isETH && marginDelta > 0) {
      tempOverrides.value = ethers.utils.parseEther(marginDelta.toString());
      scaledMarginDelta = "0";
    }
    else {
      scaledMarginDelta = this.scale(marginDelta);
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    await peripheryContract.callStatic.updatePositionMargin(
      this.marginEngineAddress,
      tickLower,
      tickUpper,
      scaledMarginDelta,
      false,
      tempOverrides
    ).catch(async (error: any) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.updatePositionMargin(
      this.marginEngineAddress,
      tickLower,
      tickUpper,
      scaledMarginDelta,
      false,
      tempOverrides
    );

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const updatePositionMarginTransaction = await peripheryContract.updatePositionMargin(
      this.marginEngineAddress,
      tickLower,
      tickUpper,
      scaledMarginDelta,
      false,
      tempOverrides
    );

    try {
      const receipt = await updatePositionMarginTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // liquidation 

  public async liquidatePosition({
    owner,
    fixedLow,
    fixedHigh,
  }: AMMLiquidatePositionArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);

    await marginEngineContract.callStatic.liquidatePosition(owner, tickLower, tickUpper).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await marginEngineContract.estimateGas.liquidatePosition(owner, tickLower, tickUpper);

    const liquidatePositionTransaction = await marginEngineContract.liquidatePosition(owner, tickLower, tickUpper, {
      gasLimit: getGasBuffer(estimatedGas)
    });

    try {
      const receipt = await liquidatePositionTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // settlement

  public async settlePosition({
    owner,
    fixedLow,
    fixedHigh,
  }: AMMSettlePositionArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const effectiveOwner = (!owner) ? await this.signer.getAddress() : owner;

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    await peripheryContract.callStatic.settlePositionAndWithdrawMargin(
      this.marginEngineAddress,
      effectiveOwner,
      tickLower,
      tickUpper
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.settlePositionAndWithdrawMargin(
      this.marginEngineAddress,
      effectiveOwner,
      tickLower,
      tickUpper
    );

    const settlePositionTransaction = await peripheryContract.settlePositionAndWithdrawMargin(
      this.marginEngineAddress,
      effectiveOwner,
      tickLower,
      tickUpper,
      {
        gasLimit: getGasBuffer(estimatedGas)
      }
    );

    try {
      const receipt = await settlePositionTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // FCM swap

  public async getInfoPostFCMSwap({
    notional,
    fixedRateLimit,
  }: fcmSwapArgs): Promise<InfoPostSwap> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    }

    let fcmContract;
    switch (this.rateOracle.protocolId) {
      case 1: {
        fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        break;
      }

      case 2: {
        fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }
    const scaledNotional = this.scale(notional);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    let tickBefore = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    let tickAfter = 0;
    let fee = BigNumber.from(0);
    let availableNotional = BigNumber.from(0);
    let fixedTokenDeltaUnbalanced = BigNumber.from(0);

    await fcmContract.callStatic.initiateFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    ).then(async (result: any) => {
      availableNotional = result[1];
      fee = result[2];
      fixedTokenDeltaUnbalanced = result[3];
      tickAfter = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    },
      (error: any) => {
        const result = decodeInfoPostSwap(error, this.environment);
        tickAfter = result.tick;
        fee = result.fee;
        availableNotional = result.availableNotional;
        fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
      });

    const fixedRateBefore = tickToFixedRate(tickBefore);
    const fixedRateAfter = tickToFixedRate(tickAfter);

    const fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
    const fixedRateDeltaRaw = fixedRateDelta.toNumber();

    const scaledAvailableNotional = this.descale(availableNotional);
    const scaledFee = this.descale(fee);

    const averageFixedRate = (availableNotional.eq(BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;

    let additionalMargin = 0;
    switch (this.rateOracle.protocolId) {
      case 1: {
        additionalMargin = scaledAvailableNotional;
        break;
      }

      case 2: {
        const cTokenAddress = await (fcmContract as CompoundFCM).cToken();
        const cTokenContract = ICToken__factory.connect(cTokenAddress, this.signer);
        const rate = await cTokenContract.exchangeRateStored();
        const scaledRate = this.descaleCompoundValue(rate);
        additionalMargin = scaledAvailableNotional / scaledRate;
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }

    return {
      marginRequirement: additionalMargin < 0 ? -additionalMargin : additionalMargin,
      availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
      fee: scaledFee < 0 ? -scaledFee : scaledFee,
      slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
      averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
    };
  }

  public async fcmSwap({
    notional,
    fixedRateLimit,
  }: fcmSwapArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    }

    let fcmContract;
    switch (this.rateOracle.protocolId) {
      case 1: {
        fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        break;
      }

      case 2: {
        fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }
    const scaledNotional = this.scale(notional);

    await fcmContract.callStatic.initiateFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await fcmContract.estimateGas.initiateFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    );

    const fcmSwapTransaction = await fcmContract.initiateFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96,
      {
        gasLimit: getGasBuffer(estimatedGas)
      }
    );

    try {
      const receipt = await fcmSwapTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // FCM unwind

  public async getInfoPostFCMUnwind({
    notionalToUnwind,
    fixedRateLimit,
  }: fcmUnwindArgs): Promise<InfoPostSwap> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
    }

    let fcmContract;
    switch (this.rateOracle.protocolId) {
      case 1:
        fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        break;

      case 2:
        fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        break;

      default:
        throw new Error("Unrecognized FCM");
    }

    const scaledNotional = this.scale(notionalToUnwind);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    let tickBefore = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    let tickAfter = 0;
    let fee = BigNumber.from(0);
    let availableNotional = BigNumber.from(0);
    let fixedTokenDeltaUnbalanced = BigNumber.from(0);

    await fcmContract.callStatic.unwindFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    ).then(async (result: any) => {
      availableNotional = result[1];
      fee = result[2];
      fixedTokenDeltaUnbalanced = result[3];
      tickAfter = await peripheryContract.getCurrentTick(this.marginEngineAddress);
    },
      (error: any) => {
        const result = decodeInfoPostSwap(error, this.environment);
        tickAfter = result.tick;
        fee = result.fee;
        availableNotional = result.availableNotional;
        fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
      });

    const fixedRateBefore = tickToFixedRate(tickBefore);
    const fixedRateAfter = tickToFixedRate(tickAfter);

    const fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
    const fixedRateDeltaRaw = fixedRateDelta.toNumber();

    const scaledAvailableNotional = this.descale(availableNotional);
    const scaledFee = this.descale(fee);

    const averageFixedRate = (availableNotional.eq(BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;

    return {
      marginRequirement: 0,
      availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
      fee: scaledFee < 0 ? -scaledFee : scaledFee,
      slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
      averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
    };
  }

  public async fcmUnwind({
    notionalToUnwind,
    fixedRateLimit,
  }: fcmUnwindArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
    }

    let fcmContract;
    switch (this.rateOracle.protocolId) {
      case 1:
        fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        break;

      case 2:
        fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        break;

      default:
        throw new Error("Unrecognized FCM");
    }

    const scaledNotional = this.scale(notionalToUnwind);

    await fcmContract.callStatic.unwindFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await fcmContract.estimateGas.unwindFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    );

    const fcmUnwindTransaction = await fcmContract.unwindFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96,
      {
        gasLimit: getGasBuffer(estimatedGas)
      }
    );

    try {
      const receipt = await fcmUnwindTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // FCM settlement

  public async settleFCMTrader(): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let fcmContract;
    switch (this.rateOracle.protocolId) {
      case 1:
        fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        break;

      case 2:
        fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        break;

      default:
        throw new Error("Unrecognized FCM");
    }

    await fcmContract.callStatic.settleTrader().catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const estimatedGas = await fcmContract.estimateGas.settleTrader();

    const fcmSettleTraderTransaction = await fcmContract.settleTrader({
      gasLimit: getGasBuffer(estimatedGas)
    });

    try {
      const receipt = await fcmSettleTraderTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // scale/descale according to underlying token

  public scale(value: number): string {
    const price = Price.fromNumber(value);
    const tokenAmount = TokenAmount.fromFractionalAmount(
      this.underlyingToken,
      price.numerator,
      price.denominator,
    );
    const scaledValue = tokenAmount.scale();

    return scaledValue;
  }

  public descale(value: BigNumber): number {
    if (this.underlyingToken.decimals <= 3) {
      return value.toNumber() / (10 ** this.underlyingToken.decimals);
    }
    else {
      return value.div(BigNumber.from(10).pow(this.underlyingToken.decimals - 3)).toNumber() / 1000;
    }
  }

  // descale compound tokens

  public descaleCompoundValue(value: BigNumber): number {
    const scaledValue = (value.div(BigNumber.from(10).pow(this.underlyingToken.decimals)).div(BigNumber.from(10).pow(4))).toNumber() / 1000000;

    return scaledValue;
  }

  // fcm approval

  public async isFCMApproved(): Promise<boolean | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const signerAddress = await this.signer.getAddress();
    const isApproved = await factoryContract.isApproved(signerAddress, this.fcmAddress);

    return isApproved;
  }

  public async approveFCM(): Promise<ContractReceipt | void> {
    const isApproved = await this.isFCMApproved();

    if (isApproved) {
      return;
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);

    const estimatedGas = await factoryContract.estimateGas.setApproval(this.fcmAddress, true);

    const approvalTransaction = await factoryContract.setApproval(this.fcmAddress, true, {
      gasLimit: getGasBuffer(estimatedGas)
    });

    try {
      const receipt = await approvalTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Transaction Confirmation Error");
    }
  }

  // underlying token approval for periphery

  public async isUnderlyingTokenApprovedForPeriphery(): Promise<boolean | void> {
    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (this.isETH) {
      return true;
    }

    const signerAddress = await this.signer.getAddress();
    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);
    
    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const allowance = await token.allowance(signerAddress, peripheryAddress);

    return allowance.gte(TresholdApprovalBn);
  }

  public async isWethTokenApprovedForPeriphery(): Promise<boolean | void> {
    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (!this.isETH) {
      throw new Error('Not an ETH pool');
    }

    if (!this.wethAddress) {
      throw new Error('No WETH address');
    }

    const signerAddress = await this.signer.getAddress();
    const token = tokenFactory.connect(this.wethAddress, this.signer);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const allowance = await token.allowance(signerAddress, peripheryAddress);

    return allowance.gte(TresholdApprovalBn);
  }

  public async approveUnderlyingTokenForPeriphery(): Promise<ContractReceipt | void> {

    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let isApproved;
    let tokenAddress = this.underlyingToken.id;

    if(this.isETH && this.wethAddress) {
      isApproved = await this.isWethTokenApprovedForPeriphery();
      tokenAddress = this.wethAddress;      
    } else {
      isApproved = await this.isUnderlyingTokenApprovedForPeriphery();
    }
    
    if (isApproved) {
      return;
    }

    const token = tokenFactory.connect(tokenAddress, this.signer);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const estimatedGas = await token.estimateGas.approve(peripheryAddress, MaxUint256Bn);

    const approvalTransaction = await token.approve(peripheryAddress, MaxUint256Bn, {
      gasLimit: getGasBuffer(estimatedGas)
    });

    try {
      const receipt = await approvalTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Token approval failed");
    }
  }

  // underlying token approval for fcm

  public async isUnderlyingTokenApprovedForFCM(): Promise<boolean | void> {
    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();
    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);
    const allowance = await token.allowance(signerAddress, this.fcmAddress);

    return allowance.gte(TresholdApprovalBn);
  }

  public async approveUnderlyingTokenForFCM(): Promise<ContractReceipt | void> {
    const isApproved = await this.isUnderlyingTokenApprovedForFCM();
    if (isApproved) {
      return;
    }

    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);

    const estimatedGas = await token.estimateGas.approve(this.fcmAddress, MaxUint256Bn);

    const approvalTransaction = await token.approve(this.fcmAddress, MaxUint256Bn, {
      gasLimit: getGasBuffer(estimatedGas)
    });

    try {
      const receipt = await approvalTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Token approval failed");
    }
  }

  // yield bearing token approval for fcm

  public async isYieldBearingTokenApprovedForFCM(): Promise<boolean | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let tokenAddress;
    switch (this.rateOracle.protocolId) {
      case 1: {
        const fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.underlyingYieldBearingToken();
        break;
      }

      case 2: {
        const fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.cToken();
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }

    const signerAddress = await this.signer.getAddress();

    const token = tokenFactory.connect(tokenAddress, this.signer);
    const allowance = await token.allowance(signerAddress, this.fcmAddress);

    return allowance.gte(TresholdApprovalBn);
  }

  // protocol name

  public get protocol(): string {
    const tokenName = this.underlyingToken.name;

    let prefix: string;
    switch(this.rateOracle.protocolId) {
      case 1: {
        prefix = "a";
        break;
      }
      case 2: {
        prefix = "c";
        break;
      }
      case 3: {
        prefix = "st";
        break;
      }
      case 4: {
        prefix = "r";
        break;
      }
      default: {
        throw new Error("Unrecognized protocol");
      }
    }

    return `${prefix}${tokenName}`;
  }

  public async approveYieldBearingTokenForFCM(): Promise<ContractReceipt | void> {
    const isApproved = await this.isYieldBearingTokenApprovedForFCM();
    if (isApproved) {
      return;
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let tokenAddress;
    switch (this.rateOracle.protocolId) {
      case 1: {
        const fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.underlyingYieldBearingToken();
        break;
      }

      case 2: {
        const fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.cToken();
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }

    const token = tokenFactory.connect(tokenAddress, this.signer);

    const estimatedGas = await token.estimateGas.approve(this.fcmAddress, MaxUint256Bn);

    const approvalTransaction = await token.approve(this.fcmAddress, MaxUint256Bn, {
      gasLimit: getGasBuffer(estimatedGas)
    });

    try {
      const receipt = await approvalTransaction.wait();
      return receipt;
    }
    catch (error) {
      throw new Error("Token approval failed");
    }
  }

  // start and end dates

  public get startDateTime(): DateTime {
    return timestampWadToDateTime(this.termStartTimestamp);
  }

  public get endDateTime(): DateTime {
    return timestampWadToDateTime(this.termEndTimestamp);
  }

  // get position information

  public async getFixedApr(): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }
    const factoryContract = factoryFactory.connect(this.factoryAddress, this.provider);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.provider);
    const currentTick = await peripheryContract.callStatic.getCurrentTick(this.marginEngineAddress);
    const apr = tickToFixedRate(currentTick).toNumber();

    return apr;
  }

  public async getVariableApy(): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

    const marginEngineContract = marginEngineFactory.connect(
      this.marginEngineAddress,
      this.provider,
    );
    const historicalApy = await marginEngineContract.callStatic.getHistoricalApy();

    return parseFloat(utils.formatEther(historicalApy));
  }

  public getAllSwaps(position: Position) {
    const allSwaps: {
      fDelta: BigNumber,
      vDelta: BigNumber,
      timestamp: BigNumber
    }[] = [];

    for (let s of position.swaps) {
      allSwaps.push({
        fDelta: BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
        vDelta: BigNumber.from(s.variableTokenDelta.toString()),
        timestamp: BigNumber.from(s.transactionTimestamp.toString())
      })
    }

    for (let s of position.fcmSwaps) {
      allSwaps.push({
        fDelta: BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
        vDelta: BigNumber.from(s.variableTokenDelta.toString()),
        timestamp: BigNumber.from(s.transactionTimestamp.toString())
      })
    }

    for (let s of position.fcmUnwinds) {
      allSwaps.push({
        fDelta: BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
        vDelta: BigNumber.from(s.variableTokenDelta.toString()),
        timestamp: BigNumber.from(s.transactionTimestamp.toString())
      })
    }

    allSwaps.sort((a, b) => a.timestamp.sub(b.timestamp).toNumber());

    return allSwaps;
  }

  public async getAccruedCashflow(allSwaps: {
    fDelta: BigNumber,
    vDelta: BigNumber,
    timestamp: BigNumber
  }[], atMaturity: boolean): Promise<number> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    let accruedCashflow = BigNumber.from(0);
    let lenSwaps = allSwaps.length;

    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 2)).timestamp);

    let untilTimestamp = (atMaturity)
      ? BigNumber.from(this.termEndTimestamp.toString())
      : lastBlockTimestamp.mul(BigNumber.from(10).pow(18));

    const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);

    for (let i = 0; i < lenSwaps; i++) {
      const currentSwapTimestamp = allSwaps[i].timestamp.mul(BigNumber.from(10).pow(18));

      const normalizedTime = (untilTimestamp.sub(currentSwapTimestamp)).div(BigNumber.from(ONE_YEAR_IN_SECONDS))

      const variableFactorBetweenSwaps = await rateOracleContract.callStatic.variableFactor(currentSwapTimestamp, untilTimestamp);

      const fixedCashflow = allSwaps[i].fDelta.mul(normalizedTime).div(BigNumber.from(100)).div(BigNumber.from(10).pow(18));
      const variableCashflow = allSwaps[i].vDelta.mul(variableFactorBetweenSwaps).div(BigNumber.from(10).pow(18));

      const cashflow = fixedCashflow.add(variableCashflow);
      accruedCashflow = accruedCashflow.add(cashflow);
    }

    return this.descale(accruedCashflow);
  }

  public async getVariableFactor(termStartTimestamp: BigNumber, termEndTimestamp: BigNumber): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }
    const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
    try {
      const result = await rateOracleContract.callStatic.variableFactor(termStartTimestamp, termEndTimestamp);
      const resultScaled = result.div(BigNumber.from(10).pow(12)).toNumber() / 1000000;
      return resultScaled;
    }
    catch (error) {
      throw new Error("Cannot get variable factor");
    }
  }

  public async getPositionInformation(position: Position): Promise<PositionInfo> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

    let results: PositionInfo = {
      notionalInUSD: 0,
      marginInUSD: 0,
      margin: 0,
      accruedCashflowInUSD: 0,
      accruedCashflow: 0,
      beforeMaturity: false
    };

    const signerAddress = await this.signer.getAddress();
    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);

    const beforeMaturity = (lastBlockTimestamp.mul(BigNumber.from(10).pow(18))).lt(BigNumber.from(this.termEndTimestamp.toString()));
    results.beforeMaturity = beforeMaturity;

    // fixed apr
    if (beforeMaturity) {
      results.fixedApr = await this.getFixedApr();
    }

    const allSwaps = this.getAllSwaps(position);
    const lenSwaps = allSwaps.length;

    // variable apy and accrued cashflow

    if (lenSwaps > 0) {
      if (beforeMaturity) {
        if (lenSwaps > 0) {
          try {
            results.variableRateSinceLastSwap = await this.getInstantApy() * 100;
            results.fixedRateSinceLastSwap = position.averageFixedRate;
            
            const accruedCashflowInUnderlyingToken = await this.getAccruedCashflow(allSwaps, false);
            results.accruedCashflow = accruedCashflowInUnderlyingToken;

            // Get current exchange rate for eth/usd
            const EthToUsdPrice = await geckoEthToUsd();

            if (this.isETH) {
              // need to change when introduce non-stable coins
              results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken * EthToUsdPrice;
            } else {
              results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken
            }

          } catch (_) { }
        }
      }
      else {
        if (!position.isSettled) {
          try {
            const accruedCashflowInUnderlyingToken = await this.getAccruedCashflow(allSwaps, true);
            results.accruedCashflow = accruedCashflowInUnderlyingToken;

            // Get current exchange rate for eth/usd
            const EthToUsdPrice = await geckoEthToUsd();

            if (this.isETH) {
              // need to change when introduce non-stable coins
              results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken * EthToUsdPrice;
            } else {
              results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken
            }

          } catch (_) { }
        }
      }
    }

    // margin and fees information

    if (position.source.includes("FCM")) {
      switch (this.rateOracle.protocolId) {
        case 1: {
          const fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
          const margin = (await fcmContract.getTraderMarginInATokens(signerAddress));
          results.margin = this.descale(margin);

          const marginInUnderlyingToken = results.margin;
          
          // Get current exchange rate for eth/usd
          const EthToUsdPrice = await geckoEthToUsd();

          if (this.isETH) {
            // need to change when introduce non-stable coins
            results.marginInUSD = marginInUnderlyingToken * EthToUsdPrice;
          } else {
            results.marginInUSD = marginInUnderlyingToken;
          }

          break;
        }

        case 2: {
          const fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
          const margin = (await fcmContract.getTraderMarginInCTokens(signerAddress));
          results.margin = margin.toNumber() / (10 ** 8);

          const cTokenAddress = await (fcmContract as CompoundFCM).cToken();
          const cTokenContract = ICToken__factory.connect(cTokenAddress, this.signer);
          const rate = await cTokenContract.exchangeRateStored();
          const scaledRate = this.descaleCompoundValue(rate);

          const marginInUnderlyingToken = results.margin * scaledRate;

          // Get current exchange rate for eth/usd
          const EthToUsdPrice = await geckoEthToUsd();

          if (this.isETH) {
            // need to change when introduce non-stable coins
            results.marginInUSD = marginInUnderlyingToken * EthToUsdPrice;
          } else {
            results.marginInUSD = marginInUnderlyingToken
          }
  
          break;
        }

        default:
          throw new Error("Unrecognized FCM");
      }

      if (beforeMaturity) {
        results.healthFactor = 3;
      }
    }
    else {
      const tickLower = position.tickLower;
      const tickUpper = position.tickUpper;

      const marginEngineContract = marginEngineFactory.connect(
        this.marginEngineAddress,
        this.signer,
      );

      const rawPositionInfo = await marginEngineContract.callStatic.getPosition(
        signerAddress,
        tickLower,
        tickUpper,
      );
      results.margin = this.descale(rawPositionInfo.margin);

      const marginInUnderlyingToken = results.margin;

      // Get current exchange rate for eth/usd
      const EthToUsdPrice = await geckoEthToUsd();

      if (this.isETH) {
        // need to change when introduce non-stable coins
        results.marginInUSD = marginInUnderlyingToken * EthToUsdPrice;
      } else {
        results.marginInUSD = marginInUnderlyingToken
      }

      results.fees = this.descale(rawPositionInfo.accumulatedFees);

      if (beforeMaturity) {
        try {
          const liquidationThreshold = await marginEngineContract.callStatic.getPositionMarginRequirement(
            signerAddress,
            tickLower,
            tickUpper,
            true
          );
          results.liquidationThreshold = this.descale(liquidationThreshold);
        } catch (_) { }

        try {
          const safetyThreshold = await marginEngineContract.callStatic.getPositionMarginRequirement(
            signerAddress,
            tickLower,
            tickUpper,
            false
          );
          results.safetyThreshold = this.descale(safetyThreshold);
        }
        catch (_) { }

        if (!isUndefined(results.liquidationThreshold) && !isUndefined(results.safetyThreshold)) {
          results.healthFactor = (results.margin < results.liquidationThreshold) ? 1 : (results.margin < results.safetyThreshold ? 2 : 3);
        }
      }
    }

    const notionalInUnderlyingToken =
      (position.positionType === 3)
        ? Math.abs(position.notional) // LP
        : Math.abs(position.effectiveVariableTokenBalance); // FT, VT

    // Get current exchange rate for eth/usd
    const EthToUsdPrice = await geckoEthToUsd();

    if (this.isETH) {
      // need to change when introduce non-stable coins
      results.notionalInUSD = notionalInUnderlyingToken * EthToUsdPrice;
    } else {
      results.notionalInUSD = notionalInUnderlyingToken
    }

    return results;
  }

  // tick functionalities

  public closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate {
    if (fixedRate < MIN_FIXED_RATE) {
      fixedRate = MIN_FIXED_RATE;
    }
    if (fixedRate > MAX_FIXED_RATE) {
      fixedRate = MAX_FIXED_RATE;
    }

    const fixedRatePrice = Price.fromNumber(fixedRate);
    const closestTick: number = fixedRateToClosestTick(fixedRatePrice);
    const closestUsableTick: number = nearestUsableTick(
      closestTick,
      this.tickSpacing,
    );
    const closestUsableFixedRate: Price = tickToFixedRate(closestUsableTick);

    return {
      closestUsableTick,
      closestUsableFixedRate,
    };
  }

  public getNextUsableFixedRate(fixedRate: number, count: number): number {
    let { closestUsableTick } = this.closestTickAndFixedRate(fixedRate);
    closestUsableTick -= count * this.tickSpacing;
    return tickToFixedRate(closestUsableTick).toNumber();
  }

  // balance checks

  public async hasEnoughUnderlyingTokens(amount: number): Promise<boolean> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    let currentBalance: BigNumber;
    if (this.isETH) {
      if (!this.signer.provider) {
        throw new Error('Provider not connected');
      }

      currentBalance = await this.signer.provider.getBalance(signerAddress);
    }
    else {
      if (!this.underlyingToken.id) {
        throw new Error("No underlying token");
      }

      const tokenAddress = this.underlyingToken.id;
      const token = tokenFactory.connect(tokenAddress, this.signer);

      currentBalance = await token.balanceOf(signerAddress);
    }

    const scaledAmount = BigNumber.from(this.scale(amount));

    return currentBalance.gte(scaledAmount);
  }

  public async hasEnoughYieldBearingTokens(amount: number): Promise<boolean> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    let tokenAddress;
    switch (this.rateOracle.protocolId) {
      case 1: {
        const fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.underlyingYieldBearingToken();
        break;
      }

      case 2: {
        const fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.cToken();
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }

    const token = tokenFactory.connect(tokenAddress, this.signer);

    const currentBalance = await token.balanceOf(signerAddress);
    const scaledAmount = BigNumber.from(this.scale(amount));

    return currentBalance.gte(scaledAmount);
  }

  public async underlyingTokens(): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    let currentBalance: BigNumber;
    if (this.isETH) {
      if (!this.provider) {
        throw new Error('Provider not connected');
      }

      currentBalance = await this.provider.getBalance(signerAddress);
    }
    else {
      if (!this.underlyingToken.id) {
        throw new Error("No underlying token");
      }

      const tokenAddress = this.underlyingToken.id;
      const token = tokenFactory.connect(tokenAddress, this.signer);

      currentBalance = await token.balanceOf(signerAddress);
    }

    return this.descale(currentBalance);
  }

  public async yieldBearingTokens(): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    let tokenAddress;
    switch (this.rateOracle.protocolId) {
      case 1: {
        const fcmContract = fcmAaveFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.underlyingYieldBearingToken();
        break;
      }

      case 2: {
        const fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.signer);
        tokenAddress = await fcmContract.cToken();
        break;
      }

      default:
        throw new Error("Unrecognized FCM");
    }

    const token = tokenFactory.connect(tokenAddress, this.signer);

    const currentBalance = await token.balanceOf(signerAddress);
    const decimals = await token.decimals();

    if (decimals <= 3) {
      return currentBalance.toNumber() / (10 ** decimals);
    }
    else {
      return currentBalance.div(BigNumber.from(10).pow(decimals - 3)).toNumber() / 1000;
    }
  }

  // caps

  async setCap(amount: number) {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);

    const vammAddress = await marginEngineContract.vamm();

    const vammContract = VAMM__factory.connect(vammAddress, this.signer);

    const isAlphaTransaction = await vammContract.setIsAlpha(true);

    try {
      await isAlphaTransaction.wait();
    }
    catch (error) {
      throw new Error("Setting Alpha failed");
    }

    const isAlphaTransactionME = await marginEngineContract.setIsAlpha(true);

    try {
      await isAlphaTransactionME.wait();
    }
    catch (error) {
      throw new Error("Setting Alpha failed");
    }

    const setCapTransaction = await peripheryContract.setLPMarginCap(vammAddress, this.scale(amount));

    try {
      await setCapTransaction.wait();
    }
    catch (error) {
      throw new Error("Setting cap failed");
    }
  }

  async getCapPercentage(): Promise<number | undefined> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.provider);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.provider);
    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.provider);

    const vammAddress = await marginEngineContract.vamm();

    const vammContract = VAMM__factory.connect(vammAddress, this.provider);
    const isAlpha = await vammContract.isAlpha();

    if (!isAlpha) {
      return;
    }

    const accumulated = await peripheryContract.lpMarginCumulatives(vammAddress);
    const cap = await peripheryContract.lpMarginCaps(vammAddress);

    if (cap.eq(BigNumber.from(0))) {
      return 0;
    }

    const percentage = (accumulated.mul(100000).div(cap)).toNumber() / 1000;

    return percentage;
  }

  // current position margin requirement

  async getPositionMarginRequirement(fixedLow: number, fixedHigh: number): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const marginEngineContract = marginEngineFactory.connect(
      this.marginEngineAddress,
      this.signer,
    );

    const signerAddress = await this.signer.getAddress();

    const requirement = await marginEngineContract.callStatic.getPositionMarginRequirement(
      signerAddress,
      tickLower,
      tickUpper,
      false
    );

    return this.descale(requirement);
  }

  // one week look-back window apy

  async getInstantApy(): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

    const blocksPerDay = 6570; // 13.15 seconds per block
    const blockPerHour = 274;

    switch (this.rateOracle.protocolId) {
      case 1: {
        const lastBlock = await this.provider.getBlockNumber();
        const oneBlockAgo = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
        const twoBlocksAgo = BigNumber.from((await this.provider.getBlock(lastBlock - 2)).timestamp);

        const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);

        const oneWeekApy = await rateOracleContract.callStatic.getApyFromTo(twoBlocksAgo, oneBlockAgo);

        return oneWeekApy.div(BigNumber.from(1000000000000)).toNumber() / 1000000;
      }

      case 2: {
        const daysPerYear = 365;

        const fcmContract = fcmCompoundFactory.connect(this.fcmAddress, this.provider);

        const cTokenAddress = await (fcmContract as CompoundFCM).cToken();
        const cTokenContract = ICToken__factory.connect(cTokenAddress, this.provider);

        const supplyRatePerBlock = await cTokenContract.supplyRatePerBlock();
        const supplyApy = (((Math.pow((supplyRatePerBlock.toNumber() / 1e18 * blocksPerDay) + 1, daysPerYear))) - 1);
        return supplyApy;
      }

      case 3: {
        const lastBlock = await this.provider.getBlockNumber();
        const to = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
        const from = BigNumber.from((await this.provider.getBlock(lastBlock - 28 * blockPerHour)).timestamp);

        const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);

        const oneWeekApy = await rateOracleContract.callStatic.getApyFromTo(from, to);

        return oneWeekApy.div(BigNumber.from(1000000000000)).toNumber() / 1000000;
      }

      case 4: {
        const lastBlock = await this.provider.getBlockNumber();
        const to = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
        const from = BigNumber.from((await this.provider.getBlock(lastBlock - 28 * blockPerHour)).timestamp);

        const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);

        const oneWeekApy = await rateOracleContract.callStatic.getApyFromTo(from, to);

        return oneWeekApy.div(BigNumber.from(1000000000000)).toNumber() / 1000000;
      }

      default:
        throw new Error("Unrecognized protocol");
    } 
  }
}

export default AMM;
