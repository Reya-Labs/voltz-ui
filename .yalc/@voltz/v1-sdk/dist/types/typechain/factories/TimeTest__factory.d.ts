import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TimeTest, TimeTestInterface } from "../TimeTest";
export declare class TimeTest__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TimeTest>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TimeTest;
    connect(signer: Signer): TimeTest__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80636feb472e14602d575b600080fd5b60336045565b60405190815260200160405180910390f35b6000604d6052565b905090565b6000604d42827812725dd1d243aba0e75fe645cc4873f9e65afe688c928e1f21821115609857604051633492ffd960e01b81526004810183905260240160405180910390fd5b50670de0b6b3a7640000029056fea26469706673582212204ce222d5d047454f01e05e3618fdd583899bc13ddf45064946effcff94a5587d64736f6c63430008090033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
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
    static createInterface(): TimeTestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TimeTest;
}
//# sourceMappingURL=TimeTest__factory.d.ts.map