import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILidoOracle, ILidoOracleInterface } from "../ILidoOracle";
export declare class ILidoOracle__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ILidoOracleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILidoOracle;
}
//# sourceMappingURL=ILidoOracle__factory.d.ts.map