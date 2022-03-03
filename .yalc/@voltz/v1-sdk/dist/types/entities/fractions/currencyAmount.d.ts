import JSBI from 'jsbi';
import { Token } from '../token';
import { Fraction } from "./fraction";
import { BigintIsh, Rounding } from '../../constants';
export declare class CurrencyAmount<T extends Token> extends Fraction {
    readonly token: T;
    readonly decimalScale: JSBI;
    /**
     * Returns a new Token amount instance from the unitless amount of token, i.e. the raw amount
     * @param token the token in the amount
     * @param rawAmount the raw token or ether amount
     */
    static fromRawAmount<T extends Token>(token: T, rawAmount: BigintIsh): CurrencyAmount<T>;
    /**
     * Construct a token amount with a denominator that is not equal to 1
     * @param token the token
     * @param numerator the numerator of the fractional token amount
     * @param denominator the denominator of the fractional token amount
     */
    static fromFractionalAmount<T extends Token>(token: T, numerator: BigintIsh, denominator: BigintIsh): CurrencyAmount<T>;
    protected constructor(token: T, numerator: BigintIsh, denominator?: BigintIsh);
    add(other: CurrencyAmount<T>): CurrencyAmount<T>;
    subtract(other: CurrencyAmount<T>): CurrencyAmount<T>;
    multiply(other: Fraction | BigintIsh): CurrencyAmount<T>;
    divide(other: Fraction | BigintIsh): CurrencyAmount<T>;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
    toExact(format?: object): string;
}
//# sourceMappingURL=currencyAmount.d.ts.map