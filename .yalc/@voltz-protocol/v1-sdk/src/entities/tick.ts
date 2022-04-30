import JSBI from 'jsbi';
import invariant from 'tiny-invariant';
import { BigIntish } from '../types';
import { TickMath } from '../utils/tickMath';

export interface TickConstructorArgs {
  index: number;
  liquidityGross: BigIntish;
  liquidityNet: BigIntish;
}

export class Tick {
  public readonly index: number;
  public readonly liquidityGross: JSBI;
  public readonly liquidityNet: JSBI;

  constructor({ index, liquidityGross, liquidityNet }: TickConstructorArgs) {
    invariant(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK, 'TICK');
    this.index = index;
    this.liquidityGross = JSBI.BigInt(liquidityGross);
    this.liquidityNet = JSBI.BigInt(liquidityNet);
  }
}
