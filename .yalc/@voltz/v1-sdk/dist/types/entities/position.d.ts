import JSBI from 'jsbi';
import { BigIntish } from '../types';
import { Price } from './fractions/price';
export declare type PositionConstructorArgs = {
    id: string;
    createdTimestamp: JSBI;
    updatedTimestamp: JSBI;
    ammId: string;
    tickLower: number;
    tickUpper: number;
    liquidity: BigIntish;
    isSettled: boolean;
    margin: JSBI;
    fixedTokenBalance: JSBI;
    variableTokenBalance: JSBI;
    isLiquidityProvider: boolean;
    owner: string;
    isEmpty: boolean;
};
declare class Position {
    readonly id: string;
    readonly createdTimestamp: JSBI;
    readonly updatedTimestamp: JSBI;
    readonly ammId: string;
    readonly tickLower: number;
    readonly tickUpper: number;
    readonly liquidity: JSBI;
    readonly owner: string;
    isSettled: boolean;
    margin: JSBI;
    fixedTokenBalance: JSBI;
    variableTokenBalance: JSBI;
    isLiquidityProvider: boolean;
    readonly isEmpty: boolean;
    constructor({ id, createdTimestamp, updatedTimestamp, ammId, liquidity, tickLower, tickUpper, isSettled, margin, fixedTokenBalance, variableTokenBalance, isLiquidityProvider, owner, isEmpty, }: PositionConstructorArgs);
    get priceLower(): Price;
    get priceUpper(): Price;
    get fixedRateLower(): Price;
    get fixedRateUpper(): Price;
}
export default Position;
//# sourceMappingURL=position.d.ts.map