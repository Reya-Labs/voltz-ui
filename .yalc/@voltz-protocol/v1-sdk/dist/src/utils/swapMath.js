"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapMath = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var constants_1 = require("../constants");
var sqrtPriceMath_1 = require("./sqrtPriceMath");
var MAX_FEE = jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(6));
var SwapMath = /** @class */ (function () {
    /**
     * Cannot be constructed.
     */
    function SwapMath() {
    }
    SwapMath.computeSwapStep = function (sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, amountRemaining, feePercentage, timeToMaturityInSeconds) {
        var sqrtRatioNextX96 = jsbi_1.default.BigInt(0);
        var amountIn = jsbi_1.default.BigInt(0);
        var amountOut = jsbi_1.default.BigInt(0);
        var feeAmount = jsbi_1.default.BigInt(0);
        var zeroForOne = jsbi_1.default.greaterThanOrEqual(sqrtRatioCurrentX96, sqrtRatioTargetX96);
        var exactIn = jsbi_1.default.greaterThanOrEqual(amountRemaining, constants_1.ZERO);
        if (exactIn) {
            amountIn = zeroForOne
                ? sqrtPriceMath_1.SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, true)
                : sqrtPriceMath_1.SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, true);
            if (jsbi_1.default.greaterThanOrEqual(amountRemaining, amountIn)) {
                sqrtRatioNextX96 = sqrtRatioTargetX96;
            }
            else {
                sqrtRatioNextX96 = sqrtPriceMath_1.SqrtPriceMath.getNextSqrtPriceFromInput(sqrtRatioCurrentX96, liquidity, amountRemaining, zeroForOne);
            }
        }
        else {
            amountOut = zeroForOne
                ? sqrtPriceMath_1.SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, false)
                : sqrtPriceMath_1.SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, false);
            if (jsbi_1.default.greaterThanOrEqual(jsbi_1.default.multiply(amountRemaining, constants_1.NEGATIVE_ONE), amountOut)) {
                sqrtRatioNextX96 = sqrtRatioTargetX96;
            }
            else {
                sqrtRatioNextX96 = sqrtPriceMath_1.SqrtPriceMath.getNextSqrtPriceFromOutput(sqrtRatioCurrentX96, liquidity, jsbi_1.default.multiply(amountRemaining, constants_1.NEGATIVE_ONE), zeroForOne);
            }
        }
        var max = jsbi_1.default.equal(sqrtRatioTargetX96, sqrtRatioNextX96);
        var notional;
        if (zeroForOne) {
            amountIn =
                max && exactIn
                    ? amountIn
                    : sqrtPriceMath_1.SqrtPriceMath.getAmount0Delta(sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, true);
            amountOut =
                max && !exactIn
                    ? amountOut
                    : sqrtPriceMath_1.SqrtPriceMath.getAmount1Delta(sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, false);
            // variable taker
            notional = amountOut;
        }
        else {
            amountIn =
                max && exactIn
                    ? amountIn
                    : sqrtPriceMath_1.SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioNextX96, liquidity, true);
            amountOut =
                max && !exactIn
                    ? amountOut
                    : sqrtPriceMath_1.SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioNextX96, liquidity, false);
            // variable taker
            notional = amountIn;
        }
        if (!exactIn && jsbi_1.default.greaterThan(amountOut, jsbi_1.default.multiply(amountRemaining, constants_1.NEGATIVE_ONE))) {
            amountOut = jsbi_1.default.multiply(amountRemaining, constants_1.NEGATIVE_ONE);
        }
        feeAmount = jsbi_1.default.multiply(jsbi_1.default.multiply(notional, feePercentage), timeToMaturityInSeconds);
        return [sqrtRatioNextX96, amountIn, amountOut, feeAmount];
    };
    return SwapMath;
}());
exports.SwapMath = SwapMath;
