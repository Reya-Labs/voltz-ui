"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullMath = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var constants_1 = require("../constants");
var FullMath = /** @class */ (function () {
    /**
     * Cannot be constructed.
     */
    function FullMath() {
    }
    FullMath.mulDivRoundingUp = function (a, b, denominator) {
        var product = jsbi_1.default.multiply(a, b);
        var result = jsbi_1.default.divide(product, denominator);
        if (jsbi_1.default.notEqual(jsbi_1.default.remainder(product, denominator), constants_1.ZERO))
            result = jsbi_1.default.add(result, constants_1.ONE);
        return result;
    };
    return FullMath;
}());
exports.FullMath = FullMath;
//# sourceMappingURL=fullMath.js.map