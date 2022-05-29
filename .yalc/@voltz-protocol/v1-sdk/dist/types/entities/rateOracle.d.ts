export declare type RateOracleConstructorArgs = {
    id: string;
    protocolId: number;
};
declare class RateOracle {
    readonly id: string;
    readonly protocol: string;
    readonly protocolId: number;
    constructor({ id, protocolId }: RateOracleConstructorArgs);
}
export default RateOracle;
//# sourceMappingURL=rateOracle.d.ts.map