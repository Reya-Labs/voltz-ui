import JSBI from 'jsbi';

export type BurnConstructorArgs = {
  id: string;
  transactionId: string;
  transactionTimestamp: JSBI;
  ammId: string;
  positionId: string;
  sender: string;
  amount: JSBI;
};

class Burn {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionTimestamp: JSBI;

  public readonly ammId: string;

  public readonly positionId: string;

  public readonly sender: string;

  public readonly amount: JSBI;

  public constructor({
    id,
    transactionId,
    transactionTimestamp,
    ammId,
    positionId,
    sender,
    amount,
  }: BurnConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.positionId = positionId;
    this.sender = sender;
    this.amount = amount;
  }
}

export default Burn;
