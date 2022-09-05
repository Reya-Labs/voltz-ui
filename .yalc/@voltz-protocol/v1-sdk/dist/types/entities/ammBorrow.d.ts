import JSBI from 'jsbi';
import { providers } from 'ethers';
import { BigNumber, Signer } from 'ethers';
import { ICToken, IERC20Minimal } from '../typechain';
import RateOracle from './rateOracle';
import Token from './token';
import Position from './position';
export declare type PositionInfo = {
    notionalInUSD: number;
    marginInUSD: number;
    margin: number;
    fees?: number;
    liquidationThreshold?: number;
    safetyThreshold?: number;
    accruedCashflowInUSD: number;
    accruedCashflow: number;
    variableRateSinceLastSwap?: number;
    fixedRateSinceLastSwap?: number;
    beforeMaturity: boolean;
    fixedApr?: number;
    healthFactor?: number;
};
export declare type BorrowAMMConstructorArgs = {
    id: string;
    signer: Signer | null;
    provider?: providers.Provider;
    environment: string;
    factoryAddress: string;
    marginEngineAddress: string;
    rateOracle: RateOracle;
    termStartTimestamp: JSBI;
    termEndTimestamp: JSBI;
    underlyingToken: Token;
    tick: number;
    tickSpacing: number;
};
declare class BorrowAMM {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider?: providers.Provider;
    readonly environment: string;
    readonly factoryAddress: string;
    readonly marginEngineAddress: string;
    readonly rateOracle: RateOracle;
    readonly termStartTimestamp: JSBI;
    readonly termEndTimestamp: JSBI;
    readonly underlyingToken: Token;
    readonly tickSpacing: number;
    readonly tick: number;
    cToken?: ICToken;
    aaveVariableDebtToken?: IERC20Minimal;
    constructor({ id, signer, provider, environment, factoryAddress, marginEngineAddress, rateOracle, termStartTimestamp, termEndTimestamp, underlyingToken, tick, tickSpacing }: BorrowAMMConstructorArgs);
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
    }[], atMaturity: boolean): Promise<number>;
    getUnderlyingBorrowBalance(): Promise<number>;
    getFixedBorrowBalance(position: Position): Promise<number>;
    getAggregatedBorrowBalance(position: Position): Promise<number>;
    getVariableBorrowBalance(aggregatedDebt: number, fixedDebt: number): number;
}
export default BorrowAMM;
//# sourceMappingURL=ammBorrow.d.ts.map