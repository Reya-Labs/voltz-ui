/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockAToken, MockATokenInterface } from "../MockAToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IAaveV2LendingPool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "underlyingAsset",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "POOL",
    outputs: [
      {
        internalType: "contract IAaveV2LendingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNDERLYING_ASSET_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiverOfUnderlying",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getScaledUserBalanceAndSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "scaledBalanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "scaledTotalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620015a4380380620015a48339810160408190526200003491620001f8565b8151829082906200004d9060039060208501906200009f565b508051620000639060049060208401906200009f565b5050600580546001600160a01b039687166001600160a01b031991821617909155600680549590961694169390931790935550620002f6915050565b828054620000ad906200028a565b90600052602060002090601f016020900481019282620000d157600085556200011c565b82601f10620000ec57805160ff19168380011785556200011c565b828001600101855582156200011c579182015b828111156200011c578251825591602001919060010190620000ff565b506200012a9291506200012e565b5090565b5b808211156200012a57600081556001016200012f565b600082601f83011262000156578081fd5b81516001600160401b0380821115620001735762000173620002c7565b604051601f8301601f19908116603f011681019082821181831017156200019e576200019e620002c7565b81604052838152602092508683858801011115620001ba578485fd5b8491505b83821015620001dd5785820183015181830184015290820190620001be565b83821115620001ee57848385830101525b9695505050505050565b600080600080608085870312156200020e578384fd5b84516200021b81620002dd565b60208601519094506200022e81620002dd565b60408601519093506001600160401b03808211156200024b578384fd5b620002598883890162000145565b935060608701519150808211156200026f578283fd5b506200027e8782880162000145565b91505092959194509250565b600181811c908216806200029f57607f821691505b60208210811415620002c157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114620002f357600080fd5b50565b61129e80620003066000396000f3fe608060405234801561001057600080fd5b50600436106100e65760003560e01c806306fdde03146100eb578063095ea7b3146101095780630afbcdc91461012c578063156e29f61461015457806318160ddd146101675780631da24f3e1461017d57806323b872dd14610190578063313ce567146101a357806339509351146101b257806370a08231146101c55780637535d246146101d857806395d89b41146101f2578063a457c2d7146101fa578063a9059cbb1461020d578063b16a19de14610220578063b1bf962d14610231578063d7020d0a14610239578063dd62ed3e1461024e575b600080fd5b6100f3610287565b6040516101009190611136565b60405180910390f35b61011c61011736600461108f565b610319565b6040519015158152602001610100565b61013f61013a366004610fc7565b610330565b60408051928352602083019190915201610100565b61011c6101623660046110b8565b610348565b61016f6103f2565b604051908152602001610100565b61016f61018b366004610fc7565b6104a3565b61011c61019e366004611013565b6104ae565b60405160128152602001610100565b61011c6101c036600461108f565b610558565b61016f6101d3366004610fc7565b610594565b6005546001600160a01b03165b6040516101009190611122565b6100f361062d565b61011c61020836600461108f565b61063c565b61011c61021b36600461108f565b6106d5565b6006546001600160a01b03166101e5565b61016f6106e2565b61024c61024736600461104e565b6106f2565b005b61016f61025c366004610fe1565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b606060038054610296906111f7565b80601f01602080910402602001604051908101604052809291908181526020018280546102c2906111f7565b801561030f5780601f106102e45761010080835404028352916020019161030f565b820191906000526020600020905b8154815290600101906020018083116102f257829003601f168201915b5050505050905090565b6000610326338484610867565b5060015b92915050565b60008061033c8361098c565b60025491509150915091565b6000806103548561098c565b9050600061036285856109a7565b9050806103af5760405162461bcd60e51b815260206004820152601660248201527510d517d253959053125117d352539517d05353d5539560521b60448201526064015b60405180910390fd5b6103b98682610a83565b6040518581526001600160a01b038716906000906000805160206112498339815191529060200160405180910390a35015949350505050565b6000806103fe60025490565b90508061040d57600091505090565b60055460065460405163d15e005360e01b815261049d926001600160a01b039081169263d15e0053926104469290911690600401611122565b60206040518083038186803b15801561045e57600080fd5b505afa158015610472573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610496919061110a565b8290610b50565b91505090565b600061032a8261098c565b60006104bb848484610c10565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156105405760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084016103a6565b61054d8533858403610867565b506001949350505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161032691859061058f908690611189565b610867565b60055460065460405163d15e005360e01b815260009261032a926001600160a01b039182169263d15e0053926105ce921690600401611122565b60206040518083038186803b1580156105e657600080fd5b505afa1580156105fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061e919061110a565b6106278461098c565b90610b50565b606060048054610296906111f7565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156106be5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103a6565b6106cb3385858403610867565b5060019392505050565b6000610326338484610c10565b60006106ed60025490565b905090565b6005546001600160a01b0316331461074c5760405162461bcd60e51b815260206004820152601e60248201527f43545f43414c4c45525f4d5553545f42455f4c454e44494e475f504f4f4c000060448201526064016103a6565b600061075883836109a7565b9050806107a05760405162461bcd60e51b815260206004820152601660248201527510d517d253959053125117d095549397d05353d5539560521b60448201526064016103a6565b6107aa8582610cba565b60065460405163a9059cbb60e01b81526001600160a01b038681166004830152602482018690529091169063a9059cbb90604401602060405180830381600087803b1580156107f857600080fd5b505af115801561080c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083091906110ea565b506040518381526000906001600160a01b038716906000805160206112498339815191529060200160405180910390a35050505050565b6001600160a01b0383166108c95760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103a6565b6001600160a01b03821661092a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103a6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b031660009081526020819052604090205490565b604080518082019091526002815261035360f41b6020820152600090826109e15760405162461bcd60e51b81526004016103a69190611136565b5060006109ef6002846111a1565b9050676765c793fa10079d601b1b610a09826000196111e0565b610a1391906111a1565b84111560405180604001604052806002815260200161068760f31b81525090610a4f5760405162461bcd60e51b81526004016103a69190611136565b508281610a67676765c793fa10079d601b1b876111c1565b610a719190611189565b610a7b91906111a1565b949350505050565b6001600160a01b038216610ad95760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103a6565b8060026000828254610aeb9190611189565b90915550506001600160a01b03821660009081526020819052604081208054839290610b18908490611189565b90915550506040518181526001600160a01b038316906000906000805160206112498339815191529060200160405180910390a35050565b6000821580610b5d575081155b15610b6a5750600061032a565b81610b816002676765c793fa10079d601b1b6111a1565b610b8d906000196111e0565b610b9791906111a1565b83111560405180604001604052806002815260200161068760f31b81525090610bd35760405162461bcd60e51b81526004016103a69190611136565b50676765c793fa10079d601b1b610beb6002826111a1565b610bf584866111c1565b610bff9190611189565b610c0991906111a1565b9392505050565b60065460055460405163d15e005360e01b81526001600160a01b039283169290911690600090829063d15e005390610c4c908690600401611122565b60206040518083038186803b158015610c6457600080fd5b505afa158015610c78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9c919061110a565b9050610cb28686610cad87856109a7565b610dee565b505050505050565b6001600160a01b038216610d1a5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103a6565b6001600160a01b03821660009081526020819052604090205481811015610d8e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103a6565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610dbd9084906111e0565b90915550506040518281526000906001600160a01b038516906000805160206112498339815191529060200161097f565b6001600160a01b038316610e525760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103a6565b6001600160a01b038216610eb45760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103a6565b6001600160a01b03831660009081526020819052604090205481811015610f2c5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103a6565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610f63908490611189565b92505081905550826001600160a01b0316846001600160a01b031660008051602061124983398151915284604051610f9d91815260200190565b60405180910390a350505050565b80356001600160a01b0381168114610fc257600080fd5b919050565b600060208284031215610fd8578081fd5b610c0982610fab565b60008060408385031215610ff3578081fd5b610ffc83610fab565b915061100a60208401610fab565b90509250929050565b600080600060608486031215611027578081fd5b61103084610fab565b925061103e60208501610fab565b9150604084013590509250925092565b60008060008060808587031215611063578081fd5b61106c85610fab565b935061107a60208601610fab565b93969395505050506040820135916060013590565b600080604083850312156110a1578182fd5b6110aa83610fab565b946020939093013593505050565b6000806000606084860312156110cc578283fd5b6110d584610fab565b95602085013595506040909401359392505050565b6000602082840312156110fb578081fd5b81518015158114610c09578182fd5b60006020828403121561111b578081fd5b5051919050565b6001600160a01b0391909116815260200190565b6000602080835283518082850152825b8181101561116257858101830151858201604001528201611146565b818111156111735783604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561119c5761119c611232565b500190565b6000826111bc57634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156111db576111db611232565b500290565b6000828210156111f2576111f2611232565b500390565b600181811c9082168061120b57607f821691505b6020821081141561122c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfeddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212202e7f2dccdb694b934e795bd4676659783473bcfa661b686bda9bf10e74c0ff6a64736f6c63430008040033";

export class MockAToken__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    pool: string,
    underlyingAsset: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockAToken> {
    return super.deploy(
      pool,
      underlyingAsset,
      name,
      symbol,
      overrides || {}
    ) as Promise<MockAToken>;
  }
  getDeployTransaction(
    pool: string,
    underlyingAsset: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      pool,
      underlyingAsset,
      name,
      symbol,
      overrides || {}
    );
  }
  attach(address: string): MockAToken {
    return super.attach(address) as MockAToken;
  }
  connect(signer: Signer): MockAToken__factory {
    return super.connect(signer) as MockAToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockATokenInterface {
    return new utils.Interface(_abi) as MockATokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockAToken {
    return new Contract(address, _abi, signerOrProvider) as MockAToken;
  }
}
