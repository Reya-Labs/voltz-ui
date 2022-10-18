import JSBI from 'jsbi';
import { DateTime } from 'luxon';
import AMM from './amm';
import FCMSwap from './fcmSwap';
import FCMUnwind from './fcmUnwind';
import FCMSettlement from './fcmSettlement';
export declare type FCMPositionConstructorArgs = {
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
declare class FCMPosition {
    readonly id: string;
    readonly createdTimestamp: JSBI;
    readonly amm: AMM;
    readonly owner: string;
    readonly updatedTimestamp: JSBI;
    readonly marginInScaledYieldBearingTokens: JSBI;
    readonly fixedTokenBalance: JSBI;
    readonly variableTokenBalance: JSBI;
    readonly isSettled: boolean;
    readonly fcmSwaps: Array<FCMSwap>;
    readonly fcmUnwinds: Array<FCMUnwind>;
    readonly fcmSettlements: Array<FCMSettlement>;
    constructor({ id, createdTimestamp, amm, owner, updatedTimestamp, marginInScaledYieldBearingTokens, fixedTokenBalance, variableTokenBalance, isSettled, fcmSwaps, fcmUnwinds, fcmSettlements, }: FCMPositionConstructorArgs);
    get effectiveMargin(): number;
    get effectiveFixedTokenBalance(): number;
    get effectiveVariableTokenBalance(): number;
    get createdDateTime(): DateTime;
    get updatedDateTime(): DateTime;
}
export default FCMPosition;
//# sourceMappingURL=fcmPosition.d.ts.map