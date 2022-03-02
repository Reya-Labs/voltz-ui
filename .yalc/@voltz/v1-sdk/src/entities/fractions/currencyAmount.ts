import invariant from 'tiny-invariant'
import JSBI from 'jsbi'
import { Token } from '../token'
import { Fraction } from "./fraction"
import _Big from 'big.js'
import { BigintIsh, Rounding, MaxUint256 } from '../../constants'

const toFormat = require("toformat")
const Big = toFormat(_Big)

export class CurrencyAmount<T extends Token> extends Fraction {
  public readonly token: T
  public readonly decimalScale: JSBI

  /**
   * Returns a new Token amount instance from the unitless amount of token, i.e. the raw amount
   * @param token the token in the amount
   * @param rawAmount the raw token or ether amount
   */
  public static fromRawAmount<T extends Token>(token: T, rawAmount: BigintIsh): CurrencyAmount<T> {
    return new CurrencyAmount(token, rawAmount)
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
    denominator: BigintIsh
  ): CurrencyAmount<T> {
    return new CurrencyAmount(token, numerator, denominator)
  }

  protected constructor(token: T, numerator: BigintIsh, denominator?: BigintIsh) {
    super(numerator, denominator)
    invariant(JSBI.lessThanOrEqual(this.quotient, MaxUint256), 'AMOUNT')
    this.token = token
    this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(token.decimals))
  }

  public add(other: CurrencyAmount<T>): CurrencyAmount<T> {
    invariant(this.token.equals(other.token), 'token')
    const added = super.add(other)
    return CurrencyAmount.fromFractionalAmount(this.token, added.numerator, added.denominator)
  }

  public subtract(other: CurrencyAmount<T>): CurrencyAmount<T> {
    invariant(this.token.equals(other.token), 'token')
    const subtracted = super.subtract(other)
    return CurrencyAmount.fromFractionalAmount(this.token, subtracted.numerator, subtracted.denominator)
  }

  public multiply(other: Fraction | BigintIsh): CurrencyAmount<T> {
    const multiplied = super.multiply(other)
    return CurrencyAmount.fromFractionalAmount(this.token, multiplied.numerator, multiplied.denominator)
  }

  public divide(other: Fraction | BigintIsh): CurrencyAmount<T> {
    const divided = super.divide(other)
    return CurrencyAmount.fromFractionalAmount(this.token, divided.numerator, divided.denominator)
  }

  public toSignificant(
    significantDigits: number = 6,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    return super.divide(this.decimalScale).toSignificant(significantDigits, format, rounding)
  }

  public toFixed(
    decimalPlaces: number = this.token.decimals,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    invariant(decimalPlaces <= this.token.decimals, 'DECIMALS')
    return super.divide(this.decimalScale).toFixed(decimalPlaces, format, rounding)
  }

  public toExact(format: object = { groupSeparator: '' }): string {
    Big.DP = this.token.decimals
    return new Big(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format)
  }

}