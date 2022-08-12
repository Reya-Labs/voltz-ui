import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockRocketEth, MockRocketEthInterface } from "../MockRocketEth";
export declare class MockRocketEth__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockRocketEth>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockRocketEth;
    connect(signer: Signer): MockRocketEth__factory;
    static readonly bytecode = "0x60806040526000805534801561001457600080fd5b506002805461ffff1916600117905561029d806100326000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806327e7b263146100675780633c6756871461007c57806387c891bd1461009d5780638b32fa23146100b75780639ac60cd2146100ca578063ea764620146100f2575b600080fd5b61007a6100753660046101d6565b610105565b005b61007a61008a3660046101ef565b6002805460ff1916911515919091179055565b6100a5610174565b60405190815260200160405180910390f35b6100a56100c53660046101d6565b61018e565b61007a6100d83660046101ef565b600280549115156101000261ff0019909216919091179055565b61007a6101003660046101d6565b6101ba565b600254610100900460ff1661016f5760405162461bcd60e51b815260206004820152602660248201527f456e61626c65206c617374207570646174656420626c6f636b206d616e6970756044820152653630ba34b7b760d11b606482015260840160405180910390fd5b600155565b60025460009060ff161561018757504390565b5060015490565b6000676765c793fa10079d601b1b600054836101aa9190610218565b6101b49190610245565b92915050565b6000819055600254610100900460ff166101d357436001555b50565b6000602082840312156101e857600080fd5b5035919050565b60006020828403121561020157600080fd5b8135801515811461021157600080fd5b9392505050565b600081600019048311821515161561024057634e487b7160e01b600052601160045260246000fd5b500290565b60008261026257634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220d75b144ba4a7bc0f65bced878be1e82485d9a3098533efaf873909d286c9d68164736f6c63430008090033";
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
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
    })[];
    static createInterface(): MockRocketEthInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockRocketEth;
}
//# sourceMappingURL=MockRocketEth__factory.d.ts.map