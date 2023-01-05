import { DateTime } from 'luxon';
import { ethers } from 'ethers';
import { AMM, HealthFactorStatus } from './amm';
import Burn from './burn';
import Liquidation from './liquidation';
import MarginUpdate from './marginUpdate';
import Mint from './mint';
import Settlement from './settlement';
import Swap from './swap';
import { ONE_YEAR_IN_SECONDS, Q96 } from '../constants';
import { tickToPrice, tickToFixedRate } from '../utils/priceTickConversions';
import { TickMath } from '../utils/tickMath';
import { Price } from './fractions/price';

import {
  MarginEngine__factory as marginEngineFactory,
  BaseRateOracle__factory as baseRateOracleFactory,
} from '../typechain';
import { getAccruedCashflow, transformSwaps } from '../services/getAccruedCashflow';
import { sentryTracker } from '../utils/sentry';
import { getRangeHealthFactor } from '../utils/rangeHealthFactor';

export type PositionConstructorArgs = {
  id: string;

  amm: AMM;
  owner: string;
  tickLower: number;
  tickUpper: number;

  createdTimestamp: number;

  positionType: number;

  mints: Array<Mint>;
  burns: Array<Burn>;
  swaps: Array<Swap>;
  marginUpdates: Array<MarginUpdate>;
  liquidations: Array<Liquidation>;
  settlements: Array<Settlement>;
};

class Position {
  public readonly id: string;
  public readonly createdTimestamp: number;
  public readonly amm: AMM;
  public readonly owner: string;
  public readonly tickLower: number;
  public readonly tickUpper: number;
  public readonly positionType: number;
  public readonly mints: Array<Mint>;
  public readonly burns: Array<Burn>;
  public readonly swaps: Array<Swap>;
  public readonly marginUpdates: Array<MarginUpdate>;
  public readonly liquidations: Array<Liquidation>;
  public readonly settlements: Array<Settlement>;

  public initialized = false;

  public fixedTokenBalance = 0;
  public variableTokenBalance = 0;

  public liquidity = 0;
  public liquidityInUSD = 0;

  public notional = 0;
  public notionalInUSD = 0;

  public margin = 0;
  public marginInUSD = 0;

  public fees = 0;
  public feesInUSD = 0;

  public accruedCashflow = 0;
  public accruedCashflowInUSD = 0;

  public settlementCashflow = 0;
  public settlementCashflowInUSD = 0;

  public liquidationThreshold = 0;
  public safetyThreshold = 0;

  public receivingRate = 0;
  public payingRate = 0;

  public healthFactor = HealthFactorStatus.NOT_FOUND;
  public fixedRateHealthFactor = HealthFactorStatus.NOT_FOUND;

  public poolAPR = 0;
  public isPoolMatured = false;

  public isSettled = false;

  public constructor({
    id,
    createdTimestamp,
    amm,
    owner,
    tickLower,
    tickUpper,
    positionType,
    mints,
    burns,
    swaps,
    marginUpdates,
    liquidations,
    settlements,
  }: PositionConstructorArgs) {
    this.id = id;
    this.createdTimestamp = createdTimestamp;
    this.amm = amm;
    this.owner = owner;

    this.mints = mints;
    this.burns = burns;
    this.marginUpdates = marginUpdates;
    this.liquidations = liquidations;
    this.settlements = settlements;
    this.swaps = swaps;

    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.positionType = positionType;
  }

  public get priceLower(): Price {
    return tickToPrice(this.tickLower);
  }

  public get priceUpper(): Price {
    return tickToPrice(this.tickUpper);
  }

  public get fixedRateLower(): Price {
    return tickToFixedRate(this.tickUpper);
  }

  public get fixedRateUpper(): Price {
    return tickToFixedRate(this.tickLower);
  }

  public getNotionalFromLiquidity(liquidity: ethers.BigNumber): number {
    const sqrtPriceLowerX96 = new Price(Q96, TickMath.getSqrtRatioAtTick(this.tickLower));
    const sqrtPriceUpperX96 = new Price(Q96, TickMath.getSqrtRatioAtTick(this.tickUpper));

    return sqrtPriceUpperX96
      .subtract(sqrtPriceLowerX96)
      .multiply(liquidity.toString())
      .divide(Price.fromNumber(10 ** this.amm.underlyingToken.decimals))
      .toNumber();
  }

  public get createdDateTime(): DateTime {
    return DateTime.fromMillis(this.createdTimestamp);
  }

  public async refreshInfo(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!this.amm.provider) {
      throw new Error('Blockchain not connected');
    }

    // Build the contract
    const marginEngineContract = marginEngineFactory.connect(
      this.amm.marginEngineAddress,
      this.amm.provider,
    );

    const rateOracleContract = baseRateOracleFactory.connect(
      this.amm.rateOracle.id,
      this.amm.provider,
    );

    // Get fresh information about the position
    const freshInfo = await marginEngineContract.callStatic.getPosition(
      this.owner,
      this.tickLower,
      this.tickUpper,
    );

    this.isSettled = freshInfo.isSettled;

    // Get last block timestamp
    const block = await this.amm.provider.getBlock('latest');
    const currentTime = block.timestamp - 1;
    this.isPoolMatured = currentTime >= this.amm.endDateTime.toSeconds();

    if (!this.isSettled) {
      this.liquidity = this.getNotionalFromLiquidity(freshInfo._liquidity);
      this.fixedTokenBalance = this.amm.descale(freshInfo.fixedTokenBalance);
      this.variableTokenBalance = this.amm.descale(freshInfo.variableTokenBalance);
      this.fees = this.amm.descale(freshInfo.accumulatedFees);
      this.margin = this.amm.descale(freshInfo.margin) - this.fees;

      // Get pool information
      this.poolAPR = await this.amm.getFixedApr();

      // Get settlement cashflow
      if (this.isPoolMatured) {
        this.settlementCashflow = await this.getSettlementCashflow();
      }

      // Get accrued cashflow and receiving/paying rates
      if (this.swaps.length > 0) {
        if (!this.isPoolMatured) {
          try {
            const accruedCashflowInfo = await getAccruedCashflow({
              swaps: transformSwaps(this.swaps, this.amm.underlyingToken.decimals),
              rateOracle: rateOracleContract,
              currentTime,
              endTime: this.amm.endDateTime.toSeconds(),
            });
            this.accruedCashflow = accruedCashflowInfo.accruedCashflow;

            // Get receiving and paying rates
            const avgFixedRate = accruedCashflowInfo.avgFixedRate;
            const avgVariableRate = (await this.amm.getInstantApy()) * 100;

            [this.receivingRate, this.payingRate] =
              this.positionType === 1
                ? [avgFixedRate, avgVariableRate]
                : [avgVariableRate, avgFixedRate];
          } catch (error) {
            sentryTracker.captureException(error);
          }
        } else {
          this.accruedCashflow = this.settlementCashflow;
        }
      }

      if (!this.isPoolMatured) {
        // Get liquidation threshold
        try {
          const scaledLiqT = await marginEngineContract.callStatic.getPositionMarginRequirement(
            this.owner,
            this.tickLower,
            this.tickUpper,
            true,
          );
          this.liquidationThreshold = this.amm.descale(scaledLiqT);
        } catch (error) {
          sentryTracker.captureMessage('Failed to compute the liquidation threshold');
          sentryTracker.captureException(error);
        }

        // Get safety threshold
        try {
          const scaledSafeT = await marginEngineContract.callStatic.getPositionMarginRequirement(
            this.owner,
            this.tickLower,
            this.tickUpper,
            false,
          );
          this.safetyThreshold = this.amm.descale(scaledSafeT);
        } catch (error) {
          sentryTracker.captureMessage('Failed to compute the safety threshold');
          sentryTracker.captureException(error);
        }

        // Get health factor
        if (this.margin < this.liquidationThreshold) {
          this.healthFactor = HealthFactorStatus.DANGER;
        } else if (this.margin < this.safetyThreshold) {
          this.healthFactor = HealthFactorStatus.WARNING;
        } else {
          this.healthFactor = HealthFactorStatus.HEALTHY;
        }

        // Get range health factor for LPs
        this.fixedRateHealthFactor = getRangeHealthFactor(
          this.fixedRateLower.toNumber(),
          this.fixedRateUpper.toNumber(),
          this.poolAPR,
        );
      }

      // Get notional (LPs - liquidity, Traders - absolute variable tokens)
      this.notional =
        this.positionType === 3 ? this.liquidity : Math.abs(this.variableTokenBalance);

      // Get the underlying token price in USD
      const usdExchangeRate = this.amm.isETH ? await this.amm.ethPrice() : 1;

      // Compute the information in USD
      this.liquidityInUSD = this.liquidity * usdExchangeRate;
      this.notionalInUSD = this.notional * usdExchangeRate;
      this.marginInUSD = this.margin * usdExchangeRate;
      this.feesInUSD = this.fees * usdExchangeRate;
      this.accruedCashflowInUSD = this.accruedCashflow * usdExchangeRate;
      this.settlementCashflowInUSD = this.settlementCashflow * usdExchangeRate;
    }

    this.initialized = true;
  }

  private async getSettlementCashflow(): Promise<number> {
    if (!this.amm.provider) {
      throw new Error('Blockchain not connected');
    }

    const rateOracleContract = baseRateOracleFactory.connect(
      this.amm.rateOracle.id,
      this.amm.provider,
    );

    const variableFactorWad = await rateOracleContract.callStatic.variableFactor(
      this.amm.termStartTimestamp.toString(),
      this.amm.termEndTimestamp.toString(),
    );

    const fixedFactor =
      (this.amm.endDateTime.toMillis() - this.amm.startDateTime.toMillis()) /
      ONE_YEAR_IN_SECONDS /
      1000;
    const variableFactor = Number(ethers.utils.formatEther(variableFactorWad));

    const settlementCashflow =
      this.fixedTokenBalance * fixedFactor * 0.01 + this.variableTokenBalance * variableFactor;

    return settlementCashflow;
  }

  public get settlementBalance(): number {
    if (this.initialized) {
      return this.margin + this.fees + this.settlementCashflow;
    }
    return 0;
  }
}

export default Position;
