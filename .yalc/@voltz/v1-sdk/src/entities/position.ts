import JSBI from 'jsbi';

import { BigintIsh } from '../types';
import { Price } from './fractions/price';
import { tickToPrice } from '../utils/priceTickConversions';
import AMM from './amm';

interface PositionConstructorArgs {
  amm: AMM;
  tickLower: number;
  tickUpper: number;
  liquidity: BigintIsh;
  isSettled: boolean;
  margin: JSBI;
  fixedTokenBalance: JSBI;
  variableTokenBalance: JSBI;
}

export class Position {
  public readonly amm: AMM;
  public readonly tickLower: number;
  public readonly tickUpper: number;
  public readonly liquidity: JSBI;
  public isSettled: boolean;
  public margin: JSBI;
  public fixedTokenBalance: JSBI;
  public variableTokenBalance: JSBI;

  public constructor({
    amm,
    liquidity,
    tickLower,
    tickUpper,
    isSettled,
    margin,
    fixedTokenBalance,
    variableTokenBalance,
  }: PositionConstructorArgs) {
    this.amm = amm;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = JSBI.BigInt(liquidity);
    this.isSettled = isSettled;
    this.margin = JSBI.BigInt(margin);
    this.fixedTokenBalance = fixedTokenBalance;
    this.variableTokenBalance = variableTokenBalance;
  }

  public get priceLower(): Price {
    return tickToPrice(this.tickLower);
  }

  public get priceUpper(): Price {
    return tickToPrice(this.tickUpper);
  }
}
