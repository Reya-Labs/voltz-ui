"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var luxon_1 = require("luxon");
var ethers_1 = require("ethers");
var price_1 = require("./fractions/price");
var priceTickConversions_1 = require("../utils/priceTickConversions");
var tickMath_1 = require("../utils/tickMath");
var constants_1 = require("../constants");
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
            return (0, priceTickConversions_1.tickToFixedRate)(this.tickUpper);
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
    Object.defineProperty(Position.prototype, "notional", {
        get: function () {
            var sqrtPriceLowerX96 = new price_1.Price(constants_1.Q96, tickMath_1.TickMath.getSqrtRatioAtTick(this.tickLower));
            var sqrtPriceUpperX96 = new price_1.Price(constants_1.Q96, tickMath_1.TickMath.getSqrtRatioAtTick(this.tickUpper));
            return sqrtPriceUpperX96
                .subtract(sqrtPriceLowerX96)
                .multiply(this.liquidity)
                .divide(price_1.Price.fromNumber(Math.pow(10, this.amm.underlyingToken.decimals)))
                .toNumber();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "effectiveMargin", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.margin.toString()));
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "effectiveFixedTokenBalance", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.fixedTokenBalance.toString()));
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "effectiveVariableTokenBalance", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.variableTokenBalance.toString()));
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "createdDateTime", {
        get: function () {
            return luxon_1.DateTime.fromMillis(jsbi_1.default.toNumber(this.createdTimestamp));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "updatedDateTime", {
        get: function () {
            return luxon_1.DateTime.fromMillis(jsbi_1.default.toNumber(this.updatedTimestamp));
        },
        enumerable: false,
        configurable: true
    });
    return Position;
}());
exports.default = Position;
