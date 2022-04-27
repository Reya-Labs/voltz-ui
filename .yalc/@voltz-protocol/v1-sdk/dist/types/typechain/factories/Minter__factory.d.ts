import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Minter, MinterInterface } from "../Minter";
export declare class Minter__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Minter>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Minter;
    connect(signer: Signer): Minter__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061020a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80631f2405b11461003b5780637b4f532714610050575b600080fd5b61004e61004936600461012e565b610063565b005b61004e61005e36600461012e565b6100ce565b604051631f2f089360e01b81526001600160a01b03861690631f2f0893906100959087908790879087906004016101a1565b600060405180830381600087803b1580156100af57600080fd5b505af11580156100c3573d6000803e3d6000fd5b505050505050505050565b604051635c6651a760e11b81526001600160a01b0386169063b8cca34e906100959087908790879087906004016101a1565b80356001600160a01b038116811461011757600080fd5b919050565b8035600281900b811461011757600080fd5b600080600080600060a08688031215610145578081fd5b61014e86610100565b945061015c60208701610100565b935061016a6040870161011c565b92506101786060870161011c565b915060808601356001600160801b0381168114610193578182fd5b809150509295509295909350565b6001600160a01b03949094168452600292830b6020850152910b60408301526001600160801b031660608201526080019056fea26469706673582212202c12f5e3bd017f226a59990767809aa3f685d39166d8f3a4701fb6f426f1ae9164736f6c63430008040033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): MinterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Minter;
}
//# sourceMappingURL=Minter__factory.d.ts.map