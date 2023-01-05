import { BigIntish, Rounding } from '../../types';
import { Fraction } from './fraction';
export declare class Price extends Fraction {
    /**
     * Construct a price, either with the base and quote currency amount, or the
     * @param args
     */
    constructor(...args: [BigIntish, BigIntish]);
    static fromNumber(value: number): Price;
    /**
     * Flip the price (convert to the fixed rate)
     */
    invert(): Price;
    toSignificant(significantDigits?: number, format?: {
        groupSeparator: string;
    }, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: {
        groupSeparator: string;
    }): string;
}
//# sourceMappingURL=price.d.ts.map