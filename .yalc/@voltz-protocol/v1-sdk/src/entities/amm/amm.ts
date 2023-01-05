import JSBI from 'jsbi';
import { ethers, providers, BigNumber, ContractReceipt, Signer, utils } from 'ethers';
import { DateTime } from 'luxon';

import { SwapPeripheryParams, MintOrBurnParams } from '../../types';
import {
  MIN_FIXED_RATE,
  MAX_FIXED_RATE,
  MaxUint256Bn,
  TresholdApprovalBn,
  getGasBuffer,
} from '../../constants';
import {
  Periphery__factory as peripheryFactory,
  MarginEngine__factory as marginEngineFactory,
  Factory__factory as factoryFactory,
  IERC20Minimal__factory as tokenFactory,
  BaseRateOracle__factory as baseRateOracleFactory,
  ICToken__factory as iCTokenFactory,
  CompoundRateOracle,
  CompoundRateOracle__factory as compoundRateOracleFactory,
  CompoundBorrowRateOracle,
  AaveBorrowRateOracle__factory as aaveBorrowRateOracleFactory,
  IAaveV2LendingPool__factory as iAaveV2LendingPoolFactory,
  CompoundBorrowRateOracle__factory as compoundBorrowRateOracleFactory,
} from '../../typechain';
import RateOracle from '../rateOracle';
import { TickMath } from '../../utils/tickMath';
import timestampWadToDateTime from '../../utils/timestampWadToDateTime';
import { fixedRateToClosestTick, tickToFixedRate } from '../../utils/priceTickConversions';
import { nearestUsableTick } from '../../utils/nearestUsableTick';
import Token from '../token';
import { Price } from '../fractions/price';
import { TokenAmount } from '../fractions/tokenAmount';
import {
  decodeInfoPostMint,
  decodeInfoPostSwap,
  getReadableErrorMessage,
} from '../../utils/errors/errorHandling';
import { getExpectedApy } from '../../services/getExpectedApy';
import { getAccruedCashflow, transformSwaps } from '../../services/getAccruedCashflow';

import { getProtocolPrefix } from '../../services/getTokenInfo';

import { sentryTracker } from '../../utils/sentry';
import {
  AMMConstructorArgs,
  AMMRolloverWithSwapArgs,
  AMMRolloverWithMintArgs,
  AMMGetInfoPostSwapArgs,
  InfoPostSwap,
  ExpectedApyInfo,
  AMMSwapArgs,
  AMMGetInfoPostMintArgs,
  AMMMintArgs,
  AMMBurnArgs,
  AMMUpdatePositionMarginArgs,
  AMMSettlePositionArgs,
  ClosestTickAndFixedRate,
  ExpectedApyArgs,
  AMMSwapWithWethArgs,
  AMMMintWithWethArgs,
} from './types';
import { geckoEthToUsd } from '../../utils/priceFetch';

export class AMM {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider?: providers.Provider;
  public readonly factoryAddress: string;
  public readonly marginEngineAddress: string;
  public readonly rateOracle: RateOracle;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public readonly tickSpacing: number;
  public readonly isETH: boolean;
  public readonly wethAddress: string;
  public readonly ethPrice: () => Promise<number>;

  public constructor({
    id,
    signer,
    provider,
    factoryAddress,
    marginEngineAddress,
    rateOracle,
    termStartTimestamp,
    termEndTimestamp,
    underlyingToken,
    tickSpacing,
    wethAddress,
    ethPrice,
  }: AMMConstructorArgs) {
    this.id = id;
    this.signer = signer;
    this.provider = provider || signer?.provider;
    this.factoryAddress = factoryAddress;
    this.marginEngineAddress = marginEngineAddress;
    this.rateOracle = rateOracle;
    this.termStartTimestamp = termStartTimestamp;
    this.termEndTimestamp = termEndTimestamp;
    this.underlyingToken = underlyingToken;
    this.tickSpacing = tickSpacing;
    this.wethAddress = wethAddress;
    this.isETH = this.underlyingToken.name === 'ETH';
    this.ethPrice =
      ethPrice || (() => geckoEthToUsd(process.env.REACT_APP_COINGECKO_API_KEY || ''));
  }

  // expected apy
  expectedApy = async (
    ft: BigNumber,
    vt: BigNumber,
    margin: number,
    rate: number,
  ): Promise<[number, number]> => {
    const now = Math.round(new Date().getTime() / 1000);

    const end =
      BigNumber.from(this.termEndTimestamp.toString()).div(BigNumber.from(10).pow(12)).toNumber() /
      1000000;

    let scaledFt = 0;
    let scaledVt = 0;

    if (this.underlyingToken.decimals <= 6) {
      scaledFt = ft.toNumber() / 10 ** this.underlyingToken.decimals;
      scaledVt = vt.toNumber() / 10 ** this.underlyingToken.decimals;
    } else {
      scaledFt =
        ft.div(BigNumber.from(10).pow(this.underlyingToken.decimals - 6)).toNumber() / 1000000;
      scaledVt =
        vt.div(BigNumber.from(10).pow(this.underlyingToken.decimals - 6)).toNumber() / 1000000;
    }

    const [pnl, ecs] = getExpectedApy(now, end, scaledFt, scaledVt, margin, rate);

    return [100 * pnl, ecs];
  };

  // rollover with swap

  public async rolloverWithSwap({
    isFT,
    notional,
    margin,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    newMarginEngine,
    rolloverPosition,
  }: AMMRolloverWithSwapArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
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

    const owner = await this.signer.getAddress();

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else if (isFT) {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    // Get the margin delta in underlying ERC20 tokens and ETH
    let scaledMarginDelta = '0';
    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH) {
      // Get the settlement margin from the previous position
      const settlementBalance = rolloverPosition.settlementBalance;

      if (settlementBalance >= margin) {
        // Case 1. If you get from the settled pool more than want to roll over
        scaledMarginDelta = this.scale(margin);
      } else {
        // Case 2. if you get from the settled pool less than want to roll over, then need to deposit extra ETH
        scaledMarginDelta = this.scale(settlementBalance);
        tempOverrides.value = BigNumber.from(this.scale(margin - settlementBalance));
      }
    } else {
      scaledMarginDelta = this.scale(margin);
    }

    const swapPeripheryParams = {
      marginEngine: newMarginEngine,
      isFT,
      notional: scaledNotional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: scaledMarginDelta,
    };

    await peripheryContract.callStatic
      .rolloverWithSwap(
        this.marginEngineAddress,
        owner,
        rolloverPosition.tickLower,
        rolloverPosition.tickUpper,
        swapPeripheryParams,
        tempOverrides,
      )
      .catch(async (error: any) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas
      .rolloverWithSwap(
        this.marginEngineAddress,
        owner,
        rolloverPosition.tickLower,
        rolloverPosition.tickUpper,
        swapPeripheryParams,
        tempOverrides,
      )
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const swapTransaction = await peripheryContract
      .rolloverWithSwap(
        this.marginEngineAddress,
        owner,
        rolloverPosition.tickLower,
        rolloverPosition.tickUpper,
        swapPeripheryParams,
        tempOverrides,
      )
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await swapTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
    }
  }

  // rollover with mint

  public async rolloverWithMint({
    fixedLow,
    fixedHigh,
    notional,
    margin,
    newMarginEngine,
    rolloverPosition,
  }: AMMRolloverWithMintArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
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

    const owner = await this.signer.getAddress();

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    // Get the margin delta in underlying ERC20 tokens and ETH
    let scaledMarginDelta = '0';
    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH) {
      // Get the settlement margin from the previous position

      const settlementMargin = rolloverPosition.settlementBalance;
      if (settlementMargin >= margin) {
        // Case 1. If you get from the settled pool more than want to roll over
        scaledMarginDelta = this.scale(margin);
      } else {
        // Case 2. if you get from the settled pool less than want to roll over, then need to deposit extra ETH
        scaledMarginDelta = this.scale(settlementMargin);
        tempOverrides.value = BigNumber.from(this.scale(margin)).sub(
          BigNumber.from(scaledMarginDelta),
        );
      }
    } else {
      scaledMarginDelta = this.scale(margin);
    }

    const mintOrBurnParams = {
      marginEngine: newMarginEngine,
      tickLower,
      tickUpper,
      notional: scaledNotional,
      isMint: true,
      marginDelta: scaledMarginDelta,
    };

    await peripheryContract.callStatic
      .rolloverWithMint(
        this.marginEngineAddress,
        owner,
        rolloverPosition.tickLower,
        rolloverPosition.tickUpper,
        mintOrBurnParams,
        tempOverrides,
      )
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas
      .rolloverWithMint(
        this.marginEngineAddress,
        owner,
        rolloverPosition.tickLower,
        rolloverPosition.tickUpper,
        mintOrBurnParams,
        tempOverrides,
      )
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const mintTransaction = await peripheryContract
      .rolloverWithMint(
        this.marginEngineAddress,
        owner,
        rolloverPosition.tickLower,
        rolloverPosition.tickUpper,
        mintOrBurnParams,
        tempOverrides,
      )
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await mintTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
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
    } else if (isFT) {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
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

    const tickBefore = await peripheryContract.getCurrentTick(this.marginEngineAddress);
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
        tickAfter = parseInt(result[5], 10);
        fixedTokenDelta = result[0];
      },
      (error: any) => {
        const result = decodeInfoPostSwap(error);
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

    const averageFixedRate = availableNotional.eq(BigNumber.from(0))
      ? 0
      : fixedTokenDeltaUnbalanced.mul(BigNumber.from(1000)).div(availableNotional).toNumber() /
        1000;

    let maxAvailableNotional = BigNumber.from(0);
    const swapPeripheryParamsLargeSwap = {
      marginEngine: this.marginEngineAddress,
      isFT,
      notional: this.scale(1000000000000000),
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: '0',
    };
    await peripheryContract.callStatic.swap(swapPeripheryParamsLargeSwap).then(
      (result: any) => {
        maxAvailableNotional = result[1];
      },
      (error: any) => {
        const result = decodeInfoPostSwap(error);
        maxAvailableNotional = result.availableNotional;
      },
    );
    const scaledMaxAvailableNotional = this.descale(maxAvailableNotional);

    const result: InfoPostSwap = {
      marginRequirement: additionalMargin,
      availableNotional:
        scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
      fee: scaledFee < 0 ? -scaledFee : scaledFee,
      slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
      averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
      fixedTokenDeltaBalance: this.descale(fixedTokenDelta),
      variableTokenDeltaBalance: this.descale(availableNotional),
      fixedTokenDeltaUnbalanced: this.descale(fixedTokenDeltaUnbalanced),
      maxAvailableNotional:
        scaledMaxAvailableNotional < 0 ? -scaledMaxAvailableNotional : scaledMaxAvailableNotional,
    };

    return result;
  }

  public async getExpectedApyInfo({
    margin,
    position,
    fixedLow,
    fixedHigh,
    fixedTokenDeltaUnbalanced,
    availableNotional,
    predictedVariableApy,
  }: ExpectedApyArgs): Promise<ExpectedApyInfo> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    if (!this.provider) {
      throw new Error('Blockchain not connected');
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

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const signerAddress = await this.signer.getAddress();

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const currentMargin = (
      await marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)
    ).margin;

    const rateOracleContract = baseRateOracleFactory.connect(this.rateOracle.id, this.provider);

    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from(
      (await this.provider.getBlock(lastBlock - 1)).timestamp,
    );

    const scaledCurrentMargin = this.descale(currentMargin);

    let positionMargin = 0;
    let accruedCashflow = 0;
    let positionUft = BigNumber.from(0);
    let positionVt = BigNumber.from(0);

    if (position) {
      positionUft = position.swaps.reduce(
        (acc, swap) => acc.add(swap.fixedTokenDeltaUnbalanced.toString()),
        BigNumber.from(0),
      );

      positionVt = position.swaps.reduce(
        (acc, swap) => acc.add(swap.variableTokenDelta.toString()),
        BigNumber.from(0),
      );

      positionMargin = scaledCurrentMargin;

      try {
        if (position.swaps.length > 0) {
          const accruedCashflowInfo = await getAccruedCashflow({
            swaps: transformSwaps(position.swaps, this.underlyingToken.decimals),
            rateOracle: rateOracleContract,
            currentTime: Number(lastBlockTimestamp.toString()),
            endTime: Number(utils.formatUnits(this.termEndTimestamp.toString(), 18)),
          });
          accruedCashflow = accruedCashflowInfo.accruedCashflow;
        }
      } catch (error) {
        sentryTracker.captureException(error);
      }
    }

    const [expectedApy, expectedCashflow] = await this.expectedApy(
      positionUft.add(this.scale(fixedTokenDeltaUnbalanced)),
      positionVt.add(this.scale(availableNotional)),
      margin + positionMargin + accruedCashflow,
      predictedVariableApy,
    );

    const result: ExpectedApyInfo = {
      expectedApy,
      expectedCashflow,
    };

    return result;
  }

  public async swap({
    isFT,
    notional,
    margin,
    fixedRateLimit,
    fixedLow,
    fixedHigh,
    fullyCollateralisedVTSwap,
  }: AMMSwapArgs): Promise<ContractReceipt> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

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

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else if (isFT) {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    let swapPeripheryParams: SwapPeripheryParams;
    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

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

      tempOverrides.value = ethers.utils.parseEther(margin.toFixed(18).toString());
    } else {
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

    let swapTransaction;
    if (fullyCollateralisedVTSwap === undefined || fullyCollateralisedVTSwap === false) {
      await peripheryContract.callStatic
        .swap(swapPeripheryParams, tempOverrides)
        .catch(async (error: any) => {
          const errorMessage = getReadableErrorMessage(error);
          throw new Error(errorMessage);
        });

      const estimatedGas = await peripheryContract.estimateGas
        .swap(swapPeripheryParams, tempOverrides)
        .catch((error) => {
          const errorMessage = getReadableErrorMessage(error);
          throw new Error(errorMessage);
        });

      tempOverrides.gasLimit = getGasBuffer(estimatedGas);

      swapTransaction = await peripheryContract
        .swap(swapPeripheryParams, tempOverrides)
        .catch((error) => {
          sentryTracker.captureException(error);
          sentryTracker.captureMessage('Transaction Confirmation Error');
          throw new Error('Transaction Confirmation Error');
        });
    } else {
      const rateOracleContract = baseRateOracleFactory.connect(this.rateOracle.id, this.provider);
      const variableFactorFromStartToNowWad = await rateOracleContract.callStatic.variableFactor(
        BigNumber.from(this.termStartTimestamp.toString()),
        BigNumber.from(this.termEndTimestamp.toString()),
      );

      await peripheryContract.callStatic
        .fullyCollateralisedVTSwap(
          swapPeripheryParams,
          variableFactorFromStartToNowWad,
          tempOverrides,
        )
        .catch(async (error: any) => {
          const errorMessage = getReadableErrorMessage(error);
          throw new Error(errorMessage);
        });

      const estimatedGas = await peripheryContract.estimateGas
        .fullyCollateralisedVTSwap(
          swapPeripheryParams,
          variableFactorFromStartToNowWad,
          tempOverrides,
        )
        .catch((error) => {
          const errorMessage = getReadableErrorMessage(error);
          throw new Error(errorMessage);
        });

      tempOverrides.gasLimit = getGasBuffer(estimatedGas);

      swapTransaction = await peripheryContract
        .fullyCollateralisedVTSwap(
          swapPeripheryParams,
          variableFactorFromStartToNowWad,
          tempOverrides,
        )
        .catch((error) => {
          sentryTracker.captureException(error);
          sentryTracker.captureMessage('Transaction Confirmation Error');
          throw new Error('Transaction Confirmation Error');
        });
    }

    try {
      const receipt = await swapTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
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
  }: AMMSwapWithWethArgs): Promise<ContractReceipt> {
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

    if (marginEth && marginEth < 0) {
      throw new Error('Amount of margin in ETH cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    let sqrtPriceLimitX96;
    if (fixedRateLimit) {
      const { closestUsableTick: tickLimit } = this.closestTickAndFixedRate(fixedRateLimit);
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(tickLimit).toString();
    } else if (isFT) {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString();
    } else {
      sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString();
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH && marginEth) {
      tempOverrides.value = ethers.utils.parseEther(marginEth.toFixed(18).toString());
    }

    const scaledMarginDelta = this.scale(margin);

    const swapPeripheryParams = {
      marginEngine: this.marginEngineAddress,
      isFT,
      notional: scaledNotional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
      marginDelta: scaledMarginDelta,
    };

    await peripheryContract.callStatic
      .swap(swapPeripheryParams, tempOverrides)
      .catch(async (error: any) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas
      .swap(swapPeripheryParams, tempOverrides)
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const swapTransaction = await peripheryContract
      .swap(swapPeripheryParams, tempOverrides)
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      })
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await swapTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
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
      tickLower,
      tickUpper,
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
        const result = decodeInfoPostMint(error);
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
    }
    return 0;
  }

  public async mint({
    fixedLow,
    fixedHigh,
    notional,
    margin,
  }: AMMMintArgs): Promise<ContractReceipt> {
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

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    let mintOrBurnParams: MintOrBurnParams;
    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH) {
      mintOrBurnParams = {
        marginEngine: this.marginEngineAddress,
        tickLower,
        tickUpper,
        notional: scaledNotional,
        isMint: true,
        marginDelta: 0,
      };

      tempOverrides.value = ethers.utils.parseEther(margin.toFixed(18).toString());
    } else {
      const scaledMarginDelta = this.scale(margin);

      mintOrBurnParams = {
        marginEngine: this.marginEngineAddress,
        tickLower,
        tickUpper,
        notional: scaledNotional,
        isMint: true,
        marginDelta: scaledMarginDelta,
      };
    }

    await peripheryContract.callStatic
      .mintOrBurn(mintOrBurnParams, tempOverrides)
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas
      .mintOrBurn(mintOrBurnParams, tempOverrides)
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const mintTransaction = await peripheryContract
      .mintOrBurn(mintOrBurnParams, tempOverrides)
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await mintTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
    }
  }

  public async mintWithWeth({
    fixedLow,
    fixedHigh,
    notional,
    margin,
    marginEth,
  }: AMMMintWithWethArgs): Promise<ContractReceipt> {
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

    if (marginEth && marginEth < 0) {
      throw new Error('Amount of margin in ETH cannot be negative');
    }

    if (!this.underlyingToken.id) {
      throw new Error('No underlying error');
    }

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);
    const scaledNotional = this.scale(notional);

    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH && marginEth) {
      tempOverrides.value = ethers.utils.parseEther(marginEth.toFixed(18).toString());
    }

    const scaledMarginDelta = this.scale(margin);

    const mintOrBurnParams = {
      marginEngine: this.marginEngineAddress,
      tickLower,
      tickUpper,
      notional: scaledNotional,
      isMint: true,
      marginDelta: scaledMarginDelta,
    };

    await peripheryContract.callStatic
      .mintOrBurn(mintOrBurnParams, tempOverrides)
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas
      .mintOrBurn(mintOrBurnParams, tempOverrides)
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const mintTransaction = await peripheryContract
      .mintOrBurn(mintOrBurnParams, tempOverrides)
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await mintTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
    }
  }

  // burn

  public async burn({ fixedLow, fixedHigh, notional }: AMMBurnArgs): Promise<ContractReceipt> {
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

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    const scaledNotional = this.scale(notional);

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngine: this.marginEngineAddress,
      tickLower,
      tickUpper,
      notional: scaledNotional,
      isMint: false,
      marginDelta: '0',
    };

    await peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).catch((error) => {
      const errorMessage = getReadableErrorMessage(error);
      throw new Error(errorMessage);
    });

    const estimatedGas = await peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams);

    const burnTransaction = await peripheryContract
      .mintOrBurn(mintOrBurnParams, {
        gasLimit: getGasBuffer(estimatedGas),
      })
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await burnTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
    }
  }

  // update position margin

  public async updatePositionMargin({
    fixedLow,
    fixedHigh,
    marginDelta,
  }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
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

    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};
    let scaledMarginDelta: string;

    if (this.isETH && marginDelta > 0) {
      tempOverrides.value = ethers.utils.parseEther(marginDelta.toFixed(18).toString());
      scaledMarginDelta = '0';
    } else {
      scaledMarginDelta = this.scale(marginDelta);
    }

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    await peripheryContract.callStatic
      .updatePositionMargin(
        this.marginEngineAddress,
        tickLower,
        tickUpper,
        scaledMarginDelta,
        false,
        tempOverrides,
      )
      .catch(async (error: any) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas.updatePositionMargin(
      this.marginEngineAddress,
      tickLower,
      tickUpper,
      scaledMarginDelta,
      false,
      tempOverrides,
    );

    tempOverrides.gasLimit = getGasBuffer(estimatedGas);

    const updatePositionMarginTransaction = await peripheryContract
      .updatePositionMargin(
        this.marginEngineAddress,
        tickLower,
        tickUpper,
        scaledMarginDelta,
        false,
        tempOverrides,
      )
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await updatePositionMarginTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
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

    const effectiveOwner = !owner ? await this.signer.getAddress() : owner;

    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    const peripheryContract = peripheryFactory.connect(peripheryAddress, this.signer);

    await peripheryContract.callStatic
      .settlePositionAndWithdrawMargin(
        this.marginEngineAddress,
        effectiveOwner,
        tickLower,
        tickUpper,
      )
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error);
        throw new Error(errorMessage);
      });

    const estimatedGas = await peripheryContract.estimateGas.settlePositionAndWithdrawMargin(
      this.marginEngineAddress,
      effectiveOwner,
      tickLower,
      tickUpper,
    );

    const settlePositionTransaction = await peripheryContract
      .settlePositionAndWithdrawMargin(
        this.marginEngineAddress,
        effectiveOwner,
        tickLower,
        tickUpper,
        {
          gasLimit: getGasBuffer(estimatedGas),
        },
      )
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      const receipt = await settlePositionTransaction.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Transaction Confirmation Error');
      throw new Error('Transaction Confirmation Error');
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
    return Number(ethers.utils.formatUnits(value, this.underlyingToken.decimals));
  }

  // token approval for periphery
  public async isTokenApprovedForPeriphery({
    forceErc20Check,
    approvalAmount, // Unscaled, e.g. dollars not wei
  }: {
    forceErc20Check: boolean;
    approvalAmount?: number;
  }): Promise<boolean> {
    if (!forceErc20Check && this.isETH) {
      return true;
    }

    const scaledAmount = approvalAmount && this.scale(approvalAmount);

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const signerAddress = await this.signer.getAddress();

    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();
    const allowance = await token.allowance(signerAddress, peripheryAddress);

    if (scaledAmount === undefined) {
      return allowance.gte(TresholdApprovalBn);
    }
    return allowance.gte(scaledAmount);
  }

  public async approveUnderlyingTokenForPeriphery(): Promise<void> {
    if (!this.underlyingToken.id) {
      throw new Error('No underlying token');
    }

    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const tokenAddress = this.underlyingToken.id;
    const token = tokenFactory.connect(tokenAddress, this.signer);

    const factoryContract = factoryFactory.connect(this.factoryAddress, this.signer);
    const peripheryAddress = await factoryContract.periphery();

    let estimatedGas;
    try {
      estimatedGas = await token.estimateGas.approve(peripheryAddress, MaxUint256Bn);
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage(
        `Could not increase periphery allowance (${tokenAddress}, ${await this.signer.getAddress()}, ${MaxUint256Bn.toString()})`,
      );
      throw new Error(
        `Unable to approve. If your existing allowance is non-zero but lower than needed, some tokens like USDT require you to call approve("${peripheryAddress}", 0) before you can increase the allowance.`,
      );
    }

    const approvalTransaction = await token
      .approve(peripheryAddress, MaxUint256Bn, {
        gasLimit: getGasBuffer(estimatedGas),
      })
      .catch((error) => {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Transaction Confirmation Error');
        throw new Error('Transaction Confirmation Error');
      });

    try {
      await approvalTransaction.wait();
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Token approval failed');
      throw new Error('Token approval failed');
    }
  }

  // protocol name

  public get protocol(): string {
    const tokenName = this.underlyingToken.name;

    const prefix = getProtocolPrefix(this.rateOracle.protocolId);

    return `${prefix}${tokenName}`;
  }

  // start and end dates

  public get startDateTime(): DateTime {
    return timestampWadToDateTime(this.termStartTimestamp);
  }

  public get endDateTime(): DateTime {
    return timestampWadToDateTime(this.termEndTimestamp);
  }

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

  public async getVariableFactor(
    termStartTimestamp: BigNumber,
    termEndTimestamp: BigNumber,
  ): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }
    const rateOracleContract = baseRateOracleFactory.connect(this.rateOracle.id, this.provider);
    try {
      const result = await rateOracleContract.callStatic.variableFactor(
        termStartTimestamp,
        termEndTimestamp,
      );
      const resultScaled = result.div(BigNumber.from(10).pow(12)).toNumber() / 1000000;
      return resultScaled;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Cannot get variable factor');
      throw new Error('Cannot get variable factor');
    }
  }

  // tick functionalities

  public closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate {
    const inRangeFixedRate = Math.min(Math.max(fixedRate, MIN_FIXED_RATE), MAX_FIXED_RATE);

    const fixedRatePrice = Price.fromNumber(inRangeFixedRate);
    const closestTick: number = fixedRateToClosestTick(fixedRatePrice);
    const closestUsableTick: number = nearestUsableTick(closestTick, this.tickSpacing);
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
    } else {
      if (!this.underlyingToken.id) {
        throw new Error('No underlying token');
      }

      const tokenAddress = this.underlyingToken.id;
      const token = tokenFactory.connect(tokenAddress, this.signer);

      currentBalance = await token.balanceOf(signerAddress);
    }

    return this.descale(currentBalance);
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
        if (!this.underlyingToken.id) {
          throw new Error('No underlying error');
        }

        const rateOracleContract = aaveBorrowRateOracleFactory.connect(
          this.rateOracle.id,
          this.provider,
        );
        const lendingPoolAddress = await rateOracleContract.aaveLendingPool();
        const lendingPool = iAaveV2LendingPoolFactory.connect(lendingPoolAddress, this.provider);
        const reservesData = await lendingPool.getReserveData(this.underlyingToken.id);
        const rateInRay = reservesData.currentLiquidityRate;
        const result = rateInRay.div(BigNumber.from(10).pow(21)).toNumber() / 1000000;
        return result;
      }
      case 2: {
        const daysPerYear = 365;
        const rateOracle = compoundRateOracleFactory.connect(this.rateOracle.id, this.provider);
        const cTokenAddress = await (rateOracle as CompoundRateOracle).ctoken();
        const cTokenContract = iCTokenFactory.connect(cTokenAddress, this.provider);
        const supplyRatePerBlock = await cTokenContract.supplyRatePerBlock();
        const supplyApy =
          ((supplyRatePerBlock.toNumber() / 1e18) * blocksPerDay + 1) ** daysPerYear - 1;
        return supplyApy;
      }

      case 3: {
        const lastBlock = await this.provider.getBlockNumber();
        const to = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
        const from = BigNumber.from(
          (await this.provider.getBlock(lastBlock - 28 * blockPerHour)).timestamp,
        );

        const rateOracleContract = baseRateOracleFactory.connect(this.rateOracle.id, this.provider);

        const oneWeekApy = await rateOracleContract.callStatic.getApyFromTo(from, to);

        return oneWeekApy.div(BigNumber.from(1000000000000)).toNumber() / 1000000;
      }

      case 4: {
        const lastBlock = await this.provider.getBlockNumber();
        const to = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
        const from = BigNumber.from(
          (await this.provider.getBlock(lastBlock - 28 * blockPerHour)).timestamp,
        );

        const rateOracleContract = baseRateOracleFactory.connect(this.rateOracle.id, this.provider);

        const oneWeekApy = await rateOracleContract.callStatic.getApyFromTo(from, to);

        return oneWeekApy.div(BigNumber.from(1000000000000)).toNumber() / 1000000;
      }

      case 5: {
        if (!this.underlyingToken.id) {
          throw new Error('No underlying error');
        }

        const rateOracleContract = aaveBorrowRateOracleFactory.connect(
          this.rateOracle.id,
          this.provider,
        );
        const lendingPoolAddress = await rateOracleContract.aaveLendingPool();
        const lendingPool = iAaveV2LendingPoolFactory.connect(lendingPoolAddress, this.provider);
        const reservesData = await lendingPool.getReserveData(this.underlyingToken.id);
        const rateInRay = reservesData.currentVariableBorrowRate;
        const result = rateInRay.div(BigNumber.from(10).pow(21)).toNumber() / 1000000;
        return result;
      }

      case 6: {
        const daysPerYear = 365;

        const rateOracle = compoundBorrowRateOracleFactory.connect(
          this.rateOracle.id,
          this.provider,
        );

        const cTokenAddress = await (rateOracle as CompoundBorrowRateOracle).ctoken();
        const cTokenContract = iCTokenFactory.connect(cTokenAddress, this.provider);

        const borrowRatePerBlock = await cTokenContract.borrowRatePerBlock();
        const borrowApy =
          ((borrowRatePerBlock.toNumber() / 1e18) * blocksPerDay + 1) ** daysPerYear - 1;
        return borrowApy;
      }

      default:
        throw new Error('Unrecognized protocol');
    }
  }
}
