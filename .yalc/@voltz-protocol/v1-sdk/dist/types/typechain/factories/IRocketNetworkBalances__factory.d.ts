import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRocketNetworkBalances, IRocketNetworkBalancesInterface } from "../IRocketNetworkBalances";
export declare class IRocketNetworkBalances__factory {
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
    static createInterface(): IRocketNetworkBalancesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRocketNetworkBalances;
}
//# sourceMappingURL=IRocketNetworkBalances__factory.d.ts.map