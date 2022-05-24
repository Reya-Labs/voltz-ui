import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Tick, TickInterface } from "../Tick";
export declare class Tick__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Tick>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Tick;
    connect(signer: Signer): Tick__factory;
    static readonly bytecode = "0x608d610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c8063142cf488146038575b600080fd5b604061400081565b60405160029190910b815260200160405180910390f3fea2646970667358221220b8e3c4bfd3949abc2e3fa1fce9900cbed9d90298496c62681b0f2d48c13c97f164736f6c63430008040033";
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
    static createInterface(): TickInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Tick;
}
//# sourceMappingURL=Tick__factory.d.ts.map