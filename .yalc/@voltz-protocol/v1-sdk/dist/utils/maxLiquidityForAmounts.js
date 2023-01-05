"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxLiquidityForAmounts = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var constants_1 = require("../constants");
/**
 * Returns an imprecise maximum amount of liquidity received for a given amount of token 0.
 * This function is available to accommodate LiquidityAmounts#getLiquidityForAmount0 in the v3 periphery,
 * which could be more precise by at least 32 bits by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits. This imprecise calculation will likely be replaced in a future
 * v3 router contract.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, imprecise
 */
function maxLiquidityForAmount0Imprecise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
    var _a;
    if (jsbi_1.default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
        // eslint-disable-next-line no-param-reassign
        _a = [sqrtRatioBX96, sqrtRatioAX96], sqrtRatioAX96 = _a[0], sqrtRatioBX96 = _a[1];
    }
    var intermediate = jsbi_1.default.divide(jsbi_1.default.multiply(sqrtRatioAX96, sqrtRatioBX96), constants_1.Q96);
    return jsbi_1.default.divide(jsbi_1.default.multiply(jsbi_1.default.BigInt(amount0), intermediate), jsbi_1.default.subtract(sqrtRatioBX96, sqrtRatioAX96));
}
/**
 * Returns a precise maximum amount of liquidity received for a given amount of token 0 by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, precise
 */
function maxLiquidityForAmount0Precise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
    var _a;
    if (jsbi_1.default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
        // eslint-disable-next-line no-param-reassign
        _a = [sqrtRatioBX96, sqrtRatioAX96], sqrtRatioAX96 = _a[0], sqrtRatioBX96 = _a[1];
    }
    var numerator = jsbi_1.default.multiply(jsbi_1.default.multiply(jsbi_1.default.BigInt(amount0), sqrtRatioAX96), sqrtRatioBX96);
    var denominator = jsbi_1.default.multiply(constants_1.Q96, jsbi_1.default.subtract(sqrtRatioBX96, sqrtRatioAX96));
    return jsbi_1.default.divide(numerator, denominator);
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token1
 * @param sqrtRatioAX96 The price at the lower tick boundary
 * @param sqrtRatioBX96 The price at the upper tick boundary
 * @param amount1 The token1 amount
 * @returns liquidity for amount1
 */
function maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1) {
    var _a;
    if (jsbi_1.default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
        // eslint-disable-next-line no-param-reassign
        _a = [sqrtRatioBX96, sqrtRatioAX96], sqrtRatioAX96 = _a[0], sqrtRatioBX96 = _a[1];
    }
    return jsbi_1.default.divide(jsbi_1.default.multiply(jsbi_1.default.BigInt(amount1), constants_1.Q96), jsbi_1.default.subtract(sqrtRatioBX96, sqrtRatioAX96));
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token0, token1,
 * and the prices at the tick boundaries.
 * @param sqrtRatioCurrentX96 the current price
 * @param sqrtRatioAX96 price at lower boundary
 * @param sqrtRatioBX96 price at upper boundary
 * @param amount0 token0 amount
 * @param amount1 token1 amount
 * @param useFullPrecision if false, liquidity will be maximized according to what the router can calculate,
 * not what core can theoretically support
 */
function maxLiquidityForAmounts(sqrtRatioCurrentX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision) {
    var _a;
    if (jsbi_1.default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
        // eslint-disable-next-line no-param-reassign
        _a = [sqrtRatioBX96, sqrtRatioAX96], sqrtRatioAX96 = _a[0], sqrtRatioBX96 = _a[1];
    }
    var maxLiquidityForAmount0 = useFullPrecision
        ? maxLiquidityForAmount0Precise
        : maxLiquidityForAmount0Imprecise;
    if (jsbi_1.default.lessThanOrEqual(sqrtRatioCurrentX96, sqrtRatioAX96)) {
        return maxLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amount0);
    }
    if (jsbi_1.default.lessThan(sqrtRatioCurrentX96, sqrtRatioBX96)) {
        var liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX96, sqrtRatioBX96, amount0);
        var liquidity1 = maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioCurrentX96, amount1);
        return jsbi_1.default.lessThan(liquidity0, liquidity1) ? liquidity0 : liquidity1;
    }
    return maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1);
}
exports.maxLiquidityForAmounts = maxLiquidityForAmounts;
//# sourceMappingURL=maxLiquidityForAmounts.js.map