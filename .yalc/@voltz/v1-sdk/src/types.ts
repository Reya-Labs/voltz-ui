import JSBI from 'jsbi';

export type BigintIsh = JSBI | string | number;

export enum TradeType {
  FIXED_TAKER,
  VARIABLE_TAKER,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}
