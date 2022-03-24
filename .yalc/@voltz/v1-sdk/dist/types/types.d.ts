import JSBI from 'jsbi';
import { BigNumberish } from 'ethers';
export declare type BigIntish = JSBI | string | number;
export declare enum TradeType {
    FIXED_TAKER = 0,
    VARIABLE_TAKER = 1
}
export declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
export declare type SwapPeripheryParams = {
    marginEngine: string;
    isFT: boolean;
    notional: BigNumberish;
    sqrtPriceLimitX96: BigNumberish;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
};
export declare type MintOrBurnParams = {
    marginEngine: string;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
    notional: BigNumberish;
    isMint: boolean;
};
//# sourceMappingURL=types.d.ts.map