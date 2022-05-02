import JSBI from 'jsbi';
export declare type SwapConstructorArgs = {
    id: string;
    transactionId: string;
    transactionBlockNumber: number;
    transactionTimestamp: number;
    ammId: string;
    positionId: string;
    sender: string;
    txIndex: number;
    sqrtPriceX96: JSBI;
    liquidity: JSBI;
    tick: number;
};
declare class Swap {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionBlockNumber: number;
    readonly transactionTimestamp: number;
    readonly ammId: string;
    readonly positionId: string;
    readonly sender: string;
    readonly txIndex: number;
    readonly sqrtPriceX96: JSBI;
    readonly liquidity: JSBI;
    readonly tick: number;
    constructor({ id, transactionId, transactionBlockNumber, transactionTimestamp, ammId, positionId, sender, txIndex, sqrtPriceX96, liquidity, tick, }: SwapConstructorArgs);
}
export default Swap;
//# sourceMappingURL=swap.d.ts.map