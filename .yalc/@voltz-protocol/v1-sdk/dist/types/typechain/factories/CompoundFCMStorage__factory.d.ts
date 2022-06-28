import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CompoundFCMStorage, CompoundFCMStorageInterface } from "../CompoundFCMStorage";
export declare class CompoundFCMStorage__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<CompoundFCMStorage>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): CompoundFCMStorage;
    connect(signer: Signer): CompoundFCMStorage__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061015c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632495a599146100465780635c975abb1461007657806392a88fa21461009a575b600080fd5b600454610059906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b60045461008a90600160a01b900460ff1681565b604051901515815260200161006d565b6100d46100a83660046100f6565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b604080519485526020850193909352918301521515606082015260800161006d565b60006020828403121561010857600080fd5b81356001600160a01b038116811461011f57600080fd5b939250505056fea26469706673582212208598d445ef61c37cd69641a1ed1e6d96037aadc178428080e136bea95e0ba73c64736f6c63430008090033";
    static readonly abi: {
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
    }[];
    static createInterface(): CompoundFCMStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): CompoundFCMStorage;
}
//# sourceMappingURL=CompoundFCMStorage__factory.d.ts.map