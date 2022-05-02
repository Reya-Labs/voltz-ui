import JSBI from 'jsbi';
export declare type SwapConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    positionId: string;
    sender: string;
    desiredNotional: JSBI;
    sqrtPriceLimitX96: JSBI;
    cumulativeFeeIncurred: JSBI;
    fixedTokenDelta: JSBI;
    variableTokenDelta: JSBI;
    fixedTokenDeltaUnbalanced: JSBI;
};
declare class Swap {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly positionId: string;
    readonly sender: string;
    readonly desiredNotional: JSBI;
    readonly sqrtPriceLimitX96: JSBI;
    readonly cumulativeFeeIncurred: JSBI;
    readonly fixedTokenDelta: JSBI;
    readonly variableTokenDelta: JSBI;
    readonly fixedTokenDeltaUnbalanced: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, positionId, sender, desiredNotional, sqrtPriceLimitX96, cumulativeFeeIncurred, fixedTokenDelta, variableTokenDelta, fixedTokenDeltaUnbalanced, }: SwapConstructorArgs);
}
export default Swap;
//# sourceMappingURL=swap.d.ts.map