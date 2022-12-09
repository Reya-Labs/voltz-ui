import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IStETH, IStETHInterface } from "../IStETH";
export declare class IStETH__factory {
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
    static createInterface(): IStETHInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IStETH;
}
//# sourceMappingURL=IStETH__factory.d.ts.map