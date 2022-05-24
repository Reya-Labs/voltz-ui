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

// Latest kovan deployment address of the factory
export const FACTORY_ADDRESS = '0x71b5020bF90327F2241Cc7D66B60C72CEf9cC39b';

// Latest kovan deployment address of the periphery
export const PERIPHERY_ADDRESS = '0x411b190015978F01e6d57e551455B317bf26233f';

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
