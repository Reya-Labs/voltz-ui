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
exports.CurrencyAmount = void 0;
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var jsbi_1 = __importDefault(require("jsbi"));
var fraction_1 = require("./fraction");
var big_js_1 = __importDefault(require("big.js"));
var constants_1 = require("../../constants");
var toFormat = require("toformat");
var Big = toFormat(big_js_1.default);
var CurrencyAmount = /** @class */ (function (_super) {
    __extends(CurrencyAmount, _super);
    function CurrencyAmount(token, numerator, denominator) {
        var _this = _super.call(this, numerator, denominator) || this;
        (0, tiny_invariant_1.default)(jsbi_1.default.lessThanOrEqual(_this.quotient, constants_1.MaxUint256), 'AMOUNT');
        _this.token = token;
        _this.decimalScale = jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(token.decimals));
        return _this;
    }
    /**
     * Returns a new Token amount instance from the unitless amount of token, i.e. the raw amount
     * @param token the token in the amount
     * @param rawAmount the raw token or ether amount
     */
    CurrencyAmount.fromRawAmount = function (token, rawAmount) {
        return new CurrencyAmount(token, rawAmount);
    };
    /**
     * Construct a token amount with a denominator that is not equal to 1
     * @param token the token
     * @param numerator the numerator of the fractional token amount
     * @param denominator the denominator of the fractional token amount
     */
    CurrencyAmount.fromFractionalAmount = function (token, numerator, denominator) {
        return new CurrencyAmount(token, numerator, denominator);
    };
    CurrencyAmount.prototype.add = function (other) {
        (0, tiny_invariant_1.default)(this.token.equals(other.token), 'token');
        var added = _super.prototype.add.call(this, other);
        return CurrencyAmount.fromFractionalAmount(this.token, added.numerator, added.denominator);
    };
    CurrencyAmount.prototype.subtract = function (other) {
        (0, tiny_invariant_1.default)(this.token.equals(other.token), 'token');
        var subtracted = _super.prototype.subtract.call(this, other);
        return CurrencyAmount.fromFractionalAmount(this.token, subtracted.numerator, subtracted.denominator);
    };
    CurrencyAmount.prototype.multiply = function (other) {
        var multiplied = _super.prototype.multiply.call(this, other);
        return CurrencyAmount.fromFractionalAmount(this.token, multiplied.numerator, multiplied.denominator);
    };
    CurrencyAmount.prototype.divide = function (other) {
        var divided = _super.prototype.divide.call(this, other);
        return CurrencyAmount.fromFractionalAmount(this.token, divided.numerator, divided.denominator);
    };
    CurrencyAmount.prototype.toSignificant = function (significantDigits, format, rounding) {
        if (significantDigits === void 0) { significantDigits = 6; }
        if (rounding === void 0) { rounding = constants_1.Rounding.ROUND_DOWN; }
        return _super.prototype.divide.call(this, this.decimalScale).toSignificant(significantDigits, format, rounding);
    };
    CurrencyAmount.prototype.toFixed = function (decimalPlaces, format, rounding) {
        if (decimalPlaces === void 0) { decimalPlaces = this.token.decimals; }
        if (rounding === void 0) { rounding = constants_1.Rounding.ROUND_DOWN; }
        (0, tiny_invariant_1.default)(decimalPlaces <= this.token.decimals, 'DECIMALS');
        return _super.prototype.divide.call(this, this.decimalScale).toFixed(decimalPlaces, format, rounding);
    };
    CurrencyAmount.prototype.toExact = function (format) {
        if (format === void 0) { format = { groupSeparator: '' }; }
        Big.DP = this.token.decimals;
        return new Big(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format);
    };
    return CurrencyAmount;
}(fraction_1.Fraction));
exports.CurrencyAmount = CurrencyAmount;
