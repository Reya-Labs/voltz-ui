"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceToClosestTick = exports.tickToPrice = void 0;
// import { Price, Token } from '@uniswap/sdk-core'
var jsbi_1 = __importDefault(require("jsbi"));
var price_1 = require("../entities/fractions/price");
var constants_1 = require("../constants");
var encodeSqrtRatioX96_1 = require("./encodeSqrtRatioX96");
var tickMath_1 = require("./tickMath");
/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
function tickToPrice(tick) {
    var sqrtRatioX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tick);
    var ratioX192 = jsbi_1.default.multiply(sqrtRatioX96, sqrtRatioX96);
    // todo: make sure the ratio is correct
    return new price_1.Price(ratioX192, constants_1.Q192);
}
exports.tickToPrice = tickToPrice;
/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
function priceToClosestTick(price) {
    // todo: check the logic
    var sqrtRatioX96 = (0, encodeSqrtRatioX96_1.encodeSqrtRatioX96)(price.numerator, price.denominator);
    var tick = tickMath_1.TickMath.getTickAtSqrtRatio(sqrtRatioX96);
    var nextTickPrice = tickToPrice(tick + 1);
    if (!price.greaterThan(nextTickPrice)) {
        tick++;
    }
    return tick;
}
exports.priceToClosestTick = priceToClosestTick;
