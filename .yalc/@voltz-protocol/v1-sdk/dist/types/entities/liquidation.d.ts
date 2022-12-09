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
declare class Liquidation {
    readonly id: string;
    readonly transactionId: string;
    readonly transactionTimestamp: JSBI;
    readonly ammId: string;
    readonly positionId: string;
    readonly liquidator: string;
    readonly reward: JSBI;
    readonly notionalUnwound: JSBI;
    constructor({ id, transactionId, transactionTimestamp, ammId, positionId, liquidator, reward, notionalUnwound, }: LiquidationConstructorArgs);
}
export default Liquidation;
//# sourceMappingURL=liquidation.d.ts.map