"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqrt = exports.MAX_SAFE_INTEGER = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
exports.MAX_SAFE_INTEGER = jsbi_1.default.BigInt(Number.MAX_SAFE_INTEGER);
var ZERO = jsbi_1.default.BigInt(0);
var ONE = jsbi_1.default.BigInt(1);
var TWO = jsbi_1.default.BigInt(2);
/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */
function sqrt(value) {
    (0, tiny_invariant_1.default)(jsbi_1.default.greaterThanOrEqual(value, ZERO), 'NEGATIVE');
    // rely on built in sqrt if possible
    if (jsbi_1.default.lessThan(value, exports.MAX_SAFE_INTEGER)) {
        return jsbi_1.default.BigInt(Math.floor(Math.sqrt(jsbi_1.default.toNumber(value))));
    }
    var z;
    var x;
    z = value;
    x = jsbi_1.default.add(jsbi_1.default.divide(value, TWO), ONE);
    while (jsbi_1.default.lessThan(x, z)) {
        z = x;
        x = jsbi_1.default.divide(jsbi_1.default.add(jsbi_1.default.divide(value, x), x), TWO);
    }
    return z;
}
exports.sqrt = sqrt;
//# sourceMappingURL=sqrt.js.map