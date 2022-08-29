import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICompoundRateOracle, ICompoundRateOracleInterface } from "../ICompoundRateOracle";
export declare class ICompoundRateOracle__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        anonymous?: undefined;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): ICompoundRateOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICompoundRateOracle;
}
//# sourceMappingURL=ICompoundRateOracle__factory.d.ts.map