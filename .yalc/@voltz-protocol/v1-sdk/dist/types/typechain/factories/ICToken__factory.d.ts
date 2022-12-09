import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICToken, ICTokenInterface } from "../ICToken";
export declare class ICToken__factory {
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
    static createInterface(): ICTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICToken;
}
//# sourceMappingURL=ICToken__factory.d.ts.map