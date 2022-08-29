import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VAMMStorageV1, VAMMStorageV1Interface } from "../VAMMStorageV1";
export declare class VAMMStorageV1__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<VAMMStorageV1>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): VAMMStorageV1;
    connect(signer: Signer): VAMMStorageV1__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b5060838061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c975abb14602d575b600080fd5b60125460399060ff1681565b604051901515815260200160405180910390f3fea2646970667358221220f1e036fb81936eddee86caf2a2ee466c8e0fe7837d03110eeeb2f466142f676f64736f6c63430008090033";
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
    static createInterface(): VAMMStorageV1Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): VAMMStorageV1;
}
//# sourceMappingURL=VAMMStorageV1__factory.d.ts.map