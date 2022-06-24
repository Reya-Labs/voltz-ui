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
    static readonly bytecode = "0x6080604052348015600f57600080fd5b5060888061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c975abb14602d575b600080fd5b601f54603e90610100900460ff1681565b604051901515815260200160405180910390f3fea2646970667358221220633a86d282c86ed17deac8bd9eaa8fe99a96e1c32d35598a940b91f19b67490364736f6c63430008090033";
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