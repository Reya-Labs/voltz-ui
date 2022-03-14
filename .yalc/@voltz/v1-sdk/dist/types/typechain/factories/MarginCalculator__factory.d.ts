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
    static readonly bytecode = "0x61015661003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c80635dcc939114610045578063b909f7321461005f575b600080fd5b61004d61006e565b60405190815260200160405180910390f35b61004d670de0b6b3a764000081565b610084670de0b6b3a76400006301e13380610087565b81565b60006001600160ff1b03818413828413808216868404861116156100ad576100ad61010a565b600160ff1b848712828116878305891216156100cb576100cb61010a565b8587129250878205871284841616156100e6576100e661010a565b878505871281841616156100fc576100fc61010a565b505050929093029392505050565b634e487b7160e01b600052601160045260246000fdfea264697066735822122032db56f9d4d583bc69125409d56449dc9cb7342be335941eb4d0beabb3cc6ded64736f6c63430008040033";
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