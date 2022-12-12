import { BigNumber, ethers } from 'ethers';
export declare const iface: ethers.utils.Interface;
export declare const errorMessageMapping: {
    [errSig: string]: string;
};
export declare const extractErrorSignature: (message: string) => string;
export declare const getErrorSignature: (error: any, environment: string) => string;
export declare const getReadableErrorMessage: (error: any, environment: string) => string;
export type RawInfoPostMint = {
    marginRequirement: BigNumber;
};
export declare const decodeInfoPostMint: (error: any, environment: string) => RawInfoPostMint;
export type RawInfoPostSwap = {
    marginRequirement: BigNumber;
    tick: number;
    fee: BigNumber;
    availableNotional: BigNumber;
    fixedTokenDeltaUnbalanced: BigNumber;
    fixedTokenDelta: BigNumber;
};
export declare const decodeInfoPostSwap: (error: any, environment: string) => RawInfoPostSwap;
//# sourceMappingURL=errorHandling.d.ts.map