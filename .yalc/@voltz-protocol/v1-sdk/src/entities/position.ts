import JSBI from 'jsbi';

import { DateTime } from 'luxon';
import { BigNumber } from 'ethers';
import { Price } from './fractions/price';
import { tickToFixedRate, tickToPrice } from '../utils/priceTickConversions';
import AMM from './amm';
import { TickMath } from '../utils/tickMath';
import { Q96 } from '../constants';
import Mint from './mint';
import Liquidation from './liquidation';
import Settlement from './settlement';
import { Swap } from '.';
import Burn from './burn';
import MarginUpdate from './marginUpdate';

export type PositionConstructorArgs = {
  id: string;
  createdTimestamp: JSBI;
  amm: AMM;
  owner: string;
  tickLower: number;
  tickUpper: number;
  updatedTimestamp: JSBI;
  liquidity: JSBI;
  margin: JSBI;
  fixedTokenBalance: JSBI;
  variableTokenBalance: JSBI;
  accumulatedFees: JSBI;
  isLiquidityProvider: boolean;
  isSettled: boolean;
  mints: Array<Mint>;
  burns: Array<Burn>;
  swaps: Array<Swap>;
  marginUpdates: Array<MarginUpdate>;
  liquidations: Array<Liquidation>;
  settlements: Array<Settlement>;
};

class Position {
  public readonly id: string;

  public readonly createdTimestamp: JSBI;

  public readonly amm: AMM;

  public readonly owner: string;

  public readonly tickLower: number;

  public readonly tickUpper: number;

  public readonly updatedTimestamp: JSBI;

  public readonly liquidity: JSBI;

  public readonly margin: JSBI;

  public readonly fixedTokenBalance: JSBI;

  public readonly variableTokenBalance: JSBI;

  public readonly accumulatedFees: JSBI;

  public readonly isLiquidityProvider: boolean;

  public readonly isSettled: boolean;

  public readonly mints: Array<Mint>;

  public readonly burns: Array<Burn>;

  public readonly swaps: Array<Swap>;

  public readonly marginUpdates: Array<MarginUpdate>;

  public readonly liquidations: Array<Liquidation>;

  public readonly settlements: Array<Settlement>;

  public constructor({
    id,
    createdTimestamp,
    amm,
    owner,
    tickLower,
    tickUpper,
    updatedTimestamp,
    liquidity,
    margin,
    fixedTokenBalance,
    variableTokenBalance,
    accumulatedFees,
    isLiquidityProvider,
    isSettled,
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
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.updatedTimestamp = updatedTimestamp;
    this.liquidity = liquidity;
    this.margin = margin;
    this.fixedTokenBalance = fixedTokenBalance;
    this.variableTokenBalance = variableTokenBalance;
    this.accumulatedFees = accumulatedFees;
    this.isLiquidityProvider = isLiquidityProvider;
    this.isSettled = isSettled;
    this.mints = mints;
    this.burns = burns;
    this.swaps = swaps;
    this.marginUpdates = marginUpdates;
    this.liquidations = liquidations;
    this.settlements = settlements;
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
    const sqrtPriceLowerX96 = new Price(Q96, TickMath.getSqrtRatioAtTick(this.tickLower));
    const sqrtPriceUpperX96 = new Price(Q96, TickMath.getSqrtRatioAtTick(this.tickUpper));

    return sqrtPriceUpperX96
      .subtract(sqrtPriceLowerX96)
      .multiply(this.liquidity)
      .divide(Price.fromNumber(10 ** this.amm.underlyingToken.decimals))
      .toNumber();
  }

  public get effectiveMargin(): number {
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
}

export default Position;
