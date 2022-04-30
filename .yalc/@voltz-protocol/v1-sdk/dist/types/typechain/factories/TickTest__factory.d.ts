import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TickTest, TickTestInterface } from "../TickTest";
export declare class TickTest__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TickTest>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TickTest;
    connect(signer: Signer): TickTest__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610cac806100206000396000f3fe608060405234801561001057600080fd5b50600436106100835760003560e01c806334fabea5146100885780633d3506691461010757806344057fb81461012d5780636c0e7c3c146101405780639ede8b8814610153578063b04039b514610176578063b613524a1461019c578063d267849c146101df578063f30dba93146101f2575b600080fd5b6101056100963660046108a0565b600291820b600090815260208181526040918290208351918401516001600160801b03908116600160801b0292169190911781559082015160018201556060820151928101929092556080810151600383015560a001516004909101805491151560ff19909216919091179055565b005b61011a61011536600461095e565b61027f565b6040519081526020015b60405180910390f35b61011a61013b36600461095e565b6102c7565b61011a61014e36600461095e565b610306565b6101666101613660046109a9565b610345565b6040519015158152602001610124565b610189610184366004610a2b565b610365565b604051600f9190910b8152602001610124565b6101056101aa366004610a64565b600290810b6000908152602081905260408120818155600181018290559182018190556003820155600401805460ff19169055565b6101056101ed366004610a7f565b610374565b610243610200366004610a64565b600060208190529081526040902080546001820154600283015460038401546004909401546001600160801b03841694600160801b909404600f0b939060ff1686565b604080516001600160801b039097168752600f9590950b60208701529385019290925260608401526080830152151560a082015260c001610124565b60006102be60405180608001604052808760020b81526020018660020b81526020018560020b815260200184815250600061038290919063ffffffff16565b95945050505050565b60006102be60405180608001604052808760020b81526020018660020b81526020018560020b81526020018481525060006103e990919063ffffffff16565b60006102be60405180608001604052808760020b81526020018660020b81526020018560020b815260200184815250600061043090919063ffffffff16565b6000610358818a8a8a8a8a8a8a8a610480565b9998505050505050505050565b60006102be818686868661061a565b61037e828261067e565b5050565b8051600290810b600090815260208481526040808320918501805190940b8352808320855194519186015160608701519495939491936102be9390929091906103ca9061073f565b6103d7876003015461073f565b6103e4876003015461073f565b6107ad565b8051600290810b6000908152602084815260408083209185018051850b84528184208651915192870151606088015185880154978301549697959692956102be95936107ad565b8051600290810b600090815260208481526040808320918501805190940b835280832085519451918601516060870151600180860154908401549697959693956102be95909490939291906107ad565b600288900b600090815260208a90526040812080546001600160801b0316826104a98a83610ac8565b600f0b12156104fe5760405162461bcd60e51b815260206004820152601c60248201527b3737ba1032b737bab3b4103634b8bab4b234ba3c903a3790313ab93760211b60448201526064015b60405180910390fd5b600061050a828b610819565b9050846001600160801b0316816001600160801b031611156105535760405162461bcd60e51b81526020600482015260026024820152614c4f60f01b60448201526064016104f5565b6001600160801b0382811615908216158114159450156105a0578a60020b8c60020b13610590576003830187905560018301899055600283018890555b60048301805460ff191660011790555b82546001600160801b0319166001600160801b038216178355856105da5782546105d5908b90600160801b9004600f0b610ac8565b6105f1565b82546105f1908b90600160801b9004600f0b610b19565b83546001600160801b03918216600160801b0291161790925550909a9950505050505050505050565b600284900b6000908152602086905260408120600381015461063c9084610b69565b600382015560018101546106509086610b80565b600182015560028101546106649085610b80565b600282015554600160801b9004600f0b9695505050505050565b8060020b8260020b126106b95760405162461bcd60e51b8152602060048201526003602482015262544c5560e81b60448201526064016104f5565b62010deb19600283900b12156106f75760405162461bcd60e51b8152602060048201526003602482015262544c4d60e81b60448201526064016104f5565b61070462010deb19610bbf565b60020b8160020b131561037e5760405162461bcd60e51b815260206004820152600360248201526254554d60e81b60448201526064016104f5565b60006001600160ff1b038211156107a95760405162461bcd60e51b815260206004820152602860248201527f53616665436173743a2076616c756520646f65736e27742066697420696e2061604482015267371034b73a191a9b60c11b60648201526084016104f5565b5090565b6000808760020b8660020b126107c45750826107d1565b6107ce8486610b80565b90505b60008760020b8760020b12156107e85750826107f5565b6107f28487610b80565b90505b60006108018284610be2565b61080b9088610b80565b9a9950505050505050505050565b60008082600f0b121561083d5760008290036108358185610c23565b91505061084a565b6108478284610c4b565b90505b92915050565b8035600281900b811461086257600080fd5b919050565b80356001600160801b038116811461086257600080fd5b8035600f81900b811461086257600080fd5b8035801515811461086257600080fd5b60008082840360e08112156108b457600080fd5b6108bd84610850565b925060c0601f19820112156108d157600080fd5b5060405160c081016001600160401b038111828210171561090257634e487b7160e01b600052604160045260246000fd5b60405261091160208501610867565b815261091f6040850161087e565b6020820152606084013560408201526080840135606082015260a0840135608082015261094e60c08501610890565b60a0820152809150509250929050565b6000806000806080858703121561097457600080fd5b61097d85610850565b935061098b60208601610850565b925061099960408601610850565b9396929550929360600135925050565b600080600080600080600080610100898b0312156109c657600080fd5b6109cf89610850565b97506109dd60208a01610850565b96506109eb60408a0161087e565b9550606089013594506080890135935060a08901359250610a0e60c08a01610890565b9150610a1c60e08a01610867565b90509295985092959890939650565b60008060008060808587031215610a4157600080fd5b610a4a85610850565b966020860135965060408601359560600135945092505050565b600060208284031215610a7657600080fd5b61084782610850565b60008060408385031215610a9257600080fd5b610a9b83610850565b9150610aa960208401610850565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b6000600f82810b9084900b828212801560016001607f1b0384900383131615610af357610af3610ab2565b60016001607f1b03198390038212811615610b1057610b10610ab2565b50019392505050565b6000600f82810b9084900b828112801560016001607f1b0319830184121615610b4457610b44610ab2565b60016001607f1b0382018313811615610b5f57610b5f610ab2565b5090039392505050565b600082821015610b7b57610b7b610ab2565b500390565b60008083128015600160ff1b850184121615610b9e57610b9e610ab2565b6001600160ff1b0384018313811615610bb957610bb9610ab2565b50500390565b60008160020b627fffff19811415610bd957610bd9610ab2565b60000392915050565b600080821280156001600160ff1b0384900385131615610c0457610c04610ab2565b600160ff1b8390038412811615610c1d57610c1d610ab2565b50500190565b60006001600160801b0383811690831681811015610c4357610c43610ab2565b039392505050565b60006001600160801b03828116848216808303821115610c6d57610c6d610ab2565b0194935050505056fea264697066735822122054793142f3bec8b7aa3fb1034b90a62ff1588eb78832d453ed2c9a92fc2f657864736f6c63430008090033";
    static readonly abi: ({
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
    } | {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): TickTestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TickTest;
}
//# sourceMappingURL=TickTest__factory.d.ts.map