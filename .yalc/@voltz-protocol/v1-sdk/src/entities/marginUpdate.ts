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

class MarginUpdate {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionTimestamp: JSBI;

  public readonly ammId: string;

  public readonly positionId: string;

  public readonly depositer: string;

  public readonly marginDelta: JSBI;

  public constructor({
    id,
    transactionId,
    transactionTimestamp,
    ammId,
    positionId,
    depositer,
    marginDelta,
  }: MarginUpdateConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.positionId = positionId;
    this.depositer = depositer;
    this.marginDelta = marginDelta;
  }
}

export default MarginUpdate;
