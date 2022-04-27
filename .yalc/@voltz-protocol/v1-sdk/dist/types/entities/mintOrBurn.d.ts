import JSBI from 'jsbi';
export declare type MintOrBurnConstructorArgs = {
    id: string;
    transactionId: string;
    transactionBlockNumber: number;
    transactionTimestamp: number;
    ammId: string;
    positionId: string;
    sender: string;
    amount: JSBI;
};
declare class MintOrBurn {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionBlockNumber: number;
    readonly transactionTimestamp: number;
    readonly ammId: string;
    readonly positionId: string;
    readonly sender: string;
    constructor({ id, transactionId, transactionBlockNumber, transactionTimestamp, ammId, positionId, sender, }: MintOrBurnConstructorArgs);
}
export default MintOrBurn;
//# sourceMappingURL=mintOrBurn.d.ts.map