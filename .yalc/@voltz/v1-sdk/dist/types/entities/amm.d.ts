import JSBI from 'jsbi';
import { DateTime } from 'luxon';
import { BigNumberish, ContractTransaction, Signer } from 'ethers';
import { BigIntish } from '../types';
import { Price } from './fractions/price';
import Token from './token';
import RateOracle from './rateOracle';
import { providers } from 'ethers';
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
    recipient: string;
    isFT: boolean;
    notional: BigNumberish;
    fixedRateLimit?: number;
    fixedLow: number;
    fixedHigh: number;
};
export declare type AMMUpdatePositionMarginArgs = {
    owner: string;
    fixedLow: number;
    fixedHigh: number;
    marginDelta: BigNumberish;
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
    recipient: string;
    isFT: boolean;
    notional: number;
    margin: number;
    fixedRateLimit?: number;
    fixedLow: number;
    fixedHigh: number;
};
export declare type FCMSwapArgs = {
    notional: BigNumberish;
    fixedRateLimit?: number;
};
export declare type FCMUnwindArgs = {
    notionalToUnwind: BigNumberish;
    fixedRateLimit?: number;
};
export declare type AMMMintArgs = {
    recipient: string;
    fixedLow: number;
    fixedHigh: number;
    notional: number;
    margin: number;
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
    getInfoPostSwap({ recipient, isFT, notional, fixedRateLimit, fixedLow, fixedHigh, }: AMMGetInfoPostSwapArgs): Promise<InfoPostSwap | void>;
    settlePosition({ owner, fixedLow, fixedHigh }: AMMSettlePositionArgs): Promise<ContractTransaction | void>;
    updatePositionMargin({ owner, fixedLow, fixedHigh, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractTransaction | void>;
    liquidatePosition({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<ContractTransaction | void>;
    getLiquidationThreshold({ owner, fixedLow, fixedHigh, }: AMMLiquidatePositionArgs): Promise<number | void>;
    getMinimumMarginRequirementPostMint({ recipient, fixedLow, fixedHigh, notional }: AMMGetMinimumMarginRequirementPostMintArgs): Promise<number | void>;
    mint({ recipient, fixedLow, fixedHigh, notional, margin }: AMMMintArgs): Promise<ContractTransaction | void>;
    burn({ recipient, fixedLow, fixedHigh, notional }: AMMBurnArgs): Promise<ContractTransaction | void>;
    approvePeriphery(): Promise<ContractTransaction | void>;
    approveFCM(): Promise<ContractTransaction | void>;
    approveMarginEngine(marginDelta: BigNumberish): Promise<void>;
    swap({ recipient, isFT, notional, margin, fixedRateLimit, fixedLow, fixedHigh, }: AMMSwapArgs): Promise<ContractTransaction | void>;
    FCMSwap({ notional, fixedRateLimit }: FCMSwapArgs): Promise<ContractTransaction | void>;
    FCMUnwind({ notionalToUnwind, fixedRateLimit }: FCMUnwindArgs): Promise<ContractTransaction | void>;
    settleFCMTrader(): Promise<ContractTransaction | void>;
    get startDateTime(): DateTime;
    get endDateTime(): DateTime;
    get initialized(): boolean;
    get fixedRate(): Price;
    get fixedApr(): number;
    get price(): Price;
    getVariableApy(): Promise<number | void>;
    get protocol(): string;
    closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate;
}
export default AMM;
//# sourceMappingURL=amm.d.ts.map