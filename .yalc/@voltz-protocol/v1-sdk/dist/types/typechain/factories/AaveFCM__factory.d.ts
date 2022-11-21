import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AaveFCM, AaveFCMInterface } from "../AaveFCM";
export declare class AaveFCM__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<AaveFCM>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): AaveFCM;
    connect(signer: Signer): AaveFCM__factory;
    static readonly bytecode = "0x60a0604052306080523480156200001557600080fd5b50606354610100900460ff1615808015620000375750606354600160ff909116105b8062000067575062000054306200014160201b62001bd01760201c565b15801562000067575060635460ff166001145b620000cf5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6063805460ff191660011790558015620000f3576063805461ff0019166101001790555b80156200013a576063805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5062000150565b6001600160a01b03163b151590565b6080516136f362000188600039600081816108cf0152818161090f01528181610e8c01528181610ecc0152610f4801526136f36000f3fe6080604052600436106101045760003560e01c80624006e01461010957806303742274146101395780630d211954146101795780632495a5991461019b578063357d8b5e146101bb5780633659cfe6146101d95780634342891f146101f9578063485cc955146102275780634f1ef2861461024757806352d1902d1461025a57806355468a8b1461026f5780635c975abb1461028f578063715018a6146102c05780638da5cb5b146102d557806392a88fa2146102ea57806398f4b1b2146103535780639a2f48f514610371578063c1ccfa68146103c6578063e098372c146103e6578063e9d337b814610404578063ebc9b02e14610422578063f2fde38b14610437575b600080fd5b34801561011557600080fd5b506001546001600160a01b03165b6040516101309190612e7c565b60405180910390f35b34801561014557600080fd5b50610159610154366004612ea5565b610457565b604080519485526020850193909352918301526060820152608001610130565b34801561018557600080fd5b50610199610194366004612ee3565b61087b565b005b3480156101a757600080fd5b50600454610123906001600160a01b031681565b3480156101c757600080fd5b506032546001600160a01b0316610123565b3480156101e557600080fd5b506101996101f4366004612f00565b6108c4565b34801561020557600080fd5b50610219610214366004612f00565b61098d565b604051908152602001610130565b34801561023357600080fd5b50610199610242366004612f1d565b6109b7565b610199610255366004612fba565b610e81565b34801561026657600080fd5b50610219610f3b565b34801561027b57600080fd5b5061015961028a366004612ea5565b610fe9565b34801561029b57600080fd5b506004546102b090600160a01b900460ff1681565b6040519015158152602001610130565b3480156102cc57600080fd5b50610199611378565b3480156102e157600080fd5b5061012361138c565b3480156102f657600080fd5b50610331610305366004612f00565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b6040805194855260208501939093529183015215156060820152608001610130565b34801561035f57600080fd5b506000546001600160a01b0316610123565b34801561037d57600080fd5b5061039161038c366004612f00565b61139b565b604051610130919081518152602080830151908201526040808301519082015260609182015115159181019190915260800190565b3480156103d257600080fd5b506101996103e1366004613061565b611418565b3480156103f257600080fd5b506002546001600160a01b0316610123565b34801561041057600080fd5b506031546001600160a01b0316610123565b34801561042e57600080fd5b506102196115a2565b34801561044357600080fd5b50610199610452366004612f00565b611b5a565b600080600080600460149054906101000a900460ff16156104935760405162461bcd60e51b815260040161048a9061308d565b60405180910390fd5b3360009081526003602052604081206002810154909112156104f45760405162461bcd60e51b815260206004820152601a6024820152795472616465722056542062616c616e636520706f73697469766560301b604482015260640161048a565b600160ff1b8160020154136105435760405162461bcd60e51b81526020600482015260156024820152742a3930b232b9102b2a103130b630b731b29036b4b760591b604482015260640161048a565b868160020154610552906130c3565b10156105a05760405162461bcd60e51b815260206004820152601d60248201527f6e6f74696f6e616c20746f20756e77696e64203e206e6f74696f6e616c000000604482015260640161048a565b60006040518060a00160405280306001600160a01b031681526020016105c58a611bdf565b6105ce906130c3565b81526001600160a01b03891660208201526001546040909101906105fb90600160a01b900460020b6130e0565b600290810b8252600154600160a01b9004810b602090920191909152546040516333bac73760e11b81529192506001600160a01b0316906367758e6e90610646908490600401613103565b60a060405180830381600087803b15801561066057600080fd5b505af1158015610674573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610698919061314f565b509298509096509450925060008512156106e85760405162461bcd60e51b815260206004820152601160248201527056542064656c7461206e6567617469766560781b604482015260640161048a565b6000806106f6848989611c4d565b6031546004805460405163d15e005360e01b81529496509294506000936001600160a01b039283169363d15e0053936107329391169101612e7c565b60206040518083038186803b15801561074a57600080fd5b505afa15801561075e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610782919061318f565b905060006107908983611c88565b865461079c91906131a8565b80875590506107ac848483611c9f565b6001546004546107cb916001600160a01b03918216913391168b611ddf565b6032546107e2906001600160a01b0316338b611e50565b336001600160a01b03167f6acfc9440f6cbb04b516cd21204df4411f56488a61afeb29b0f25531809ccdb28d8d8b8e8e8d604051610825969594939291906131bf565b60405180910390a2336001600160a01b0316600080516020613657833981519152876000015488600101548960020154604051610864939291906131f0565b60405180910390a250505050505092959194509250565b6001546001600160a01b031633146108a657604051630a0d349f60e21b815260040160405180910390fd5b60048054911515600160a01b0260ff60a01b19909216919091179055565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561090d5760405162461bcd60e51b815260040161048a90613206565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661093f611e6f565b6001600160a01b0316146109655760405162461bcd60e51b815260040161048a90613240565b61096e81611e8b565b6040805160008082526020820190925261098a91839190611e93565b50565b6001600160a01b038116600090815260036020526040812080546109b09061200d565b9392505050565b606354610100900460ff16158080156109d75750606354600160ff909116105b806109f857506109e630611bd0565b1580156109f8575060635460ff166001145b610a5b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161048a565b6063805460ff191660011790558015610a7e576063805461ff0019166101001790555b6001600160a01b038316610ac65760405162461bcd60e51b815260206004820152600f60248201526e1d985b5b481b5d5cdd08195e1a5cdd608a1b604482015260640161048a565b6001600160a01b038216610b175760405162461bcd60e51b81526020600482015260186024820152771b585c99da5b88195b99da5b99481b5d5cdd08195e1a5cdd60421b604482015260640161048a565b600280546001600160a01b038086166001600160a01b03199283161790925560018054928516929091168217905560408051634c7a58d960e11b815290516398f4b1b291600480820192602092909190829003018186803b158015610b7b57600080fd5b505afa158015610b8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb3919061327a565b600080546001600160a01b0319166001600160a01b0392909216918217905560408051631d3a66f760e31b8152905163e9d337b891600480820192602092909190829003018186803b158015610c0857600080fd5b505afa158015610c1c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c40919061327a565b603180546001600160a01b0319166001600160a01b0392831617905560015460408051632495a59960e01b815290519190921691632495a599916004808301926020929190829003018186803b158015610c9957600080fd5b505afa158015610cad573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd1919061327a565b600480546001600160a01b0319166001600160a01b0392831690811782556031546040516335ea6a7560e01b815260009491909116926335ea6a7592610d1992909101612e7c565b6101806040518083038186803b158015610d3257600080fd5b505afa158015610d46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d6a9190613325565b60e0810151603280546001600160a01b0319166001600160a01b03928316179055600254604080516334324e9f60e21b8152905193945091169163d0c93a7c91600480820192602092909190829003018186803b158015610dca57600080fd5b505afa158015610dde573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e029190613412565b6001805462ffffff92909216600160a01b0262ffffff60a01b19909216919091179055610e2d6120a2565b610e356120d1565b508015610e7c576063805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610eca5760405162461bcd60e51b815260040161048a90613206565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610efc611e6f565b6001600160a01b031614610f225760405162461bcd60e51b815260040161048a90613240565b610f2b82611e8b565b610f3782826001611e93565b5050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610fd65760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b606482015260840161048a565b5060008051602061367783398151915290565b600080600080600460149054906101000a900460ff161561101c5760405162461bcd60e51b815260040161048a9061308d565b856110585760405162461bcd60e51b815260206004820152600c60248201526b06e6f74696f6e616c203d20360a41b604482015260640161048a565b60006040518060a00160405280306001600160a01b0316815260200161107d89611bdf565b81526001600160a01b03881660208201526001546040909101906110aa90600160a01b900460020b6130e0565b600290810b8252600154600160a01b9004810b602090920191909152546040516333bac73760e11b81529192506001600160a01b0316906367758e6e906110f5908490600401613103565b60a060405180830381600087803b15801561110f57600080fd5b505af1158015611123573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611147919061314f565b509297509095509350915060008413156111935760405162461bcd60e51b815260206004820152600d60248201526c2b2a103232b63a309039b4b3b760991b604482015260640161048a565b600160ff1b84136111d55760405162461bcd60e51b815260206004820152600c60248201526b2b2a103232b63a309036b4b760a11b604482015260640161048a565b3360009081526003602052604080822060315460048054935163d15e005360e01b81529294936001600160a01b039283169363d15e00539361121a9392169101612e7c565b60206040518083038186803b15801561123257600080fd5b505afa158015611246573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061126a919061318f565b905060006112818261127b896130c3565b90611c88565b835461128d9190613435565b808455905061129d838989611c4d565b50506112c23330896112ae906130c3565b6032546001600160a01b0316929190611ddf565b6001546004546112e1916001600160a01b039182169133911689611ddf565b336001600160a01b03167f3d4e16ab2c61731f475c393d983859da40555d340dbe3b2a164616aca9e75f988b8b898c8c8b604051611324969594939291906131bf565b60405180910390a2336001600160a01b0316600080516020613657833981519152846000015485600101548660020154604051611363939291906131f0565b60405180910390a25050505092959194509250565b6113806120f8565b61138a6000612157565b565b6096546001600160a01b031690565b6113c860405180608001604052806000815260200160008152602001600081526020016000151581525090565b506001600160a01b031660009081526003602081815260409283902083516080810185528154815260018201549281019290925260028101549382019390935291015460ff161515606082015290565b6001546001600160a01b0316331461144357604051630a0d349f60e21b815260040160405180910390fd5b600454600160a01b900460ff161561146d5760405162461bcd60e51b815260040161048a9061308d565b600480546032546040516370a0823160e01b815284936001600160a01b03938416936370a08231936114a29391169101612e7c565b60206040518083038186803b1580156114ba57600080fd5b505afa1580156114ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114f2919061318f565b1061158b5760315460048054604051631a4ca37b60e21b81526001600160a01b0391821692810192909252602482018490528481166044830152909116906369328dec90606401602060405180830381600087803b15801561155357600080fd5b505af1158015611567573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7c919061318f565b603254610f37906001600160a01b03168383611e50565b60006115ac6121a9565b600160009054906101000a90046001600160a01b03166001600160a01b03166393edb4546040518163ffffffff1660e01b815260040160206040518083038186803b1580156115fa57600080fd5b505afa15801561160e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611632919061318f565b1115611651576040516301730b8160e11b815260040160405180910390fd5b600454600160a01b900460ff161561167b5760405162461bcd60e51b815260040161048a9061308d565b33600090815260036020908152604080832060018082015460028301549154845163652c30b760e01b815294519396956119249592946001600160a01b039092169263652c30b79260048083019392829003018186803b1580156116de57600080fd5b505afa1580156116f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611716919061318f565b600160009054906101000a90046001600160a01b03166001600160a01b03166393edb4546040518163ffffffff1660e01b815260040160206040518083038186803b15801561176457600080fd5b505afa158015611778573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061179c919061318f565b6000546001546040805163652c30b760e01b815290516001600160a01b03938416936325f258dd93169163652c30b7916004808301926020929190829003018186803b1580156117eb57600080fd5b505afa1580156117ff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611823919061318f565b600160009054906101000a90046001600160a01b03166001600160a01b03166393edb4546040518163ffffffff1660e01b815260040160206040518083038186803b15801561187157600080fd5b505afa158015611885573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118a9919061318f565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401602060405180830381600087803b1580156118e757600080fd5b505af11580156118fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061191f919061318f565b6121b9565b905061194d8260010154611937906130c3565b8360020154611945906130c3565b849190611c4d565b50506000811215611a3c57600160ff1b81136119945760405162461bcd60e51b815260206004820152600660248201526529a19036b4b760d11b604482015260640161048a565b6031546004805460405163d15e005360e01b81526000936001600160a01b039081169363d15e0053936119ca9392169101612e7c565b60206040518083038186803b1580156119e257600080fd5b505afa1580156119f6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1a919061318f565b90506000611a2b8261127b856130c3565b8454611a3791906131a8565b845550505b6000611a4b836000015461200d565b600084559050611a5a83612222565b603254611a71906001600160a01b03163383611e50565b6000821315611adf5760015460405163efcfc3f960e01b81526001600160a01b039091169063efcfc3f990611aac903390869060040161344d565b600060405180830381600087803b158015611ac657600080fd5b505af1158015611ada573d6000803e3d6000fd5b505050505b60405182815233907f2761931c2b8dc26fc26290447a831f72789013b635b9d8af518a0ff79bda796f9060200160405180910390a2336001600160a01b0316600080516020613657833981519152846000015485600101548660020154604051611b4b939291906131f0565b60405180910390a25091505090565b611b626120f8565b6001600160a01b038116611bc75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161048a565b61098a81612157565b6001600160a01b03163b151590565b60006001600160ff1b03821115611c495760405162461bcd60e51b815260206004820152602860248201527f53616665436173743a2076616c756520646f65736e27742066697420696e2061604482015267371034b73a191a9b60c11b606482015260840161048a565b5090565b600080838560010154611c609190613466565b9150828560020154611c729190613466565b6001860183905560029095018590555093915050565b6000611c9683836001612279565b90505b92915050565b6000821315611cdb5760405162461bcd60e51b81526020600482015260086024820152672b2a211039b4b3b760c11b604482015260640161048a565b600160ff1b8213611d185760405162461bcd60e51b81526020600482015260076024820152662b2a211036b4b760c91b604482015260640161048a565b6000611d23836130c3565b90506000611d3082611bdf565b611d41611d3c8561200d565b611bdf565b611d4b91906134a7565b90506000611d59868661231d565b90506000811215611dd757600160ff1b8113611da15760405162461bcd60e51b81526020600482015260076024820152662929a19036b4b760c91b604482015260640161048a565b81611dab826130c3565b1315611dd757611dbb8184613466565b6040516341d5a83b60e01b815260040161048a91815260200190565b505050505050565b6040516001600160a01b0380851660248301528316604482015260648101829052611e4a9085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152612617565b50505050565b610e7c8363a9059cbb60e01b8484604051602401611e1392919061344d565b600080516020613677833981519152546001600160a01b031690565b61098a6120f8565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615611ec657610e7c83612698565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b158015611eff57600080fd5b505afa925050508015611f2f575060408051601f3d908101601f19168201909252611f2c9181019061318f565b60015b611f925760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840161048a565b60008051602061367783398151915281146120015760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840161048a565b50610e7c838383612732565b6031546004805460405163d15e005360e01b815260009384936001600160a01b039182169363d15e005393612046939091169101612e7c565b60206040518083038186803b15801561205e57600080fd5b505afa158015612072573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612096919061318f565b90506109b08382612757565b606354610100900460ff166120c95760405162461bcd60e51b815260040161048a906134e6565b61138a612765565b606354610100900460ff1661138a5760405162461bcd60e51b815260040161048a906134e6565b3361210161138c565b6001600160a01b03161461138a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161048a565b609680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006121b442612795565b905090565b6000806121c5876127e2565b905060006121d2876127e2565b905060006121ec6121e56001898961285f565b8490612934565b905060006121fa8387612934565b905060006122088284613466565b670de0b6b3a764000090059b9a5050505050505050505050565b600381015460ff16156122695760405162461bcd60e51b815260206004820152600f60248201526e185b1c9958591e481cd95d1d1b1959608a1b604482015260640161048a565b600301805460ff19166001179055565b6000826122b15760405162461bcd60e51b815260040161048a906020808252600490820152630444956360e41b604082015260600190565b60006122be600285613547565b9050838160018560018111156122d6576122d6613569565b146122e957670de0b6b3a76400006122f6565b676765c793fa10079d601b1b5b612300908861357f565b61230a9190613435565b6123149190613547565b95945050505050565b600080612329846127e2565b90506000612336846127e2565b905060006124588361245360018060009054906101000a90046001600160a01b03166001600160a01b031663652c30b76040518163ffffffff1660e01b815260040160206040518083038186803b15801561239057600080fd5b505afa1580156123a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123c8919061318f565b600160009054906101000a90046001600160a01b03166001600160a01b03166393edb4546040518163ffffffff1660e01b815260040160206040518083038186803b15801561241657600080fd5b505afa15801561242a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061244e919061318f565b61285f565b612934565b600080546001546040805163652c30b760e01b8152905194955092936001600160a01b03928316936325f258dd939092169163652c30b7916004808301926020929190829003018186803b1580156124af57600080fd5b505afa1580156124c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124e7919061318f565b600160009054906101000a90046001600160a01b03166001600160a01b03166393edb4546040518163ffffffff1660e01b815260040160206040518083038186803b15801561253557600080fd5b505afa158015612549573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061256d919061318f565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401602060405180830381600087803b1580156125ab57600080fd5b505af11580156125bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125e3919061318f565b905060006125f18483612934565b905060006125ff8285613466565b670de0b6b3a764000090059998505050505050505050565b600061264383836040518060400160405280600781526020016629aa261032b93960c91b8152506129f9565b805190915015610e7c5780806020019051810190612661919061359e565b610e7c5760405162461bcd60e51b815260206004820152600860248201526714d5130819985a5b60c21b604482015260640161048a565b6126a181611bd0565b6127035760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161048a565b60008051602061367783398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61273b83612aa7565b6000825111806127485750805b15610e7c57611e4a8383612ae7565b6000611c9683836001612bd0565b606354610100900460ff1661278c5760405162461bcd60e51b815260040161048a906134e6565b61138a33612157565b60007812725dd1d243aba0e75fe645cc4873f9e65afe688c928e1f218211156127d457604051633492ffd960e01b81526004810183905260240161048a565b50670de0b6b3a76400000290565b60007809392ee8e921d5d073aff322e62439fcf32d7f344649470f8f198212156128225760405163e608e18b60e01b81526004810183905260240161048a565b7809392ee8e921d5d073aff322e62439fcf32d7f344649470f908213156127d4576040516371f72a3160e01b81526004810183905260240161048a565b60008282116128995760405162461bcd60e51b815260040161048a90602080825260049082015263453c3d5360e01b604082015260600190565b60006128a36121a9565b9050838110156128dd5760405162461bcd60e51b8152602060048201526005602482015264422e543c5360d81b604482015260640161048a565b600085806128eb5750838210155b15612901576128fa85856131a8565b905061290e565b61290b85836131a8565b90505b61292a68056bc75e2d6310000061292483612c8b565b90612c9e565b9695505050505050565b6000600160ff1b83148061294b5750600160ff1b82145b1561296957604051630d01a11b60e21b815260040160405180910390fd5b6000806000851261297a578461297f565b846000035b91506000841261298f5783612994565b836000035b905060006129a28383612cb3565b90506001600160ff1b038111156129cf5760405163bf79e8d960e01b81526004810182905260240161048a565b6000198087139086138082186001146129e857826129ed565b826000035b98975050505050505050565b6060833b612a385760405162461bcd60e51b815260206004820152600c60248201526b1b9bdb8b58dbdb9d1c9858dd60a21b604482015260640161048a565b600080856001600160a01b0316600086604051612a5591906135e7565b60006040518083038185875af1925050503d8060008114612a92576040519150601f19603f3d011682016040523d82523d6000602084013e612a97565b606091505b509150915061292a828286612d75565b612ab081612698565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060612af283611bd0565b612b4d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161048a565b600080846001600160a01b031684604051612b6891906135e7565b600060405180830381855af49150503d8060008114612ba3576040519150601f19603f3d011682016040523d82523d6000602084013e612ba8565b606091505b5091509150612314828260405180606001604052806027815260200161369760279139612d75565b6000831580612bdd575082155b15612bea575060006109b0565b6001826001811115612bfe57612bfe613569565b14612c1157670de0b6b3a7640000612c1e565b676765c793fa10079d601b1b5b6001836001811115612c3257612c32613569565b14612c4f57612c4a6002670de0b6b3a7640000613547565b612c65565b612c656002676765c793fa10079d601b1b613547565b612c6f858761357f565b612c799190613435565b612c839190613547565b949350505050565b6000611c99826a1a1601fc4ea7109e0000005b6000611c9683670de0b6b3a764000084612dae565b60008080600019848609848602925082811083820303915050670de0b6b3a76400008110612cf75760405163698d9a0160e11b81526004810182905260240161048a565b600080670de0b6b3a76400008688099150506706f05b59d3b1ffff811182612d315780670de0b6b3a7640000850401945050505050611c99565b620400008285030493909111909103600160ee1b02919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690201905092915050565b60608315612d845750816109b0565b825115612d945782518084602001fd5b8160405162461bcd60e51b815260040161048a9190613603565b600080806000198587098587029250828110838203039150508060001415612de957838281612ddf57612ddf613531565b04925050506109b0565b838110612e1357604051631dcf306360e21b8152600481018290526024810185905260440161048a565b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b6001600160a01b0391909116815260200190565b6001600160a01b038116811461098a57600080fd5b60008060408385031215612eb857600080fd5b823591506020830135612eca81612e90565b809150509250929050565b801515811461098a57600080fd5b600060208284031215612ef557600080fd5b81356109b081612ed5565b600060208284031215612f1257600080fd5b81356109b081612e90565b60008060408385031215612f3057600080fd5b8235612f3b81612e90565b91506020830135612eca81612e90565b634e487b7160e01b600052604160045260246000fd5b60405161018081016001600160401b0381118282101715612f8457612f84612f4b565b60405290565b604051601f8201601f191681016001600160401b0381118282101715612fb257612fb2612f4b565b604052919050565b60008060408385031215612fcd57600080fd5b8235612fd881612e90565b91506020838101356001600160401b0380821115612ff557600080fd5b818601915086601f83011261300957600080fd5b81358181111561301b5761301b612f4b565b61302d601f8201601f19168501612f8a565b9150808252878482850101111561304357600080fd5b80848401858401376000848284010152508093505050509250929050565b6000806040838503121561307457600080fd5b823561307f81612e90565b946020939093013593505050565b60208082526006908201526514185d5cd95960d21b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000600160ff1b8214156130d9576130d96130ad565b5060000390565b60008160020b627fffff198114156130fa576130fa6130ad565b60000392915050565b600060a08201905060018060a01b038084511683526020840151602084015280604085015116604084015250606083015160020b6060830152608083015160020b608083015292915050565b600080600080600060a0868803121561316757600080fd5b5050835160208501516040860151606087015160809097015192989197509594509092509050565b6000602082840312156131a157600080fd5b5051919050565b6000828210156131ba576131ba6130ad565b500390565b9586526001600160a01b0394909416602086015260408501929092526060840152608083015260a082015260c00190565b9283526020830191909152604082015260600190565b6020808252602c9082015260008051602061363783398151915260408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c9082015260008051602061363783398151915260408201526b6163746976652070726f787960a01b606082015260800190565b60006020828403121561328c57600080fd5b81516109b081612e90565b6000602082840312156132a957600080fd5b604051602081016001600160401b03811182821017156132cb576132cb612f4b565b6040529151825250919050565b80516001600160801b03811681146132ef57600080fd5b919050565b805164ffffffffff811681146132ef57600080fd5b80516132ef81612e90565b805160ff811681146132ef57600080fd5b6000610180828403121561333857600080fd5b613340612f61565b61334a8484613297565b8152613358602084016132d8565b6020820152613369604084016132d8565b604082015261337a606084016132d8565b606082015261338b608084016132d8565b608082015261339c60a084016132d8565b60a08201526133ad60c084016132f4565b60c08201526133be60e08401613309565b60e08201526101006133d1818501613309565b908201526101206133e3848201613309565b908201526101406133f5848201613309565b90820152610160613407848201613314565b908201529392505050565b60006020828403121561342457600080fd5b81518060020b81146109b057600080fd5b60008219821115613448576134486130ad565b500190565b6001600160a01b03929092168252602082015260400190565b600080821280156001600160ff1b0384900385131615613488576134886130ad565b600160ff1b83900384128116156134a1576134a16130ad565b50500190565b60008083128015600160ff1b8501841216156134c5576134c56130ad565b6001600160ff1b03840183138116156134e0576134e06130ad565b50500390565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052601260045260246000fd5b60008261356457634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052602160045260246000fd5b6000816000190483118215151615613599576135996130ad565b500290565b6000602082840312156135b057600080fd5b81516109b081612ed5565b60005b838110156135d65781810151838201526020016135be565b83811115611e4a5750506000910152565b600082516135f98184602087016135bb565b9190910192915050565b60208152600082518060208401526136228160408501602087016135bb565b601f01601f1916919091016040019291505056fe46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682085f7a754cbb9fd93ae8f2b8606ccb555835a917e569742c9d2e818e3073c8c9d360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212207a6fe7c99673317881408f8917c1c7f8c67d73e07cb562f6629466a4455a865d64736f6c63430008090033";
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
        anonymous?: undefined;
        outputs?: undefined;
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
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): AaveFCMInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AaveFCM;
}
//# sourceMappingURL=AaveFCM__factory.d.ts.map