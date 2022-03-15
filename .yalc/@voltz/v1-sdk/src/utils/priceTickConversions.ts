// import { Price, Token } from '@uniswap/sdk-core'
import JSBI from 'jsbi';
import { Price } from '../entities/fractions/price';
import { Q192 } from '../constants';
import { encodeSqrtRatioX96 } from './encodeSqrtRatioX96';
import { TickMath } from './tickMath';

/**
 * Returns a price object corresponding to the input tick
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
export function tickToPrice(tick: number) {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);

  const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);

  return new Price(Q192, ratioX192);
}


export function priceToFixedRate(price: Price) {
  return new Price(price.numerator, price.denominator);
}

/**
 * Returns a price object corresponding to the input tick, the price object represents the fixed rate in percentage point (e.g. 1.2 corresponds to 1.2% --> 0.012) 
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
export function tickToFixedRate(tick: number) {
  
  const price: Price = tickToPrice(tick)

  return priceToFixedRate(price)
}

/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
export function priceToClosestTick(price: Price): number {
  const sqrtRatioX96 = encodeSqrtRatioX96(price.numerator, price.denominator);

  let tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);

  const nextTickPrice = tickToPrice(tick + 1);

  // this solution is a bit hacky, can be optimised
  if (tick < 0) {
    if (!price.lessThan(nextTickPrice)) {
      tick++;
    }
  }

  return tick;
}



export function fixedRateToPrice(fixedRate: Price) {
  // the fixed rate is the reciprocal of the price
  // NOTE: below the first argument to the Price constructor is the denominator and the second argument is the numerator 
  return new Price(fixedRate.numerator, fixedRate.denominator)
}

export function fixedRateToClosestTick(fixedRate: Price) {

  // fixed rate to price
  const price = fixedRateToPrice(fixedRate)
  // price to closest tick
  return priceToClosestTick(price)

}