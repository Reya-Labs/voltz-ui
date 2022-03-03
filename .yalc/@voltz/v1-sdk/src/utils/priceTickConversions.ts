// import { Price, Token } from '@uniswap/sdk-core'
import JSBI from 'jsbi';
import { Price } from '../entities/fractions/price';
import { Q192 } from '../constants';
import { encodeSqrtRatioX96 } from './encodeSqrtRatioX96';
import { TickMath } from './tickMath';

/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
export function tickToPrice(tick: number) {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);

  const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);

  // todo: make sure the ratio is correct
  return new Price(ratioX192, Q192);
}

/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
export function priceToClosestTick(price: Price): number {
  // todo: check the logic
  const sqrtRatioX96 = encodeSqrtRatioX96(price.numerator, price.denominator);

  let tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  const nextTickPrice = tickToPrice(tick + 1);
  if (!price.greaterThan(nextTickPrice)) {
    tick++;
  }
  return tick;
}
