import JSBI from 'jsbi';
export declare type FCMSwapConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    fcmPositionId: string;
    desiredNotional: JSBI;
    sqrtPriceLimitX96: JSBI;
    cumulativeFeeIncurred: JSBI;
    fixedTokenDelta: JSBI;
    variableTokenDelta: JSBI;
    fixedTokenDeltaUnbalanced: JSBI;
};
declare class FCMSwap {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly fcmPositionId: string;
    readonly desiredNotional: JSBI;
    readonly sqrtPriceLimitX96: JSBI;
    readonly cumulativeFeeIncurred: JSBI;
    readonly fixedTokenDelta: JSBI;
    readonly variableTokenDelta: JSBI;
    readonly fixedTokenDeltaUnbalanced: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, fcmPositionId, desiredNotional, sqrtPriceLimitX96, cumulativeFeeIncurred, fixedTokenDelta, variableTokenDelta, fixedTokenDeltaUnbalanced, }: FCMSwapConstructorArgs);
}
export default FCMSwap;
//# sourceMappingURL=fcmSwap.d.ts.map