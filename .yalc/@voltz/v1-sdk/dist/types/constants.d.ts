import JSBI from 'jsbi';
export declare const MaxUint256: JSBI;
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const FACTORY_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export declare const PERIPHERY_ADDRESS = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
export declare const AMM_INIT_CODE_HASH = "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";
export declare const NEGATIVE_ONE: JSBI;
export declare const ZERO: JSBI;
export declare const ONE: JSBI;
export declare const Q96: JSBI;
export declare const Q192: JSBI;
export declare type BigintIsh = JSBI | string | number;
export declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
/**
 * The minimum tick that can be used on any pool.
 */
export declare const MIN_TICK = -69100;
/**
 * The maximum tick that can be used on any pool.
 */
export declare const MAX_TICK = 69100;
/**
 * The minimum tick that can be used on any pool.
 */
export declare const MIN_FIXED_RATE = 0.001;
/**
 * The maximum tick that can be used on any pool.
 */
export declare const MAX_FIXED_RATE = 1001;
//# sourceMappingURL=constants.d.ts.map