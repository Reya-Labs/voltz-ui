import { BigNumber } from 'ethers';
import JSBI from 'jsbi';
export declare const MaxUint256: JSBI;
export declare const MaxUint256Bn: BigNumber;
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const FACTORY_ADDRESS = "0x71b5020bF90327F2241Cc7D66B60C72CEf9cC39b";
export declare const PERIPHERY_ADDRESS = "0x411b190015978F01e6d57e551455B317bf26233f";
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
export declare const ONE_YEAR_IN_SECONDS = 31536000;
//# sourceMappingURL=constants.d.ts.map