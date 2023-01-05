"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var fraction_1 = __importDefault(require("./fraction"));
var ONE_HUNDRED = new fraction_1.default(jsbi_1.default.BigInt(100));
/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */
function toPercent(fraction) {
    return new Percent(fraction.numerator, fraction.denominator);
}
var Percent = /** @class */ (function (_super) {
    __extends(Percent, _super);
    function Percent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * This boolean prevents a fraction from being interpreted as a Percent
         */
        _this.isPercent = true;
        return _this;
    }
    Percent.prototype.add = function (other) {
        return toPercent(_super.prototype.add.call(this, other));
    };
    Percent.prototype.subtract = function (other) {
        return toPercent(_super.prototype.subtract.call(this, other));
    };
    Percent.prototype.multiply = function (other) {
        return toPercent(_super.prototype.multiply.call(this, other));
    };
    Percent.prototype.divide = function (other) {
        return toPercent(_super.prototype.divide.call(this, other));
    };
    Percent.prototype.toSignificant = function (significantDigits, format, rounding) {
        if (significantDigits === void 0) { significantDigits = 5; }
        return _super.prototype.multiply.call(this, ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
    };
    Percent.prototype.toFixed = function (decimalPlaces, format) {
        if (decimalPlaces === void 0) { decimalPlaces = 2; }
        return _super.prototype.multiply.call(this, ONE_HUNDRED).toFixed(decimalPlaces, format);
    };
    return Percent;
}(fraction_1.default));
exports.default = Percent;
//# sourceMappingURL=percent.js.map