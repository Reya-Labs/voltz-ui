"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSqrtRatioX96 = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var sqrt_1 = require("./sqrt");
/**
 * Returns the sqrt ratio as a Q64.96 corresponding to a given ratio of amount1 and amount0
 * @param amount1 The numerator amount i.e., the amount of token1
 * @param amount0 The denominator amount i.e., the amount of token0
 * @returns The sqrt ratio
 */
function encodeSqrtRatioX96(amount1, amount0) {
    var numerator = jsbi_1.default.leftShift(jsbi_1.default.BigInt(amount1), jsbi_1.default.BigInt(192));
    var denominator = jsbi_1.default.BigInt(amount0);
    var ratioX192 = jsbi_1.default.divide(numerator, denominator);
    return (0, sqrt_1.sqrt)(ratioX192);
}
exports.encodeSqrtRatioX96 = encodeSqrtRatioX96;
//# sourceMappingURL=encodeSqrtRatioX96.js.map