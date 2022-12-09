import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWETH, IWETHInterface } from "../IWETH";
export declare class IWETH__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IWETHInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IWETH;
}
//# sourceMappingURL=IWETH__factory.d.ts.map