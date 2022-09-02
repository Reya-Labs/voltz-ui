import { Swap } from '../entities';
import { BaseRateOracle } from '../typechain';
export declare type AccruedCashflowInfo = {
    avgFixedRate: number;
    accruedCashflow: number;
};
export declare type TransformedSwap = {
    avgFixedRate: number;
    notional: number;
    time: number;
};
export declare type AccruedCashflowArgs = {
    swaps: TransformedSwap[];
    rateOracle: BaseRateOracle;
    currentTime: number;
    endTime: number;
};
export declare function transformSwaps(swaps: Swap[], decimals: number): TransformedSwap[];
export declare const getAccruedCashflow: ({ swaps, rateOracle, currentTime, endTime, }: AccruedCashflowArgs) => Promise<AccruedCashflowInfo>;
//# sourceMappingURL=getAccruedCashflow.d.ts.map