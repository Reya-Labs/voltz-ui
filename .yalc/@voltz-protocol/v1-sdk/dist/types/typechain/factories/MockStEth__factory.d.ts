import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockStEth, MockStEthInterface } from "../MockStEth";
export declare class MockStEth__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockStEth>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockStEth;
    connect(signer: Signer): MockStEth__factory;
    static readonly bytecode = "0x60806040526b033b2e3c9fd0803ce800000060005534801561002057600080fd5b5061012d806100306000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806372228f9e1460375780637a28fb88146049575b600080fd5b604760423660046092565b600055565b005b605860543660046092565b606a565b60405190815260200160405180910390f35b6000676765c793fa10079d601b1b600054836084919060aa565b608c919060d6565b92915050565b60006020828403121560a357600080fd5b5035919050565b600081600019048311821515161560d157634e487b7160e01b600052601160045260246000fd5b500290565b60008260f257634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212200d8d9e7089e51617ee51dc2d29caae3801789dfae87e2cbdf59eba9de01e849a64736f6c63430008090033";
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
    static createInterface(): MockStEthInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockStEth;
}
//# sourceMappingURL=MockStEth__factory.d.ts.map