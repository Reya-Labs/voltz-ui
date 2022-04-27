import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TraderTest, TraderTestInterface } from "../TraderTest";
export declare class TraderTest__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TraderTest>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TraderTest;
    connect(signer: Signer): TraderTest__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610213806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80631758078b146100465780632556efd214610085578063bf6d89901461009a575b600080fd5b60005460015460025460035461005f9392919060ff1684565b604080519485526020850193909352918301521515606082015260800160405180910390f35b61009861009336600461014d565b6100ad565b005b6100986100a8366004610165565b6100bb565b6100b86000826100cb565b50565b6100c7600083836100de565b5050565b81546100d8908290610186565b90915550565b6040805160808101825284548152600185015460208201819052600286015492820192909252600385015460ff161515606082015290600090610122908590610186565b905060008383604001516101369190610186565b600187019290925550600290940193909355505050565b60006020828403121561015e578081fd5b5035919050565b60008060408385031215610177578081fd5b50508035926020909101359150565b600080821280156001600160ff1b03849003851316156101a8576101a86101c7565b600160ff1b83900384128116156101c1576101c16101c7565b50500190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212206730fd52ab173fb6998737511ca8dac11d147290775ffbc8f8e31506e97b974f64736f6c63430008040033";
    static readonly abi: ({
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): TraderTestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TraderTest;
}
//# sourceMappingURL=TraderTest__factory.d.ts.map