import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILidoRateOracle, ILidoRateOracleInterface } from "../ILidoRateOracle";
export declare class ILidoRateOracle__factory {
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
    static createInterface(): ILidoRateOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILidoRateOracle;
}
//# sourceMappingURL=ILidoRateOracle__factory.d.ts.map