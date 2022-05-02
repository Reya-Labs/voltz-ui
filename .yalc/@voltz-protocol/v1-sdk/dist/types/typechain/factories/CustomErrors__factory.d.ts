import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CustomErrors, CustomErrorsInterface } from "../CustomErrors";
export declare class CustomErrors__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): CustomErrorsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): CustomErrors;
}
//# sourceMappingURL=CustomErrors__factory.d.ts.map