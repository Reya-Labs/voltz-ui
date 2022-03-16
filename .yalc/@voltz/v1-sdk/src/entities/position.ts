import JSBI from 'jsbi';

import { DateTime } from 'luxon';
import { BigIntish } from '../types';
import { Price } from './fractions/price';
import { tickToFixedRate, tickToPrice } from '../utils/priceTickConversions';
import AMM from './amm';
import { TickMath } from '../utils/tickMath';
import { Q96 } from '../constants';

export type PositionConstructorArgs = {
  id: string;
  createdTimestamp: JSBI;
  updatedTimestamp: JSBI;
  amm: AMM;
  tickLower: number;
  tickUpper: number;
  liquidity: BigIntish;
  isSettled: boolean;
  margin: JSBI;
  fixedTokenBalance: JSBI;
  variableTokenBalance: JSBI;
  isLiquidityProvider: boolean;
  owner: string;
  isEmpty: boolean;
};

class Position {
  public readonly id: string;

  public readonly createdTimestamp: JSBI;

  public readonly updatedTimestamp: JSBI;

  public readonly amm: AMM;

  public readonly tickLower: number;

  public readonly tickUpper: number;

  public readonly liquidity: JSBI;

  public readonly owner: string;

  public isSettled: boolean;

  public margin: JSBI;

  public fixedTokenBalance: JSBI;

  public variableTokenBalance: JSBI;

  public isLiquidityProvider: boolean;

  public readonly isEmpty: boolean;

  public constructor({
    id,
    createdTimestamp,
    updatedTimestamp,
    amm,
    liquidity,
    tickLower,
    tickUpper,
    isSettled,
    margin,
    fixedTokenBalance,
    variableTokenBalance,
    isLiquidityProvider,
    owner,
    isEmpty,
  }: PositionConstructorArgs) {
    this.id = id;
    this.amm = amm;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = JSBI.BigInt(liquidity);
    this.isSettled = isSettled;
    this.margin = JSBI.BigInt(margin);
    this.fixedTokenBalance = fixedTokenBalance;
    this.variableTokenBalance = variableTokenBalance;
    this.createdTimestamp = createdTimestamp;
    this.updatedTimestamp = updatedTimestamp;
    this.isLiquidityProvider = isLiquidityProvider;
    this.owner = owner;
    this.isEmpty = isEmpty;
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
      .divide(Price.fromNumber(10 ** 18))
      .toNumber();
  }

  public get effectiveMargin(): number {
    return JSBI.toNumber(this.margin) / 10 ** 18;
  }

  public get effectiveFixedTokenBalance(): number {
    return JSBI.toNumber(this.fixedTokenBalance) / 10 ** 18;
  }

  public get effectiveVariableTokenBalance(): number {
    return JSBI.toNumber(this.variableTokenBalance) / 10 ** 18;
  }

  public get createdDateTime(): DateTime {
    return DateTime.fromMillis(JSBI.toNumber(this.createdTimestamp));
  }

  public get updatedDateTime(): DateTime {
    return DateTime.fromMillis(JSBI.toNumber(this.updatedTimestamp));
  }
}

export default Position;
