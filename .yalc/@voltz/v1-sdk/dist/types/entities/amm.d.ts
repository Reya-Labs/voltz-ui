import JSBI from 'jsbi';
import { providers } from 'ethers';
import { DateTime } from 'luxon';
import { BigNumberish, ContractReceipt, Signer } from 'ethers';
import { BigIntish } from '../types';
import RateOracle from './rateOracle';
import Token from './token';
import { Price } from './fractions/price';
export declare type AMMConstructorArgs = {
    id: string;
    signer: Signer | null;
    provider?: providers.Provider;
    marginEngineAddress: string;
    fcmAddress: string;
    rateOracle: RateOracle;
    createdTimestamp: BigIntish;
    updatedTimestamp: BigIntish;
    termStartTimestamp: BigIntish;
    termEndTimestamp: BigIntish;
    underlyingToken: Token;
    sqrtPriceX96: BigIntish;
    liquidity: BigIntish;
    tick: BigIntish;
    tickSpacing: BigIntish;
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
    owner: string;
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
    owner: string;
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
export declare type FCMSwapArgs = {
    notional: number;
    fixedRateLimit?: number;
};
export declare type FCMUnwindArgs = {
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
export declare type AMMGetMinimumMarginRequirementPostMintArgs = AMMMintArgs;
export declare type InfoPostSwap = {
    marginRequirement: number;
    availableNotional: number;
    fee: number;
    slippage: number;
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
    readonly marginEngineAddress: string;
    readonly fcmAddress: string;
    readonly rateOracle: RateOracle;
    readonly createdTimestamp: JSBI;
    readonly updatedTimestamp: JSBI;
    readonly termStartTimestamp: JSBI;
    readonly termEndTimestamp: JSBI;
    readonly underlyingToken: Token;
    sqrtPriceX96: JSBI;
    readonly liquidity: JSBI;
    readonly tickSpacing: JSBI;
    readonly tick: JSBI;
    readonly txCount: JSBI;
    private _fixedRate?;
    private _price?;
    constructor({ id, signer, provider, marginEngineAddress, fcmAddress, rateOracle, createdTimestamp, updatedTimestamp, termStartTimestamp, termEndTimestamp, underlyingToken, sqrtPriceX96, liquidity, tick, tickSpacing, txCount, }: AMMConstructorArgs);
    getInfoPostSwap({ isFT, notional, fixedRateLimit, fixedLow, fixedHigh, }: AMMGetInfoPostSwapArgs): Promise<InfoPostSwap>;
    settlePosition({ owner, fixedLow, fixedHigh, }: AMMSettlePositionArgs): Promise<ContractReceipt>;
    private scale;
    updatePositionMargin({ owner, fixedLow, fixedHigh, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt>;
    liquidatePosition({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<ContractReceipt>;
    getLiquidationThreshold({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<number>;
    getMinimumMarginRequirementPostMint({ fixedLow, fixedHigh, notional, }: AMMGetMinimumMarginRequirementPostMintArgs): Promise<number>;
    mint({ fixedLow, fixedHigh, notional, margin, validationOnly, }: AMMMintArgs): Promise<ContractReceipt | void>;
    burn({ fixedLow, fixedHigh, notional, validationOnly, }: AMMBurnArgs): Promise<ContractReceipt | void>;
    approveFCM(): Promise<ContractReceipt | void>;
    approveERC20(marginDelta: BigNumberish, addressToApprove: string): Promise<ContractReceipt | void>;
    swap({ isFT, notional, margin, fixedRateLimit, fixedLow, fixedHigh, validationOnly, }: AMMSwapArgs): Promise<ContractReceipt | void>;
    FCMSwap({ notional, fixedRateLimit, }: FCMSwapArgs): Promise<ContractReceipt>;
    FCMUnwind({ notionalToUnwind, fixedRateLimit, }: FCMUnwindArgs): Promise<ContractReceipt>;
    settleFCMTrader(): Promise<ContractReceipt>;
    get startDateTime(): DateTime;
    get endDateTime(): DateTime;
    get initialized(): boolean;
    get fixedRate(): Price;
    get fixedApr(): number;
    get price(): Price;
    get protocol(): string;
    getVariableApy(): Promise<number>;
    closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate;
}
export default AMM;
//# sourceMappingURL=amm.d.ts.map