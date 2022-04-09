import JSBI from 'jsbi';

export const MaxUint256 = JSBI.BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// Latest kovan deployment address of the factory
export const FACTORY_ADDRESS = '0xAF47e8353729E5be6cA4f605dd176B7Fc80EDA08';

// Latest kovan deployment address of the periphery
export const PERIPHERY_ADDRESS = '0x4d1e13111412725D458D106A36524B9c13E98D98';

// todo: needs to be adjusted
export const AMM_INIT_CODE_HASH =
  '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54';

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
