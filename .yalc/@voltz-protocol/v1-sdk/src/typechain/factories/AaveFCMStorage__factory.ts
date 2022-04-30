/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AaveFCMStorage,
  AaveFCMStorageInterface,
} from "../AaveFCMStorage";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "traders",
    outputs: [
      {
        internalType: "uint256",
        name: "marginInScaledYieldBearingTokens",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "fixedTokenBalance",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "variableTokenBalance",
        type: "int256",
      },
      {
        internalType: "bool",
        name: "isSettled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "underlyingToken",
    outputs: [
      {
        internalType: "contract IERC20Minimal",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610122806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632495a59914603757806392a88fa2146066575b600080fd5b6004546049906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b609d607136600460be565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b6040805194855260208501939093529183015215156060820152608001605d565b60006020828403121560cf57600080fd5b81356001600160a01b038116811460e557600080fd5b939250505056fea2646970667358221220d77cb02768d11c6b95de7a7638da50a814c0bc9f14d4198c73f4584ee7e5acde64736f6c63430008090033";

export class AaveFCMStorage__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AaveFCMStorage> {
    return super.deploy(overrides || {}) as Promise<AaveFCMStorage>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AaveFCMStorage {
    return super.attach(address) as AaveFCMStorage;
  }
  connect(signer: Signer): AaveFCMStorage__factory {
    return super.connect(signer) as AaveFCMStorage__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AaveFCMStorageInterface {
    return new utils.Interface(_abi) as AaveFCMStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AaveFCMStorage {
    return new Contract(address, _abi, signerOrProvider) as AaveFCMStorage;
  }
}
