import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IFCM, IFCMInterface } from "../IFCM";
export declare class IFCM__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IFCMInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IFCM;
}
//# sourceMappingURL=IFCM__factory.d.ts.map