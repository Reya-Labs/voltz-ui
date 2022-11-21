import JSBI from 'jsbi';

import { BigIntish, Rounding } from '../../types';
import Fraction from './fraction';

const ONE_HUNDRED = new Fraction(JSBI.BigInt(100));

/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */
function toPercent(fraction: Fraction): Percent {
  return new Percent(fraction.numerator, fraction.denominator);
}

class Percent extends Fraction {
  /**
   * This boolean prevents a fraction from being interpreted as a Percent
   */
  public readonly isPercent: true = true;

  add(other: Fraction | BigIntish): Percent {
    return toPercent(super.add(other));
  }

  subtract(other: Fraction | BigIntish): Percent {
    return toPercent(super.subtract(other));
  }

  multiply(other: Fraction | BigIntish): Percent {
    return toPercent(super.multiply(other));
  }

  divide(other: Fraction | BigIntish): Percent {
    return toPercent(super.divide(other));
  }

  public toSignificant(
    significantDigits: number = 5,
    format?: object,
    rounding?: Rounding,
  ): string {
    return super.multiply(ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
  }

  public toFixed(decimalPlaces: number = 2, format?: object, rounding?: Rounding): string {
    return super.multiply(ONE_HUNDRED).toFixed(decimalPlaces, format);
  }
}

export default Percent;
