import JSBI from 'jsbi';
import invariant from 'tiny-invariant';
import toFormat from 'toformat';
import Fractionjs from 'fraction.js';
import _Decimal from 'decimal.js-light';
import _Big from 'big.js';

import { BigIntish, Rounding } from '../../types';

const Decimal = toFormat(_Decimal);
const Big = toFormat(_Big);

const toSignificantRounding = {
  [Rounding.ROUND_DOWN]: Decimal.ROUND_DOWN,
  [Rounding.ROUND_HALF_UP]: Decimal.ROUND_HALF_UP,
  [Rounding.ROUND_UP]: Decimal.ROUND_UP,
};

export class Fraction {
  public readonly numerator: JSBI;

  public readonly denominator: JSBI;

  public constructor(numerator: BigIntish, denominator: BigIntish = JSBI.BigInt(1)) {
    this.numerator = JSBI.BigInt(numerator);
    this.denominator = JSBI.BigInt(denominator);
  }

  public static fromNumber(value: number | string) {
    const fraction = new Fractionjs(value);
    return new Fraction(fraction.n * fraction.s, fraction.d);
  }

  private static tryParseFraction(fractionish: BigIntish | Fraction): Fraction {
    if (
      fractionish instanceof JSBI ||
      typeof fractionish === 'number' ||
      typeof fractionish === 'string'
    )
      return new Fraction(fractionish);

    if ('numerator' in fractionish && 'denominator' in fractionish) return fractionish;
    throw new Error('Could not parse fraction');
  }

  // performs floor division
  public get quotient(): JSBI {
    return JSBI.divide(this.numerator, this.denominator);
  }

  // remainder after floor division
  public get remainder(): Fraction {
    return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
  }

  public invert(): Fraction {
    return new Fraction(this.denominator, this.numerator);
  }

  public add(other: Fraction | BigIntish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(
      JSBI.add(
        JSBI.multiply(this.numerator, otherParsed.denominator),
        JSBI.multiply(otherParsed.numerator, this.denominator),
      ),
      JSBI.multiply(this.denominator, otherParsed.denominator),
    );
  }

  public subtract(other: Fraction | BigIntish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(
      JSBI.subtract(
        JSBI.multiply(this.numerator, otherParsed.denominator),
        JSBI.multiply(otherParsed.numerator, this.denominator),
      ),
      JSBI.multiply(this.denominator, otherParsed.denominator),
    );
  }

  public lessThan(other: Fraction | BigIntish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return JSBI.lessThan(
      JSBI.multiply(this.numerator, otherParsed.denominator),
      JSBI.multiply(otherParsed.numerator, this.denominator),
    );
  }

  public equalTo(other: Fraction | BigIntish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return JSBI.equal(
      JSBI.multiply(this.numerator, otherParsed.denominator),
      JSBI.multiply(otherParsed.numerator, this.denominator),
    );
  }

  public greaterThan(other: Fraction | BigIntish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return JSBI.greaterThan(
      JSBI.multiply(this.numerator, otherParsed.denominator),
      JSBI.multiply(otherParsed.numerator, this.denominator),
    );
  }

  public multiply(other: Fraction | BigIntish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      JSBI.multiply(this.numerator, otherParsed.numerator),
      JSBI.multiply(this.denominator, otherParsed.denominator),
    );
  }

  public divide(other: Fraction | BigIntish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      JSBI.multiply(this.numerator, otherParsed.denominator),
      JSBI.multiply(this.denominator, otherParsed.numerator),
    );
  }

  public toSignificant(
    significantDigits: number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    format: object = { groupSeparator: '' },
    rounding: Rounding = Rounding.ROUND_HALF_UP,
  ): string {
    invariant(Number.isInteger(significantDigits), `${significantDigits} is not an integer.`);
    invariant(significantDigits > 0, `${significantDigits} is not positive.`);

    Decimal.set({ precision: significantDigits + 1, rounding: toSignificantRounding[rounding] });
    const quotient = new Decimal(this.numerator.toString())
      .div(this.denominator.toString())
      .toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  }

  public toFixed(
    decimalPlaces: number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    format: object = { groupSeparator: '' },
  ): string {
    invariant(Number.isInteger(decimalPlaces), `${decimalPlaces} is not an integer.`);
    invariant(decimalPlaces >= 0, `${decimalPlaces} is negative.`);

    Big.DP = decimalPlaces;
    return new Big(this.numerator.toString())
      .div(this.denominator.toString())
      .toFormat(decimalPlaces, format);
  }

  public toNumber(): number {
    return parseFloat(this.toFixed(3));
  }

  /**
   * Helper method for converting any super class back to a fraction
   */
  public get asFraction(): Fraction {
    return new Fraction(this.numerator, this.denominator);
  }
}

export default Fraction;
