import JSBI from 'jsbi';

export type SwapConstructorArgs = {
  // todo:  need more data in here (e.g the fixed delta unbalanced and variable delta, cumulative fees)
  id: string;
  transactionId: string;
  transactionBlockNumber: number;
  transactionTimestamp: number;
  ammId: string;
  positionId: string;
  sender: string;
  txIndex: number;
  sqrtPriceX96: JSBI;
  liquidity: JSBI;
  tick: number;
};

class Swap {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionBlockNumber: number;

  public readonly transactionTimestamp: number;

  public readonly ammId: string;

  public readonly positionId: string;

  public readonly sender: string;

  public readonly txIndex: number;

  public readonly sqrtPriceX96: JSBI;

  public readonly liquidity: JSBI;

  public readonly tick: number;

  public constructor({
    id,
    transactionId,
    transactionBlockNumber,
    transactionTimestamp,
    ammId,
    positionId,
    sender,
    txIndex,
    sqrtPriceX96,
    liquidity,
    tick,
  }: SwapConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionBlockNumber = transactionBlockNumber;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.positionId = positionId;
    this.sender = sender;
    this.txIndex = txIndex;
    this.sqrtPriceX96 = sqrtPriceX96;
    this.liquidity = liquidity;
    this.tick = tick;
  }
}

export default Swap;
