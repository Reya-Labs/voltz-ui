import JSBI from 'jsbi';
import { DateTime } from 'luxon';
import { BigNumber, BigNumberish, ContractTransaction, Signer } from 'ethers';
import { BigIntish } from '../types';
import { Price } from './fractions/price';
import Token from './token';
import RateOracle from './rateOracle';
export declare type AMMConstructorArgs = {
    id: string;
    signer: Signer | null;
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
export declare type AMMGetMinimumMarginRequirementArgs = {
    recipient: string;
    isFT: boolean;
    notional: BigNumberish;
    sqrtPriceLimitX96: BigNumberish;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
};
export declare type AMMGetMinimumMarginRequirementPostMintArgs = {
    recipient: string;
    fixedLow: number;
    fixedHigh: number;
    notional: BigNumberish;
};
export declare type AMMUpdatePositionMarginArgs = {
    owner: string;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
    marginDelta: BigNumberish;
};
export declare type AMMSettlePositionArgs = {
    owner: string;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
};
export declare type AMMSwapArgs = {
    recipient: string;
    isFT: boolean;
    notional: BigNumberish;
    sqrtPriceLimitX96: BigNumberish;
    tickLower: 0;
    tickUpper: 0;
};
export declare type AMMMintOrBurnArgs = {
    recipient: string;
    fixedLow: number;
    fixedHigh: number;
    margin: number;
    leverage: number;
};
export declare type AMMMintOrBurnUsingTicksArgs = {
    recipient: string;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
    notional: BigNumberish;
    isMint: boolean;
};
export declare type ClosestTickAndFixedRate = {
    closestUsableTick: number;
    closestUsableFixedRate: Price;
};
declare class AMM {
    readonly id: string;
    readonly signer: Signer | null;
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
    constructor({ id, signer, marginEngineAddress, fcmAddress, rateOracle, createdTimestamp, updatedTimestamp, termStartTimestamp, termEndTimestamp, underlyingToken, sqrtPriceX96, liquidity, tick, tickSpacing, txCount, }: AMMConstructorArgs);
    getMinimumMarginRequirementPostSwap({ recipient, isFT, notional, sqrtPriceLimitX96, tickLower, tickUpper, }: AMMGetMinimumMarginRequirementArgs): Promise<BigNumber | void>;
    getMinimumMarginRequirementPostMint({ recipient, fixedLow, fixedHigh, notional, }: AMMGetMinimumMarginRequirementPostMintArgs): Promise<BigNumber | void>;
    settlePosition({ owner, tickLower, tickUpper, }: AMMSettlePositionArgs): Promise<ContractTransaction | void>;
    updatePositionMargin({ owner, tickLower, tickUpper, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractTransaction | void>;
    mint({ recipient, fixedLow, fixedHigh, margin, leverage, }: AMMMintOrBurnArgs): Promise<ContractTransaction | void>;
    updateSqrtPriceX96(): Promise<void>;
    initVamm(tickLower: BigNumberish): Promise<void>;
    mintUsingTicks({ tickLower, ...args }: Omit<AMMMintOrBurnUsingTicksArgs, 'isMint'>): Promise<ContractTransaction | void>;
    burn({ recipient, fixedLow, fixedHigh, margin, leverage, }: AMMMintOrBurnArgs): Promise<ContractTransaction | void>;
    burnUsingTicks(args: Omit<AMMMintOrBurnUsingTicksArgs, 'isMint'>): Promise<ContractTransaction | void>;
    mintOrBurnUsingTicks({ recipient, tickLower, tickUpper, notional, isMint, }: AMMMintOrBurnUsingTicksArgs): Promise<ContractTransaction | void>;
    approvePeriphery(): Promise<ContractTransaction | void>;
    approveMarginEngine(marginDelta: BigNumberish): Promise<void>;
    swap({ recipient, isFT, notional, sqrtPriceLimitX96, tickLower, tickUpper, }: AMMSwapArgs): Promise<ContractTransaction | void>;
    get startDateTime(): DateTime;
    get endDateTime(): DateTime;
    get fixedRate(): Price;
    get fixedApr(): number;
    get price(): Price;
    get variableApr(): number;
    get protocol(): string;
    closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate;
}
export default AMM;
//# sourceMappingURL=amm.d.ts.map