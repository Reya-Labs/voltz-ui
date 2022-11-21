import JSBI from 'jsbi';

export type LiquidationConstructorArgs = {
  id: string;
  transactionId: string;
  transactionTimestamp: JSBI;
  ammId: string;
  positionId: string;
  liquidator: string;
  reward: JSBI;
  notionalUnwound: JSBI;
};

class Liquidation {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionTimestamp: JSBI;

  public readonly ammId: string;

  public readonly positionId: string;

  public readonly liquidator: string;

  public readonly reward: JSBI;

  public readonly notionalUnwound: JSBI;

  public constructor({
    id,
    transactionId,
    transactionTimestamp,
    ammId,
    positionId,
    liquidator,
    reward,
    notionalUnwound,
  }: LiquidationConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.positionId = positionId;
    this.liquidator = liquidator;
    this.reward = reward;
    this.notionalUnwound = notionalUnwound;
  }
}

export default Liquidation;
