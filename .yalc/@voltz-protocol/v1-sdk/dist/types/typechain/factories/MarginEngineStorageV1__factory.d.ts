import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MarginEngineStorageV1, MarginEngineStorageV1Interface } from "../MarginEngineStorageV1";
export declare class MarginEngineStorageV1__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MarginEngineStorageV1>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MarginEngineStorageV1;
    connect(signer: Signer): MarginEngineStorageV1__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b5060888061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c975abb14602d575b600080fd5b601f54603e90610100900460ff1681565b604051901515815260200160405180910390f3fea2646970667358221220ecbca4cd0653587800082c97d078ec499eaf5733bef8b42061487d05371e3e9964736f6c63430008090033";
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
    static createInterface(): MarginEngineStorageV1Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): MarginEngineStorageV1;
}
//# sourceMappingURL=MarginEngineStorageV1__factory.d.ts.map