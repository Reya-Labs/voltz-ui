import JSBI from 'jsbi';

import { DateTime } from 'luxon';
import { BigNumber } from 'ethers';
import AMM from './amm';
import FCMSwap from './fcmSwap';
import FCMUnwind from './fcmUnwind';
import FCMSettlement from './fcmSettlement';

export type FCMPositionConstructorArgs = {
  id: string;
  createdTimestamp: JSBI;
  amm: AMM;
  owner: string;
  updatedTimestamp: JSBI;
  marginInScaledYieldBearingTokens: JSBI;
  fixedTokenBalance: JSBI;
  variableTokenBalance: JSBI;
  isSettled: boolean;
  fcmSwaps: Array<FCMSwap>;
  fcmUnwinds: Array<FCMUnwind>;
  fcmSettlements: Array<FCMSettlement>;
};

class FCMPosition {
  public readonly id: string;

  public readonly createdTimestamp: JSBI;

  public readonly amm: AMM;

  public readonly owner: string;

  public readonly updatedTimestamp: JSBI;

  public readonly marginInScaledYieldBearingTokens: JSBI;

  public readonly fixedTokenBalance: JSBI;

  public readonly variableTokenBalance: JSBI;

  public readonly isSettled: boolean;

  public readonly fcmSwaps: Array<FCMSwap>;

  public readonly fcmUnwinds: Array<FCMUnwind>;

  public readonly fcmSettlements: Array<FCMSettlement>;

  public constructor({
    id,
    createdTimestamp,
    amm,
    owner,
    updatedTimestamp,
    marginInScaledYieldBearingTokens,
    fixedTokenBalance,
    variableTokenBalance,
    isSettled,
    fcmSwaps,
    fcmUnwinds,
    fcmSettlements,
  }: FCMPositionConstructorArgs) {
    this.id = id;
    this.createdTimestamp = createdTimestamp;
    this.amm = amm;
    this.owner = owner;
    this.updatedTimestamp = updatedTimestamp;
    this.marginInScaledYieldBearingTokens = marginInScaledYieldBearingTokens;
    this.fixedTokenBalance = fixedTokenBalance;
    this.variableTokenBalance = variableTokenBalance;
    this.isSettled = isSettled;
    this.fcmSwaps = fcmSwaps;
    this.fcmUnwinds = fcmUnwinds;
    this.fcmSettlements = fcmSettlements;
  }

  public get effectiveMargin(): number {
    const result = this.amm.descale(
      BigNumber.from(this.marginInScaledYieldBearingTokens.toString()),
    );
    return result;
  }

  public get effectiveFixedTokenBalance(): number {
    const result = this.amm.descale(BigNumber.from(this.fixedTokenBalance.toString()));
    return result;
  }

  public get effectiveVariableTokenBalance(): number {
    const result = this.amm.descale(BigNumber.from(this.variableTokenBalance.toString()));
    return result;
  }

  public get createdDateTime(): DateTime {
    return DateTime.fromMillis(JSBI.toNumber(this.createdTimestamp));
  }

  public get updatedDateTime(): DateTime {
    return DateTime.fromMillis(JSBI.toNumber(this.updatedTimestamp));
  }
}

export default FCMPosition;
