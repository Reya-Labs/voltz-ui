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
        var id = _a.id, createdTimestamp = _a.createdTimestamp, amm = _a.amm, owner = _a.owner, tickLower = _a.tickLower, tickUpper = _a.tickUpper, updatedTimestamp = _a.updatedTimestamp, liquidity = _a.liquidity, margin = _a.margin, fixedTokenBalance = _a.fixedTokenBalance, variableTokenBalance = _a.variableTokenBalance, accumulatedFees = _a.accumulatedFees, isLiquidityProvider = _a.isLiquidityProvider, isSettled = _a.isSettled, mints = _a.mints, burns = _a.burns, swaps = _a.swaps, marginUpdates = _a.marginUpdates, liquidations = _a.liquidations, settlements = _a.settlements;
        this.id = id;
        this.createdTimestamp = createdTimestamp;
        this.amm = amm;
        this.owner = owner;
        this.tickLower = tickLower;
        this.tickUpper = tickUpper;
        this.updatedTimestamp = updatedTimestamp;
        this.liquidity = liquidity;
        this.margin = margin;
        this.fixedTokenBalance = fixedTokenBalance;
        this.variableTokenBalance = variableTokenBalance;
        this.accumulatedFees = accumulatedFees;
        this.isLiquidityProvider = isLiquidityProvider;
        this.isSettled = isSettled;
        this.mints = mints;
        this.burns = burns;
        this.swaps = swaps;
        this.marginUpdates = marginUpdates;
        this.liquidations = liquidations;
        this.settlements = settlements;
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
    Object.defineProperty(Position.prototype, "effectiveAccumulatedFees", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.accumulatedFees.toString()));
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
