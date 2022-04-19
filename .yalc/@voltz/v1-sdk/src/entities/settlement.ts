import JSBI from 'jsbi';

export type SettlementConstructorArgs = {
  id: string;
  transactionId: string;
  transactionTimestamp: JSBI;
  ammId: string;
  positionId: string;
  settlementCashflow: JSBI;
};

class Settlement {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionTimestamp: JSBI;

  public readonly ammId: string;

  public readonly positionId: string;

  public readonly settlementCashflow: JSBI;

  public constructor({
    id,
    transactionId,
    transactionTimestamp,
    ammId,
    positionId,
    settlementCashflow,
  }: SettlementConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.positionId = positionId;
    this.settlementCashflow = settlementCashflow;
  }
}

export default Settlement;
