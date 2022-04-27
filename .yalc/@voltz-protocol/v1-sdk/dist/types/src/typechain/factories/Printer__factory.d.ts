import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Printer, PrinterInterface } from "../Printer";
export declare class Printer__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Printer>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Printer;
    connect(signer: Signer): Printer__factory;
    static readonly bytecode = "0x6089610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c8063f646ec79146038575b600080fd5b603f600181565b604051901515815260200160405180910390f3fea2646970667358221220628aaf8a5769c3a20ee2f3bb4550388ee3a310351c7e08fb441b2d507928d45e64736f6c63430008040033";
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
    static createInterface(): PrinterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Printer;
}
//# sourceMappingURL=Printer__factory.d.ts.map