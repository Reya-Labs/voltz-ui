import JSBI from 'jsbi';
import { providers } from 'ethers';
import { DateTime } from 'luxon';
import { BigNumber, ContractReceipt, Signer } from 'ethers';
import RateOracle from './rateOracle';
import Token from './token';
import { Price } from './fractions/price';
import Position from './position';
export declare type AMMConstructorArgs = {
    id: string;
    signer: Signer | null;
    provider?: providers.Provider;
    environment: string;
    marginEngineAddress: string;
    fcmAddress: string;
    rateOracle: RateOracle;
    updatedTimestamp: JSBI;
    termStartTimestamp: JSBI;
    termEndTimestamp: JSBI;
    underlyingToken: Token;
    tick: number;
    tickSpacing: number;
    txCount: number;
    totalNotionalTraded: JSBI;
    totalLiquidity: JSBI;
};
export declare type CapInfo = {
    accumulated: number;
    cap: number;
};
export declare type AMMGetInfoPostSwapArgs = {
    isFT: boolean;
    notional: number;
    fixedRateLimit?: number;
    fixedLow: number;
    fixedHigh: number;
};
export declare type AMMSwapArgs = {
    isFT: boolean;
    notional: number;
    margin: number;
    fixedRateLimit?: number;
    fixedLow: number;
    fixedHigh: number;
    validationOnly?: boolean;
};
export declare type InfoPostSwap = {
    marginRequirement: number;
    availableNotional: number;
    fee: number;
    slippage: number;
    averageFixedRate: number;
};
export declare type AMMMintArgs = {
    fixedLow: number;
    fixedHigh: number;
    notional: number;
    margin: number;
    validationOnly?: boolean;
};
export declare type AMMGetInfoPostMintArgs = {
    fixedLow: number;
    fixedHigh: number;
    notional: number;
};
export declare type AMMBurnArgs = Omit<AMMMintArgs, 'margin'>;
export declare type AMMUpdatePositionMarginArgs = {
    owner?: string;
    fixedLow: number;
    fixedHigh: number;
    marginDelta: number;
};
export declare type AMMLiquidatePositionArgs = {
    owner: string;
    fixedLow: number;
    fixedHigh: number;
};
export declare type AMMSettlePositionArgs = {
    owner?: string;
    fixedLow: number;
    fixedHigh: number;
};
export declare type fcmSwapArgs = {
    notional: number;
    fixedRateLimit?: number;
};
export declare type fcmUnwindArgs = {
    notionalToUnwind: number;
    fixedRateLimit?: number;
};
export declare type PositionInfo = {
    margin: number;
    fees?: number;
    liquidationThreshold?: number;
    safetyThreshold?: number;
    accruedCashflow: number;
    variableRateSinceLastSwap?: number;
    fixedRateSinceLastSwap?: number;
    beforeMaturity: boolean;
    fixedApr?: number;
    healthFactor?: number;
};
export declare type ClosestTickAndFixedRate = {
    closestUsableTick: number;
    closestUsableFixedRate: Price;
};
declare class AMM {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider?: providers.Provider;
    readonly environment: string;
    readonly marginEngineAddress: string;
    readonly fcmAddress: string;
    readonly rateOracle: RateOracle;
    readonly updatedTimestamp: JSBI;
    readonly termStartTimestamp: JSBI;
    readonly termEndTimestamp: JSBI;
    readonly underlyingToken: Token;
    readonly tickSpacing: number;
    readonly tick: number;
    readonly txCount: number;
    readonly totalNotionalTraded: JSBI;
    readonly totalLiquidity: JSBI;
    constructor({ id, signer, provider, environment, marginEngineAddress, fcmAddress, rateOracle, updatedTimestamp, termStartTimestamp, termEndTimestamp, underlyingToken, tick, tickSpacing, txCount, totalNotionalTraded, totalLiquidity }: AMMConstructorArgs);
    getInfoPostSwap({ isFT, notional, fixedRateLimit, fixedLow, fixedHigh, }: AMMGetInfoPostSwapArgs): Promise<InfoPostSwap>;
    swap({ isFT, notional, margin, fixedRateLimit, fixedLow, fixedHigh, validationOnly, }: AMMSwapArgs): Promise<ContractReceipt | void>;
    getInfoPostMint({ fixedLow, fixedHigh, notional, }: AMMGetInfoPostMintArgs): Promise<number>;
    mint({ fixedLow, fixedHigh, notional, margin, validationOnly, }: AMMMintArgs): Promise<ContractReceipt | void>;
    burn({ fixedLow, fixedHigh, notional, validationOnly, }: AMMBurnArgs): Promise<ContractReceipt | void>;
    updatePositionMargin({ owner, fixedLow, fixedHigh, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt | void>;
    liquidatePosition({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<ContractReceipt>;
    settlePosition({ owner, fixedLow, fixedHigh, }: AMMSettlePositionArgs): Promise<ContractReceipt>;
    getInfoPostFCMSwap({ notional, fixedRateLimit, }: fcmSwapArgs): Promise<InfoPostSwap>;
    fcmSwap({ notional, fixedRateLimit, }: fcmSwapArgs): Promise<ContractReceipt>;
    getInfoPostFCMUnwind({ notionalToUnwind, fixedRateLimit, }: fcmUnwindArgs): Promise<InfoPostSwap>;
    fcmUnwind({ notionalToUnwind, fixedRateLimit, }: fcmUnwindArgs): Promise<ContractReceipt>;
    settleFCMTrader(): Promise<ContractReceipt>;
    scale(value: number): string;
    descale(value: BigNumber): number;
    isFCMApproved(): Promise<boolean | void>;
    approveFCM(): Promise<ContractReceipt | void>;
    isUnderlyingTokenApprovedForPeriphery(): Promise<boolean | void>;
    approveUnderlyingTokenForPeriphery(): Promise<ContractReceipt | void>;
    isUnderlyingTokenApprovedForFCM(): Promise<boolean | void>;
    approveUnderlyingTokenForFCM(): Promise<ContractReceipt | void>;
    isYieldBearingTokenApprovedForFCM(): Promise<boolean | void>;
    get protocol(): string;
    approveYieldBearingTokenForFCM(): Promise<ContractReceipt | void>;
    get startDateTime(): DateTime;
    get endDateTime(): DateTime;
    getFixedApr(): Promise<number>;
    getVariableApy(): Promise<number>;
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
    getVariableFactor(termStartTimestamp: BigNumber, termEndTimestamp: BigNumber): Promise<number>;
    getPositionInformation(position: Position): Promise<PositionInfo>;
    closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate;
    getNextUsableFixedRate(fixedRate: number, count: number): number;
    hasEnoughUnderlyingTokens(amount: number): Promise<boolean>;
    hasEnoughYieldBearingTokens(amount: number): Promise<boolean>;
    setCap(amount: number): Promise<void>;
    getCaps(): Promise<CapInfo>;
    getPositionMarginRequirement(fixedLow: number, fixedHigh: number): Promise<number>;
    getOneWeekApy(): Promise<number>;
}
export default AMM;
//# sourceMappingURL=amm.d.ts.map