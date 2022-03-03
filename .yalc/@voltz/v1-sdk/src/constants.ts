import JSBI from 'jsbi';

export const MaxUint256 = JSBI.BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// todo: needs to be adjusted
export const FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';

// todo: needs to be adjusted
export const PERIPHERY_ADDRESS = '0x0000000000000000000000000000000000000000';

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
