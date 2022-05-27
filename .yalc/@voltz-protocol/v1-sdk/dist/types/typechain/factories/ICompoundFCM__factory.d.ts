import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICompoundFCM, ICompoundFCMInterface } from "../ICompoundFCM";
export declare class ICompoundFCM__factory {
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
    static createInterface(): ICompoundFCMInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICompoundFCM;
}
//# sourceMappingURL=ICompoundFCM__factory.d.ts.map