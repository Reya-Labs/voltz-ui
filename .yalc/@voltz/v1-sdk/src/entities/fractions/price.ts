import { BigIntish, Rounding } from '../../types';
import { Fraction } from './fraction';

export class Price extends Fraction {
  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  public constructor(...args: [BigIntish, BigIntish]) {
    let denominator: BigIntish, numerator: BigIntish;
    [denominator, numerator] = args;
    // flip them for the APR entity (fr = 1 / price)
    super(numerator, denominator);
  }

  public static fromNumber(value: number): Price {
    return super.fromNumber(value) as Price;
  }

  /**
   * Flip the price (convert to the fixed rate)
   */
  public invert() {
    return new Price(this.numerator, this.denominator);
  }

  public toSignificant(
    significantDigits: number = 6,
    format?: object,
    rounding?: Rounding,
  ): string {
    return super.toSignificant(significantDigits, format, rounding);
  }

  public toFixed(decimalPlaces: number = 4, format?: object, rounding?: Rounding): string {
    return super.toFixed(decimalPlaces, format, rounding);
  }
}
