import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LiquidityMathTest, LiquidityMathTestInterface } from "../LiquidityMathTest";
export declare class LiquidityMathTest__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<LiquidityMathTest>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): LiquidityMathTest;
    connect(signer: Signer): LiquidityMathTest__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506101f5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063402d44fb1461003b578063cf41632f1461006b575b600080fd5b61004e6100493660046100f3565b61008c565b6040516001600160801b0390911681526020015b60405180910390f35b61007e6100793660046100f3565b6100a1565b604051908152602001610062565b600061009883836100c5565b90505b92915050565b6000805a90506100b184846100c5565b505a6100bd9082610155565b949350505050565b60008082600f0b12156100e95760008290036100e1818561016c565b91505061009b565b6100988284610194565b6000806040838503121561010657600080fd5b82356001600160801b038116811461011d57600080fd5b91506020830135600f81900b811461013457600080fd5b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b6000828210156101675761016761013f565b500390565b60006001600160801b038381169083168181101561018c5761018c61013f565b039392505050565b60006001600160801b038281168482168083038211156101b6576101b661013f565b0194935050505056fea26469706673582212200ddebbe76b69f6da1269a90bb935ccb74f435946c7484cb3d901d5939d1e56dd64736f6c63430008090033";
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
    static createInterface(): LiquidityMathTestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LiquidityMathTest;
}
//# sourceMappingURL=LiquidityMathTest__factory.d.ts.map