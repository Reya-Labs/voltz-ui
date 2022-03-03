import { BigintIsh, Rounding } from '../../types';
import { Fraction } from './fraction';
export declare class Price extends Fraction {
    /**
     * Construct a price, either with the base and quote currency amount, or the
     * @param args
     */
    constructor(...args: [BigintIsh, BigintIsh]);
    /**
     * Flip the price (convert to the fixed rate)
     */
    invert(): Price;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
}
//# sourceMappingURL=price.d.ts.map