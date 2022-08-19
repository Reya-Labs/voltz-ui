import { Signer, BytesLike, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VoltzERC1967Proxy, VoltzERC1967ProxyInterface } from "../VoltzERC1967Proxy";
export declare class VoltzERC1967Proxy__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(_logic: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<VoltzERC1967Proxy>;
    getDeployTransaction(_logic: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): VoltzERC1967Proxy;
    connect(signer: Signer): VoltzERC1967Proxy__factory;
    static readonly bytecode = "0x60806040526040516107b33803806107b38339810160408190526100229161034d565b818161004f60017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd61041b565b60008051602061076c8339815191521461006b5761006b610440565b61007782826000610080565b505050506104a5565b610089836100b6565b6000825111806100965750805b156100b1576100af83836100f660201b6100291760201c565b505b505050565b6100bf81610122565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606061011b838360405180606001604052806027815260200161078c602791396101e2565b9392505050565b610135816102c060201b6100551760201c565b61019c5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101c160008051602061076c83398151915260001b6102cf60201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606001600160a01b0384163b61024a5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610193565b600080856001600160a01b0316856040516102659190610456565b600060405180830381855af49150503d80600081146102a0576040519150601f19603f3d011682016040523d82523d6000602084013e6102a5565b606091505b5090925090506102b68282866102d2565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102e157508161011b565b8251156102f15782518084602001fd5b8160405162461bcd60e51b81526004016101939190610472565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561033c578181015183820152602001610324565b838111156100af5750506000910152565b6000806040838503121561036057600080fd5b82516001600160a01b038116811461037757600080fd5b60208401519092506001600160401b038082111561039457600080fd5b818501915085601f8301126103a857600080fd5b8151818111156103ba576103ba61030b565b604051601f8201601f19908116603f011681019083821181831017156103e2576103e261030b565b816040528281528860208487010111156103fb57600080fd5b61040c836020830160208801610321565b80955050505050509250929050565b60008282101561043b57634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052600160045260246000fd5b60008251610468818460208701610321565b9190910192915050565b6020815260008251806020840152610491816040850160208701610321565b601f01601f19169190910160400192915050565b6102b8806104b46000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b61009f565b565b606061004e838360405180606001604052806027815260200161025c602791396100c3565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e8080156100be573d6000f35b3d6000fd5b60606100ce84610055565b61012e5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b031685604051610149919061020c565b600060405180830381855af49150503d8060008114610184576040519150601f19603f3d011682016040523d82523d6000602084013e610189565b606091505b50915091506101998282866101a3565b9695505050505050565b606083156101b257508161004e565b8251156101c25782518084602001fd5b8160405162461bcd60e51b81526004016101259190610228565b60005b838110156101f75781810151838201526020016101df565b83811115610206576000848401525b50505050565b6000825161021e8184602087016101dc565b9190910192915050565b60208152600082518060208401526102478160408501602087016101dc565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212208a79f2061d77c24b1c814d6fd0f724b28d108e43a86c41680e1ad7e6d7a30bc064736f6c63430008090033360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        anonymous?: undefined;
    })[];
    static createInterface(): VoltzERC1967ProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): VoltzERC1967Proxy;
}
//# sourceMappingURL=VoltzERC1967Proxy__factory.d.ts.map