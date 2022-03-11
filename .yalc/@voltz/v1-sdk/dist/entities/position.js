"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var priceTickConversions_1 = require("../utils/priceTickConversions");
var Position = /** @class */ (function () {
    function Position(_a) {
        var id = _a.id, createdTimestamp = _a.createdTimestamp, updatedTimestamp = _a.updatedTimestamp, amm = _a.amm, liquidity = _a.liquidity, tickLower = _a.tickLower, tickUpper = _a.tickUpper, isSettled = _a.isSettled, margin = _a.margin, fixedTokenBalance = _a.fixedTokenBalance, variableTokenBalance = _a.variableTokenBalance, isLiquidityProvider = _a.isLiquidityProvider, owner = _a.owner, isEmpty = _a.isEmpty;
        this.id = id;
        this.amm = amm;
        this.tickLower = tickLower;
        this.tickUpper = tickUpper;
        this.liquidity = jsbi_1.default.BigInt(liquidity);
        this.isSettled = isSettled;
        this.margin = jsbi_1.default.BigInt(margin);
        this.fixedTokenBalance = fixedTokenBalance;
        this.variableTokenBalance = variableTokenBalance;
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.isLiquidityProvider = isLiquidityProvider;
        this.owner = owner;
        this.isEmpty = isEmpty;
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
    Object.defineProperty(Position.prototype, "fixedRateLower", {
        get: function () {
            return (0, priceTickConversions_1.tickToFixedRate)(this.tickLower);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "fixedRateUpper", {
        get: function () {
            return (0, priceTickConversions_1.tickToFixedRate)(this.tickLower);
        },
        enumerable: false,
        configurable: true
    });
    return Position;
}());
exports.default = Position;
