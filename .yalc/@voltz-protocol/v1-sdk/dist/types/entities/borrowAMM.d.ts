import JSBI from 'jsbi';
import { providers } from 'ethers';
import { BigNumber, Signer } from 'ethers';
import { ICToken, IERC20Minimal } from '../typechain';
import RateOracle from './rateOracle';
import Token from './token';
import Position from './position';
import AMM from './amm';
export declare type BorrowAMMConstructorArgs = {
    id: string;
    amm: AMM;
};
declare class BorrowAMM {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider?: providers.Provider;
    readonly environment: string;
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
    getFullyCollateralisedMarginRequirement(fixedTokenBalance: number, variableTokenBalance: number, fee: number): Promise<number>;
    getFixedBorrowBalanceInUSD(position: Position): Promise<number>;
    getUnderlyingBorrowBalanceInUSD(): Promise<number>;
    getAggregatedBorrowBalanceInUSD(position: Position): Promise<number>;
}
export default BorrowAMM;
//# sourceMappingURL=borrowAMM.d.ts.map