import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Time, TimeInterface } from "../Time";
export declare class Time__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Time>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Time;
    connect(signer: Signer): Time__factory;
    static readonly bytecode = "0x6090610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c80634c1489d3146038575b600080fd5b604869124bc0ddd92e5600000081565b60405190815260200160405180910390f3fea26469706673582212200df40bc2b0f23a3d701237b7ed8f6939789653d1dd84511bd751067ea08f0fce64736f6c63430008090033";
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
    static createInterface(): TimeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Time;
}
//# sourceMappingURL=Time__factory.d.ts.map