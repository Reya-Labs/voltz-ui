import JSBI from 'jsbi';
export declare type FCMUnwindConstructorArgs = {
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
declare class FCMUnwind {
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
    constructor({ id, transactionId, transactionTimestamp, ammId, fcmPositionId, desiredNotional, sqrtPriceLimitX96, cumulativeFeeIncurred, fixedTokenDelta, variableTokenDelta, fixedTokenDeltaUnbalanced, }: FCMUnwindConstructorArgs);
}
export default FCMUnwind;
//# sourceMappingURL=fcmUnwind.d.ts.map