import invariant from 'tiny-invariant';
import JSBI from 'jsbi';
import Token from '../token';
import { BigintIsh, MaxUint256 } from '../../constants';
import { Fraction } from './fraction';

export class TokenAmount<T extends Token> extends Fraction {
  public readonly token: T;

  public readonly decimalScale: JSBI;

  /**
   * Returns a new token amount instance from the unitless amount of token, i.e. the raw amount
   * @param token the token in the amount
   * @param rawAmount the raw token or ether amount
   */
  public static fromRawAmount<T extends Token>(token: T, rawAmount: BigintIsh): TokenAmount<T> {
    return new TokenAmount(token, rawAmount);
  }

  /**
   * Construct a token amount with a denominator that is not equal to 1
   * @param token the token
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */
  public static fromFractionalAmount<T extends Token>(
    token: T,
    numerator: BigintIsh,
    denominator: BigintIsh,
  ): TokenAmount<T> {
    return new TokenAmount(token, numerator, denominator);
  }

  protected constructor(token: T, numerator: BigintIsh, denominator?: BigintIsh) {
    super(numerator, denominator);
    invariant(JSBI.lessThanOrEqual(this.quotient, MaxUint256), 'AMOUNT');
    this.token = token;
    this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(token.decimals));
  }

  public scale(decimalPlaces: number = this.token.decimals): string {
    invariant(decimalPlaces <= this.token.decimals, 'DECIMALS');
    return super.multiply(this.decimalScale).quotient.toString();
  }
}
