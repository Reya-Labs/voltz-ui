import JSBI from 'jsbi';

export type FCMSwapConstructorArgs = {
  id: string;
  transactionId: string;
  transactionTimestamp: JSBI;
  ammId: string;
  fcmPositionId: string;
  desiredNotional: JSBI;
  sqrtPriceLimitX96: JSBI;
  cumulativeFeeIncurred: JSBI;
  fixedTokenDelta: JSBI;
  variableTokenDelta: JSBI;
  fixedTokenDeltaUnbalanced: JSBI;
};

class FCMSwap {
  public readonly id: string;

  public readonly transactionId: string;

  public readonly transactionTimestamp: JSBI;

  public readonly ammId: string;

  public readonly fcmPositionId: string;

  public readonly desiredNotional: JSBI;

  public readonly sqrtPriceLimitX96: JSBI;

  public readonly cumulativeFeeIncurred: JSBI;

  public readonly fixedTokenDelta: JSBI;

  public readonly variableTokenDelta: JSBI;

  public readonly fixedTokenDeltaUnbalanced: JSBI;

  public constructor({
    id,
    transactionId,
    transactionTimestamp,
    ammId,
    fcmPositionId,
    desiredNotional,
    sqrtPriceLimitX96,
    cumulativeFeeIncurred,
    fixedTokenDelta,
    variableTokenDelta,
    fixedTokenDeltaUnbalanced,
  }: FCMSwapConstructorArgs) {
    this.id = id;
    this.transactionId = transactionId;
    this.transactionTimestamp = transactionTimestamp;
    this.ammId = ammId;
    this.fcmPositionId = fcmPositionId;
    this.desiredNotional = desiredNotional;
    this.sqrtPriceLimitX96 = sqrtPriceLimitX96;
    this.cumulativeFeeIncurred = cumulativeFeeIncurred;
    this.fixedTokenDelta = fixedTokenDelta;
    this.variableTokenDelta = variableTokenDelta;
    this.fixedTokenDeltaUnbalanced = fixedTokenDeltaUnbalanced;
  }
}

export default FCMSwap;
