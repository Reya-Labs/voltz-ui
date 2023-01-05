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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var ethers_1 = require("ethers");
var amm_1 = require("./amm");
var constants_1 = require("../constants");
var priceTickConversions_1 = require("../utils/priceTickConversions");
var tickMath_1 = require("../utils/tickMath");
var price_1 = require("./fractions/price");
var typechain_1 = require("../typechain");
var getAccruedCashflow_1 = require("../services/getAccruedCashflow");
var sentry_1 = require("../utils/sentry");
var rangeHealthFactor_1 = require("../utils/rangeHealthFactor");
var Position = /** @class */ (function () {
    function Position(_a) {
        var id = _a.id, createdTimestamp = _a.createdTimestamp, amm = _a.amm, owner = _a.owner, tickLower = _a.tickLower, tickUpper = _a.tickUpper, positionType = _a.positionType, mints = _a.mints, burns = _a.burns, swaps = _a.swaps, marginUpdates = _a.marginUpdates, liquidations = _a.liquidations, settlements = _a.settlements;
        this.initialized = false;
        this.fixedTokenBalance = 0;
        this.variableTokenBalance = 0;
        this.liquidity = 0;
        this.liquidityInUSD = 0;
        this.notional = 0;
        this.notionalInUSD = 0;
        this.margin = 0;
        this.marginInUSD = 0;
        this.fees = 0;
        this.feesInUSD = 0;
        this.accruedCashflow = 0;
        this.accruedCashflowInUSD = 0;
        this.settlementCashflow = 0;
        this.settlementCashflowInUSD = 0;
        this.liquidationThreshold = 0;
        this.safetyThreshold = 0;
        this.receivingRate = 0;
        this.payingRate = 0;
        this.healthFactor = amm_1.HealthFactorStatus.NOT_FOUND;
        this.fixedRateHealthFactor = amm_1.HealthFactorStatus.NOT_FOUND;
        this.poolAPR = 0;
        this.isPoolMatured = false;
        this.isSettled = false;
        this.id = id;
        this.createdTimestamp = createdTimestamp;
        this.amm = amm;
        this.owner = owner;
        this.mints = mints;
        this.burns = burns;
        this.marginUpdates = marginUpdates;
        this.liquidations = liquidations;
        this.settlements = settlements;
        this.swaps = swaps;
        this.tickLower = tickLower;
        this.tickUpper = tickUpper;
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
    Position.prototype.getNotionalFromLiquidity = function (liquidity) {
        var sqrtPriceLowerX96 = new price_1.Price(constants_1.Q96, tickMath_1.TickMath.getSqrtRatioAtTick(this.tickLower));
        var sqrtPriceUpperX96 = new price_1.Price(constants_1.Q96, tickMath_1.TickMath.getSqrtRatioAtTick(this.tickUpper));
        return sqrtPriceUpperX96
            .subtract(sqrtPriceLowerX96)
            .multiply(liquidity.toString())
            .divide(price_1.Price.fromNumber(Math.pow(10, this.amm.underlyingToken.decimals)))
            .toNumber();
    };
    Object.defineProperty(Position.prototype, "createdDateTime", {
        get: function () {
            return luxon_1.DateTime.fromMillis(this.createdTimestamp);
        },
        enumerable: false,
        configurable: true
    });
    Position.prototype.refreshInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var marginEngineContract, rateOracleContract, freshInfo, block, currentTime, _a, _b, accruedCashflowInfo, avgFixedRate, avgVariableRate, error_1, scaledLiqT, error_2, scaledSafeT, error_3, usdExchangeRate, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.initialized) {
                            return [2 /*return*/];
                        }
                        if (!this.amm.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.amm.marginEngineAddress, this.amm.provider);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.amm.rateOracle.id, this.amm.provider);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(this.owner, this.tickLower, this.tickUpper)];
                    case 1:
                        freshInfo = _e.sent();
                        this.isSettled = freshInfo.isSettled;
                        return [4 /*yield*/, this.amm.provider.getBlock('latest')];
                    case 2:
                        block = _e.sent();
                        currentTime = block.timestamp - 1;
                        this.isPoolMatured = currentTime >= this.amm.endDateTime.toSeconds();
                        if (!!this.isSettled) return [3 /*break*/, 24];
                        this.liquidity = this.getNotionalFromLiquidity(freshInfo._liquidity);
                        this.fixedTokenBalance = this.amm.descale(freshInfo.fixedTokenBalance);
                        this.variableTokenBalance = this.amm.descale(freshInfo.variableTokenBalance);
                        this.fees = this.amm.descale(freshInfo.accumulatedFees);
                        this.margin = this.amm.descale(freshInfo.margin) - this.fees;
                        // Get pool information
                        _a = this;
                        return [4 /*yield*/, this.amm.getFixedApr()];
                    case 3:
                        // Get pool information
                        _a.poolAPR = _e.sent();
                        if (!this.isPoolMatured) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.getSettlementCashflow()];
                    case 4:
                        _b.settlementCashflow = _e.sent();
                        _e.label = 5;
                    case 5:
                        if (!(this.swaps.length > 0)) return [3 /*break*/, 12];
                        if (!!this.isPoolMatured) return [3 /*break*/, 11];
                        _e.label = 6;
                    case 6:
                        _e.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, (0, getAccruedCashflow_1.getAccruedCashflow)({
                                swaps: (0, getAccruedCashflow_1.transformSwaps)(this.swaps, this.amm.underlyingToken.decimals),
                                rateOracle: rateOracleContract,
                                currentTime: currentTime,
                                endTime: this.amm.endDateTime.toSeconds(),
                            })];
                    case 7:
                        accruedCashflowInfo = _e.sent();
                        this.accruedCashflow = accruedCashflowInfo.accruedCashflow;
                        avgFixedRate = accruedCashflowInfo.avgFixedRate;
                        return [4 /*yield*/, this.amm.getInstantApy()];
                    case 8:
                        avgVariableRate = (_e.sent()) * 100;
                        _d = this.positionType === 1
                            ? [avgFixedRate, avgVariableRate]
                            : [avgVariableRate, avgFixedRate], this.receivingRate = _d[0], this.payingRate = _d[1];
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _e.sent();
                        sentry_1.sentryTracker.captureException(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        this.accruedCashflow = this.settlementCashflow;
                        _e.label = 12;
                    case 12:
                        if (!!this.isPoolMatured) return [3 /*break*/, 20];
                        _e.label = 13;
                    case 13:
                        _e.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(this.owner, this.tickLower, this.tickUpper, true)];
                    case 14:
                        scaledLiqT = _e.sent();
                        this.liquidationThreshold = this.amm.descale(scaledLiqT);
                        return [3 /*break*/, 16];
                    case 15:
                        error_2 = _e.sent();
                        sentry_1.sentryTracker.captureMessage('Failed to compute the liquidation threshold');
                        sentry_1.sentryTracker.captureException(error_2);
                        return [3 /*break*/, 16];
                    case 16:
                        _e.trys.push([16, 18, , 19]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(this.owner, this.tickLower, this.tickUpper, false)];
                    case 17:
                        scaledSafeT = _e.sent();
                        this.safetyThreshold = this.amm.descale(scaledSafeT);
                        return [3 /*break*/, 19];
                    case 18:
                        error_3 = _e.sent();
                        sentry_1.sentryTracker.captureMessage('Failed to compute the safety threshold');
                        sentry_1.sentryTracker.captureException(error_3);
                        return [3 /*break*/, 19];
                    case 19:
                        // Get health factor
                        if (this.margin < this.liquidationThreshold) {
                            this.healthFactor = amm_1.HealthFactorStatus.DANGER;
                        }
                        else if (this.margin < this.safetyThreshold) {
                            this.healthFactor = amm_1.HealthFactorStatus.WARNING;
                        }
                        else {
                            this.healthFactor = amm_1.HealthFactorStatus.HEALTHY;
                        }
                        // Get range health factor for LPs
                        this.fixedRateHealthFactor = (0, rangeHealthFactor_1.getRangeHealthFactor)(this.fixedRateLower.toNumber(), this.fixedRateUpper.toNumber(), this.poolAPR);
                        _e.label = 20;
                    case 20:
                        // Get notional (LPs - liquidity, Traders - absolute variable tokens)
                        this.notional =
                            this.positionType === 3 ? this.liquidity : Math.abs(this.variableTokenBalance);
                        if (!this.amm.isETH) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.amm.ethPrice()];
                    case 21:
                        _c = _e.sent();
                        return [3 /*break*/, 23];
                    case 22:
                        _c = 1;
                        _e.label = 23;
                    case 23:
                        usdExchangeRate = _c;
                        // Compute the information in USD
                        this.liquidityInUSD = this.liquidity * usdExchangeRate;
                        this.notionalInUSD = this.notional * usdExchangeRate;
                        this.marginInUSD = this.margin * usdExchangeRate;
                        this.feesInUSD = this.fees * usdExchangeRate;
                        this.accruedCashflowInUSD = this.accruedCashflow * usdExchangeRate;
                        this.settlementCashflowInUSD = this.settlementCashflow * usdExchangeRate;
                        _e.label = 24;
                    case 24:
                        this.initialized = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Position.prototype.getSettlementCashflow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rateOracleContract, variableFactorWad, fixedFactor, variableFactor, settlementCashflow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.amm.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.amm.rateOracle.id, this.amm.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(this.amm.termStartTimestamp.toString(), this.amm.termEndTimestamp.toString())];
                    case 1:
                        variableFactorWad = _a.sent();
                        fixedFactor = (this.amm.endDateTime.toMillis() - this.amm.startDateTime.toMillis()) /
                            constants_1.ONE_YEAR_IN_SECONDS /
                            1000;
                        variableFactor = Number(ethers_1.ethers.utils.formatEther(variableFactorWad));
                        settlementCashflow = this.fixedTokenBalance * fixedFactor * 0.01 + this.variableTokenBalance * variableFactor;
                        return [2 /*return*/, settlementCashflow];
                }
            });
        });
    };
    Object.defineProperty(Position.prototype, "settlementBalance", {
        get: function () {
            if (this.initialized) {
                return this.margin + this.fees + this.settlementCashflow;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    return Position;
}());
exports.default = Position;
//# sourceMappingURL=position.js.map