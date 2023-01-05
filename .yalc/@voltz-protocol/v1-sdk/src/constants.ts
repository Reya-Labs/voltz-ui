import { BigNumber } from 'ethers';
import JSBI from 'jsbi';

export const MaxUint256 = JSBI.BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const MaxUint256Bn = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const TresholdApprovalBn = BigNumber.from(
  '6277101735386680763835789423207666416102355444464034512896',
);

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// constants used internally but not expected to be used externally
export const NEGATIVE_ONE = JSBI.BigInt(-1);
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);

// used in liquidity amount math
export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96));
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2));

// exports for external consumption
export type BigintIsh = JSBI | string | number;

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

/**
 * The minimum tick that can be used on any pool.
 */
export const MIN_TICK = -69100;
/**
 * The maximum tick that can be used on any pool.
 */
export const MAX_TICK = 69100;

/**
 * The minimum tick that can be used on any pool.
 */
export const MIN_FIXED_RATE = 0.001;
/**
 * The maximum tick that can be used on any pool.
 */
export const MAX_FIXED_RATE = 1001;

export const ONE_YEAR_IN_SECONDS = 31536000;

export function getGasBuffer(value: BigNumber): BigNumber {
  return value.mul(120).div(100);
}

export const WETH9 = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

// https://etherscan.io/address/0xa8ef4f40c4694be9a2e4e27a0501f04f00b454f3#writeContract
export const MULTI_REDEEM_METHOD_ID = '0x6323ffa5';
export const REDEEM_METHOD_ID = '0x79a4aaa3';

// benchmarks for referrees notional amount
export const MAINNET_ONE_HUNDRED_THOUSAND = 100000;
export const MAINNET_TWO_MILLON = 2000000;

export const GOERLI_ONE_HUNDRED_THOUSAND = 1;
export const GOERLI_TWO_MILLON = 200;

export const ONE_HOUR_IN_MS = 60 * 60 * 1000;
export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
export const DEPOSIT_WINDOW = 48 * ONE_HOUR_IN_MS;
