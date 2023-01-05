"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityMath = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var constants_1 = require("../constants");
var LiquidityMath = /** @class */ (function () {
    /**
     * Cannot be constructed.
     */
    function LiquidityMath() {
    }
    LiquidityMath.addDelta = function (x, y) {
        if (jsbi_1.default.lessThan(y, constants_1.ZERO)) {
            return jsbi_1.default.subtract(x, jsbi_1.default.multiply(y, constants_1.NEGATIVE_ONE));
        }
        return jsbi_1.default.add(x, y);
    };
    return LiquidityMath;
}());
exports.LiquidityMath = LiquidityMath;
//# sourceMappingURL=liquidityMath.js.map