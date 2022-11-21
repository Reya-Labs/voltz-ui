import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRocketEth, IRocketEthInterface } from "../IRocketEth";
export declare class IRocketEth__factory {
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
    static createInterface(): IRocketEthInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRocketEth;
}
//# sourceMappingURL=IRocketEth__factory.d.ts.map