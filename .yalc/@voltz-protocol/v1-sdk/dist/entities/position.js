"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var typechain_1 = require("../typechain");
var Position = /** @class */ (function () {
    function Position(_a) {
        var source = _a.source, id = _a.id, createdTimestamp = _a.createdTimestamp, amm = _a.amm, owner = _a.owner, updatedTimestamp = _a.updatedTimestamp, marginInScaledYieldBearingTokens = _a.marginInScaledYieldBearingTokens, fixedTokenBalance = _a.fixedTokenBalance, variableTokenBalance = _a.variableTokenBalance, isSettled = _a.isSettled, fcmSwaps = _a.fcmSwaps, fcmUnwinds = _a.fcmUnwinds, fcmSettlements = _a.fcmSettlements, tickLower = _a.tickLower, tickUpper = _a.tickUpper, liquidity = _a.liquidity, margin = _a.margin, accumulatedFees = _a.accumulatedFees, positionType = _a.positionType, mints = _a.mints, burns = _a.burns, swaps = _a.swaps, marginUpdates = _a.marginUpdates, liquidations = _a.liquidations, settlements = _a.settlements, totalNotionalTraded = _a.totalNotionalTraded, sumOfWeightedFixedRate = _a.sumOfWeightedFixedRate;
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
        this.totalNotionalTraded = totalNotionalTraded;
        this.sumOfWeightedFixedRate = sumOfWeightedFixedRate;
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
            return this.getNotionalFromLiquidity(this.liquidity);
        },
        enumerable: false,
        configurable: true
    });
    Position.prototype.getNotionalFromLiquidity = function (liquidity) {
        var sqrtPriceLowerX96 = new price_1.Price(constants_1.Q96, tickMath_1.TickMath.getSqrtRatioAtTick(this.tickLower));
        var sqrtPriceUpperX96 = new price_1.Price(constants_1.Q96, tickMath_1.TickMath.getSqrtRatioAtTick(this.tickUpper));
        return sqrtPriceUpperX96
            .subtract(sqrtPriceLowerX96)
            .multiply(liquidity)
            .divide(price_1.Price.fromNumber(Math.pow(10, this.amm.underlyingToken.decimals)))
            .toNumber();
    };
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
    Object.defineProperty(Position.prototype, "averageFixedRate", {
        get: function () {
            var sumOfWeightedFixedRateBn = ethers_1.BigNumber.from(this.sumOfWeightedFixedRate.toString());
            var totalNotionalTradedBn = ethers_1.BigNumber.from(this.totalNotionalTraded.toString());
            if (totalNotionalTradedBn.eq(ethers_1.BigNumber.from(0))) {
                return undefined;
            }
            var averageFixedRate = sumOfWeightedFixedRateBn.mul(ethers_1.BigNumber.from(1000)).div(totalNotionalTradedBn).toNumber() /
                1000;
            return Math.abs(averageFixedRate);
        },
        enumerable: false,
        configurable: true
    });
    // get settlement rate of particular position
    Position.prototype.getSettlementCashflow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var start, end, rateOracleContract, variableFactorToMaturityWad, fixedFactor, fixedCashflowWad, variableCashflowWad, cashFlow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = ethers_1.BigNumber.from(this.amm.termStartTimestamp.toString());
                        end = ethers_1.BigNumber.from(this.amm.termEndTimestamp.toString());
                        if (!this.amm.provider) return [3 /*break*/, 2];
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.amm.rateOracle.id, this.amm.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(start, end)];
                    case 1:
                        variableFactorToMaturityWad = _a.sent();
                        fixedFactor = end.sub(start).div(constants_1.ONE_YEAR_IN_SECONDS);
                        try {
                            fixedCashflowWad = ethers_1.BigNumber.from(this.fixedTokenBalance.toString()).mul(fixedFactor).div(ethers_1.BigNumber.from(100)).div(ethers_1.BigNumber.from(10).pow(18));
                            variableCashflowWad = ethers_1.BigNumber.from(this.variableTokenBalance.toString()).mul(variableFactorToMaturityWad);
                            cashFlow = fixedCashflowWad.add(variableCashflowWad);
                            return [2 /*return*/, this.amm.descale(cashFlow)];
                        }
                        catch (e) {
                            return [2 /*return*/, undefined];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    ;
    return Position;
}());
exports.default = Position;
