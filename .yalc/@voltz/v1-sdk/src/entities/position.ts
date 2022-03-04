import JSBI from 'jsbi';

import { BigintIsh } from '../types';
import { Price } from './fractions/price';
import { tickToPrice } from '../utils/priceTickConversions';
import AMM from './amm';

export type PositionConstructorArgs = {
  id: string;
  createdTimestamp: JSBI;
  updatedTimestamp: JSBI;
  amm: AMM;
  tickLower: number;
  tickUpper: number;
  liquidity: BigintIsh;
  isSettled: boolean;
  margin: JSBI;
  fixedTokenBalance: JSBI;
  variableTokenBalance: JSBI;
  isLiquidityProvider: boolean;
};

class Position {
  public readonly id: string;
  public readonly createdTimestamp: JSBI;
  public readonly updatedTimestamp: JSBI;
  public readonly amm: AMM;
  public readonly tickLower: number;
  public readonly tickUpper: number;
  public readonly liquidity: JSBI;
  public isSettled: boolean;
  public margin: JSBI;
  public fixedTokenBalance: JSBI;
  public variableTokenBalance: JSBI;
  public isLiquidityProvider: boolean;

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
  }

  public get priceLower(): Price {
    return tickToPrice(this.tickLower);
  }

  public get priceUpper(): Price {
    return tickToPrice(this.tickUpper);
  }
}

export default Position;
