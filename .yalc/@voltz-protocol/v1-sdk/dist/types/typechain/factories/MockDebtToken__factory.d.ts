import { Signer, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockDebtToken, MockDebtTokenInterface } from "../MockDebtToken";
export declare class MockDebtToken__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(name: string, symbol: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<MockDebtToken>;
    getDeployTransaction(name: string, symbol: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockDebtToken;
    connect(signer: Signer): MockDebtToken__factory;
    static readonly bytecode = "0x608060405260405162000f1838038062000f188339810160408190526200002691620002e4565b8151829082906200003f90600390602085019062000171565b5080516200005590600490602084019062000171565b5050506200006f3364e8d4a510006200007760201b60201c565b5050620003b2565b62000083828262000087565b5050565b6001600160a01b038216620000e25760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f691906200034e565b90915550506001600160a01b03821660009081526020819052604081208054839290620001259084906200034e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a362000083565b8280546200017f9062000375565b90600052602060002090601f016020900481019282620001a35760008555620001ee565b82601f10620001be57805160ff1916838001178555620001ee565b82800160010185558215620001ee579182015b82811115620001ee578251825591602001919060010190620001d1565b50620001fc92915062000200565b5090565b5b80821115620001fc576000815560010162000201565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200023f57600080fd5b81516001600160401b03808211156200025c576200025c62000217565b604051601f8301601f19908116603f0116810190828211818310171562000287576200028762000217565b81604052838152602092508683858801011115620002a457600080fd5b600091505b83821015620002c85785820183015181830184015290820190620002a9565b83821115620002da5760008385830101525b9695505050505050565b60008060408385031215620002f857600080fd5b82516001600160401b03808211156200031057600080fd5b6200031e868387016200022d565b935060208501519150808211156200033557600080fd5b5062000344858286016200022d565b9150509250929050565b600082198211156200037057634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200038a57607f821691505b60208210811415620003ac57634e487b7160e01b600052602260045260246000fd5b50919050565b610b5680620003c26000396000f3fe608060405234801561001057600080fd5b50600436106100c55760003560e01c806306fdde03146100ca578063095ea7b3146100e857806318160ddd1461010b578063222f5be01461011d57806323b872dd14610132578063313ce56714610145578063395093511461015457806340c10f191461016757806356189cb41461017a57806370a082311461018d57806395d89b41146101b65780639dc29fac146101be578063a457c2d7146101d1578063a9059cbb146101e4578063dd62ed3e146101f7575b600080fd5b6100d261020a565b6040516100df9190610954565b60405180910390f35b6100fb6100f63660046109c5565b61029c565b60405190151581526020016100df565b6002545b6040519081526020016100df565b61013061012b3660046109ef565b6102b4565b005b6100fb6101403660046109ef565b6102c4565b604051601281526020016100df565b6100fb6101623660046109c5565b6102e8565b6101306101753660046109c5565b61030a565b6101306101883660046109ef565b610318565b61010f61019b366004610a2b565b6001600160a01b031660009081526020819052604090205490565b6100d2610323565b6101306101cc3660046109c5565b610332565b6100fb6101df3660046109c5565b61033c565b6100fb6101f23660046109c5565b6103bc565b61010f610205366004610a4d565b6103ca565b60606003805461021990610a80565b80601f016020809104026020016040519081016040528092919081815260200182805461024590610a80565b80156102925780601f1061026757610100808354040283529160200191610292565b820191906000526020600020905b81548152906001019060200180831161027557829003601f168201915b5050505050905090565b6000336102aa8185856103f5565b5060019392505050565b6102bf838383610519565b505050565b6000336102d28582856106d7565b6102dd858585610519565b506001949350505050565b6000336102aa8185856102fb83836103ca565b6103059190610ad1565b6103f5565b610314828261074b565b5050565b6102bf8383836103f5565b60606004805461021990610a80565b6103148282610818565b6000338161034a82866103ca565b9050838110156103af5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102dd82868684036103f5565b6000336102aa818585610519565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166104575760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103a6565b6001600160a01b0382166104b85760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103a6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03831661057d5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103a6565b6001600160a01b0382166105df5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103a6565b6001600160a01b038316600090815260208190526040902054818110156106575760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103a6565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061068e908490610ad1565b92505081905550826001600160a01b0316846001600160a01b0316600080516020610b01833981519152846040516106c891815260200190565b60405180910390a35b50505050565b60006106e384846103ca565b905060001981146106d1578181101561073e5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103a6565b6106d184848484036103f5565b6001600160a01b0382166107a15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103a6565b80600260008282546107b39190610ad1565b90915550506001600160a01b038216600090815260208190526040812080548392906107e0908490610ad1565b90915550506040518181526001600160a01b03831690600090600080516020610b018339815191529060200160405180910390a35050565b6001600160a01b0382166108785760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103a6565b6001600160a01b038216600090815260208190526040902054818110156108ec5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103a6565b6001600160a01b038316600090815260208190526040812083830390556002805484929061091b908490610ae9565b90915550506040518281526000906001600160a01b03851690600080516020610b018339815191529060200160405180910390a3505050565b600060208083528351808285015260005b8181101561098157858101830151858201604001528201610965565b81811115610993576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146109c057600080fd5b919050565b600080604083850312156109d857600080fd5b6109e1836109a9565b946020939093013593505050565b600080600060608486031215610a0457600080fd5b610a0d846109a9565b9250610a1b602085016109a9565b9150604084013590509250925092565b600060208284031215610a3d57600080fd5b610a46826109a9565b9392505050565b60008060408385031215610a6057600080fd5b610a69836109a9565b9150610a77602084016109a9565b90509250929050565b600181811c90821680610a9457607f821691505b60208210811415610ab557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610ae457610ae4610abb565b500190565b600082821015610afb57610afb610abb565b50039056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa264697066735822122000aa4c6cf71964b03fed1c3be11de3a3085413e3539e488d3275e455d157519364736f6c63430008090033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
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
        anonymous?: undefined;
    })[];
    static createInterface(): MockDebtTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockDebtToken;
}
//# sourceMappingURL=MockDebtToken__factory.d.ts.map