import JSBI from 'jsbi';
export type FCMSettlementConstructorArgs = {
    id: string;
    transactionId: string;
    transactionTimestamp: JSBI;
    ammId: string;
    fcmPositionId: string;
    settlementCashflow: JSBI;
};
declare class FCMSettlement {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly fcmPositionId: string;
    readonly settlementCashflow: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, fcmPositionId, settlementCashflow, }: FCMSettlementConstructorArgs);
}
export default FCMSettlement;
//# sourceMappingURL=fcmSettlement.d.ts.map