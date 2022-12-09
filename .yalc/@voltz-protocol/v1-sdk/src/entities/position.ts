import JSBI from 'jsbi';

import { DateTime } from 'luxon';
import { BigNumber } from 'ethers';
import AMM from './amm';
import FCMSwap from './fcmSwap';
import FCMUnwind from './fcmUnwind';
import FCMSettlement from './fcmSettlement';
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
import { BaseRateOracle__factory, MarginEngine__factory } from '../typechain';
import { sentryTracker } from '../utils/sentry';


export type PositionConstructorArgs = {
  source: string;
  id: string;
  createdTimestamp: JSBI;
  amm: AMM;
  owner: string;
  updatedTimestamp: JSBI;

  fixedTokenBalance: JSBI;
  variableTokenBalance: JSBI;
  isSettled: boolean;

  // specific to FCM
  marginInScaledYieldBearingTokens: JSBI;

  fcmSwaps: Array<FCMSwap>;
  fcmUnwinds: Array<FCMUnwind>;
  fcmSettlements: Array<FCMSettlement>;

  // specific to ME

  tickLower: number;
  tickUpper: number;
  liquidity: JSBI;
  margin: JSBI;
  accumulatedFees: JSBI;
  positionType: number;

  totalNotionalTraded: JSBI;
  sumOfWeightedFixedRate: JSBI;

  mints: Array<Mint>;
  burns: Array<Burn>;
  swaps: Array<Swap>;
  marginUpdates: Array<MarginUpdate>;
  liquidations: Array<Liquidation>;
  settlements: Array<Settlement>;
};

class Position {
  public readonly source: string;

  public readonly id: string;

  public readonly createdTimestamp: JSBI;

  public readonly amm: AMM;

  public readonly owner: string;

  public readonly updatedTimestamp: JSBI;

  public readonly marginInScaledYieldBearingTokens: JSBI;

  public readonly fixedTokenBalance: JSBI;

  public readonly variableTokenBalance: JSBI;

  public readonly isSettled: boolean;

  public readonly fcmSwaps: Array<FCMSwap>;

  public readonly fcmUnwinds: Array<FCMUnwind>;

  public readonly fcmSettlements: Array<FCMSettlement>;

  public readonly tickLower: number;

  public readonly tickUpper: number;

  public readonly liquidity: JSBI;

  public readonly margin: JSBI;

  public readonly accumulatedFees: JSBI;

  public readonly positionType: number;

  public readonly mints: Array<Mint>;

  public readonly burns: Array<Burn>;

  public readonly swaps: Array<Swap>;

  public readonly marginUpdates: Array<MarginUpdate>;

  public readonly liquidations: Array<Liquidation>;

  public readonly settlements: Array<Settlement>;

  public readonly totalNotionalTraded: JSBI;

  public readonly sumOfWeightedFixedRate: JSBI;

  public constructor({
    source,
    id,
    createdTimestamp,
    amm,
    owner,
    updatedTimestamp,
    marginInScaledYieldBearingTokens,
    fixedTokenBalance,
    variableTokenBalance,
    isSettled,
    fcmSwaps,
    fcmUnwinds,
    fcmSettlements,
    tickLower,
    tickUpper,
    liquidity,
    margin,
    accumulatedFees,
    positionType,
    mints,
    burns,
    swaps,
    marginUpdates,
    liquidations,
    settlements,
    totalNotionalTraded,
    sumOfWeightedFixedRate,
  }: PositionConstructorArgs) {
    this.source = source;
    this.id = id;
    this.createdTimestamp = createdTimestamp;
    this.amm = amm;
    this.owner = owner;
    this.updatedTimestamp = updatedTimestamp;
    this.marginInScaledYieldBearingTokens = marginInScaledYieldBearingTokens;
    this.fixedTokenBalance = fixedTokenBalance;
    this.variableTokenBalance = variableTokenBalance;
    this.isSettled = isSettled;

    this.fcmSwaps = fcmSwaps;
    this.fcmUnwinds = fcmUnwinds;
    this.fcmSettlements = fcmSettlements;

    this.mints = mints;
    this.burns = burns;
    this.marginUpdates = marginUpdates;
    this.liquidations = liquidations;
    this.settlements = settlements;
    this.swaps = swaps;

    this.margin = margin;
    this.liquidity = liquidity;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.accumulatedFees = accumulatedFees;
    this.positionType = positionType;

    this.totalNotionalTraded = totalNotionalTraded;
    this.sumOfWeightedFixedRate = sumOfWeightedFixedRate;
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

  public get notional(): number {
    return this.getNotionalFromLiquidity(this.liquidity);
  }

  public getNotionalFromLiquidity(liquidity: JSBI): number {
    const sqrtPriceLowerX96 = new Price(Q96, TickMath.getSqrtRatioAtTick(this.tickLower));
    const sqrtPriceUpperX96 = new Price(Q96, TickMath.getSqrtRatioAtTick(this.tickUpper));

    return sqrtPriceUpperX96
      .subtract(sqrtPriceLowerX96)
      .multiply(liquidity)
      .divide(Price.fromNumber(10 ** this.amm.underlyingToken.decimals))
      .toNumber();
  }

  public get effectiveMargin(): number {
    if (this.source.includes('FCM')) {
      const result = this.amm.descale(
        BigNumber.from(this.marginInScaledYieldBearingTokens.toString()),
      );
      return result;
    }

    const result = this.amm.descale(BigNumber.from(this.margin.toString()));
    return result;
  }

  public get effectiveFixedTokenBalance(): number {
    const result = this.amm.descale(BigNumber.from(this.fixedTokenBalance.toString()));
    return result;
  }

  public get effectiveVariableTokenBalance(): number {
    const result = this.amm.descale(BigNumber.from(this.variableTokenBalance.toString()));
    return result;
  }

  public get effectiveAccumulatedFees(): number {
    const result = this.amm.descale(BigNumber.from(this.accumulatedFees.toString()));
    return result;
  }

  public get createdDateTime(): DateTime {
    return DateTime.fromMillis(JSBI.toNumber(this.createdTimestamp));
  }

  public get updatedDateTime(): DateTime {
    return DateTime.fromMillis(JSBI.toNumber(this.updatedTimestamp));
  }

  public get averageFixedRate(): number | undefined {
    const sumOfWeightedFixedRateBn = BigNumber.from(this.sumOfWeightedFixedRate.toString());
    const totalNotionalTradedBn = BigNumber.from(this.totalNotionalTraded.toString());
    if (totalNotionalTradedBn.eq(BigNumber.from(0))) {
      return undefined;
    }
    const averageFixedRate =
      sumOfWeightedFixedRateBn.mul(BigNumber.from(1000)).div(totalNotionalTradedBn).toNumber() /
      1000;
    return Math.abs(averageFixedRate);
  }

  // get settlement rate of particular position
  public async getSettlementCashflow(): Promise<number | undefined> {

    const start = BigNumber.from(this.amm.termStartTimestamp.toString());
    const end = BigNumber.from(this.amm.termEndTimestamp.toString());

    if (this.amm.provider && this.amm.signer) {
      try {

        const marginEngineContract = MarginEngine__factory.connect(this.amm.marginEngineAddress, this.amm.signer);

        const signerAddress = await this.amm.signer.getAddress()

        const position = await marginEngineContract.callStatic.getPosition(signerAddress, this.tickLower, this.tickUpper);

        const rateOracleContract = BaseRateOracle__factory.connect(this.amm.rateOracle.id, this.amm.signer);
        const variableFactorToMaturityWad = await rateOracleContract.callStatic.variableFactor(
          start, 
          end
        );

        const fixedFactor = end.sub(start).div(ONE_YEAR_IN_SECONDS);

        const fixedCashflow = position.fixedTokenBalance.mul(fixedFactor).div(BigNumber.from(100)).div(BigNumber.from(10).pow(18));
        const variableCashflow = position.variableTokenBalance.mul(variableFactorToMaturityWad).div(BigNumber.from(10).pow(18));
  
        const cashFlow = fixedCashflow.add(variableCashflow);
  
        return this.amm.descale(cashFlow);

      } catch (error) {
        sentryTracker.captureException(error);
        return undefined;
      }
    }

    return undefined;
    
  };
}

export default Position;
