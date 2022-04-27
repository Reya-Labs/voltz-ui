import { BigIntish, Rounding } from '../../types';
import Fraction from './fraction';
declare class Percent extends Fraction {
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */
    readonly isPercent: true;
    add(other: Fraction | BigIntish): Percent;
    subtract(other: Fraction | BigIntish): Percent;
    multiply(other: Fraction | BigIntish): Percent;
    divide(other: Fraction | BigIntish): Percent;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
}
export default Percent;
//# sourceMappingURL=percent.d.ts.map