import JSBI from 'jsbi';
import { providers, BigNumber, Signer } from 'ethers';
import { ICToken, IERC20Minimal } from '../typechain';
import RateOracle from './rateOracle';
import Token from './token';
import Position from './position';
import { AMM, InfoPostSwap, AMMGetInfoPostSwapArgs } from './amm';
export type BorrowAMMConstructorArgs = {
    id: string;
    amm: AMM;
};
export type BorrowSwapInfo = InfoPostSwap & {
    borrowMarginRequirement: number;
};
declare class BorrowAMM {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider?: providers.Provider;
    readonly rateOracle: RateOracle;
    readonly termStartTimestamp: JSBI;
    readonly termEndTimestamp: JSBI;
    readonly underlyingToken: Token;
    readonly amm: AMM;
    cToken: ICToken | undefined;
    aaveVariableDebtToken: IERC20Minimal | undefined;
    underlyingDebt: number;
    variableDebt: number;
    fixedDebt: number;
    aggregatedDebt: number;
    constructor({ id, amm }: BorrowAMMConstructorArgs);
    descale(value: BigNumber): number;
    scale(value: number): string;
    getAllSwaps(position: Position): {
        fDelta: BigNumber;
        vDelta: BigNumber;
        timestamp: BigNumber;
    }[];
    getAccruedCashflow(allSwaps: {
        fDelta: BigNumber;
        vDelta: BigNumber;
        timestamp: BigNumber;
    }[], atMaturity: boolean): Promise<[BigNumber, BigNumber]>;
    atMaturity(): Promise<boolean>;
    getVariableCashFlow(position: Position): Promise<BigNumber>;
    getFixedCashFlow(position: Position): Promise<number>;
    getScaledUnderlyingBorrowBalance(): Promise<BigNumber>;
    getUnderlyingBorrowBalance(): Promise<number>;
    getFixedBorrowBalance(position: Position): Promise<number>;
    getAggregatedBorrowBalance(position: Position): Promise<number>;
    getBorrowInfo(infoPostSwapArgs: AMMGetInfoPostSwapArgs): Promise<BorrowSwapInfo>;
    getFixedBorrowBalanceInUSD(position: Position): Promise<number>;
    getUnderlyingBorrowBalanceInUSD(): Promise<number>;
    getAggregatedBorrowBalanceInUSD(position: Position): Promise<number>;
}
export default BorrowAMM;
//# sourceMappingURL=borrowAMM.d.ts.map