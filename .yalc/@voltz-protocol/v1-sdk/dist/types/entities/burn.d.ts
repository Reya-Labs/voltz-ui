import JSBI from 'jsbi';
export declare type BurnConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    positionId: string;
    sender: string;
    amount: JSBI;
};
declare class Burn {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly positionId: string;
    readonly sender: string;
    readonly amount: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, positionId, sender, amount, }: BurnConstructorArgs);
}
export default Burn;
//# sourceMappingURL=burn.d.ts.map