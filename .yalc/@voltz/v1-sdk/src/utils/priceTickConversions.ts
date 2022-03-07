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

  // todo: make sure the ratio is correct
  return new Price(ratioX192, Q192);
}


export function priceToFixedRate(price: Price) {

  const priceNumerator = price.numerator
  const priceDenominator = price.denominator

  const priceNumeratorDivBy100 = JSBI.divide(priceNumerator, JSBI.BigInt(100)); // divide by 100 to conver 1% to 0.01

  return new Price(priceDenominator, priceNumeratorDivBy100);
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
  if (!price.greaterThan(nextTickPrice)) {
    tick++;
  }
  return tick;
}



export function fixedRateToPrice(fixedRate: Price) {
  const fixedRateNumerator = fixedRate.numerator;
  const fixedRateDenominator = fixedRate.denominator;

  const fixedRateDenominatorMulBy100 = JSBI.multiply(fixedRateDenominator, JSBI.BigInt(100));
  
  return new Price(fixedRateDenominatorMulBy100, fixedRateNumerator)

}

export function fixedRateToClosestTick(fixedRate: Price) {

  // fixed rate to price
  const price = fixedRateToPrice(fixedRate)
  // price to closest tick
  return priceToClosestTick(price)

}