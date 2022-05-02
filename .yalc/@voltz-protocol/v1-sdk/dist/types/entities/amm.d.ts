import JSBI from 'jsbi';
import { providers } from 'ethers';
import { DateTime } from 'luxon';
import { BigNumber, BigNumberish, ContractReceipt, Signer } from 'ethers';
import RateOracle from './rateOracle';
import Token from './token';
import { Price } from './fractions/price';
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
};
export declare type AMMGetInfoPostSwapArgs = {
    isFT: boolean;
    notional: number;
    fixedRateLimit?: number;
    fixedLow: number;
    fixedHigh: number;
};
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
export declare type AMMSwapArgs = {
    isFT: boolean;
    notional: number;
    margin: number;
    fixedRateLimit?: number;
    fixedLow: number;
    fixedHigh: number;
    validationOnly?: boolean;
};
export declare type fcmSwapArgs = {
    notional: number;
    fixedRateLimit?: number;
};
export declare type fcmUnwindArgs = {
    notionalToUnwind: number;
    fixedRateLimit?: number;
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
export declare type InfoPostSwap = {
    marginRequirement: number;
    availableNotional: number;
    fee: number;
    slippage: number;
    averageFixedRate: number;
};
export declare type AMMBurnArgs = Omit<AMMMintArgs, 'margin'>;
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
    readonly overrides: {
        gasLimit: number;
    };
    constructor({ id, signer, provider, environment, marginEngineAddress, fcmAddress, rateOracle, updatedTimestamp, termStartTimestamp, termEndTimestamp, underlyingToken, tick, tickSpacing, txCount, }: AMMConstructorArgs);
    getInfoPostSwap({ isFT, notional, fixedRateLimit, fixedLow, fixedHigh, }: AMMGetInfoPostSwapArgs): Promise<InfoPostSwap>;
    settlePosition({ owner, fixedLow, fixedHigh, }: AMMSettlePositionArgs): Promise<ContractReceipt>;
    scale(value: number): string;
    descale(value: BigNumber): number;
    updatePositionMargin({ owner, fixedLow, fixedHigh, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt | void>;
    liquidatePosition({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<ContractReceipt>;
    getLiquidationThreshold({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<number>;
    getInfoPostMint({ fixedLow, fixedHigh, notional, }: AMMGetInfoPostMintArgs): Promise<number>;
    mint({ fixedLow, fixedHigh, notional, margin, validationOnly, }: AMMMintArgs): Promise<ContractReceipt | void>;
    burn({ fixedLow, fixedHigh, notional, validationOnly, }: AMMBurnArgs): Promise<ContractReceipt | void>;
    approveFCM(): Promise<ContractReceipt | void>;
    approveERC20(tokenAddress: string, amountToApprove: BigNumberish, addressToApprove: string): Promise<ContractReceipt | void>;
    swap({ isFT, notional, margin, fixedRateLimit, fixedLow, fixedHigh, validationOnly, }: AMMSwapArgs): Promise<ContractReceipt | void>;
    fcmSwap({ notional, fixedRateLimit, }: fcmSwapArgs): Promise<ContractReceipt>;
    fcmUnwind({ notionalToUnwind, fixedRateLimit, }: fcmUnwindArgs): Promise<ContractReceipt>;
    settleFCMTrader(): Promise<ContractReceipt>;
    get startDateTime(): DateTime;
    get endDateTime(): DateTime;
    fixedApr(): Promise<number>;
    get protocol(): string;
    getVariableApy(): Promise<number>;
    getEstimatedCashflow(fixedRateLower: number, fixedRateUpper: number): Promise<number>;
    getCurrentMargin(fixedRateLower: number, fixedRateUpper: number): Promise<number>;
    closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate;
    getNextUsableFixedRate(fixedRate: number, count: number): number;
}
export default AMM;
//# sourceMappingURL=amm.d.ts.map