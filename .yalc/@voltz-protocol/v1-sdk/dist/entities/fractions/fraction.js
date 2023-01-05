"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraction = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var toformat_1 = __importDefault(require("toformat"));
var fraction_js_1 = __importDefault(require("fraction.js"));
var decimal_js_light_1 = __importDefault(require("decimal.js-light"));
var big_js_1 = __importDefault(require("big.js"));
var types_1 = require("../../types");
var Decimal = (0, toformat_1.default)(decimal_js_light_1.default);
var Big = (0, toformat_1.default)(big_js_1.default);
var toSignificantRounding = (_a = {},
    _a[types_1.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN,
    _a[types_1.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP,
    _a[types_1.Rounding.ROUND_UP] = Decimal.ROUND_UP,
    _a);
var Fraction = /** @class */ (function () {
    function Fraction(numerator, denominator) {
        if (denominator === void 0) { denominator = jsbi_1.default.BigInt(1); }
        this.numerator = jsbi_1.default.BigInt(numerator);
        this.denominator = jsbi_1.default.BigInt(denominator);
    }
    Fraction.fromNumber = function (value) {
        var fraction = new fraction_js_1.default(value);
        return new Fraction(fraction.n * fraction.s, fraction.d);
    };
    Fraction.tryParseFraction = function (fractionish) {
        if (fractionish instanceof jsbi_1.default ||
            typeof fractionish === 'number' ||
            typeof fractionish === 'string')
            return new Fraction(fractionish);
        if ('numerator' in fractionish && 'denominator' in fractionish)
            return fractionish;
        throw new Error('Could not parse fraction');
    };
    Object.defineProperty(Fraction.prototype, "quotient", {
        // performs floor division
        get: function () {
            return jsbi_1.default.divide(this.numerator, this.denominator);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fraction.prototype, "remainder", {
        // remainder after floor division
        get: function () {
            return new Fraction(jsbi_1.default.remainder(this.numerator, this.denominator), this.denominator);
        },
        enumerable: false,
        configurable: true
    });
    Fraction.prototype.invert = function () {
        return new Fraction(this.denominator, this.numerator);
    };
    Fraction.prototype.add = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        if (jsbi_1.default.equal(this.denominator, otherParsed.denominator)) {
            return new Fraction(jsbi_1.default.add(this.numerator, otherParsed.numerator), this.denominator);
        }
        return new Fraction(jsbi_1.default.add(jsbi_1.default.multiply(this.numerator, otherParsed.denominator), jsbi_1.default.multiply(otherParsed.numerator, this.denominator)), jsbi_1.default.multiply(this.denominator, otherParsed.denominator));
    };
    Fraction.prototype.subtract = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        if (jsbi_1.default.equal(this.denominator, otherParsed.denominator)) {
            return new Fraction(jsbi_1.default.subtract(this.numerator, otherParsed.numerator), this.denominator);
        }
        return new Fraction(jsbi_1.default.subtract(jsbi_1.default.multiply(this.numerator, otherParsed.denominator), jsbi_1.default.multiply(otherParsed.numerator, this.denominator)), jsbi_1.default.multiply(this.denominator, otherParsed.denominator));
    };
    Fraction.prototype.lessThan = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        return jsbi_1.default.lessThan(jsbi_1.default.multiply(this.numerator, otherParsed.denominator), jsbi_1.default.multiply(otherParsed.numerator, this.denominator));
    };
    Fraction.prototype.equalTo = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        return jsbi_1.default.equal(jsbi_1.default.multiply(this.numerator, otherParsed.denominator), jsbi_1.default.multiply(otherParsed.numerator, this.denominator));
    };
    Fraction.prototype.greaterThan = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        return jsbi_1.default.greaterThan(jsbi_1.default.multiply(this.numerator, otherParsed.denominator), jsbi_1.default.multiply(otherParsed.numerator, this.denominator));
    };
    Fraction.prototype.multiply = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        return new Fraction(jsbi_1.default.multiply(this.numerator, otherParsed.numerator), jsbi_1.default.multiply(this.denominator, otherParsed.denominator));
    };
    Fraction.prototype.divide = function (other) {
        var otherParsed = Fraction.tryParseFraction(other);
        return new Fraction(jsbi_1.default.multiply(this.numerator, otherParsed.denominator), jsbi_1.default.multiply(this.denominator, otherParsed.numerator));
    };
    Fraction.prototype.toSignificant = function (significantDigits, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    format, rounding) {
        if (format === void 0) { format = { groupSeparator: '' }; }
        if (rounding === void 0) { rounding = types_1.Rounding.ROUND_HALF_UP; }
        (0, tiny_invariant_1.default)(Number.isInteger(significantDigits), "".concat(significantDigits, " is not an integer."));
        (0, tiny_invariant_1.default)(significantDigits > 0, "".concat(significantDigits, " is not positive."));
        Decimal.set({ precision: significantDigits + 1, rounding: toSignificantRounding[rounding] });
        var quotient = new Decimal(this.numerator.toString())
            .div(this.denominator.toString())
            .toSignificantDigits(significantDigits);
        return quotient.toFormat(quotient.decimalPlaces(), format);
    };
    Fraction.prototype.toFixed = function (decimalPlaces, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    format) {
        if (format === void 0) { format = { groupSeparator: '' }; }
        (0, tiny_invariant_1.default)(Number.isInteger(decimalPlaces), "".concat(decimalPlaces, " is not an integer."));
        (0, tiny_invariant_1.default)(decimalPlaces >= 0, "".concat(decimalPlaces, " is negative."));
        Big.DP = decimalPlaces;
        return new Big(this.numerator.toString())
            .div(this.denominator.toString())
            .toFormat(decimalPlaces, format);
    };
    Fraction.prototype.toNumber = function () {
        return parseFloat(this.toFixed(3));
    };
    Object.defineProperty(Fraction.prototype, "asFraction", {
        /**
         * Helper method for converting any super class back to a fraction
         */
        get: function () {
            return new Fraction(this.numerator, this.denominator);
        },
        enumerable: false,
        configurable: true
    });
    return Fraction;
}());
exports.Fraction = Fraction;
exports.default = Fraction;
//# sourceMappingURL=fraction.js.map