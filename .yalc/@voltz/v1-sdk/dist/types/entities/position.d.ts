import JSBI from 'jsbi';
import { BigintIsh } from '../types';
import { Price } from './fractions/price';
import AMM from './amm';
interface PositionConstructorArgs {
    amm: AMM;
    tickLower: number;
    tickUpper: number;
    liquidity: BigintIsh;
    isSettled: boolean;
    margin: JSBI;
    fixedTokenBalance: JSBI;
    variableTokenBalance: JSBI;
}
export declare class Position {
    readonly amm: AMM;
    readonly tickLower: number;
    readonly tickUpper: number;
    readonly liquidity: JSBI;
    isSettled: boolean;
    margin: JSBI;
    fixedTokenBalance: JSBI;
    variableTokenBalance: JSBI;
    constructor({ amm, liquidity, tickLower, tickUpper, isSettled, margin, fixedTokenBalance, variableTokenBalance, }: PositionConstructorArgs);
    get priceLower(): Price;
    get priceUpper(): Price;
}
export {};
//# sourceMappingURL=position.d.ts.map