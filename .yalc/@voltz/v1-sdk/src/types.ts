import JSBI from 'jsbi';
import { BigNumberish } from 'ethers';

export type BigIntish = JSBI | string | number;

export enum TradeType {
  FIXED_TAKER,
  VARIABLE_TAKER,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export type SwapPeripheryParams = {
  marginEngineAddress: string;
  recipient: string;
  isFT: boolean;
  notional: BigNumberish;
  sqrtPriceLimitX96: BigNumberish;
  tickLower: BigNumberish;
  tickUpper: BigNumberish;
};

export type MintOrBurnParams = {
  marginEngineAddress: string;
  recipient: string;
  tickLower: BigNumberish;
  tickUpper: BigNumberish;
  notional: BigNumberish;
  isMint: boolean;
};
