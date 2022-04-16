import { BigNumber } from 'ethers';
export interface SwapPeripheryParams {
    marginEngineAddress: string;
    recipient: string;
    isFT: boolean;
    notional: BigNumber;
    sqrtPriceLimitX96: BigNumber;
    tickLower: number;
    tickUpper: number;
}
export interface MintOrBurnParams {
    marginEngineAddress: string;
    recipient: string;
    tickLower: number;
    tickUpper: number;
    notional: BigNumber;
    isMint: boolean;
}
//# sourceMappingURL=interfaces.d.ts.map