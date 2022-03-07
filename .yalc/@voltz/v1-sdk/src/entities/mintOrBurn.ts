import JSBI from 'jsbi';

export type MintOrBurnConstructorArgs = {
  id: string;
  transactionId: string;
  transactionBlockNumber: number;
  transactionTimestamp: number;
  ammId: string;
  positionId: string;
  sender: string;
  amount: JSBI;
};

class MintOrBurn {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionBlockNumber: number;

  public readonly transactionTimestamp: number;

  public readonly ammId: string;

  public readonly positionId: string;

  public readonly sender: string;

  public constructor({
    id,
    transactionId,
    transactionBlockNumber,
    transactionTimestamp,
    ammId,
    positionId,
    sender,
  }: MintOrBurnConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionBlockNumber = transactionBlockNumber;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.positionId = positionId;
    this.sender = sender;
  }
}

export default MintOrBurn;
