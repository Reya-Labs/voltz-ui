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
var ethers_1 = require("ethers");
var ethers_2 = require("ethers");
var constants_1 = require("../constants");
var typechain_1 = require("../typechain");
var tickMath_1 = require("../utils/tickMath");
var timestampWadToDateTime_1 = __importDefault(require("../utils/timestampWadToDateTime"));
var priceTickConversions_1 = require("../utils/priceTickConversions");
var nearestUsableTick_1 = require("../utils/nearestUsableTick");
var price_1 = require("./fractions/price");
var tokenAmount_1 = require("./fractions/tokenAmount");
var errorHandling_1 = require("../utils/errors/errorHandling");
var lodash_1 = require("lodash");
//1. Import coingecko-api
var coingecko_api_1 = __importDefault(require("coingecko-api"));
var getExpectedApy_1 = require("../services/getExpectedApy");
//2. Initiate the CoinGecko API Client
var CoinGeckoClient = new coingecko_api_1.default();
//3. Make call to get the price of 1 eth in USD, so divide the value of USD by data
// queries the json response body with price of 1eth in usd
// returns the value of 1 eth in USD 
var geckoEthToUsd = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CoinGeckoClient.simple.price({
                    ids: ['ethereum'],
                    vs_currencies: ['usd'],
                })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.data.ethereum.usd];
        }
    });
}); };
var AMM = /** @class */ (function () {
    function AMM(_a) {
        var id = _a.id, signer = _a.signer, provider = _a.provider, environment = _a.environment, factoryAddress = _a.factoryAddress, marginEngineAddress = _a.marginEngineAddress, fcmAddress = _a.fcmAddress, rateOracle = _a.rateOracle, updatedTimestamp = _a.updatedTimestamp, termStartTimestamp = _a.termStartTimestamp, termEndTimestamp = _a.termEndTimestamp, underlyingToken = _a.underlyingToken, tick = _a.tick, tickSpacing = _a.tickSpacing, txCount = _a.txCount, totalNotionalTraded = _a.totalNotionalTraded, totalLiquidity = _a.totalLiquidity, wethAddress = _a.wethAddress;
        var _this = this;
        // expected apy
        this.expectedApy = function (ft, vt, margin) { return __awaiter(_this, void 0, void 0, function () {
            var now, end, scaledFt, scaledVt, varApy, samples, predictedAprs, predictedPnls, _i, samples_1, rate, pnl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Math.round((new Date()).getTime() / 1000);
                        end = ethers_2.BigNumber.from(this.termEndTimestamp.toString())
                            .div(ethers_2.BigNumber.from(10).pow(12))
                            .toNumber() / 1000000;
                        scaledFt = 0;
                        scaledVt = 0;
                        if (this.underlyingToken.decimals <= 6) {
                            scaledFt = ft.toNumber() / (Math.pow(10, this.underlyingToken.decimals));
                            scaledVt = vt.toNumber() / (Math.pow(10, this.underlyingToken.decimals));
                        }
                        else {
                            scaledFt = ft.div(ethers_2.BigNumber.from(10).pow(this.underlyingToken.decimals - 6)).toNumber() / 1000000;
                            scaledVt = vt.div(ethers_2.BigNumber.from(10).pow(this.underlyingToken.decimals - 6)).toNumber() / 1000000;
                        }
                        return [4 /*yield*/, this.getInstantApy()];
                    case 1:
                        varApy = _a.sent();
                        samples = [0, varApy / 2, varApy, 5 * varApy, 10 * varApy];
                        predictedAprs = [];
                        predictedPnls = [];
                        for (_i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
                            rate = samples_1[_i];
                            pnl = (0, getExpectedApy_1.getExpectedApy)(now, end, scaledFt, scaledVt, margin, rate);
                            predictedAprs.push(100 * rate);
                            predictedPnls.push(100 * pnl);
                        }
                        return [2 /*return*/, [predictedAprs, predictedPnls]];
                }
            });
        }); };
        this.id = id;
        this.signer = signer;
        this.provider = provider || (signer === null || signer === void 0 ? void 0 : signer.provider);
        this.environment = environment;
        this.factoryAddress = factoryAddress;
        this.marginEngineAddress = marginEngineAddress;
        this.fcmAddress = fcmAddress;
        this.rateOracle = rateOracle;
        this.updatedTimestamp = updatedTimestamp;
        this.termStartTimestamp = termStartTimestamp;
        this.termEndTimestamp = termEndTimestamp;
        this.underlyingToken = underlyingToken;
        this.tickSpacing = tickSpacing;
        this.tick = tick;
        this.txCount = txCount;
        this.totalNotionalTraded = totalNotionalTraded;
        this.totalLiquidity = totalLiquidity;
        if (this.underlyingToken.name === "ETH") {
            this.isETH = true;
            this.isFCM = false;
            if (typeof this.wethAddress !== 'undefined') {
                throw new Error("No WETH address");
            }
            this.wethAddress = wethAddress;
        }
        else {
            this.isETH = false;
            this.isFCM = true;
        }
    }
    // rollover with swap
    AMM.prototype.rolloverWithSwap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, marginEth = _a.marginEth, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, owner = _a.owner, newMarginEngine = _a.newMarginEngine, oldFixedLow = _a.oldFixedLow, oldFixedHigh = _a.oldFixedHigh, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, oldTickUpper, oldTickLower, tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, factoryContract, peripheryAddress, peripheryContract, scaledNotional, swapPeripheryParams, tempOverrides, scaledMarginDelta, estimatedGas, swapTransaction, receipt, error_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh && oldFixedLow >= oldFixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE && oldFixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE && oldFixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (margin < 0) {
                            throw new Error('Amount of margin cannot be negative');
                        }
                        if (marginEth && marginEth < 0) {
                            throw new Error('Amount of margin in ETH cannot be negative');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        if (!(!owner)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = owner;
                        _c.label = 3;
                    case 3:
                        effectiveOwner = _b;
                        oldTickUpper = this.closestTickAndFixedRate(oldFixedLow).closestUsableTick;
                        oldTickLower = this.closestTickAndFixedRate(oldFixedHigh).closestUsableTick;
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            if (isFT) {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                            }
                            else {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                            }
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 4:
                        peripheryAddress = _c.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH) {
                            swapPeripheryParams = {
                                marginEngine: newMarginEngine,
                                isFT: isFT,
                                notional: scaledNotional,
                                sqrtPriceLimitX96: sqrtPriceLimitX96,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                marginDelta: '0',
                            };
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(margin.toString());
                        }
                        else {
                            scaledMarginDelta = this.scale(margin);
                            swapPeripheryParams = {
                                marginEngine: newMarginEngine,
                                isFT: isFT,
                                notional: scaledNotional,
                                sqrtPriceLimitX96: sqrtPriceLimitX96,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                marginDelta: scaledMarginDelta,
                            };
                        }
                        return [4 /*yield*/, peripheryContract.callStatic.rolloverWithSwap(this.marginEngineAddress, effectiveOwner, oldTickLower, oldTickUpper, swapPeripheryParams, tempOverrides).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, this.environment);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.rolloverWithSwap(this.marginEngineAddress, effectiveOwner, oldTickLower, oldTickUpper, swapPeripheryParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 6:
                        estimatedGas = _c.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.rolloverWithSwap(this.marginEngineAddress, effectiveOwner, oldTickLower, oldTickUpper, swapPeripheryParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 7:
                        swapTransaction = _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 9:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 10:
                        error_1 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // rollover with mint
    AMM.prototype.rolloverWithMint = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, margin = _a.margin, marginEth = _a.marginEth, owner = _a.owner, newMarginEngine = _a.newMarginEngine, oldFixedLow = _a.oldFixedLow, oldFixedHigh = _a.oldFixedHigh, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, oldTickUpper, oldTickLower, tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, _notional, mintOrBurnParams, tempOverrides, scaledMarginDelta, estimatedGas, mintTransaction, receipt, error_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh && oldFixedLow >= oldFixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE && oldFixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE && oldFixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (margin < 0) {
                            throw new Error('Amount of margin cannot be negative');
                        }
                        if (marginEth && marginEth < 0) {
                            throw new Error('Amount of margin in ETH cannot be negative');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        if (!(!owner)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = owner;
                        _c.label = 3;
                    case 3:
                        effectiveOwner = _b;
                        oldTickUpper = this.closestTickAndFixedRate(oldFixedLow).closestUsableTick;
                        oldTickLower = this.closestTickAndFixedRate(oldFixedHigh).closestUsableTick;
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 4:
                        peripheryAddress = _c.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        _notional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH && marginEth) {
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginEth.toString());
                        }
                        scaledMarginDelta = this.scale(margin);
                        mintOrBurnParams = {
                            marginEngine: newMarginEngine,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: _notional,
                            isMint: true,
                            marginDelta: scaledMarginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.rolloverWithMint(this.marginEngineAddress, effectiveOwner, oldTickLower, oldTickUpper, mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.rolloverWithMint(this.marginEngineAddress, effectiveOwner, oldTickLower, oldTickUpper, mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 6:
                        estimatedGas = _c.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.rolloverWithMint(this.marginEngineAddress, effectiveOwner, oldTickLower, oldTickUpper, mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 7:
                        mintTransaction = _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, mintTransaction.wait()];
                    case 9:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 10:
                        error_2 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // swap
    AMM.prototype.getInfoPostSwap = function (_a) {
        var position = _a.position, isFT = _a.isFT, notional = _a.notional, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, margin = _a.margin;
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, scaledNotional, factoryContract, peripheryAddress, peripheryContract, swapPeripheryParams, tickBefore, tickAfter, marginRequirement, fee, availableNotional, fixedTokenDeltaUnbalanced, fixedTokenDelta, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, marginEngineContract, currentMargin, scaledCurrentMargin, scaledAvailableNotional, scaledFee, scaledMarginRequirement, additionalMargin, averageFixedRate, result, positionMargin, accruedCashflow, positionUft, positionVt, allSwaps, lenSwaps, _i, allSwaps_1, swap, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _d.sent();
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            if (isFT) {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                            }
                            else {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                            }
                        }
                        scaledNotional = this.scale(notional);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _d.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        swapPeripheryParams = {
                            marginEngine: this.marginEngineAddress,
                            isFT: isFT,
                            notional: scaledNotional,
                            sqrtPriceLimitX96: sqrtPriceLimitX96,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            marginDelta: '0',
                        };
                        return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                    case 3:
                        tickBefore = _d.sent();
                        tickAfter = 0;
                        marginRequirement = ethers_2.BigNumber.from(0);
                        fee = ethers_2.BigNumber.from(0);
                        availableNotional = ethers_2.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_2.BigNumber.from(0);
                        fixedTokenDelta = ethers_2.BigNumber.from(0);
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams).then(function (result) {
                                availableNotional = result[1];
                                fee = result[2];
                                fixedTokenDeltaUnbalanced = result[3];
                                marginRequirement = result[4];
                                tickAfter = parseInt(result[5]);
                                fixedTokenDelta = result[0];
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostSwap)(error, _this.environment);
                                marginRequirement = result.marginRequirement;
                                tickAfter = result.tick;
                                fee = result.fee;
                                availableNotional = result.availableNotional;
                                fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
                                fixedTokenDelta = result.fixedTokenDelta;
                            })];
                    case 4:
                        _d.sent();
                        fixedRateBefore = (0, priceTickConversions_1.tickToFixedRate)(tickBefore);
                        fixedRateAfter = (0, priceTickConversions_1.tickToFixedRate)(tickAfter);
                        fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
                        fixedRateDeltaRaw = fixedRateDelta.toNumber();
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 5:
                        currentMargin = (_d.sent()).margin;
                        scaledCurrentMargin = this.descale(currentMargin);
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        scaledMarginRequirement = (this.descale(marginRequirement) + scaledFee) * 1.01;
                        additionalMargin = scaledMarginRequirement > scaledCurrentMargin
                            ? scaledMarginRequirement - scaledCurrentMargin
                            : 0;
                        averageFixedRate = (availableNotional.eq(ethers_2.BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(ethers_2.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
                        result = {
                            marginRequirement: additionalMargin,
                            availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                            fee: scaledFee < 0 ? -scaledFee : scaledFee,
                            slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                            averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                            fixedTokenDeltaBalance: this.descale(fixedTokenDelta),
                            variableTokenDeltaBalance: this.descale(availableNotional),
                            fixedTokenDeltaUnbalanced: this.descale(fixedTokenDeltaUnbalanced)
                        };
                        if (!(0, lodash_1.isNumber)(margin)) return [3 /*break*/, 12];
                        positionMargin = 0;
                        accruedCashflow = 0;
                        positionUft = ethers_2.BigNumber.from(0);
                        positionVt = ethers_2.BigNumber.from(0);
                        if (!position) return [3 /*break*/, 10];
                        allSwaps = this.getAllSwaps(position);
                        lenSwaps = allSwaps.length;
                        for (_i = 0, allSwaps_1 = allSwaps; _i < allSwaps_1.length; _i++) {
                            swap = allSwaps_1[_i];
                            positionUft = positionUft.add(swap.fDelta);
                            positionVt = positionVt.add(swap.vDelta);
                        }
                        positionMargin = scaledCurrentMargin;
                        _d.label = 6;
                    case 6:
                        _d.trys.push([6, 9, , 10]);
                        if (!(lenSwaps > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getAccruedCashflow(allSwaps, false)];
                    case 7:
                        accruedCashflow = _d.sent();
                        _d.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        _b = _d.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        _c = result;
                        return [4 /*yield*/, this.expectedApy(positionUft.add(fixedTokenDeltaUnbalanced), positionVt.add(availableNotional), margin + positionMargin + accruedCashflow)];
                    case 11:
                        _c.expectedApy = _d.sent();
                        _d.label = 12;
                    case 12: return [2 /*return*/, result];
                }
            });
        });
    };
    AMM.prototype.swap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, factoryContract, peripheryAddress, peripheryContract, scaledNotional, swapPeripheryParams, tempOverrides, scaledMarginDelta, estimatedGas, swapTransaction, receipt, error_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (margin < 0) {
                            throw new Error('Amount of margin cannot be negative');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            if (isFT) {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                            }
                            else {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                            }
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH) {
                            swapPeripheryParams = {
                                marginEngine: this.marginEngineAddress,
                                isFT: isFT,
                                notional: scaledNotional,
                                sqrtPriceLimitX96: sqrtPriceLimitX96,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                marginDelta: 0, //
                            };
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(margin.toString());
                        }
                        else {
                            scaledMarginDelta = this.scale(margin);
                            swapPeripheryParams = {
                                marginEngine: this.marginEngineAddress,
                                isFT: isFT,
                                notional: scaledNotional,
                                sqrtPriceLimitX96: sqrtPriceLimitX96,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                marginDelta: scaledMarginDelta,
                            };
                        }
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams, tempOverrides).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, this.environment);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.swap(swapPeripheryParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.swap(swapPeripheryParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        swapTransaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 6:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_3 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.swapWithWeth = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, marginEth = _a.marginEth, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, factoryContract, peripheryAddress, peripheryContract, scaledNotional, swapPeripheryParams, tempOverrides, scaledMarginDelta, estimatedGas, swapTransaction, receipt, error_4;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (margin < 0) {
                            throw new Error('Amount of margin cannot be negative');
                        }
                        if (marginEth && marginEth < 0) {
                            throw new Error('Amount of margin in ETH cannot be negative');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            if (isFT) {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                            }
                            else {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                            }
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH && marginEth) {
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginEth.toString());
                        }
                        scaledMarginDelta = this.scale(margin);
                        swapPeripheryParams = {
                            marginEngine: this.marginEngineAddress,
                            isFT: isFT,
                            notional: scaledNotional,
                            sqrtPriceLimitX96: sqrtPriceLimitX96,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            marginDelta: scaledMarginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams, tempOverrides).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, this.environment);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.swap(swapPeripheryParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.swap(swapPeripheryParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        swapTransaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 6:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_4 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // mint
    AMM.prototype.getInfoPostMint = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional;
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, scaledNotional, mintOrBurnParams, marginRequirement, marginEngineContract, currentMargin, scaledCurrentMargin, scaledMarginRequirement;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _b.sent();
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: scaledNotional,
                            isMint: true,
                            marginDelta: '0',
                        };
                        marginRequirement = ethers_2.BigNumber.from('0');
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).then(function (result) {
                                marginRequirement = ethers_2.BigNumber.from(result);
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostMint)(error, _this.environment);
                                marginRequirement = result.marginRequirement;
                            })];
                    case 3:
                        _b.sent();
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 4:
                        currentMargin = (_b.sent()).margin;
                        scaledCurrentMargin = this.descale(currentMargin);
                        scaledMarginRequirement = this.descale(marginRequirement) * 1.01;
                        if (scaledMarginRequirement > scaledCurrentMargin) {
                            return [2 /*return*/, scaledMarginRequirement - scaledCurrentMargin];
                        }
                        else {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.mint = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, margin = _a.margin, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, _notional, mintOrBurnParams, tempOverrides, scaledMarginDelta, estimatedGas, mintTransaction, receipt, error_5;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (margin < 0) {
                            throw new Error('Amount of margin cannot be negative');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        _notional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH) {
                            mintOrBurnParams = {
                                marginEngine: this.marginEngineAddress,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                notional: _notional,
                                isMint: true,
                                marginDelta: 0,
                            };
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(margin.toString());
                        }
                        else {
                            scaledMarginDelta = this.scale(margin);
                            mintOrBurnParams = {
                                marginEngine: this.marginEngineAddress,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                notional: _notional,
                                isMint: true,
                                marginDelta: scaledMarginDelta,
                            };
                        }
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        mintTransaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, mintTransaction.wait()];
                    case 6:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_5 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.mintWithWeth = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, margin = _a.margin, marginEth = _a.marginEth, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, _notional, mintOrBurnParams, tempOverrides, scaledMarginDelta, estimatedGas, mintTransaction, receipt, error_6;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (margin < 0) {
                            throw new Error('Amount of margin cannot be negative');
                        }
                        if (marginEth && marginEth < 0) {
                            throw new Error('Amount of margin in ETH cannot be negative');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        _notional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH && marginEth) {
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginEth.toString());
                        }
                        scaledMarginDelta = this.scale(margin);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: _notional,
                            isMint: true,
                            marginDelta: scaledMarginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, tempOverrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        mintTransaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, mintTransaction.wait()];
                    case 6:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_6 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // burn
    AMM.prototype.burn = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, _notional, mintOrBurnParams, estimatedGas, burnTransaction, receipt, error_7;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedLow >= fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        if (notional <= 0) {
                            throw new Error('Amount of notional must be greater than 0');
                        }
                        if (validationOnly) {
                            return [2 /*return*/];
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        _notional = this.scale(notional);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: _notional,
                            isMint: false,
                            marginDelta: '0',
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams)];
                    case 3:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            }).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        burnTransaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, burnTransaction.wait()];
                    case 6:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_7 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // update position margin
    AMM.prototype.updatePositionMargin = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, marginDelta = _a.marginDelta;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, tempOverrides, scaledMarginDelta, factoryContract, peripheryAddress, peripheryContract, estimatedGas, updatePositionMarginTransaction, receipt, error_8;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (marginDelta === 0) {
                            throw new Error('No margin delta to update');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        tempOverrides = {};
                        if (this.isETH && marginDelta > 0) {
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginDelta.toString());
                            scaledMarginDelta = "0";
                        }
                        else {
                            scaledMarginDelta = this.scale(marginDelta);
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.callStatic.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, tempOverrides).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, this.environment);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, tempOverrides)];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, tempOverrides)];
                    case 4:
                        updatePositionMarginTransaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, updatePositionMarginTransaction.wait()];
                    case 6:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_8 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // liquidation 
    AMM.prototype.liquidatePosition = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, marginEngineContract, estimatedGas, liquidatePositionTransaction, receipt, error_9;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.liquidatePosition(owner, tickLower, tickUpper).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, marginEngineContract.estimateGas.liquidatePosition(owner, tickLower, tickUpper)];
                    case 2:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, marginEngineContract.liquidatePosition(owner, tickLower, tickUpper, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 3:
                        liquidatePositionTransaction = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, liquidatePositionTransaction.wait()];
                    case 5:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_9 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // settlement
    AMM.prototype.settlePosition = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, estimatedGas, settlePositionTransaction, receipt, error_10;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!(!owner)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = owner;
                        _c.label = 3;
                    case 3:
                        effectiveOwner = _b;
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 4:
                        peripheryAddress = _c.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.callStatic.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper)];
                    case 6:
                        estimatedGas = _c.sent();
                        return [4 /*yield*/, peripheryContract.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 7:
                        settlePositionTransaction = _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, settlePositionTransaction.wait()];
                    case 9:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 10:
                        error_10 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // FCM swap
    AMM.prototype.getInfoPostFCMSwap = function (_a) {
        var notional = _a.notional, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, factoryContract, peripheryAddress, peripheryContract, tickBefore, tickAfter, fee, availableNotional, fixedTokenDelta, fixedTokenDeltaUnbalanced, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, scaledAvailableNotional, scaledFee, averageFixedRate, additionalMargin, _b, cTokenAddress, cTokenContract, rate, scaledRate;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        switch (this.rateOracle.protocolId) {
                            case 1: {
                                fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            }
                            case 2: {
                                fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            }
                            default:
                                throw new Error("Unrecognized FCM");
                        }
                        scaledNotional = this.scale(notional);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _c.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                    case 2:
                        tickBefore = _c.sent();
                        tickAfter = 0;
                        fee = ethers_2.BigNumber.from(0);
                        availableNotional = ethers_2.BigNumber.from(0);
                        fixedTokenDelta = ethers_2.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_2.BigNumber.from(0);
                        return [4 /*yield*/, fcmContract.callStatic.initiateFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            fixedTokenDelta = result[0];
                                            availableNotional = result[1];
                                            fee = result[2];
                                            fixedTokenDeltaUnbalanced = result[3];
                                            return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                                        case 1:
                                            tickAfter = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostSwap)(error, _this.environment);
                                fixedTokenDelta = result.fixedTokenDelta;
                                tickAfter = result.tick;
                                fee = result.fee;
                                availableNotional = result.availableNotional;
                                fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
                            })];
                    case 3:
                        _c.sent();
                        fixedRateBefore = (0, priceTickConversions_1.tickToFixedRate)(tickBefore);
                        fixedRateAfter = (0, priceTickConversions_1.tickToFixedRate)(tickAfter);
                        fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
                        fixedRateDeltaRaw = fixedRateDelta.toNumber();
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        averageFixedRate = (availableNotional.eq(ethers_2.BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(ethers_2.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
                        additionalMargin = 0;
                        _b = this.rateOracle.protocolId;
                        switch (_b) {
                            case 1: return [3 /*break*/, 4];
                            case 2: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 8];
                    case 4:
                        {
                            additionalMargin = scaledAvailableNotional;
                            return [3 /*break*/, 9];
                        }
                        _c.label = 5;
                    case 5: return [4 /*yield*/, fcmContract.cToken()];
                    case 6:
                        cTokenAddress = _c.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.signer);
                        return [4 /*yield*/, cTokenContract.exchangeRateStored()];
                    case 7:
                        rate = _c.sent();
                        scaledRate = this.descaleCompoundValue(rate);
                        additionalMargin = scaledAvailableNotional / scaledRate;
                        return [3 /*break*/, 9];
                    case 8: throw new Error("Unrecognized FCM");
                    case 9: return [2 /*return*/, {
                            marginRequirement: additionalMargin < 0 ? -additionalMargin : additionalMargin,
                            availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                            fee: scaledFee < 0 ? -scaledFee : scaledFee,
                            slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                            averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                            fixedTokenDeltaBalance: this.descale(fixedTokenDelta),
                            variableTokenDeltaBalance: this.descale(availableNotional),
                            fixedTokenDeltaUnbalanced: this.descale(fixedTokenDeltaUnbalanced)
                        }];
                }
            });
        });
    };
    AMM.prototype.fcmSwap = function (_a) {
        var notional = _a.notional, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, estimatedGas, fcmSwapTransaction, receipt, error_11;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        switch (this.rateOracle.protocolId) {
                            case 1: {
                                fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            }
                            case 2: {
                                fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            }
                            default:
                                throw new Error("Unrecognized FCM");
                        }
                        scaledNotional = this.scale(notional);
                        return [4 /*yield*/, fcmContract.callStatic.initiateFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fcmContract.estimateGas.initiateFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96)];
                    case 2:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, fcmContract.initiateFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 3:
                        fcmSwapTransaction = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcmSwapTransaction.wait()];
                    case 5:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_11 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // FCM unwind
    AMM.prototype.getInfoPostFCMUnwind = function (_a) {
        var notionalToUnwind = _a.notionalToUnwind, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, factoryContract, peripheryAddress, peripheryContract, tickBefore, tickAfter, fee, availableNotional, fixedTokenDelta, fixedTokenDeltaUnbalanced, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, scaledAvailableNotional, scaledFee, averageFixedRate;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                        }
                        switch (this.rateOracle.protocolId) {
                            case 1:
                                fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            case 2:
                                fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            default:
                                throw new Error("Unrecognized FCM");
                        }
                        scaledNotional = this.scale(notionalToUnwind);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                    case 2:
                        tickBefore = _b.sent();
                        tickAfter = 0;
                        fee = ethers_2.BigNumber.from(0);
                        availableNotional = ethers_2.BigNumber.from(0);
                        fixedTokenDelta = ethers_2.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_2.BigNumber.from(0);
                        return [4 /*yield*/, fcmContract.callStatic.unwindFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            fixedTokenDelta = result[0];
                                            availableNotional = result[1];
                                            fee = result[2];
                                            fixedTokenDeltaUnbalanced = result[3];
                                            return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                                        case 1:
                                            tickAfter = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostSwap)(error, _this.environment);
                                fixedTokenDelta = result.fixedTokenDelta;
                                tickAfter = result.tick;
                                fee = result.fee;
                                availableNotional = result.availableNotional;
                                fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
                            })];
                    case 3:
                        _b.sent();
                        fixedRateBefore = (0, priceTickConversions_1.tickToFixedRate)(tickBefore);
                        fixedRateAfter = (0, priceTickConversions_1.tickToFixedRate)(tickAfter);
                        fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
                        fixedRateDeltaRaw = fixedRateDelta.toNumber();
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        averageFixedRate = (availableNotional.eq(ethers_2.BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(ethers_2.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
                        return [2 /*return*/, {
                                marginRequirement: 0,
                                availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                                fee: scaledFee < 0 ? -scaledFee : scaledFee,
                                slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                                averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                                fixedTokenDeltaBalance: this.descale(fixedTokenDelta),
                                variableTokenDeltaBalance: this.descale(availableNotional),
                                fixedTokenDeltaUnbalanced: this.descale(fixedTokenDeltaUnbalanced)
                            }];
                }
            });
        });
    };
    AMM.prototype.fcmUnwind = function (_a) {
        var notionalToUnwind = _a.notionalToUnwind, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, estimatedGas, fcmUnwindTransaction, receipt, error_12;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                        }
                        switch (this.rateOracle.protocolId) {
                            case 1:
                                fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            case 2:
                                fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            default:
                                throw new Error("Unrecognized FCM");
                        }
                        scaledNotional = this.scale(notionalToUnwind);
                        return [4 /*yield*/, fcmContract.callStatic.unwindFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fcmContract.estimateGas.unwindFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96)];
                    case 2:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, fcmContract.unwindFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 3:
                        fcmUnwindTransaction = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcmUnwindTransaction.wait()];
                    case 5:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_12 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // FCM settlement
    AMM.prototype.settleFCMTrader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcmContract, estimatedGas, fcmSettleTraderTransaction, receipt, error_13;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        switch (this.rateOracle.protocolId) {
                            case 1:
                                fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            case 2:
                                fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                                break;
                            default:
                                throw new Error("Unrecognized FCM");
                        }
                        return [4 /*yield*/, fcmContract.callStatic.settleTrader().catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fcmContract.estimateGas.settleTrader()];
                    case 2:
                        estimatedGas = _a.sent();
                        return [4 /*yield*/, fcmContract.settleTrader({
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 3:
                        fcmSettleTraderTransaction = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcmSettleTraderTransaction.wait()];
                    case 5:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_13 = _a.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // scale/descale according to underlying token
    AMM.prototype.scale = function (value) {
        var price = price_1.Price.fromNumber(value);
        var tokenAmount = tokenAmount_1.TokenAmount.fromFractionalAmount(this.underlyingToken, price.numerator, price.denominator);
        var scaledValue = tokenAmount.scale();
        return scaledValue;
    };
    AMM.prototype.descale = function (value) {
        if (this.underlyingToken.decimals <= 3) {
            return value.toNumber() / (Math.pow(10, this.underlyingToken.decimals));
        }
        else {
            return value.div(ethers_2.BigNumber.from(10).pow(this.underlyingToken.decimals - 3)).toNumber() / 1000;
        }
    };
    // descale compound tokens
    AMM.prototype.descaleCompoundValue = function (value) {
        var scaledValue = (value.div(ethers_2.BigNumber.from(10).pow(this.underlyingToken.decimals)).div(ethers_2.BigNumber.from(10).pow(4))).toNumber() / 1000000;
        return scaledValue;
    };
    // fcm approval
    AMM.prototype.isFCMApproved = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryContract, signerAddress, isApproved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        return [4 /*yield*/, factoryContract.isApproved(signerAddress, this.fcmAddress)];
                    case 2:
                        isApproved = _a.sent();
                        return [2 /*return*/, isApproved];
                }
            });
        });
    };
    AMM.prototype.approveFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isApproved, factoryContract, estimatedGas, approvalTransaction, receipt, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isFCMApproved()];
                    case 1:
                        isApproved = _a.sent();
                        if (isApproved) {
                            return [2 /*return*/];
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.estimateGas.setApproval(this.fcmAddress, true)];
                    case 2:
                        estimatedGas = _a.sent();
                        return [4 /*yield*/, factoryContract.setApproval(this.fcmAddress, true, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 3:
                        approvalTransaction = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, approvalTransaction.wait()];
                    case 5:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_14 = _a.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // underlying token approval for periphery
    AMM.prototype.isUnderlyingTokenApprovedForPeriphery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tokenAddress, token, factoryContract, peripheryAddress, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (this.isETH) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _a.sent();
                        return [4 /*yield*/, token.allowance(signerAddress, peripheryAddress)];
                    case 3:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance.gte(constants_1.TresholdApprovalBn)];
                }
            });
        });
    };
    AMM.prototype.isWethTokenApprovedForPeriphery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, token, factoryContract, peripheryAddress, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.isETH) {
                            throw new Error('Not an ETH pool');
                        }
                        if (!this.wethAddress) {
                            throw new Error('No WETH address');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        token = typechain_1.ERC20Mock__factory.connect(this.wethAddress, this.signer);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _a.sent();
                        return [4 /*yield*/, token.allowance(signerAddress, peripheryAddress)];
                    case 3:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance.gte(constants_1.TresholdApprovalBn)];
                }
            });
        });
    };
    AMM.prototype.approveUnderlyingTokenForPeriphery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isApproved, tokenAddress, token, factoryContract, peripheryAddress, estimatedGas, approvalTransaction, receipt, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        tokenAddress = this.underlyingToken.id;
                        if (!(this.isETH && this.wethAddress)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isWethTokenApprovedForPeriphery()];
                    case 1:
                        isApproved = _a.sent();
                        tokenAddress = this.wethAddress;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.isUnderlyingTokenApprovedForPeriphery()];
                    case 3:
                        isApproved = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (isApproved) {
                            return [2 /*return*/];
                        }
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 5:
                        peripheryAddress = _a.sent();
                        return [4 /*yield*/, token.estimateGas.approve(peripheryAddress, constants_1.MaxUint256Bn)];
                    case 6:
                        estimatedGas = _a.sent();
                        return [4 /*yield*/, token.approve(peripheryAddress, constants_1.MaxUint256Bn, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 7:
                        approvalTransaction = _a.sent();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, approvalTransaction.wait()];
                    case 9:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 10:
                        error_15 = _a.sent();
                        throw new Error("Token approval failed");
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // underlying token approval for fcm
    AMM.prototype.isUnderlyingTokenApprovedForFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tokenAddress, token, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.allowance(signerAddress, this.fcmAddress)];
                    case 2:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance.gte(constants_1.TresholdApprovalBn)];
                }
            });
        });
    };
    AMM.prototype.approveUnderlyingTokenForFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isApproved, tokenAddress, token, estimatedGas, approvalTransaction, receipt, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isUnderlyingTokenApprovedForFCM()];
                    case 1:
                        isApproved = _a.sent();
                        if (isApproved) {
                            return [2 /*return*/];
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.estimateGas.approve(this.fcmAddress, constants_1.MaxUint256Bn)];
                    case 2:
                        estimatedGas = _a.sent();
                        return [4 /*yield*/, token.approve(this.fcmAddress, constants_1.MaxUint256Bn, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 3:
                        approvalTransaction = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, approvalTransaction.wait()];
                    case 5:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_16 = _a.sent();
                        throw new Error("Token approval failed");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // yield bearing token approval for fcm
    AMM.prototype.isYieldBearingTokenApprovedForFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddress, _a, fcmContract, fcmContract, signerAddress, token, allowance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        _a = this.rateOracle.protocolId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 1];
                            case 2: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.underlyingYieldBearingToken()];
                    case 2:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.cToken()];
                    case 4:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error("Unrecognized FCM");
                    case 6: return [4 /*yield*/, this.signer.getAddress()];
                    case 7:
                        signerAddress = _b.sent();
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.allowance(signerAddress, this.fcmAddress)];
                    case 8:
                        allowance = _b.sent();
                        return [2 /*return*/, allowance.gte(constants_1.TresholdApprovalBn)];
                }
            });
        });
    };
    Object.defineProperty(AMM.prototype, "protocol", {
        // protocol name
        get: function () {
            var tokenName = this.underlyingToken.name;
            var prefix;
            switch (this.rateOracle.protocolId) {
                case 1: {
                    prefix = "a";
                    break;
                }
                case 2: {
                    prefix = "c";
                    break;
                }
                case 3: {
                    prefix = "st";
                    break;
                }
                case 4: {
                    prefix = "r";
                    break;
                }
                case 5: {
                    prefix = "a";
                    break;
                }
                case 6: {
                    prefix = "c";
                    break;
                }
                default: {
                    throw new Error("Unrecognized protocol");
                }
            }
            return "".concat(prefix).concat(tokenName);
        },
        enumerable: false,
        configurable: true
    });
    AMM.prototype.approveYieldBearingTokenForFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isApproved, tokenAddress, _a, fcmContract, fcmContract, token, estimatedGas, approvalTransaction, receipt, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.isYieldBearingTokenApprovedForFCM()];
                    case 1:
                        isApproved = _b.sent();
                        if (isApproved) {
                            return [2 /*return*/];
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        _a = this.rateOracle.protocolId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 2];
                            case 2: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.underlyingYieldBearingToken()];
                    case 3:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.cToken()];
                    case 5:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error("Unrecognized FCM");
                    case 7:
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.estimateGas.approve(this.fcmAddress, constants_1.MaxUint256Bn)];
                    case 8:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, token.approve(this.fcmAddress, constants_1.MaxUint256Bn, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 9:
                        approvalTransaction = _b.sent();
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, approvalTransaction.wait()];
                    case 11:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 12:
                        error_17 = _b.sent();
                        throw new Error("Token approval failed");
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AMM.prototype, "startDateTime", {
        // start and end dates
        get: function () {
            return (0, timestampWadToDateTime_1.default)(this.termStartTimestamp);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AMM.prototype, "endDateTime", {
        get: function () {
            return (0, timestampWadToDateTime_1.default)(this.termEndTimestamp);
        },
        enumerable: false,
        configurable: true
    });
    // get position information
    AMM.prototype.getFixedApr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryContract, peripheryAddress, peripheryContract, currentTick, apr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.provider);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _a.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.provider);
                        return [4 /*yield*/, peripheryContract.callStatic.getCurrentTick(this.marginEngineAddress)];
                    case 2:
                        currentTick = _a.sent();
                        apr = (0, priceTickConversions_1.tickToFixedRate)(currentTick).toNumber();
                        return [2 /*return*/, apr];
                }
            });
        });
    };
    AMM.prototype.getVariableApy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var marginEngineContract, historicalApy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.provider);
                        return [4 /*yield*/, marginEngineContract.callStatic.getHistoricalApy()];
                    case 1:
                        historicalApy = _a.sent();
                        return [2 /*return*/, parseFloat(ethers_2.utils.formatEther(historicalApy))];
                }
            });
        });
    };
    AMM.prototype.getAllSwaps = function (position) {
        var allSwaps = [];
        for (var _i = 0, _a = position.swaps; _i < _a.length; _i++) {
            var s = _a[_i];
            allSwaps.push({
                fDelta: ethers_2.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
                vDelta: ethers_2.BigNumber.from(s.variableTokenDelta.toString()),
                timestamp: ethers_2.BigNumber.from(s.transactionTimestamp.toString())
            });
        }
        for (var _b = 0, _c = position.fcmSwaps; _b < _c.length; _b++) {
            var s = _c[_b];
            allSwaps.push({
                fDelta: ethers_2.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
                vDelta: ethers_2.BigNumber.from(s.variableTokenDelta.toString()),
                timestamp: ethers_2.BigNumber.from(s.transactionTimestamp.toString())
            });
        }
        for (var _d = 0, _e = position.fcmUnwinds; _d < _e.length; _d++) {
            var s = _e[_d];
            allSwaps.push({
                fDelta: ethers_2.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
                vDelta: ethers_2.BigNumber.from(s.variableTokenDelta.toString()),
                timestamp: ethers_2.BigNumber.from(s.transactionTimestamp.toString())
            });
        }
        allSwaps.sort(function (a, b) { return a.timestamp.sub(b.timestamp).toNumber(); });
        return allSwaps;
    };
    AMM.prototype.getAccruedCashflow = function (allSwaps, atMaturity) {
        return __awaiter(this, void 0, void 0, function () {
            var accruedCashflow, lenSwaps, lastBlock, lastBlockTimestamp, _a, _b, untilTimestamp, rateOracleContract, i, currentSwapTimestamp, normalizedTime, variableFactorBetweenSwaps, fixedCashflow, variableCashflow, cashflow;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Wallet not connected');
                        }
                        accruedCashflow = ethers_2.BigNumber.from(0);
                        lenSwaps = allSwaps.length;
                        return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 1:
                        lastBlock = _c.sent();
                        _b = (_a = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 2)];
                    case 2:
                        lastBlockTimestamp = _b.apply(_a, [(_c.sent()).timestamp]);
                        untilTimestamp = (atMaturity)
                            ? ethers_2.BigNumber.from(this.termEndTimestamp.toString())
                            : lastBlockTimestamp.mul(ethers_2.BigNumber.from(10).pow(18));
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < lenSwaps)) return [3 /*break*/, 6];
                        currentSwapTimestamp = allSwaps[i].timestamp.mul(ethers_2.BigNumber.from(10).pow(18));
                        normalizedTime = (untilTimestamp.sub(currentSwapTimestamp)).div(ethers_2.BigNumber.from(constants_1.ONE_YEAR_IN_SECONDS));
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(currentSwapTimestamp, untilTimestamp)];
                    case 4:
                        variableFactorBetweenSwaps = _c.sent();
                        fixedCashflow = allSwaps[i].fDelta.mul(normalizedTime).div(ethers_2.BigNumber.from(100)).div(ethers_2.BigNumber.from(10).pow(18));
                        variableCashflow = allSwaps[i].vDelta.mul(variableFactorBetweenSwaps).div(ethers_2.BigNumber.from(10).pow(18));
                        cashflow = fixedCashflow.add(variableCashflow);
                        accruedCashflow = accruedCashflow.add(cashflow);
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, this.descale(accruedCashflow)];
                }
            });
        });
    };
    AMM.prototype.getVariableFactor = function (termStartTimestamp, termEndTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var rateOracleContract, result, resultScaled, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(termStartTimestamp, termEndTimestamp)];
                    case 2:
                        result = _a.sent();
                        resultScaled = result.div(ethers_2.BigNumber.from(10).pow(12)).toNumber() / 1000000;
                        return [2 /*return*/, resultScaled];
                    case 3:
                        error_18 = _a.sent();
                        throw new Error("Cannot get variable factor");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.getPositionInformation = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var results, signerAddress, lastBlock, lastBlockTimestamp, _a, _b, beforeMaturity, _c, allSwaps, lenSwaps, _d, accruedCashflowInUnderlyingToken, EthToUsdPrice_1, _1, accruedCashflowInUnderlyingToken, EthToUsdPrice_2, _2, _e, fcmContract, margin, marginInUnderlyingToken, EthToUsdPrice_3, fcmContract, margin, cTokenAddress, cTokenContract, rate, scaledRate, marginInUnderlyingToken, EthToUsdPrice_4, tickLower, tickUpper, marginEngineContract, rawPositionInfo, marginInUnderlyingToken, EthToUsdPrice_5, liquidationThreshold, _3, safetyThreshold, _4, notionalInUnderlyingToken, EthToUsdPrice;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        results = {
                            notionalInUSD: 0,
                            marginInUSD: 0,
                            margin: 0,
                            accruedCashflowInUSD: 0,
                            accruedCashflow: 0,
                            beforeMaturity: false
                        };
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _f.sent();
                        return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 2:
                        lastBlock = _f.sent();
                        _b = (_a = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 3:
                        lastBlockTimestamp = _b.apply(_a, [(_f.sent()).timestamp]);
                        beforeMaturity = (lastBlockTimestamp.mul(ethers_2.BigNumber.from(10).pow(18))).lt(ethers_2.BigNumber.from(this.termEndTimestamp.toString()));
                        results.beforeMaturity = beforeMaturity;
                        if (!beforeMaturity) return [3 /*break*/, 5];
                        _c = results;
                        return [4 /*yield*/, this.getFixedApr()];
                    case 4:
                        _c.fixedApr = _f.sent();
                        _f.label = 5;
                    case 5:
                        allSwaps = this.getAllSwaps(position);
                        lenSwaps = allSwaps.length;
                        if (!(lenSwaps > 0)) return [3 /*break*/, 17];
                        if (!beforeMaturity) return [3 /*break*/, 12];
                        if (!(lenSwaps > 0)) return [3 /*break*/, 11];
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 10, , 11]);
                        _d = results;
                        return [4 /*yield*/, this.getInstantApy()];
                    case 7:
                        _d.variableRateSinceLastSwap = (_f.sent()) * 100;
                        results.fixedRateSinceLastSwap = position.averageFixedRate;
                        return [4 /*yield*/, this.getAccruedCashflow(allSwaps, false)];
                    case 8:
                        accruedCashflowInUnderlyingToken = _f.sent();
                        results.accruedCashflow = accruedCashflowInUnderlyingToken;
                        return [4 /*yield*/, geckoEthToUsd()];
                    case 9:
                        EthToUsdPrice_1 = _f.sent();
                        if (this.isETH) {
                            // need to change when introduce non-stable coins
                            results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken * EthToUsdPrice_1;
                        }
                        else {
                            results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken;
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        _1 = _f.sent();
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 17];
                    case 12:
                        if (!!position.isSettled) return [3 /*break*/, 17];
                        _f.label = 13;
                    case 13:
                        _f.trys.push([13, 16, , 17]);
                        return [4 /*yield*/, this.getAccruedCashflow(allSwaps, true)];
                    case 14:
                        accruedCashflowInUnderlyingToken = _f.sent();
                        results.accruedCashflow = accruedCashflowInUnderlyingToken;
                        return [4 /*yield*/, geckoEthToUsd()];
                    case 15:
                        EthToUsdPrice_2 = _f.sent();
                        if (this.isETH) {
                            // need to change when introduce non-stable coins
                            results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken * EthToUsdPrice_2;
                        }
                        else {
                            results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken;
                        }
                        return [3 /*break*/, 17];
                    case 16:
                        _2 = _f.sent();
                        return [3 /*break*/, 17];
                    case 17:
                        if (!position.source.includes("FCM")) return [3 /*break*/, 28];
                        _e = this.rateOracle.protocolId;
                        switch (_e) {
                            case 1: return [3 /*break*/, 18];
                            case 2: return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 26];
                    case 18:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.getTraderMarginInATokens(signerAddress)];
                    case 19:
                        margin = (_f.sent());
                        results.margin = this.descale(margin);
                        marginInUnderlyingToken = results.margin;
                        return [4 /*yield*/, geckoEthToUsd()];
                    case 20:
                        EthToUsdPrice_3 = _f.sent();
                        if (this.isETH) {
                            // need to change when introduce non-stable coins
                            results.marginInUSD = marginInUnderlyingToken * EthToUsdPrice_3;
                        }
                        else {
                            results.marginInUSD = marginInUnderlyingToken;
                        }
                        return [3 /*break*/, 27];
                    case 21:
                        fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.getTraderMarginInCTokens(signerAddress)];
                    case 22:
                        margin = (_f.sent());
                        results.margin = margin.toNumber() / (Math.pow(10, 8));
                        return [4 /*yield*/, fcmContract.cToken()];
                    case 23:
                        cTokenAddress = _f.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.signer);
                        return [4 /*yield*/, cTokenContract.exchangeRateStored()];
                    case 24:
                        rate = _f.sent();
                        scaledRate = this.descaleCompoundValue(rate);
                        marginInUnderlyingToken = results.margin * scaledRate;
                        return [4 /*yield*/, geckoEthToUsd()];
                    case 25:
                        EthToUsdPrice_4 = _f.sent();
                        if (this.isETH) {
                            // need to change when introduce non-stable coins
                            results.marginInUSD = marginInUnderlyingToken * EthToUsdPrice_4;
                        }
                        else {
                            results.marginInUSD = marginInUnderlyingToken;
                        }
                        return [3 /*break*/, 27];
                    case 26: throw new Error("Unrecognized FCM");
                    case 27:
                        if (beforeMaturity) {
                            results.healthFactor = 3;
                        }
                        return [3 /*break*/, 38];
                    case 28:
                        tickLower = position.tickLower;
                        tickUpper = position.tickUpper;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 29:
                        rawPositionInfo = _f.sent();
                        results.margin = this.descale(rawPositionInfo.margin);
                        marginInUnderlyingToken = results.margin;
                        return [4 /*yield*/, geckoEthToUsd()];
                    case 30:
                        EthToUsdPrice_5 = _f.sent();
                        if (this.isETH) {
                            // need to change when introduce non-stable coins
                            results.marginInUSD = marginInUnderlyingToken * EthToUsdPrice_5;
                        }
                        else {
                            results.marginInUSD = marginInUnderlyingToken;
                        }
                        results.fees = this.descale(rawPositionInfo.accumulatedFees);
                        if (!beforeMaturity) return [3 /*break*/, 38];
                        _f.label = 31;
                    case 31:
                        _f.trys.push([31, 33, , 34]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, true)];
                    case 32:
                        liquidationThreshold = _f.sent();
                        results.liquidationThreshold = this.descale(liquidationThreshold);
                        return [3 /*break*/, 34];
                    case 33:
                        _3 = _f.sent();
                        return [3 /*break*/, 34];
                    case 34:
                        _f.trys.push([34, 36, , 37]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, false)];
                    case 35:
                        safetyThreshold = _f.sent();
                        results.safetyThreshold = this.descale(safetyThreshold);
                        return [3 /*break*/, 37];
                    case 36:
                        _4 = _f.sent();
                        return [3 /*break*/, 37];
                    case 37:
                        if (!(0, lodash_1.isUndefined)(results.liquidationThreshold) && !(0, lodash_1.isUndefined)(results.safetyThreshold)) {
                            results.healthFactor = (results.margin < results.liquidationThreshold) ? 1 : (results.margin < results.safetyThreshold ? 2 : 3);
                        }
                        _f.label = 38;
                    case 38:
                        notionalInUnderlyingToken = (position.positionType === 3)
                            ? Math.abs(position.notional) // LP
                            : Math.abs(position.effectiveVariableTokenBalance);
                        return [4 /*yield*/, geckoEthToUsd()];
                    case 39:
                        EthToUsdPrice = _f.sent();
                        if (this.isETH) {
                            // need to change when introduce non-stable coins
                            results.notionalInUSD = notionalInUnderlyingToken * EthToUsdPrice;
                        }
                        else {
                            results.notionalInUSD = notionalInUnderlyingToken;
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    // tick functionalities
    AMM.prototype.closestTickAndFixedRate = function (fixedRate) {
        if (fixedRate < constants_1.MIN_FIXED_RATE) {
            fixedRate = constants_1.MIN_FIXED_RATE;
        }
        if (fixedRate > constants_1.MAX_FIXED_RATE) {
            fixedRate = constants_1.MAX_FIXED_RATE;
        }
        var fixedRatePrice = price_1.Price.fromNumber(fixedRate);
        var closestTick = (0, priceTickConversions_1.fixedRateToClosestTick)(fixedRatePrice);
        var closestUsableTick = (0, nearestUsableTick_1.nearestUsableTick)(closestTick, this.tickSpacing);
        var closestUsableFixedRate = (0, priceTickConversions_1.tickToFixedRate)(closestUsableTick);
        return {
            closestUsableTick: closestUsableTick,
            closestUsableFixedRate: closestUsableFixedRate,
        };
    };
    AMM.prototype.getNextUsableFixedRate = function (fixedRate, count) {
        var closestUsableTick = this.closestTickAndFixedRate(fixedRate).closestUsableTick;
        closestUsableTick -= count * this.tickSpacing;
        return (0, priceTickConversions_1.tickToFixedRate)(closestUsableTick).toNumber();
    };
    // balance checks
    AMM.prototype.hasEnoughUnderlyingTokens = function (amount, rolloverPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, currentBalance, tokenAddress, token, scaledAmount, tickUpper, tickLower, marginEngineContract, position, start, end, timeInYearsFromStartToEnd, rateOracleContract, variableFactor, fixedCashflow, variableCashflow, cashflow, marginAfterSettlement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        if (!this.isETH) return [3 /*break*/, 3];
                        if (!this.signer.provider) {
                            throw new Error('Provider not connected');
                        }
                        return [4 /*yield*/, this.signer.provider.getBalance(signerAddress)];
                    case 2:
                        currentBalance = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.balanceOf(signerAddress)];
                    case 4:
                        currentBalance = _a.sent();
                        _a.label = 5;
                    case 5:
                        scaledAmount = ethers_2.BigNumber.from(this.scale(amount));
                        if (!rolloverPosition) return [3 /*break*/, 8];
                        if (rolloverPosition.fixedLow >= rolloverPosition.fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (rolloverPosition.fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (rolloverPosition.fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        tickUpper = this.closestTickAndFixedRate(rolloverPosition.fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(rolloverPosition.fixedHigh).closestUsableTick;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 6:
                        position = _a.sent();
                        start = ethers_2.BigNumber.from(this.termStartTimestamp.toString());
                        end = ethers_2.BigNumber.from(this.termEndTimestamp.toString());
                        timeInYearsFromStartToEnd = (end.sub(start)).div(constants_1.ONE_YEAR_IN_SECONDS);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.signer);
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(this.termStartTimestamp.toString(), this.termEndTimestamp.toString())];
                    case 7:
                        variableFactor = _a.sent();
                        fixedCashflow = position.fixedTokenBalance.mul(timeInYearsFromStartToEnd).div(ethers_2.BigNumber.from(100)).div(ethers_2.BigNumber.from(10).pow(18));
                        variableCashflow = position.variableTokenBalance.mul(variableFactor).div(ethers_2.BigNumber.from(10).pow(18));
                        cashflow = fixedCashflow.add(variableCashflow);
                        marginAfterSettlement = position.margin.add(cashflow);
                        return [2 /*return*/, (currentBalance.add(marginAfterSettlement)).gte(scaledAmount)];
                    case 8: return [2 /*return*/, currentBalance.gte(scaledAmount)];
                }
            });
        });
    };
    AMM.prototype.hasEnoughYieldBearingTokens = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tokenAddress, _a, fcmContract, fcmContract, token, currentBalance, scaledAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _b.sent();
                        _a = this.rateOracle.protocolId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 2];
                            case 2: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.underlyingYieldBearingToken()];
                    case 3:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.cToken()];
                    case 5:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error("Unrecognized FCM");
                    case 7:
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.balanceOf(signerAddress)];
                    case 8:
                        currentBalance = _b.sent();
                        scaledAmount = ethers_2.BigNumber.from(this.scale(amount));
                        return [2 /*return*/, currentBalance.gte(scaledAmount)];
                }
            });
        });
    };
    AMM.prototype.underlyingTokens = function (rolloverPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, currentBalance, tokenAddress, token, tickUpper, tickLower, marginEngineContract, position, start, end, timeInYearsFromStartToEnd, rateOracleContract, variableFactor, fixedCashflow, variableCashflow, cashflow, marginAfterSettlement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        if (!this.isETH) return [3 /*break*/, 3];
                        if (!this.provider) {
                            throw new Error('Provider not connected');
                        }
                        return [4 /*yield*/, this.provider.getBalance(signerAddress)];
                    case 2:
                        currentBalance = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.balanceOf(signerAddress)];
                    case 4:
                        currentBalance = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!rolloverPosition) return [3 /*break*/, 8];
                        if (rolloverPosition.fixedLow >= rolloverPosition.fixedHigh) {
                            throw new Error('Lower Rate must be smaller than Upper Rate');
                        }
                        if (rolloverPosition.fixedLow < constants_1.MIN_FIXED_RATE) {
                            throw new Error('Lower Rate is too low');
                        }
                        if (rolloverPosition.fixedHigh > constants_1.MAX_FIXED_RATE) {
                            throw new Error('Upper Rate is too high');
                        }
                        tickUpper = this.closestTickAndFixedRate(rolloverPosition.fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(rolloverPosition.fixedHigh).closestUsableTick;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 6:
                        position = _a.sent();
                        start = ethers_2.BigNumber.from(this.termStartTimestamp.toString());
                        end = ethers_2.BigNumber.from(this.termEndTimestamp.toString());
                        timeInYearsFromStartToEnd = (end.sub(start)).div(constants_1.ONE_YEAR_IN_SECONDS);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.signer);
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(this.termStartTimestamp.toString(), this.termEndTimestamp.toString())];
                    case 7:
                        variableFactor = _a.sent();
                        fixedCashflow = position.fixedTokenBalance.mul(timeInYearsFromStartToEnd).div(ethers_2.BigNumber.from(100)).div(ethers_2.BigNumber.from(10).pow(18));
                        variableCashflow = position.variableTokenBalance.mul(variableFactor).div(ethers_2.BigNumber.from(10).pow(18));
                        cashflow = fixedCashflow.add(variableCashflow);
                        marginAfterSettlement = position.margin.add(cashflow);
                        return [2 /*return*/, this.descale(currentBalance.add(marginAfterSettlement))];
                    case 8: return [2 /*return*/, this.descale(currentBalance)];
                }
            });
        });
    };
    AMM.prototype.yieldBearingTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tokenAddress, _a, fcmContract, fcmContract, token, currentBalance, decimals;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _b.sent();
                        _a = this.rateOracle.protocolId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 2];
                            case 2: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.underlyingYieldBearingToken()];
                    case 3:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.cToken()];
                    case 5:
                        tokenAddress = _b.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error("Unrecognized FCM");
                    case 7:
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.balanceOf(signerAddress)];
                    case 8:
                        currentBalance = _b.sent();
                        return [4 /*yield*/, token.decimals()];
                    case 9:
                        decimals = _b.sent();
                        if (decimals <= 3) {
                            return [2 /*return*/, currentBalance.toNumber() / (Math.pow(10, decimals))];
                        }
                        else {
                            return [2 /*return*/, currentBalance.div(ethers_2.BigNumber.from(10).pow(decimals - 3)).toNumber() / 1000];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // caps
    AMM.prototype.setCap = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var factoryContract, peripheryAddress, peripheryContract, marginEngineContract, vammAddress, vammContract, isAlphaTransaction, error_19, isAlphaTransactionME, error_20, setCapTransaction, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _a.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.vamm()];
                    case 2:
                        vammAddress = _a.sent();
                        vammContract = typechain_1.VAMM__factory.connect(vammAddress, this.signer);
                        return [4 /*yield*/, vammContract.setIsAlpha(true)];
                    case 3:
                        isAlphaTransaction = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, isAlphaTransaction.wait()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_19 = _a.sent();
                        throw new Error("Setting Alpha failed");
                    case 7: return [4 /*yield*/, marginEngineContract.setIsAlpha(true)];
                    case 8:
                        isAlphaTransactionME = _a.sent();
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, isAlphaTransactionME.wait()];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_20 = _a.sent();
                        throw new Error("Setting Alpha failed");
                    case 12: return [4 /*yield*/, peripheryContract.setLPMarginCap(vammAddress, this.scale(amount))];
                    case 13:
                        setCapTransaction = _a.sent();
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, setCapTransaction.wait()];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        error_21 = _a.sent();
                        throw new Error("Setting cap failed");
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.getCapPercentage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryContract, peripheryAddress, peripheryContract, marginEngineContract, vammAddress, vammContract, isAlpha, accumulated, cap, percentage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.provider);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _a.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.provider);
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.provider);
                        return [4 /*yield*/, marginEngineContract.vamm()];
                    case 2:
                        vammAddress = _a.sent();
                        vammContract = typechain_1.VAMM__factory.connect(vammAddress, this.provider);
                        return [4 /*yield*/, vammContract.isAlpha()];
                    case 3:
                        isAlpha = _a.sent();
                        if (!isAlpha) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, peripheryContract.lpMarginCumulatives(vammAddress)];
                    case 4:
                        accumulated = _a.sent();
                        return [4 /*yield*/, peripheryContract.lpMarginCaps(vammAddress)];
                    case 5:
                        cap = _a.sent();
                        if (cap.eq(ethers_2.BigNumber.from(0))) {
                            return [2 /*return*/, 0];
                        }
                        percentage = (accumulated.mul(100000).div(cap)).toNumber() / 1000;
                        return [2 /*return*/, percentage];
                }
            });
        });
    };
    // current position margin requirement
    AMM.prototype.getPositionMarginRequirement = function (fixedLow, fixedHigh) {
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, marginEngineContract, signerAddress, requirement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, false)];
                    case 2:
                        requirement = _a.sent();
                        return [2 /*return*/, this.descale(requirement)];
                }
            });
        });
    };
    // one week look-back window apy
    AMM.prototype.getInstantApy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blocksPerDay, blockPerHour, _a, lastBlock, oneBlockAgo, _b, _c, twoBlocksAgo, _d, _e, rateOracleContract, oneWeekApy, daysPerYear, rateOracle, cTokenAddress, cTokenContract, supplyRatePerBlock, supplyApy, lastBlock, to, _f, _g, from, _h, _j, rateOracleContract, oneWeekApy, lastBlock, to, _k, _l, from, _m, _o, rateOracleContract, oneWeekApy, rateOracleContract, lendingPoolAddress, lendingPool, reservesData, rateInRay, daysPerYear, rateOracle, cTokenAddress, cTokenContract, supplyRatePerBlock, supplyApy;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        blocksPerDay = 6570;
                        blockPerHour = 274;
                        _a = this.rateOracle.protocolId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 1];
                            case 2: return [3 /*break*/, 6];
                            case 3: return [3 /*break*/, 9];
                            case 4: return [3 /*break*/, 14];
                            case 5: return [3 /*break*/, 19];
                            case 6: return [3 /*break*/, 22];
                        }
                        return [3 /*break*/, 25];
                    case 1: return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 2:
                        lastBlock = _p.sent();
                        _c = (_b = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 3:
                        oneBlockAgo = _c.apply(_b, [(_p.sent()).timestamp]);
                        _e = (_d = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 2)];
                    case 4:
                        twoBlocksAgo = _e.apply(_d, [(_p.sent()).timestamp]);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(twoBlocksAgo, oneBlockAgo)];
                    case 5:
                        oneWeekApy = _p.sent();
                        return [2 /*return*/, oneWeekApy.div(ethers_2.BigNumber.from(1000000000000)).toNumber() / 1000000];
                    case 6:
                        daysPerYear = 365;
                        rateOracle = typechain_1.CompoundRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracle.ctoken()];
                    case 7:
                        cTokenAddress = _p.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.provider);
                        return [4 /*yield*/, cTokenContract.supplyRatePerBlock()];
                    case 8:
                        supplyRatePerBlock = _p.sent();
                        supplyApy = (((Math.pow((supplyRatePerBlock.toNumber() / 1e18 * blocksPerDay) + 1, daysPerYear))) - 1);
                        return [2 /*return*/, supplyApy];
                    case 9: return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 10:
                        lastBlock = _p.sent();
                        _g = (_f = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 11:
                        to = _g.apply(_f, [(_p.sent()).timestamp]);
                        _j = (_h = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 28 * blockPerHour)];
                    case 12:
                        from = _j.apply(_h, [(_p.sent()).timestamp]);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(from, to)];
                    case 13:
                        oneWeekApy = _p.sent();
                        return [2 /*return*/, oneWeekApy.div(ethers_2.BigNumber.from(1000000000000)).toNumber() / 1000000];
                    case 14: return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 15:
                        lastBlock = _p.sent();
                        _l = (_k = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 16:
                        to = _l.apply(_k, [(_p.sent()).timestamp]);
                        _o = (_m = ethers_2.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 28 * blockPerHour)];
                    case 17:
                        from = _o.apply(_m, [(_p.sent()).timestamp]);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(from, to)];
                    case 18:
                        oneWeekApy = _p.sent();
                        return [2 /*return*/, oneWeekApy.div(ethers_2.BigNumber.from(1000000000000)).toNumber() / 1000000];
                    case 19:
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        rateOracleContract = typechain_1.AaveBorrowRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.aaveLendingPool()];
                    case 20:
                        lendingPoolAddress = _p.sent();
                        lendingPool = typechain_1.IAaveV2LendingPool__factory.connect(lendingPoolAddress, this.provider);
                        return [4 /*yield*/, lendingPool.getReserveData(this.underlyingToken.id)];
                    case 21:
                        reservesData = _p.sent();
                        rateInRay = reservesData.currentVariableBorrowRate;
                        return [2 /*return*/, rateInRay.div(ethers_2.BigNumber.from(10).pow(27)).toNumber()];
                    case 22:
                        daysPerYear = 365;
                        rateOracle = typechain_1.CompoundRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracle.ctoken()];
                    case 23:
                        cTokenAddress = _p.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.provider);
                        return [4 /*yield*/, cTokenContract.supplyRatePerBlock()];
                    case 24:
                        supplyRatePerBlock = _p.sent();
                        supplyApy = (((Math.pow((supplyRatePerBlock.toNumber() / 1e18 * blocksPerDay) + 1, daysPerYear))) - 1);
                        return [2 /*return*/, supplyApy];
                    case 25: throw new Error("Unrecognized protocol");
                }
            });
        });
    };
    return AMM;
}());
exports.default = AMM;
