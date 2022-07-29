import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRateOracle, IRateOracleInterface } from "../IRateOracle";
export declare class IRateOracle__factory {
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
    static createInterface(): IRateOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRateOracle;
}
//# sourceMappingURL=IRateOracle__factory.d.ts.map