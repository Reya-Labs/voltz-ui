"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostSignificantBit = void 0;
var constants_1 = require("../constants");
var jsbi_1 = __importDefault(require("jsbi"));
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var constants_2 = require("../constants");
var TWO = jsbi_1.default.BigInt(2);
var POWERS_OF_2 = [128, 64, 32, 16, 8, 4, 2, 1].map(function (pow) { return [
    pow,
    jsbi_1.default.exponentiate(TWO, jsbi_1.default.BigInt(pow)),
]; });
function mostSignificantBit(x) {
    (0, tiny_invariant_1.default)(jsbi_1.default.greaterThan(x, constants_2.ZERO), 'ZERO');
    (0, tiny_invariant_1.default)(jsbi_1.default.lessThanOrEqual(x, constants_1.MaxUint256), 'MAX');
    var msb = 0;
    for (var _i = 0, POWERS_OF_2_1 = POWERS_OF_2; _i < POWERS_OF_2_1.length; _i++) {
        var _a = POWERS_OF_2_1[_i], power = _a[0], min = _a[1];
        if (jsbi_1.default.greaterThanOrEqual(x, min)) {
            x = jsbi_1.default.signedRightShift(x, jsbi_1.default.BigInt(power));
            msb += power;
        }
    }
    return msb;
}
exports.mostSignificantBit = mostSignificantBit;
