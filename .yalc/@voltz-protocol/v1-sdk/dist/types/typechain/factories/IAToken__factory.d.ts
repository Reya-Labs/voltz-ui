import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAToken, IATokenInterface } from "../IAToken";
export declare class IAToken__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): IATokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAToken;
}
//# sourceMappingURL=IAToken__factory.d.ts.map