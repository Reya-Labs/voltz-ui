import JSBI from 'jsbi';
import { BigIntish, Rounding } from '../../types';
export declare class Fraction {
    readonly numerator: JSBI;
    readonly denominator: JSBI;
    constructor(numerator: BigIntish, denominator?: BigIntish);
    static fromNumber(value: number): Fraction;
    private static tryParseFraction;
    get quotient(): JSBI;
    get remainder(): Fraction;
    invert(): Fraction;
    add(other: Fraction | BigIntish): Fraction;
    subtract(other: Fraction | BigIntish): Fraction;
    lessThan(other: Fraction | BigIntish): boolean;
    equalTo(other: Fraction | BigIntish): boolean;
    greaterThan(other: Fraction | BigIntish): boolean;
    multiply(other: Fraction | BigIntish): Fraction;
    divide(other: Fraction | BigIntish): Fraction;
    toSignificant(significantDigits: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces: number, format?: object, rounding?: Rounding): string;
    /**
     * Helper method for converting any super class back to a fraction
     */
    get asFraction(): Fraction;
}
export default Fraction;
//# sourceMappingURL=fraction.d.ts.map