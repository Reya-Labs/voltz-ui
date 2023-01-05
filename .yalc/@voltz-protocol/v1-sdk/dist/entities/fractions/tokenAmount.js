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
exports.TokenAmount = void 0;
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var jsbi_1 = __importDefault(require("jsbi"));
var constants_1 = require("../../constants");
var fraction_1 = require("./fraction");
var TokenAmount = /** @class */ (function (_super) {
    __extends(TokenAmount, _super);
    function TokenAmount(token, numerator, denominator) {
        var _this = _super.call(this, numerator, denominator) || this;
        (0, tiny_invariant_1.default)(jsbi_1.default.lessThanOrEqual(_this.quotient, constants_1.MaxUint256), 'AMOUNT');
        _this.token = token;
        _this.decimalScale = jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(token.decimals));
        return _this;
    }
    /**
     * Returns a new token amount instance from the unitless amount of token, i.e. the raw amount
     * @param token the token in the amount
     * @param rawAmount the raw token or ether amount
     */
    TokenAmount.fromRawAmount = function (token, rawAmount) {
        return new TokenAmount(token, rawAmount);
    };
    /**
     * Construct a token amount with a denominator that is not equal to 1
     * @param token the token
     * @param numerator the numerator of the fractional token amount
     * @param denominator the denominator of the fractional token amount
     */
    TokenAmount.fromFractionalAmount = function (token, numerator, denominator) {
        return new TokenAmount(token, numerator, denominator);
    };
    TokenAmount.prototype.scale = function (decimalPlaces) {
        if (decimalPlaces === void 0) { decimalPlaces = this.token.decimals; }
        (0, tiny_invariant_1.default)(decimalPlaces <= this.token.decimals, 'DECIMALS');
        return _super.prototype.multiply.call(this, this.decimalScale).quotient.toString();
    };
    return TokenAmount;
}(fraction_1.Fraction));
exports.TokenAmount = TokenAmount;
//# sourceMappingURL=tokenAmount.js.map