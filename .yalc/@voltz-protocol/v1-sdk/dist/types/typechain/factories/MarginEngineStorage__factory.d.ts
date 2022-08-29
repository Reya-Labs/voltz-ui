import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MarginEngineStorage, MarginEngineStorageInterface } from "../MarginEngineStorage";
export declare class MarginEngineStorage__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MarginEngineStorage>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MarginEngineStorage;
    connect(signer: Signer): MarginEngineStorage__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b5060888061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c975abb14602d575b600080fd5b601f54603e90610100900460ff1681565b604051901515815260200160405180910390f3fea2646970667358221220650616d7585bdb20509ba15ee73a372f95bbd13b35f6595bb16d2684d35627bc64736f6c63430008090033";
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
    static createInterface(): MarginEngineStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MarginEngineStorage;
}
//# sourceMappingURL=MarginEngineStorage__factory.d.ts.map