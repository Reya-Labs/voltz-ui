"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqrtPriceMath = void 0;
var constants_1 = require("../constants");
var jsbi_1 = __importDefault(require("jsbi"));
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var constants_2 = require("../constants");
var fullMath_1 = require("./fullMath");
var MaxUint160 = jsbi_1.default.subtract(jsbi_1.default.exponentiate(jsbi_1.default.BigInt(2), jsbi_1.default.BigInt(160)), constants_2.ONE);
function multiplyIn256(x, y) {
    var product = jsbi_1.default.multiply(x, y);
    return jsbi_1.default.bitwiseAnd(product, constants_1.MaxUint256);
}
function addIn256(x, y) {
    var sum = jsbi_1.default.add(x, y);
    return jsbi_1.default.bitwiseAnd(sum, constants_1.MaxUint256);
}
var SqrtPriceMath = /** @class */ (function () {
    /**
     * Cannot be constructed.
     */
    function SqrtPriceMath() {
    }
    SqrtPriceMath.getAmount0Delta = function (sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
        var _a;
        if (jsbi_1.default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
            _a = [sqrtRatioBX96, sqrtRatioAX96], sqrtRatioAX96 = _a[0], sqrtRatioBX96 = _a[1];
        }
        var numerator1 = jsbi_1.default.leftShift(liquidity, jsbi_1.default.BigInt(96));
        var numerator2 = jsbi_1.default.subtract(sqrtRatioBX96, sqrtRatioAX96);
        return roundUp
            ? fullMath_1.FullMath.mulDivRoundingUp(fullMath_1.FullMath.mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96), constants_2.ONE, sqrtRatioAX96)
            : jsbi_1.default.divide(jsbi_1.default.divide(jsbi_1.default.multiply(numerator1, numerator2), sqrtRatioBX96), sqrtRatioAX96);
    };
    SqrtPriceMath.getAmount1Delta = function (sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
        var _a;
        if (jsbi_1.default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
            _a = [sqrtRatioBX96, sqrtRatioAX96], sqrtRatioAX96 = _a[0], sqrtRatioBX96 = _a[1];
        }
        return roundUp
            ? fullMath_1.FullMath.mulDivRoundingUp(liquidity, jsbi_1.default.subtract(sqrtRatioBX96, sqrtRatioAX96), constants_2.Q96)
            : jsbi_1.default.divide(jsbi_1.default.multiply(liquidity, jsbi_1.default.subtract(sqrtRatioBX96, sqrtRatioAX96)), constants_2.Q96);
    };
    SqrtPriceMath.getNextSqrtPriceFromInput = function (sqrtPX96, liquidity, amountIn, zeroForOne) {
        (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(sqrtPX96, constants_2.ZERO));
        (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(liquidity, constants_2.ZERO));
        return zeroForOne
            ? this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountIn, true)
            : this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountIn, true);
    };
    SqrtPriceMath.getNextSqrtPriceFromOutput = function (sqrtPX96, liquidity, amountOut, zeroForOne) {
        (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(sqrtPX96, constants_2.ZERO));
        (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(liquidity, constants_2.ZERO));
        return zeroForOne
            ? this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountOut, false)
            : this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountOut, false);
    };
    SqrtPriceMath.getNextSqrtPriceFromAmount0RoundingUp = function (sqrtPX96, liquidity, amount, add) {
        if (jsbi_1.default.equal(amount, constants_2.ZERO))
            return sqrtPX96;
        var numerator1 = jsbi_1.default.leftShift(liquidity, jsbi_1.default.BigInt(96));
        if (add) {
            var product = multiplyIn256(amount, sqrtPX96);
            if (jsbi_1.default.equal(jsbi_1.default.divide(product, amount), sqrtPX96)) {
                var denominator = addIn256(numerator1, product);
                if (jsbi_1.default.greaterThanOrEqual(denominator, numerator1)) {
                    return fullMath_1.FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator);
                }
            }
            return fullMath_1.FullMath.mulDivRoundingUp(numerator1, constants_2.ONE, jsbi_1.default.add(jsbi_1.default.divide(numerator1, sqrtPX96), amount));
        }
        else {
            var product = multiplyIn256(amount, sqrtPX96);
            (0, tiny_invariant_1.default)(jsbi_1.default.equal(jsbi_1.default.divide(product, amount), sqrtPX96));
            (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(numerator1, product));
            var denominator = jsbi_1.default.subtract(numerator1, product);
            return fullMath_1.FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator);
        }
    };
    SqrtPriceMath.getNextSqrtPriceFromAmount1RoundingDown = function (sqrtPX96, liquidity, amount, add) {
        if (add) {
            var quotient = jsbi_1.default.lessThanOrEqual(amount, MaxUint160)
                ? jsbi_1.default.divide(jsbi_1.default.leftShift(amount, jsbi_1.default.BigInt(96)), liquidity)
                : jsbi_1.default.divide(jsbi_1.default.multiply(amount, constants_2.Q96), liquidity);
            return jsbi_1.default.add(sqrtPX96, quotient);
        }
        else {
            var quotient = fullMath_1.FullMath.mulDivRoundingUp(amount, constants_2.Q96, liquidity);
            (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(sqrtPX96, quotient));
            return jsbi_1.default.subtract(sqrtPX96, quotient);
        }
    };
    return SqrtPriceMath;
}());
exports.SqrtPriceMath = SqrtPriceMath;
