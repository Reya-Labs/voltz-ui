"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var luxon_1 = require("luxon");
var ethers_1 = require("ethers");
var constants_1 = require("../constants");
var priceTickConversions_1 = require("../utils/priceTickConversions");
var tickMath_1 = require("../utils/tickMath");
var price_1 = require("./fractions/price");
var Position = /** @class */ (function () {
    function Position(_a) {
        var source = _a.source, id = _a.id, createdTimestamp = _a.createdTimestamp, amm = _a.amm, owner = _a.owner, updatedTimestamp = _a.updatedTimestamp, marginInScaledYieldBearingTokens = _a.marginInScaledYieldBearingTokens, fixedTokenBalance = _a.fixedTokenBalance, variableTokenBalance = _a.variableTokenBalance, isSettled = _a.isSettled, fcmSwaps = _a.fcmSwaps, fcmUnwinds = _a.fcmUnwinds, fcmSettlements = _a.fcmSettlements, tickLower = _a.tickLower, tickUpper = _a.tickUpper, liquidity = _a.liquidity, margin = _a.margin, accumulatedFees = _a.accumulatedFees, positionType = _a.positionType, mints = _a.mints, burns = _a.burns, swaps = _a.swaps, marginUpdates = _a.marginUpdates, liquidations = _a.liquidations, settlements = _a.settlements;
        this.source = source;
        this.id = id;
        this.createdTimestamp = createdTimestamp;
        this.amm = amm;
        this.owner = owner;
        this.updatedTimestamp = updatedTimestamp;
        this.marginInScaledYieldBearingTokens = marginInScaledYieldBearingTokens;
        this.fixedTokenBalance = fixedTokenBalance;
        this.variableTokenBalance = variableTokenBalance;
        this.isSettled = isSettled;
        this.fcmSwaps = fcmSwaps;
        this.fcmUnwinds = fcmUnwinds;
        this.fcmSettlements = fcmSettlements;
        this.mints = mints;
        this.burns = burns;
        this.marginUpdates = marginUpdates;
        this.liquidations = liquidations;
        this.settlements = settlements;
        this.swaps = swaps;
        this.margin = margin;
        this.liquidity = liquidity;
        this.tickLower = tickLower;
        this.tickUpper = tickUpper;
        this.accumulatedFees = accumulatedFees;
        this.positionType = positionType;
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
            if (this.source.includes('FCM')) {
                var result_1 = this.amm.descale(ethers_1.BigNumber.from(this.marginInScaledYieldBearingTokens.toString()));
                return result_1;
            }
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
