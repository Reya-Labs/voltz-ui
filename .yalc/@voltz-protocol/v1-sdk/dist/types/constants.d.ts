import { BigNumber } from 'ethers';
import JSBI from 'jsbi';
export declare const MaxUint256: JSBI;
export declare const MaxUint256Bn: BigNumber;
export declare const TresholdApprovalBn: BigNumber;
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const NEGATIVE_ONE: JSBI;
export declare const ZERO: JSBI;
export declare const ONE: JSBI;
export declare const Q96: JSBI;
export declare const Q192: JSBI;
export type BigintIsh = JSBI | string | number;
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
export declare function getGasBuffer(value: BigNumber): BigNumber;
export declare const WETH9 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export declare const MULTI_REDEEM_METHOD_ID = "0x6323ffa5";
export declare const REDEEM_METHOD_ID = "0x79a4aaa3";
//# sourceMappingURL=constants.d.ts.map