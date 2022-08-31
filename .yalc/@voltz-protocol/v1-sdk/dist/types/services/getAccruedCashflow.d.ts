import { Position } from '../entities';
import { BaseRateOracle } from '../typechain';
export declare type AccruedCashflowArgs = {
    position: Position;
    rateOracle: BaseRateOracle;
    currentTime: number;
    endTime: number;
    decimals: number;
};
export declare type AccruedCashflowInfo = {
    avgFixedRate: number;
    accruedCashflow: number;
};
export declare type TransformedSwap = {
    avgFixedRate: number;
    notional: number;
    time: number;
};
export declare const getAccruedCashflow: ({ position, rateOracle, currentTime, endTime, decimals, }: AccruedCashflowArgs) => Promise<AccruedCashflowInfo>;
//# sourceMappingURL=getAccruedCashflow.d.ts.map