import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WadRayMath, WadRayMathInterface } from "../WadRayMath";
export declare class WadRayMath__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<WadRayMath>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): WadRayMath;
    connect(signer: Signer): WadRayMath__factory;
    static readonly bytecode = "0x61014e61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100615760003560e01c8063552033c4146100665780635fcd68091461008a578063629fa5a7146100925780636a1460241461009a57806385aa454e146100a9575b600080fd5b610078676765c793fa10079d601b1b81565b60405190815260200160405180910390f35b6100786100b1565b6100786100ca565b610078670de0b6b3a764000081565b6100786100e7565b6100c76002676765c793fa10079d601b1b6100f6565b81565b6100c7670de0b6b3a7640000676765c793fa10079d601b1b6100f6565b6100c76002670de0b6b3a76400005b60008261011357634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220f0098e1e7e063386b51de60b604576abe137fe3c658ea1d2c867597f7b2c7f8d64736f6c63430008090033";
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): WadRayMathInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): WadRayMath;
}
//# sourceMappingURL=WadRayMath__factory.d.ts.map