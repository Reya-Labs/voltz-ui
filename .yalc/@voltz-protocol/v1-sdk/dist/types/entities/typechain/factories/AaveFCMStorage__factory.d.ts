import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AaveFCMStorage, AaveFCMStorageInterface } from "../AaveFCMStorage";
export declare class AaveFCMStorage__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<AaveFCMStorage>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): AaveFCMStorage;
    connect(signer: Signer): AaveFCMStorage__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061015c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632495a599146100465780635c975abb1461007657806392a88fa21461009a575b600080fd5b600454610059906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b60045461008a90600160a01b900460ff1681565b604051901515815260200161006d565b6100d46100a83660046100f6565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b604080519485526020850193909352918301521515606082015260800161006d565b60006020828403121561010857600080fd5b81356001600160a01b038116811461011f57600080fd5b939250505056fea26469706673582212201cd49f346dbe0247343fbc16e5b30d5c601271d239fed4f3960377f7681d549764736f6c63430008090033";
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
    static createInterface(): AaveFCMStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AaveFCMStorage;
}
//# sourceMappingURL=AaveFCMStorage__factory.d.ts.map