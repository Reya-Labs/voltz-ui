import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockRocketNetworkBalances, MockRocketNetworkBalancesInterface } from "../MockRocketNetworkBalances";
export declare class MockRocketNetworkBalances__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(mockRocketEth: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockRocketNetworkBalances>;
    getDeployTransaction(mockRocketEth: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockRocketNetworkBalances;
    connect(signer: Signer): MockRocketNetworkBalances__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516101ef3803806101ef83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61015c806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634cff6e041461003b5780639100c13d1461006b575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b610073610081565b604051908152602001610062565b60008060009054906101000a90046001600160a01b03166001600160a01b03166387c891bd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156100d057600080fd5b505afa1580156100e4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610108919061010d565b905090565b60006020828403121561011f57600080fd5b505191905056fea26469706673582212200fff083e3d80a666246dd546693c67fc796539ea38feffeb878cdca7f42a4f1c64736f6c63430008090033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): MockRocketNetworkBalancesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockRocketNetworkBalances;
}
//# sourceMappingURL=MockRocketNetworkBalances__factory.d.ts.map