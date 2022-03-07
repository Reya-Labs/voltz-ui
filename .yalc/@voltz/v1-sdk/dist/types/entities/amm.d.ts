import JSBI from 'jsbi';
import { BigNumber, ContractTransaction, Signer } from 'ethers';
import { BigintIsh } from '../types';
import { Price } from './fractions/price';
import Token from './token';
import RateOracle from './rateOracle';
export declare type AMMConstructorArgs = {
    id: string;
    marginEngineAddress: string;
    vammAddress: string;
    peripheryAddress: string;
    fcmAddress: string;
    rateOracle: RateOracle;
    protocolName: string;
    createdTimestamp: BigintIsh;
    updatedTimestamp: BigintIsh;
    termStartTimestamp: JSBI;
    termEndTimestamp: JSBI;
    underlyingToken: Token;
    sqrtPriceX96: JSBI;
    liquidity: JSBI;
    tick: JSBI;
    tickSpacing: JSBI;
    txCount: number;
};
export declare type AMMGetMinimumMarginRequirementArgs = {
    signer: Signer;
    recipient: string;
    isFT: boolean;
    notional: BigNumber;
    sqrtPriceLimitX96: BigNumber;
    tickLower: number;
    tickUpper: number;
};
export declare type AMMUpdatePositionMarginArgs = {
    signer: Signer;
    owner: string;
    tickLower: number;
    tickUpper: number;
    marginDelta: BigNumber;
};
export declare type AMMSettlePositionArgs = {
    signer: Signer;
    owner: string;
    tickLower: number;
    tickUpper: number;
};
export declare type AMMSwapArgs = {
    signer: Signer;
    recipient: string;
    isFT: boolean;
    notional: BigNumber;
    sqrtPriceLimitX96: BigNumber;
    tickLower: 0;
    tickUpper: 0;
};
export declare type AMMMintOrBurnArgs = {
    signer: Signer;
    marginEngineAddress: string;
    recipient: string;
    tickLower: number;
    tickUpper: number;
    notional: BigNumber;
    isMint: boolean;
};
declare class AMM {
    readonly id: string;
    readonly vammAddress: string;
    readonly marginEngineAddress: string;
    readonly peripheryAddress: string;
    readonly fcmAddress: string;
    readonly rateOracle: RateOracle;
    readonly protocolName: string;
    readonly createdTimestamp: BigintIsh;
    readonly updatedTimestamp: BigintIsh;
    readonly termStartTimestamp: JSBI;
    readonly termEndTimestamp: JSBI;
    readonly underlyingToken: Token;
    readonly sqrtPriceX96: JSBI;
    readonly liquidity: JSBI;
    readonly tickSpacing: JSBI;
    readonly tick: JSBI;
    readonly txCount: number;
    private _fixedRate?;
    private _price?;
    constructor({ id, vammAddress, marginEngineAddress, peripheryAddress, fcmAddress, rateOracle, protocolName, createdTimestamp, updatedTimestamp, termStartTimestamp, termEndTimestamp, underlyingToken, sqrtPriceX96, liquidity, tick, tickSpacing, txCount, }: AMMConstructorArgs);
    getMinimumMarginRequirement({ signer, recipient, isFT, notional, sqrtPriceLimitX96, tickLower, tickUpper, }: AMMGetMinimumMarginRequirementArgs): Promise<BigNumber>;
    settlePosition({ signer, owner, tickLower, tickUpper }: AMMSettlePositionArgs): Promise<ContractTransaction>;
    updatePositionMargin({ signer, owner, tickLower, tickUpper, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractTransaction>;
    mintOrBurn({ signer, recipient, tickLower, tickUpper, notional, isMint, }: AMMMintOrBurnArgs): Promise<ContractTransaction>;
    swap({ signer, recipient, isFT, notional, sqrtPriceLimitX96, tickLower, tickUpper, }: AMMSwapArgs): Promise<ContractTransaction>;
    get fixedRate(): Price;
    get price(): Price;
}
export default AMM;
//# sourceMappingURL=amm.d.ts.map