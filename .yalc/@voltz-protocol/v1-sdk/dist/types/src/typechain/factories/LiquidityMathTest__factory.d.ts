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
    static readonly bytecode = "0x608060405234801561001057600080fd5b506101f2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063402d44fb1461003b578063cf41632f1461006b575b600080fd5b61004e6100493660046100f3565b61008c565b6040516001600160801b0390911681526020015b60405180910390f35b61007e6100793660046100f3565b6100a1565b604051908152602001610062565b600061009883836100c5565b90505b92915050565b6000805a90506100b184846100c5565b505a6100bd908261018f565b949350505050565b60008082600f0b12156100e95760008290036100e18185610167565b91505061009b565b610098828461013c565b60008060408385031215610105578182fd5b82356001600160801b038116811461011b578283fd5b91506020830135600f81900b8114610131578182fd5b809150509250929050565b60006001600160801b0382811684821680830382111561015e5761015e6101a6565b01949350505050565b60006001600160801b0383811690831681811015610187576101876101a6565b039392505050565b6000828210156101a1576101a16101a6565b500390565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220dc03b5e2f0304c9a44e95d1089e564ee0449f33e2faf408e92c405da385d5b5264736f6c63430008040033";
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