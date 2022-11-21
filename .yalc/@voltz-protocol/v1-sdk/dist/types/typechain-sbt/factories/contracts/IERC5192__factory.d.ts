import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC5192, IERC5192Interface } from "../../contracts/IERC5192";
export declare class IERC5192__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): IERC5192Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC5192;
}
//# sourceMappingURL=IERC5192__factory.d.ts.map