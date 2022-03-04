import JSBI from 'jsbi';
import { BigintIsh } from '../types';
import { Price } from './fractions/price';
import AMM from './amm';
export declare type PositionConstructorArgs = {
    id: string;
    createdTimestamp: JSBI;
    updatedTimestamp: JSBI;
    amm: AMM;
    tickLower: number;
    tickUpper: number;
    liquidity: BigintIsh;
    isSettled: boolean;
    margin: JSBI;
    fixedTokenBalance: JSBI;
    variableTokenBalance: JSBI;
    isLiquidityProvider: boolean;
};
declare class Position {
    readonly id: string;
    readonly createdTimestamp: JSBI;
    readonly updatedTimestamp: JSBI;
    readonly amm: AMM;
    readonly tickLower: number;
    readonly tickUpper: number;
    readonly liquidity: JSBI;
    isSettled: boolean;
    margin: JSBI;
    fixedTokenBalance: JSBI;
    variableTokenBalance: JSBI;
    isLiquidityProvider: boolean;
    constructor({ id, createdTimestamp, updatedTimestamp, amm, liquidity, tickLower, tickUpper, isSettled, margin, fixedTokenBalance, variableTokenBalance, isLiquidityProvider, }: PositionConstructorArgs);
    get priceLower(): Price;
    get priceUpper(): Price;
}
export default Position;
//# sourceMappingURL=position.d.ts.map