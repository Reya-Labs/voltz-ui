import { Price } from '../entities/fractions/price';
/**
 * Returns a price object corresponding to the input tick
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
export declare function tickToPrice(tick: number): Price;
export declare function priceToFixedRate(price: Price): Price;
/**
 * Returns a price object corresponding to the input tick, the price object represents the fixed rate in percentage point (e.g. 1.2 corresponds to 1.2% --> 0.012)
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
export declare function tickToFixedRate(tick: number): Price;
/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
export declare function priceToClosestTick(price: Price): number;
export declare function fixedRateToPrice(fixedRate: Price): Price;
export declare function fixedRateToClosestTick(fixedRate: Price): number;
//# sourceMappingURL=priceTickConversions.d.ts.map