import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { OracleBuffer, OracleBufferInterface } from "../OracleBuffer";
export declare class OracleBuffer__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<OracleBuffer>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): OracleBuffer;
    connect(signer: Signer): OracleBuffer__factory;
    static readonly bytecode = "0x6088610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c8063ad73a0cc146038575b600080fd5b604061ffff81565b60405190815260200160405180910390f3fea26469706673582212205a9ac5e4d1a45b37cd47bf8ec21c72b7f623bc7acdd17ac2a8662f0bb56bef9c64736f6c63430008090033";
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
    static createInterface(): OracleBufferInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): OracleBuffer;
}
//# sourceMappingURL=OracleBuffer__factory.d.ts.map