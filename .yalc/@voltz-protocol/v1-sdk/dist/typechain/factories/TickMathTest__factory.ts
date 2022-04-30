/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TickMathTest, TickMathTestInterface } from "../TickMathTest";

const _abi = [
  {
    inputs: [],
    name: "MAX_SQRT_RATIO",
    outputs: [
      {
        internalType: "uint160",
        name: "",
        type: "uint160",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_SQRT_RATIO",
    outputs: [
      {
        internalType: "uint160",
        name: "",
        type: "uint160",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
    ],
    name: "getGasCostOfGetSqrtRatioAtTick",
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
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
    ],
    name: "getGasCostOfGetTickAtSqrtRatio",
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
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
    ],
    name: "getSqrtRatioAtTick",
    outputs: [
      {
        internalType: "uint160",
        name: "",
        type: "uint160",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
    ],
    name: "getTickAtSqrtRatio",
    outputs: [
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610b13806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80634f76c058146100675780636d2cc30414610092578063986cfba3146100b9578063a7398eb4146100cc578063b0622f67146100ed578063ee8847ff14610100575b600080fd5b61007a6100753660046108aa565b610112565b60405160029190910b81526020015b60405180910390f35b6c1fa71f3f5f68a90479ee3f8fec5b6040516001600160a01b039091168152602001610089565b6100a16100c73660046108d3565b610123565b6100df6100da3660046108d3565b61012e565b604051908152602001610089565b6100df6100fb3660046108aa565b610150565b6b0816769404766de590afe04e6100a1565b600061011d8261015b565b92915050565b600061011d82610498565b6000805a905061013d83610498565b505a610149908261090c565b9392505050565b6000805a905061013d835b60006b0816769404766de590afe04e6001600160a01b0383161080159061019757506c1fa71f3f5f68a90479ee3f8fec6001600160a01b038316105b6101cc5760405162461bcd60e51b81526020600482015260016024820152602960f91b60448201526064015b60405180910390fd5b600160201b600160c01b03602083901b166001600160801b03811160071b81811c6001600160401b03811160061b90811c63ffffffff811160051b90811c61ffff811160041b90811c60ff8111600390811b91821c600f811160021b90811c918211600190811b92831c979088119617909417909217179091171717608081106102655761025b607f8261090c565b83901c9150610276565b61027081607f61090c565b83901b91505b60006040610285608084610923565b901b9050828302607f1c92508260801c80603f1b8217915083811c935050828302607f1c92508260801c80603e1b8217915083811c935050828302607f1c92508260801c80603d1b8217915083811c935050828302607f1c92508260801c80603c1b8217915083811c935050828302607f1c92508260801c80603b1b8217915083811c935050828302607f1c92508260801c80603a1b8217915083811c935050828302607f1c92508260801c8060391b8217915083811c935050828302607f1c92508260801c8060381b8217915083811c935050828302607f1c92508260801c8060371b8217915083811c935050828302607f1c92508260801c8060361b8217915083811c935050828302607f1c92508260801c8060351b8217915083811c935050828302607f1c92508260801c8060341b8217915083811c935050828302607f1c92508260801c8060331b8217915083811c935050828302607f1c92508260801c8060321b8217915050600081693627a301d71055774c856104089190610962565b9050600060806104286f028f6481ab7f045a5af012a19d003aaa84610923565b901d90506000608061044a846fdb2df09e81959a81455e260799a0632f6109e7565b901d90508060020b8260020b1461048957886001600160a01b031661046e82610498565b6001600160a01b03161115610483578161048b565b8061048b565b815b9998505050505050505050565b60008060008360020b126104af578260020b6104bc565b8260020b6104bc90610a28565b90506104cb62010deb19610a45565b60020b8111156105015760405162461bcd60e51b81526020600482015260016024820152601560fa1b60448201526064016101c3565b60006001821661051557600160801b610527565b6ffffcb933bd6fad37aa2d162d1a5940015b6001600160881b03169050600282161561055c576080610557826ffff97272373d413259a46990580e213a610a68565b901c90505b6004821615610586576080610581826ffff2e50f5f656932ef12357cf3c7fdcc610a68565b901c90505b60088216156105b05760806105ab826fffe5caca7e10e4e61c3624eaa0941cd0610a68565b901c90505b60108216156105da5760806105d5826fffcb9843d60f6159c9db58835c926644610a68565b901c90505b60208216156106045760806105ff826fff973b41fa98c081472e6896dfb254c0610a68565b901c90505b604082161561062e576080610629826fff2ea16466c96a3843ec78b326b52861610a68565b901c90505b6080821615610658576080610653826ffe5dee046a99a2a811c461f1969c3053610a68565b901c90505b61010082161561068357608061067e826ffcbe86c7900a88aedcffc83b479aa3a4610a68565b901c90505b6102008216156106ae5760806106a9826ff987a7253ac413176f2b074cf7815e54610a68565b901c90505b6104008216156106d95760806106d4826ff3392b0822b70005940c7a398e4b70f3610a68565b901c90505b6108008216156107045760806106ff826fe7159475a2c29b7443b29c7fa6e889d9610a68565b901c90505b61100082161561072f57608061072a826fd097f3bdfd2022b8845ad8f792aa5825610a68565b901c90505b61200082161561075a576080610755826fa9f746462d870fdf8a65dc1f90e061e5610a68565b901c90505b614000821615610785576080610780826f70d869a156d2a1b890bb3df62baf32f7610a68565b901c90505b6180008216156107b05760806107ab826f31be135f97d08fd981231505542fcfa6610a68565b901c90505b620100008216156107dc5760806107d7826f09aa508b5b7a84e1c677de54f3e99bc9610a68565b901c90505b62020000821615610807576080610802826e5d6af8dedb81196699c329225ee604610a68565b901c90505b6204000082161561083157608061082c826d2216e584f5fa1ea926041bedfe98610a68565b901c90505b62080000821615610859576080610854826b048a170391f7dc42444e8fa2610a68565b901c90505b60008460020b13156108745761087181600019610a9d565b90505b610882600160201b82610ab1565b1561088e576001610891565b60005b6108a29060ff16602083901c610ac5565b949350505050565b6000602082840312156108bc57600080fd5b81356001600160a01b038116811461014957600080fd5b6000602082840312156108e557600080fd5b81358060020b811461014957600080fd5b634e487b7160e01b600052601160045260246000fd5b60008282101561091e5761091e6108f6565b500390565b60008083128015600160ff1b850184121615610941576109416108f6565b6001600160ff1b038401831381161561095c5761095c6108f6565b50500390565b60006001600160ff1b0381841382841380821686840486111615610988576109886108f6565b600160ff1b60008712828116878305891216156109a7576109a76108f6565b600087129250878205871284841616156109c3576109c36108f6565b878505871281841616156109d9576109d96108f6565b505050929093029392505050565b600080821280156001600160ff1b0384900385131615610a0957610a096108f6565b600160ff1b8390038412811615610a2257610a226108f6565b50500190565b6000600160ff1b821415610a3e57610a3e6108f6565b5060000390565b60008160020b627fffff19811415610a5f57610a5f6108f6565b60000392915050565b6000816000190483118215151615610a8257610a826108f6565b500290565b634e487b7160e01b600052601260045260246000fd5b600082610aac57610aac610a87565b500490565b600082610ac057610ac0610a87565b500690565b60008219821115610ad857610ad86108f6565b50019056fea2646970667358221220531a13dc92089a0e5ced0266deb5a4c92e24b427c83747f2e16ba65547bbe41664736f6c63430008090033";

export class TickMathTest__factory extends ContractFactory {
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
  ): Promise<TickMathTest> {
    return super.deploy(overrides || {}) as Promise<TickMathTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TickMathTest {
    return super.attach(address) as TickMathTest;
  }
  connect(signer: Signer): TickMathTest__factory {
    return super.connect(signer) as TickMathTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TickMathTestInterface {
    return new utils.Interface(_abi) as TickMathTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TickMathTest {
    return new Contract(address, _abi, signerOrProvider) as TickMathTest;
  }
}
