import JSBI from 'jsbi';

export const MaxUint256 = JSBI.BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// Latest kovan deployment address of the factory
// export const FACTORY_ADDRESS = '0xAF47e8353729E5be6cA4f605dd176B7Fc80EDA08';
export const FACTORY_ADDRESS = '0x4cd7e3fF2bF87E848d2f2F178f613e1391e189B1';

// Latest kovan deployment address of the periphery
export const PERIPHERY_ADDRESS = '0x8614B5fa62BBB45be5B320E1B6727E5828B5b513';
// export const PERIPHERY_ADDRESS = '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d';

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
