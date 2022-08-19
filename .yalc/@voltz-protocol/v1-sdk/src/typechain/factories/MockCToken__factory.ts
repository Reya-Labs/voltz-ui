/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockCToken, MockCTokenInterface } from "../MockCToken";

const _abi = [
  {
    inputs: [
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
    name: "accrualBlockNumber",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approveInternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOfUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "borrowBalanceCurrent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowIndex",
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
    name: "borrowRatePerBlock",
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
    inputs: [],
    name: "exchangeRateCurrent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRateStored",
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
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
    ],
    name: "redeemUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "accrualBlockNumber",
        type: "uint256",
      },
    ],
    name: "setAccrualBlockNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "borrowIndex",
        type: "uint256",
      },
    ],
    name: "setBorrowIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "borrowRatePerBlock",
        type: "uint256",
      },
    ],
    name: "setBorrowRatePerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "setExchangeRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "supplyRatePerBlock",
        type: "uint256",
      },
    ],
    name: "setSupplyRatePerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyRatePerBlock",
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
        name: "to",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
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
  {
    inputs: [],
    name: "underlying",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620013b1380380620013b1833981016040819052620000349162000203565b8151829082906200004d90600390602085019062000090565b5080516200006390600490602084019062000090565b5050600580546001600160a01b0319166001600160a01b03959095169490941790935550620002ca915050565b8280546200009e906200028d565b90600052602060002090601f016020900481019282620000c257600085556200010d565b82601f10620000dd57805160ff19168380011785556200010d565b828001600101855582156200010d579182015b828111156200010d578251825591602001919060010190620000f0565b506200011b9291506200011f565b5090565b5b808211156200011b576000815560010162000120565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200015e57600080fd5b81516001600160401b03808211156200017b576200017b62000136565b604051601f8301601f19908116603f01168101908282118183101715620001a657620001a662000136565b81604052838152602092508683858801011115620001c357600080fd5b600091505b83821015620001e75785820183015181830184015290820190620001c8565b83821115620001f95760008385830101525b9695505050505050565b6000806000606084860312156200021957600080fd5b83516001600160a01b03811681146200023157600080fd5b60208501519093506001600160401b03808211156200024f57600080fd5b6200025d878388016200014c565b935060408601519150808211156200027457600080fd5b5062000283868287016200014c565b9150509250925092565b600181811c90821680620002a257607f821691505b60208210811415620002c457634e487b7160e01b600052602260045260246000fd5b50919050565b6110d780620002da6000396000f3fe608060405234801561001057600080fd5b50600436106101545760003560e01c806306fdde0314610159578063095ea7b31461017757806317bfdfbc1461019a57806318160ddd146101bc578063182df0f5146101c457806323b872dd146101cc578063313ce567146101df57806337d9bd92146101ee57806339509351146102035780633af9e6691461021657806340c10f191461022957806356189cb41461023c5780636c540baf1461024f5780636f307dc31461025757806370a0823114610272578063852a12e31461028557806395d89b4114610298578063a457c2d7146102a0578063a9059cbb146102b3578063aa5af0fd146102c6578063ae9d70b0146102ce578063bd6d894d146101c4578063c5a6c943146102d6578063c7437e21146102e9578063cbf4d877146102fc578063db068e0e1461030f578063dd62ed3e14610322578063f8f9da2814610335575b600080fd5b61016161033d565b60405161016e9190610e50565b60405180910390f35b61018a610185366004610e9f565b6103cf565b604051901515815260200161016e565b6101ae6101a8366004610ec9565b50600090565b60405190815260200161016e565b6002546101ae565b6006546101ae565b61018a6101da366004610ee4565b6103e7565b6040516012815260200161016e565b6102016101fc366004610f20565b600955565b005b61018a610211366004610e9f565b61040d565b6101ae610224366004610ec9565b61042f565b61018a610237366004610e9f565b610466565b61020161024a366004610ee4565b610500565b600a546101ae565b6005546040516001600160a01b03909116815260200161016e565b6101ae610280366004610ec9565b610510565b6101ae610293366004610f20565b61052b565b61016161057d565b61018a6102ae366004610e9f565b61058c565b61018a6102c1366004610e9f565b610612565b6009546101ae565b6007546101ae565b6102016102e4366004610f20565b600a55565b6102016102f7366004610f20565b600755565b61020161030a366004610f20565b600855565b61020161031d366004610f20565b600655565b6101ae610330366004610f39565b610620565b6008546101ae565b60606003805461034c90610f6c565b80601f016020809104026020016040519081016040528092919081815260200182805461037890610f6c565b80156103c55780601f1061039a576101008083540402835291602001916103c5565b820191906000526020600020905b8154815290600101906020018083116103a857829003601f168201915b5050505050905090565b6000336103dd81858561064b565b5060019392505050565b6000336103f585828561076f565b6104008585856107e9565b60019150505b9392505050565b6000336103dd8185856104208383610620565b61042a9190610fbd565b61064b565b6000670de0b6b3a764000061044360065490565b61044c84610510565b6104569190610fd5565b6104609190610ff4565b92915050565b60008061047284610510565b9050826104bf5760405162461bcd60e51b815260206004820152601660248201527510d517d253959053125117d352539517d05353d5539560521b60448201526064015b60405180910390fd5b6104c984846109a5565b6040518381526001600160a01b038516906000906000805160206110828339815191529060200160405180910390a3159392505050565b61050b83838361064b565b505050565b6001600160a01b031660009081526020819052604090205490565b60008061054360065484610a7290919063ffffffff16565b9050600061055033610510565b905061055c3382610a80565b600554610573906001600160a01b03163386610bbc565b5060009392505050565b60606004805461034c90610f6c565b6000338161059a8286610620565b9050838110156105fa5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104b6565b610607828686840361064b565b506001949350505050565b6000336103dd8185856107e9565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166106ad5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104b6565b6001600160a01b03821661070e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104b6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061077b8484610620565b905060001981146107e357818110156107d65760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104b6565b6107e3848484840361064b565b50505050565b6001600160a01b03831661084d5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104b6565b6001600160a01b0382166108af5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104b6565b6001600160a01b038316600090815260208190526040902054818110156109275760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104b6565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061095e908490610fbd565b92505081905550826001600160a01b0316846001600160a01b03166000805160206110828339815191528460405161099891815260200190565b60405180910390a36107e3565b6001600160a01b0382166109fb5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104b6565b8060026000828254610a0d9190610fbd565b90915550506001600160a01b03821660009081526020819052604081208054839290610a3a908490610fbd565b90915550506040518181526001600160a01b038316906000906000805160206110828339815191529060200160405180910390a35050565b600061040683836000610c0e565b6001600160a01b038216610ae05760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104b6565b6001600160a01b03821660009081526020819052604090205481811015610b545760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104b6565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610b83908490611016565b90915550506040518281526000906001600160a01b038516906000805160206110828339815191529060200160405180910390a3505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b17905261050b908490610cb2565b600082610c465760405162461bcd60e51b81526004016104b6906020808252600490820152630444956360e41b604082015260600190565b6000610c53600285610ff4565b905083816001856001811115610c6b57610c6b61102d565b14610c7e57670de0b6b3a7640000610c8b565b676765c793fa10079d601b1b5b610c959088610fd5565b610c9f9190610fbd565b610ca99190610ff4565b95945050505050565b6000610cde83836040518060400160405280600781526020016629aa261032b93960c91b815250610d33565b80519091501561050b5780806020019051810190610cfc9190611043565b61050b5760405162461bcd60e51b815260206004820152600860248201526714d5130819985a5b60c21b60448201526064016104b6565b6060833b610d725760405162461bcd60e51b815260206004820152600c60248201526b1b9bdb8b58dbdb9d1c9858dd60a21b60448201526064016104b6565b600080856001600160a01b0316600086604051610d8f9190611065565b60006040518083038185875af1925050503d8060008114610dcc576040519150601f19603f3d011682016040523d82523d6000602084013e610dd1565b606091505b5091509150610de1828286610deb565b9695505050505050565b60608315610dfa575081610406565b825115610e0a5782518084602001fd5b8160405162461bcd60e51b81526004016104b69190610e50565b60005b83811015610e3f578181015183820152602001610e27565b838111156107e35750506000910152565b6020815260008251806020840152610e6f816040850160208701610e24565b601f01601f19169190910160400192915050565b80356001600160a01b0381168114610e9a57600080fd5b919050565b60008060408385031215610eb257600080fd5b610ebb83610e83565b946020939093013593505050565b600060208284031215610edb57600080fd5b61040682610e83565b600080600060608486031215610ef957600080fd5b610f0284610e83565b9250610f1060208501610e83565b9150604084013590509250925092565b600060208284031215610f3257600080fd5b5035919050565b60008060408385031215610f4c57600080fd5b610f5583610e83565b9150610f6360208401610e83565b90509250929050565b600181811c90821680610f8057607f821691505b60208210811415610fa157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610fd057610fd0610fa7565b500190565b6000816000190483118215151615610fef57610fef610fa7565b500290565b60008261101157634e487b7160e01b600052601260045260246000fd5b500490565b60008282101561102857611028610fa7565b500390565b634e487b7160e01b600052602160045260246000fd5b60006020828403121561105557600080fd5b8151801515811461040657600080fd5b60008251611077818460208701610e24565b919091019291505056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220ad3b9ea56a620651460b244cedb2fd6018226ac57524bd8d187e3e9cd9cb05cb64736f6c63430008090033";

export class MockCToken__factory extends ContractFactory {
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
    underlyingAsset: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockCToken> {
    return super.deploy(
      underlyingAsset,
      name,
      symbol,
      overrides || {}
    ) as Promise<MockCToken>;
  }
  getDeployTransaction(
    underlyingAsset: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      underlyingAsset,
      name,
      symbol,
      overrides || {}
    );
  }
  attach(address: string): MockCToken {
    return super.attach(address) as MockCToken;
  }
  connect(signer: Signer): MockCToken__factory {
    return super.connect(signer) as MockCToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockCTokenInterface {
    return new utils.Interface(_abi) as MockCTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockCToken {
    return new Contract(address, _abi, signerOrProvider) as MockCToken;
  }
}
