import { BigNumber } from 'ethers';
export declare const getReadableErrorMessage: (error: any) => string;
export type RawInfoPostMint = {
    marginRequirement: BigNumber;
};
export declare const decodeInfoPostMint: (error: any) => RawInfoPostMint;
export type RawInfoPostSwap = {
    marginRequirement: BigNumber;
    tick: number;
    fee: BigNumber;
    availableNotional: BigNumber;
    fixedTokenDeltaUnbalanced: BigNumber;
    fixedTokenDelta: BigNumber;
};
export declare const decodeInfoPostSwap: (error: any) => RawInfoPostSwap;
//# sourceMappingURL=errorHandling.d.ts.map