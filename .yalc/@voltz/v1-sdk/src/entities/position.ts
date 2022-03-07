import JSBI from 'jsbi';

import { BigintIsh } from '../types';
import { Price } from './fractions/price';
import { tickToFixedRate, tickToPrice } from '../utils/priceTickConversions';

export type PositionConstructorArgs = {
  id: string;
  createdTimestamp: JSBI;
  updatedTimestamp: JSBI;
  ammId: string;
  tickLower: number;
  tickUpper: number;
  liquidity: BigintIsh;
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

  public readonly ammId: string;

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
    ammId,
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
    this.ammId = ammId;
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
    return tickToFixedRate(this.tickLower);
  }

  public get fixedRateUpper(): Price {
    return tickToFixedRate(this.tickLower);
  }

}

export default Position;
