import JSBI from 'jsbi';
import { providers } from 'ethers';
import { DateTime } from 'luxon';
import { BigNumber, ContractReceipt, Signer, utils } from 'ethers';

import { SwapPeripheryParams, MintOrBurnParams } from '../types';
import {
  PERIPHERY_ADDRESS,
  FACTORY_ADDRESS,
  MIN_FIXED_RATE,
  MAX_FIXED_RATE,
  ONE_YEAR_IN_SECONDS,
  MaxUint256Bn,
  TresholdApprovalBn,
} from '../constants';
import {
  Periphery__factory as peripheryFactory,
  MarginEngine__factory as marginEngineFactory,
  Factory__factory as factoryFactory,
  // todo: not very elegant to use the mock as a factory
  ERC20Mock__factory as tokenFactory,
  AaveFCM__factory as fcmFactory,
  BaseRateOracle__factory,
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
import { isUndefined } from 'lodash';

export type AMMConstructorArgs = {
  id: string;
  signer: Signer | null;
  provider?: providers.Provider;
  environment: string;
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
};

// swap

export type AMMGetInfoPostSwapArgs = {
  isFT: boolean;
  notional: number;
  fixedRateLimit?: number;
  fixedLow: number;
  fixedHigh: number;
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

export type InfoPostSwap = {
  marginRequirement: number;
  availableNotional: number;
  fee: number;
  slippage: number;
  averageFixedRate: number;
};

// mint

export type AMMMintArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  margin: number;
  validationOnly?: boolean;
};

export type AMMGetInfoPostMintArgs = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
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
  margin: number;
  fees?: number;
  liquidationThreshold?: number;
  safetyThreshold?: number;
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
  public readonly overrides: {
    gasLimit: number;
  }

  public constructor({
    id,
    signer,
    provider,
    environment,
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
    totalLiquidity
  }: AMMConstructorArgs) {
    this.id = id;
    this.signer = signer;
    this.provider = provider || signer?.provider;
    this.environment = environment;
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

    this.overrides = {
      gasLimit: 10000000,
    }
  }

  // swap

  public async getInfoPostSwap({
    isFT,
    notional,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
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

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
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

    const averageFixedRate = fixedTokenDeltaUnbalanced.mul(BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;

    return {
      marginRequirement: additionalMargin,
      availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
      fee: scaledFee < 0 ? -scaledFee : scaledFee,
      slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
      averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
    };
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

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const scaledNotional = this.scale(notional);
    const scaledMarginDelta = this.scale(margin);

    const isUnderlyingTokenApprovedForPeriphery = await this.isUnderlyingTokenApprovedForPeriphery();
    if (!isUnderlyingTokenApprovedForPeriphery) {
      await this.approveUnderlyingTokenForPeriphery();
    }

    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngine: this.marginEngineAddress,
      isFT,
      notional: scaledNotional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: scaledMarginDelta,
    };

    await peripheryContract.callStatic.swap(swapPeripheryParams).catch(async (error: any) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const swapTransaction = await peripheryContract.swap(swapPeripheryParams, this.overrides).catch((error) => {
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
    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
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

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const _notional = this.scale(notional);
    const _marginDelta = this.scale(margin);

    const isUnderlyingTokenApprovedForPeriphery = await this.isUnderlyingTokenApprovedForPeriphery();
    if (!isUnderlyingTokenApprovedForPeriphery) {
      await this.approveUnderlyingTokenForPeriphery();
    }

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngine: this.marginEngineAddress,
      tickLower,
      tickUpper,
      notional: _notional,
      isMint: true,
      marginDelta: _marginDelta,
    };

    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const mintTransaction = await peripheryContract.mintOrBurn(mintOrBurnParams, this.overrides).catch((error) => {
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

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

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

    const burnTransaction = await peripheryContract.mintOrBurn(mintOrBurnParams, this.overrides).catch((error) => {
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
    owner,
    fixedLow,
    fixedHigh,
    marginDelta,
  }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt | void> {

    if (!this.signer) {
      return;
    }

    const effectiveOwner = (!owner) ? await this.signer.getAddress() : owner;

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
    const scaledMarginDelta = this.scale(marginDelta);

    const isUnderlyingTokenApprovedForPeriphery = await this.isUnderlyingTokenApprovedForPeriphery();
    if (!isUnderlyingTokenApprovedForPeriphery) {
      await this.approveUnderlyingTokenForPeriphery();
    }

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

    await peripheryContract.callStatic.updatePositionMargin(
      this.marginEngineAddress,
      tickLower,
      tickUpper,
      scaledMarginDelta,
      false
    ).catch(async (error: any) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const updatePositionMarginTransaction = await peripheryContract.updatePositionMargin(
      this.marginEngineAddress,
      tickLower,
      tickUpper,
      scaledMarginDelta,
      false,
      this.overrides
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
    });;

    const liquidatePositionTransaction = await marginEngineContract.liquidatePosition(owner, tickLower, tickUpper, this.overrides);

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

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);

    await peripheryContract.callStatic.settlePositionAndWithdrawMargin(
      this.marginEngineAddress,
      effectiveOwner,
      tickLower,
      tickUpper
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const settlePositionTransaction = await peripheryContract.settlePositionAndWithdrawMargin(
      this.marginEngineAddress,
      effectiveOwner,
      tickLower,
      tickUpper,
      this.overrides
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

    const isFCMApproved = await this.isFCMApproved();
    if (!isFCMApproved) {
      await this.approveFCM();
    }

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    }

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    const scaledNotional = this.scale(notional);

    const isUnderlyingTokenApprovedForFCM = await this.isUnderlyingTokenApprovedForFCM();
    if (!isUnderlyingTokenApprovedForFCM) {
      await this.approveUnderlyingTokenForFCM();
    }

    const isYieldBearingTokenApprovedForFCM = await this.isYieldBearingTokenApprovedForFCM();
    if (!isYieldBearingTokenApprovedForFCM) {
      await this.approveUnderlyingTokenForFCM();
    }

    await fcmContract.callStatic.initiateFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const fcmSwapTransaction = await fcmContract.initiateFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96,
      this.overrides
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

    const isFCMApproved = await this.isFCMApproved();
    if (!isFCMApproved) {
      await this.approveFCM();
    }

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    const scaledNotional = this.scale(notionalToUnwind);

    const isUnderlyingTokenApprovedForFCM = await this.isUnderlyingTokenApprovedForFCM();
    if (!isUnderlyingTokenApprovedForFCM) {
      await this.approveUnderlyingTokenForFCM();
    }

    await fcmContract.callStatic.unwindFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96
    ).catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const fcmUnwindTransaction = await fcmContract.unwindFullyCollateralisedFixedTakerSwap(
      scaledNotional,
      sqrtPriceLimitX96,
      this.overrides
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

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);

    await fcmContract.callStatic.settleTrader().catch((error) => {
      const errorMessage = getReadableErrorMessage(error, this.environment);
      throw new Error(errorMessage);
    });

    const fcmSettleTraderTransaction = await fcmContract.settleTrader(this.overrides);

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

  // fcm approval

  public async isFCMApproved(): Promise<boolean | void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const factoryContract = factoryFactory.connect(FACTORY_ADDRESS, this.signer);
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

    const factoryContract = factoryFactory.connect(FACTORY_ADDRESS, this.signer);
    const approvalTransaction = await factoryContract.setApproval(this.fcmAddress, true, this.overrides);

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

    const signerAddress = await this.signer.getAddress();
    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);
    const allowance = await token.allowance(signerAddress, PERIPHERY_ADDRESS, this.overrides);

    return allowance.gte(TresholdApprovalBn);
  }

  public async approveUnderlyingTokenForPeriphery(): Promise<ContractReceipt | void> {
    const isApproved = await this.isUnderlyingTokenApprovedForPeriphery();
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
    const approvalTransaction = await token.approve(PERIPHERY_ADDRESS, MaxUint256Bn, this.overrides);

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
    const allowance = await token.allowance(signerAddress, this.fcmAddress, this.overrides);

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
    const approvalTransaction = await token.approve(this.fcmAddress, MaxUint256Bn, this.overrides);

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
    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    const tokenAddress = await fcmContract.underlyingYieldBearingToken();

    const token = tokenFactory.connect(tokenAddress, this.signer);
    const allowance = await token.allowance(signerAddress, this.fcmAddress, this.overrides);

    return allowance.gte(TresholdApprovalBn);
  }

  // protocol name

  public get protocol(): string {
    const firstProtocolCharacter = this.rateOracle.protocol[0];
    const tokenName = this.underlyingToken.name;

    return `${firstProtocolCharacter.toLowerCase()}${tokenName}`;
  }

  public async approveYieldBearingTokenForFCM(): Promise<ContractReceipt | void> {
    const isApproved = await this.isYieldBearingTokenApprovedForFCM();
    if (isApproved) {
      return;
    }

    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    const tokenAddress = await fcmContract.underlyingYieldBearingToken();

    const token = tokenFactory.connect(tokenAddress, this.signer);
    const approvalTransaction = await token.approve(this.fcmAddress, MaxUint256Bn, this.overrides);

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

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.provider);
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
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let accruedCashflow = BigNumber.from(0);
    let lenSwaps = allSwaps.length;

    let untilTimestamp = (atMaturity)
      ? BigNumber.from(this.termEndTimestamp.toString())
      : allSwaps[lenSwaps - 1].timestamp.mul(BigNumber.from(10).pow(18));

    const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.signer);

    const excludeLast = (atMaturity) ? 0 : 1;
    for (let i = 0; i + excludeLast < lenSwaps; i++) {
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

  public async getApy(termStartTimestamp: BigNumber, termEndTimestamp: BigNumber): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }
    const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
    const result = await rateOracleContract.callStatic.getApyFromTo(termStartTimestamp, termEndTimestamp);
    const resultScaled = result.div(BigNumber.from(10).pow(12)).toNumber() / 1000000;
    return resultScaled;
  }

  public async getPositionInformation(position: Position): Promise<PositionInfo> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

    let results: PositionInfo = {
      margin: 0,
      accruedCashflow: 0,
      beforeMaturity: false
    };

    const signerAddress = await this.signer.getAddress();
    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 4)).timestamp);

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
          const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.signer);

          const lastSwapTimestamp = allSwaps[lenSwaps - 1].timestamp;
          const variableApySinceLastSwap = await rateOracleContract.callStatic.getApyFromTo(lastSwapTimestamp, lastBlockTimestamp);
          results.variableRateSinceLastSwap = variableApySinceLastSwap.div(BigNumber.from(10).pow(12)).toNumber() / 10000;

          results.fixedRateSinceLastSwap = position.averageFixedRate;

          results.accruedCashflow = await this.getAccruedCashflow(allSwaps, false);
        }
      }
      else {
        if (!position.isSettled) {
          results.accruedCashflow = await this.getAccruedCashflow(allSwaps, true);
        }
      }
    }

    // margin and fees information

    if (position.source.includes("FCM")) {
      const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
      const margin = (await fcmContract.getTraderMarginInATokens(signerAddress));
      results.margin = this.descale(margin);

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

    if (!this.underlyingToken.id) {
      throw new Error("No underlying token");
    }

    const signerAddress = await this.signer.getAddress();
    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);

    const currentBalance = await token.balanceOf(signerAddress);
    const scaledAmount = BigNumber.from(this.scale(amount));

    return currentBalance.gte(scaledAmount);
  }

  public async hasEnoughYieldBearingTokens(amount: number): Promise<boolean> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    const fcmContract = fcmFactory.connect(this.fcmAddress, this.signer);
    const tokenAddress = await fcmContract.underlyingYieldBearingToken();

    const token = tokenFactory.connect(tokenAddress, this.signer);

    const currentBalance = await token.balanceOf(signerAddress);
    const scaledAmount = BigNumber.from(this.scale(amount));

    return currentBalance.gte(scaledAmount);
  }
}

export default AMM;
