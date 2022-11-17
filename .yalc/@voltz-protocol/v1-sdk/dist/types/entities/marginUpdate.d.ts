import JSBI from 'jsbi';
export type MarginUpdateConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    positionId: string;
    depositer: string;
    marginDelta: JSBI;
};
declare class MarginUpdate {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly positionId: string;
    readonly depositer: string;
    readonly marginDelta: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, positionId, depositer, marginDelta, }: MarginUpdateConstructorArgs);
}
export default MarginUpdate;
//# sourceMappingURL=marginUpdate.d.ts.map