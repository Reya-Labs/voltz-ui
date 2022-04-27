import JSBI from 'jsbi';
export declare type SettlementConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    positionId: string;
    settlementCashflow: JSBI;
};
declare class Settlement {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly positionId: string;
    readonly settlementCashflow: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, positionId, settlementCashflow, }: SettlementConstructorArgs);
}
export default Settlement;
//# sourceMappingURL=settlement.d.ts.map