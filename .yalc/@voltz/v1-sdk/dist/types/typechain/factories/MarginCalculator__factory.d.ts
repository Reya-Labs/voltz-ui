import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MarginCalculator, MarginCalculatorInterface } from "../MarginCalculator";
export declare class MarginCalculator__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MarginCalculator>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MarginCalculator;
    connect(signer: Signer): MarginCalculator__factory;
    static readonly bytecode = "0x60b3610039600b82828239805160001a60731461002c57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060475760003560e01c80635dcc939114604c57806363f5738114606f578063c2ee3a0814606f575b600080fd5b605d6a1a1601fc4ea7109e00000081565b60405190815260200160405180910390f35b605d670de0b6b3a76400008156fea26469706673582212205a7822020a3f07870d36204951ed51d05a639e8525ec02f572b33c0f61bc971b64736f6c63430008040033";
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
    static createInterface(): MarginCalculatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MarginCalculator;
}
//# sourceMappingURL=MarginCalculator__factory.d.ts.map