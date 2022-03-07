import { Signer } from "ethers";
export declare type RateOracleConstructorArgs = {
    id: string;
};
declare class RateOracle {
    readonly id: string;
    constructor({ id }: RateOracleConstructorArgs);
    private _underlyingYieldBearingProtocolID;
    underlyingYieldBearingProtocolName(signer: Signer): Promise<string>;
}
export default RateOracle;
//# sourceMappingURL=rateOracle.d.ts.map