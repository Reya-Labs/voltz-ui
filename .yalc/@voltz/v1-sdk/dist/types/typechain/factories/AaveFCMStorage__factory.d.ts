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
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610120806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632495a59914603757806392a88fa2146066575b600080fd5b6004546049906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b609d607136600460be565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b6040805194855260208501939093529183015215156060820152608001605d565b60006020828403121560ce578081fd5b81356001600160a01b038116811460e3578182fd5b939250505056fea2646970667358221220521945a06bd5c4b2396e195ef81c85a8c08312e8145932d41484f058aa8185fa64736f6c63430008040033";
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