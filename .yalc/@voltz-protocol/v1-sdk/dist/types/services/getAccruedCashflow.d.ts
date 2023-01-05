import { Swap } from '../entities';
import { BaseRateOracle } from '../typechain';
export type AccruedCashflowInfo = {
    avgFixedRate: number;
    accruedCashflow: number;
};
export type TransformedSwap = {
    avgFixedRate: number;
    notional: number;
    time: number;
};
export type AccruedCashflowArgs = {
    swaps: TransformedSwap[];
    rateOracle: BaseRateOracle;
    currentTime: number;
    endTime: number;
};
export declare function transformSwaps(swaps: Swap[], decimals: number): TransformedSwap[];
export declare const getAccruedCashflow: ({ swaps, rateOracle, currentTime, endTime, }: AccruedCashflowArgs) => Promise<AccruedCashflowInfo>;
//# sourceMappingURL=getAccruedCashflow.d.ts.map