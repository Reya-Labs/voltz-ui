import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAaveFCM, IAaveFCMInterface } from "../IAaveFCM";
export declare class IAaveFCM__factory {
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
    static createInterface(): IAaveFCMInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAaveFCM;
}
//# sourceMappingURL=IAaveFCM__factory.d.ts.map