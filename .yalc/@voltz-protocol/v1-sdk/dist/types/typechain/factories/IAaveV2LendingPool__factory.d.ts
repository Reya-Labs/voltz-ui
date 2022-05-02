import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAaveV2LendingPool, IAaveV2LendingPoolInterface } from "../IAaveV2LendingPool";
export declare class IAaveV2LendingPool__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
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
    })[];
    static createInterface(): IAaveV2LendingPoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAaveV2LendingPool;
}
//# sourceMappingURL=IAaveV2LendingPool__factory.d.ts.map