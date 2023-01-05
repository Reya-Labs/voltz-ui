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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
var fraction_1 = require("./fraction");
var Price = /** @class */ (function (_super) {
    __extends(Price, _super);
    /**
     * Construct a price, either with the base and quote currency amount, or the
     * @param args
     */
    function Price() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var denominator = args[0], numerator = args[1];
        // flip them for the APR entity (fr = 1 / price)
        return _super.call(this, numerator, denominator) || this;
    }
    Price.fromNumber = function (value) {
        return _super.fromNumber.call(this, value);
    };
    /**
     * Flip the price (convert to the fixed rate)
     */
    Price.prototype.invert = function () {
        return new Price(this.numerator, this.denominator);
    };
    Price.prototype.toSignificant = function (significantDigits, format, rounding) {
        if (significantDigits === void 0) { significantDigits = 6; }
        return _super.prototype.toSignificant.call(this, significantDigits, format, rounding);
    };
    Price.prototype.toFixed = function (decimalPlaces, format) {
        if (decimalPlaces === void 0) { decimalPlaces = 4; }
        return _super.prototype.toFixed.call(this, decimalPlaces, format);
    };
    return Price;
}(fraction_1.Fraction));
exports.Price = Price;
//# sourceMappingURL=price.js.map