import JSBI from 'jsbi';

export type FCMSettlementConstructorArgs = {
  id: string;
  transactionId: string;
  transactionTimestamp: JSBI;
  ammId: string;
  fcmPositionId: string;
  settlementCashflow: JSBI;
};

class FCMSettlement {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionTimestamp: JSBI;

  public readonly ammId: string;

  public readonly fcmPositionId: string;

  public readonly settlementCashflow: JSBI;

  public constructor({
    id,
    transactionId,
    transactionTimestamp,
    ammId,
    fcmPositionId,
    settlementCashflow,
  }: FCMSettlementConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.fcmPositionId = fcmPositionId;
    this.settlementCashflow = settlementCashflow;
  }
}

export default FCMSettlement;
