import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CTokenStorage, CTokenStorageInterface } from "../CTokenStorage";
export declare class CTokenStorage__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<CTokenStorage>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): CTokenStorage;
    connect(signer: Signer): CTokenStorage__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060b38061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060465760003560e01c806347bd371814604b5780636c540baf1460655780638f840ddd14606d578063aa5af0fd146075575b600080fd5b605360025481565b60405190815260200160405180910390f35b605360005481565b605360035481565b60536001548156fea264697066735822122027a6a9289d73c48ea622e3604f3f745560c9074b481999fa17eae78ff0ebf2c064736f6c63430008090033";
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
    static createInterface(): CTokenStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): CTokenStorage;
}
//# sourceMappingURL=CTokenStorage__factory.d.ts.map