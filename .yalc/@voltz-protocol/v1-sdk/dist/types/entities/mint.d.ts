import JSBI from 'jsbi';
export declare type MintConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    positionId: string;
    sender: string;
    amount: JSBI;
};
declare class Mint {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly positionId: string;
    readonly sender: string;
    readonly amount: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, positionId, sender, amount, }: MintConstructorArgs);
}
export default Mint;
//# sourceMappingURL=mint.d.ts.map