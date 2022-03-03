"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var priceTickConversions_1 = require("../utils/priceTickConversions");
var Position = /** @class */ (function () {
    function Position(_a) {
        var amm = _a.amm, liquidity = _a.liquidity, tickLower = _a.tickLower, tickUpper = _a.tickUpper, isSettled = _a.isSettled, margin = _a.margin, fixedTokenBalance = _a.fixedTokenBalance, variableTokenBalance = _a.variableTokenBalance;
        this.amm = amm;
        this.tickLower = tickLower;
        this.tickUpper = tickUpper;
        this.liquidity = jsbi_1.default.BigInt(liquidity);
        this.isSettled = isSettled;
        this.margin = jsbi_1.default.BigInt(margin);
        this.fixedTokenBalance = fixedTokenBalance;
        this.variableTokenBalance = variableTokenBalance;
    }
    Object.defineProperty(Position.prototype, "priceLower", {
        get: function () {
            return (0, priceTickConversions_1.tickToPrice)(this.tickLower);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "priceUpper", {
        get: function () {
            return (0, priceTickConversions_1.tickToPrice)(this.tickUpper);
        },
        enumerable: false,
        configurable: true
    });
    return Position;
}());
exports.Position = Position;
