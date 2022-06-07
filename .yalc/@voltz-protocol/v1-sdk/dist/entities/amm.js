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
var AMM = /** @class */ (function () {
    function AMM(_a) {
        var id = _a.id, signer = _a.signer, provider = _a.provider, environment = _a.environment, factoryAddress = _a.factoryAddress, peripheryAddress = _a.peripheryAddress, marginEngineAddress = _a.marginEngineAddress, fcmAddress = _a.fcmAddress, rateOracle = _a.rateOracle, updatedTimestamp = _a.updatedTimestamp, termStartTimestamp = _a.termStartTimestamp, termEndTimestamp = _a.termEndTimestamp, underlyingToken = _a.underlyingToken, tick = _a.tick, tickSpacing = _a.tickSpacing, txCount = _a.txCount, totalNotionalTraded = _a.totalNotionalTraded, totalLiquidity = _a.totalLiquidity;
        this.id = id;
        this.signer = signer;
        this.provider = provider || (signer === null || signer === void 0 ? void 0 : signer.provider);
        this.environment = environment;
        this.factoryAddress = factoryAddress;
        this.peripheryAddress = peripheryAddress;
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
    }
    // swap
    AMM.prototype.getInfoPostSwap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, scaledNotional, peripheryContract, swapPeripheryParams, tickBefore, tickAfter, marginRequirement, fee, availableNotional, fixedTokenDeltaUnbalanced, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, marginEngineContract, currentMargin, scaledCurrentMargin, scaledAvailableNotional, scaledFee, scaledMarginRequirement, additionalMargin, averageFixedRate;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
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
                    case 2:
                        tickBefore = _b.sent();
                        tickAfter = 0;
                        marginRequirement = ethers_1.BigNumber.from(0);
                        fee = ethers_1.BigNumber.from(0);
                        availableNotional = ethers_1.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_1.BigNumber.from(0);
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams).then(function (result) {
                                availableNotional = result[1];
                                fee = result[2];
                                fixedTokenDeltaUnbalanced = result[3];
                                marginRequirement = result[4];
                                tickAfter = parseInt(result[5]);
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostSwap)(error, _this.environment);
                                marginRequirement = result.marginRequirement;
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
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 4:
                        currentMargin = (_b.sent()).margin;
                        scaledCurrentMargin = this.descale(currentMargin);
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        scaledMarginRequirement = (this.descale(marginRequirement) + scaledFee) * 1.01;
                        additionalMargin = scaledMarginRequirement > scaledCurrentMargin
                            ? scaledMarginRequirement - scaledCurrentMargin
                            : 0;
                        averageFixedRate = (availableNotional.eq(ethers_1.BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(ethers_1.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
                        return [2 /*return*/, {
                                marginRequirement: additionalMargin,
                                availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                                fee: scaledFee < 0 ? -scaledFee : scaledFee,
                                slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                                averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                            }];
                }
            });
        });
    };
    AMM.prototype.swap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, peripheryContract, scaledNotional, scaledMarginDelta, swapPeripheryParams, estimatedGas, swapTransaction, receipt, error_1;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
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
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, this.environment);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.swap(swapPeripheryParams).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, peripheryContract.swap(swapPeripheryParams, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            }).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        swapTransaction = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 5:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_1 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // mint
    AMM.prototype.getInfoPostMint = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional;
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tickUpper, tickLower, peripheryContract, scaledNotional, mintOrBurnParams, marginRequirement, marginEngineContract, currentMargin, scaledCurrentMargin, scaledMarginRequirement;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: scaledNotional,
                            isMint: true,
                            marginDelta: '0',
                        };
                        marginRequirement = ethers_1.BigNumber.from('0');
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).then(function (result) {
                                marginRequirement = ethers_1.BigNumber.from(result);
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostMint)(error, _this.environment);
                                marginRequirement = result.marginRequirement;
                            })];
                    case 2:
                        _b.sent();
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 3:
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
            var tickUpper, tickLower, peripheryContract, _notional, _marginDelta, mintOrBurnParams, estimatedGas, mintTransaction, receipt, error_2;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        _notional = this.scale(notional);
                        _marginDelta = this.scale(margin);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: _notional,
                            isMint: true,
                            marginDelta: _marginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            }).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        mintTransaction = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, mintTransaction.wait()];
                    case 5:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_2 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // burn
    AMM.prototype.burn = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, peripheryContract, _notional, mintOrBurnParams, estimatedGas, burnTransaction, receipt, error_3;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
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
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams)];
                    case 2:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            }).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        burnTransaction = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, burnTransaction.wait()];
                    case 5:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_3 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // update position margin
    AMM.prototype.updatePositionMargin = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, marginDelta = _a.marginDelta;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, tickUpper, tickLower, scaledMarginDelta, peripheryContract, estimatedGas, updatePositionMarginTransaction, receipt, error_4;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
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
                        scaledMarginDelta = this.scale(marginDelta);
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.callStatic.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, this.environment);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false)];
                    case 5:
                        estimatedGas = _c.sent();
                        return [4 /*yield*/, peripheryContract.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 6:
                        updatePositionMarginTransaction = _c.sent();
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, updatePositionMarginTransaction.wait()];
                    case 8:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 9:
                        error_4 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // liquidation 
    AMM.prototype.liquidatePosition = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, marginEngineContract, estimatedGas, liquidatePositionTransaction, receipt, error_5;
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
                        error_5 = _b.sent();
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
            var effectiveOwner, _b, tickUpper, tickLower, peripheryContract, estimatedGas, settlePositionTransaction, receipt, error_6;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.callStatic.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper)];
                    case 5:
                        estimatedGas = _c.sent();
                        return [4 /*yield*/, peripheryContract.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas)
                            })];
                    case 6:
                        settlePositionTransaction = _c.sent();
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, settlePositionTransaction.wait()];
                    case 8:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 9:
                        error_6 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // FCM swap
    AMM.prototype.getInfoPostFCMSwap = function (_a) {
        var notional = _a.notional, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, peripheryContract, tickBefore, tickAfter, fee, availableNotional, fixedTokenDeltaUnbalanced, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, scaledAvailableNotional, scaledFee, averageFixedRate, additionalMargin, _b, cTokenAddress, cTokenContract, rate, scaledRate;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                    case 1:
                        tickBefore = _c.sent();
                        tickAfter = 0;
                        fee = ethers_1.BigNumber.from(0);
                        availableNotional = ethers_1.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_1.BigNumber.from(0);
                        return [4 /*yield*/, fcmContract.callStatic.initiateFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
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
                                tickAfter = result.tick;
                                fee = result.fee;
                                availableNotional = result.availableNotional;
                                fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
                            })];
                    case 2:
                        _c.sent();
                        fixedRateBefore = (0, priceTickConversions_1.tickToFixedRate)(tickBefore);
                        fixedRateAfter = (0, priceTickConversions_1.tickToFixedRate)(tickAfter);
                        fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
                        fixedRateDeltaRaw = fixedRateDelta.toNumber();
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        averageFixedRate = (availableNotional.eq(ethers_1.BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(ethers_1.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
                        additionalMargin = 0;
                        _b = this.rateOracle.protocolId;
                        switch (_b) {
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        {
                            additionalMargin = scaledAvailableNotional;
                            return [3 /*break*/, 8];
                        }
                        _c.label = 4;
                    case 4: return [4 /*yield*/, fcmContract.cToken()];
                    case 5:
                        cTokenAddress = _c.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.signer);
                        return [4 /*yield*/, cTokenContract.exchangeRateStored()];
                    case 6:
                        rate = _c.sent();
                        scaledRate = this.descaleCompoundValue(rate);
                        additionalMargin = scaledAvailableNotional / scaledRate;
                        return [3 /*break*/, 8];
                    case 7: throw new Error("Unrecognized FCM");
                    case 8: return [2 /*return*/, {
                            marginRequirement: additionalMargin < 0 ? -additionalMargin : additionalMargin,
                            availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                            fee: scaledFee < 0 ? -scaledFee : scaledFee,
                            slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                            averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                        }];
                }
            });
        });
    };
    AMM.prototype.fcmSwap = function (_a) {
        var notional = _a.notional, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, estimatedGas, fcmSwapTransaction, receipt, error_7;
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
                        error_7 = _b.sent();
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
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, peripheryContract, tickBefore, tickAfter, fee, availableNotional, fixedTokenDeltaUnbalanced, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, scaledAvailableNotional, scaledFee, averageFixedRate;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.getCurrentTick(this.marginEngineAddress)];
                    case 1:
                        tickBefore = _b.sent();
                        tickAfter = 0;
                        fee = ethers_1.BigNumber.from(0);
                        availableNotional = ethers_1.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_1.BigNumber.from(0);
                        return [4 /*yield*/, fcmContract.callStatic.unwindFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
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
                                tickAfter = result.tick;
                                fee = result.fee;
                                availableNotional = result.availableNotional;
                                fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
                            })];
                    case 2:
                        _b.sent();
                        fixedRateBefore = (0, priceTickConversions_1.tickToFixedRate)(tickBefore);
                        fixedRateAfter = (0, priceTickConversions_1.tickToFixedRate)(tickAfter);
                        fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
                        fixedRateDeltaRaw = fixedRateDelta.toNumber();
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        averageFixedRate = (availableNotional.eq(ethers_1.BigNumber.from(0))) ? 0 : fixedTokenDeltaUnbalanced.mul(ethers_1.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
                        return [2 /*return*/, {
                                marginRequirement: 0,
                                availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                                fee: scaledFee < 0 ? -scaledFee : scaledFee,
                                slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                                averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                            }];
                }
            });
        });
    };
    AMM.prototype.fcmUnwind = function (_a) {
        var notionalToUnwind = _a.notionalToUnwind, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, estimatedGas, fcmUnwindTransaction, receipt, error_8;
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
                        error_8 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // FCM settlement
    AMM.prototype.settleFCMTrader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcmContract, estimatedGas, fcmSettleTraderTransaction, receipt, error_9;
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
                        error_9 = _a.sent();
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
            return value.div(ethers_1.BigNumber.from(10).pow(this.underlyingToken.decimals - 3)).toNumber() / 1000;
        }
    };
    // descale compound tokens
    AMM.prototype.descaleCompoundValue = function (value) {
        var scaledValue = (value.div(ethers_1.BigNumber.from(10).pow(this.underlyingToken.decimals)).div(ethers_1.BigNumber.from(10).pow(4))).toNumber() / 1000000;
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
            var isApproved, factoryContract, estimatedGas, approvalTransaction, receipt, error_10;
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
                        error_10 = _a.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // underlying token approval for periphery
    AMM.prototype.isUnderlyingTokenApprovedForPeriphery = function () {
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
                        return [4 /*yield*/, token.allowance(signerAddress, this.peripheryAddress)];
                    case 2:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance.gte(constants_1.TresholdApprovalBn)];
                }
            });
        });
    };
    AMM.prototype.approveUnderlyingTokenForPeriphery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isApproved, tokenAddress, token, estimatedGas, approvalTransaction, receipt, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isUnderlyingTokenApprovedForPeriphery()];
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
                        return [4 /*yield*/, token.estimateGas.approve(this.peripheryAddress, constants_1.MaxUint256Bn)];
                    case 2:
                        estimatedGas = _a.sent();
                        return [4 /*yield*/, token.approve(this.peripheryAddress, constants_1.MaxUint256Bn, {
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
                        error_11 = _a.sent();
                        throw new Error("Token approval failed");
                    case 7: return [2 /*return*/];
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
            var isApproved, tokenAddress, token, estimatedGas, approvalTransaction, receipt, error_12;
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
                        error_12 = _a.sent();
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
            var firstProtocolCharacter = this.rateOracle.protocol[0];
            var tokenName = this.underlyingToken.name;
            return "".concat(firstProtocolCharacter.toLowerCase()).concat(tokenName);
        },
        enumerable: false,
        configurable: true
    });
    AMM.prototype.approveYieldBearingTokenForFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isApproved, tokenAddress, _a, fcmContract, fcmContract, token, estimatedGas, approvalTransaction, receipt, error_13;
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
                        error_13 = _b.sent();
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
            var peripheryContract, currentTick, apr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.provider);
                        return [4 /*yield*/, peripheryContract.callStatic.getCurrentTick(this.marginEngineAddress)];
                    case 1:
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
                        return [2 /*return*/, parseFloat(ethers_1.utils.formatEther(historicalApy))];
                }
            });
        });
    };
    AMM.prototype.getAllSwaps = function (position) {
        var allSwaps = [];
        for (var _i = 0, _a = position.swaps; _i < _a.length; _i++) {
            var s = _a[_i];
            allSwaps.push({
                fDelta: ethers_1.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
                vDelta: ethers_1.BigNumber.from(s.variableTokenDelta.toString()),
                timestamp: ethers_1.BigNumber.from(s.transactionTimestamp.toString())
            });
        }
        for (var _b = 0, _c = position.fcmSwaps; _b < _c.length; _b++) {
            var s = _c[_b];
            allSwaps.push({
                fDelta: ethers_1.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
                vDelta: ethers_1.BigNumber.from(s.variableTokenDelta.toString()),
                timestamp: ethers_1.BigNumber.from(s.transactionTimestamp.toString())
            });
        }
        for (var _d = 0, _e = position.fcmUnwinds; _d < _e.length; _d++) {
            var s = _e[_d];
            allSwaps.push({
                fDelta: ethers_1.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
                vDelta: ethers_1.BigNumber.from(s.variableTokenDelta.toString()),
                timestamp: ethers_1.BigNumber.from(s.transactionTimestamp.toString())
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
                        accruedCashflow = ethers_1.BigNumber.from(0);
                        lenSwaps = allSwaps.length;
                        return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 1:
                        lastBlock = _c.sent();
                        _b = (_a = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 2)];
                    case 2:
                        lastBlockTimestamp = _b.apply(_a, [(_c.sent()).timestamp]);
                        untilTimestamp = (atMaturity)
                            ? ethers_1.BigNumber.from(this.termEndTimestamp.toString())
                            : lastBlockTimestamp.mul(ethers_1.BigNumber.from(10).pow(18));
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < lenSwaps)) return [3 /*break*/, 6];
                        currentSwapTimestamp = allSwaps[i].timestamp.mul(ethers_1.BigNumber.from(10).pow(18));
                        normalizedTime = (untilTimestamp.sub(currentSwapTimestamp)).div(ethers_1.BigNumber.from(constants_1.ONE_YEAR_IN_SECONDS));
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(currentSwapTimestamp, untilTimestamp)];
                    case 4:
                        variableFactorBetweenSwaps = _c.sent();
                        fixedCashflow = allSwaps[i].fDelta.mul(normalizedTime).div(ethers_1.BigNumber.from(100)).div(ethers_1.BigNumber.from(10).pow(18));
                        variableCashflow = allSwaps[i].vDelta.mul(variableFactorBetweenSwaps).div(ethers_1.BigNumber.from(10).pow(18));
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
            var rateOracleContract, result, resultScaled, error_14;
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
                        resultScaled = result.div(ethers_1.BigNumber.from(10).pow(12)).toNumber() / 1000000;
                        return [2 /*return*/, resultScaled];
                    case 3:
                        error_14 = _a.sent();
                        throw new Error("Cannot get variable factor");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.getPositionInformation = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var results, signerAddress, lastBlock, lastBlockTimestamp, _a, _b, beforeMaturity, _c, allSwaps, lenSwaps, _d, _1, accruedCashflowInUnderlyingToken, accruedCashflowInUnderlyingToken, _e, fcmContract, margin, marginInUnderlyingToken, fcmContract, margin, cTokenAddress, cTokenContract, rate, scaledRate, marginInUnderlyingToken, tickLower, tickUpper, marginEngineContract, rawPositionInfo, marginInUnderlyingToken, liquidationThreshold, _2, safetyThreshold, _3, notionalInUnderlyingToken;
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
                        _b = (_a = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 3:
                        lastBlockTimestamp = _b.apply(_a, [(_f.sent()).timestamp]);
                        beforeMaturity = (lastBlockTimestamp.mul(ethers_1.BigNumber.from(10).pow(18))).lt(ethers_1.BigNumber.from(this.termEndTimestamp.toString()));
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
                        if (!(lenSwaps > 0)) return [3 /*break*/, 14];
                        if (!beforeMaturity) return [3 /*break*/, 12];
                        if (!(lenSwaps > 0)) return [3 /*break*/, 11];
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 8, , 9]);
                        _d = results;
                        return [4 /*yield*/, this.getInstantApy()];
                    case 7:
                        _d.variableRateSinceLastSwap = (_f.sent()) * 100;
                        results.fixedRateSinceLastSwap = position.averageFixedRate;
                        return [3 /*break*/, 9];
                    case 8:
                        _1 = _f.sent();
                        return [3 /*break*/, 9];
                    case 9: return [4 /*yield*/, this.getAccruedCashflow(allSwaps, false)];
                    case 10:
                        accruedCashflowInUnderlyingToken = _f.sent();
                        results.accruedCashflow = accruedCashflowInUnderlyingToken;
                        // need to change when introduce non-stable coins
                        results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken;
                        _f.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        if (!!position.isSettled) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.getAccruedCashflow(allSwaps, true)];
                    case 13:
                        accruedCashflowInUnderlyingToken = _f.sent();
                        results.accruedCashflow = accruedCashflowInUnderlyingToken;
                        // need to change when introduce non-stable coins
                        results.accruedCashflowInUSD = accruedCashflowInUnderlyingToken;
                        _f.label = 14;
                    case 14:
                        if (!position.source.includes("FCM")) return [3 /*break*/, 23];
                        _e = this.rateOracle.protocolId;
                        switch (_e) {
                            case 1: return [3 /*break*/, 15];
                            case 2: return [3 /*break*/, 17];
                        }
                        return [3 /*break*/, 21];
                    case 15:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.getTraderMarginInATokens(signerAddress)];
                    case 16:
                        margin = (_f.sent());
                        results.margin = this.descale(margin);
                        marginInUnderlyingToken = results.margin;
                        // need to change when introduce non-stable coins
                        results.marginInUSD = marginInUnderlyingToken;
                        return [3 /*break*/, 22];
                    case 17:
                        fcmContract = typechain_1.CompoundFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.getTraderMarginInCTokens(signerAddress)];
                    case 18:
                        margin = (_f.sent());
                        results.margin = margin.toNumber() / (Math.pow(10, 8));
                        return [4 /*yield*/, fcmContract.cToken()];
                    case 19:
                        cTokenAddress = _f.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.signer);
                        return [4 /*yield*/, cTokenContract.exchangeRateStored()];
                    case 20:
                        rate = _f.sent();
                        scaledRate = this.descaleCompoundValue(rate);
                        marginInUnderlyingToken = results.margin * scaledRate;
                        // need to change when introduce non-stable coins
                        results.marginInUSD = marginInUnderlyingToken;
                        return [3 /*break*/, 22];
                    case 21: throw new Error("Unrecognized FCM");
                    case 22:
                        if (beforeMaturity) {
                            results.healthFactor = 3;
                        }
                        return [3 /*break*/, 32];
                    case 23:
                        tickLower = position.tickLower;
                        tickUpper = position.tickUpper;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 24:
                        rawPositionInfo = _f.sent();
                        results.margin = this.descale(rawPositionInfo.margin);
                        marginInUnderlyingToken = results.margin;
                        // need to change when introduce non-stable coins
                        results.marginInUSD = marginInUnderlyingToken;
                        results.fees = this.descale(rawPositionInfo.accumulatedFees);
                        if (!beforeMaturity) return [3 /*break*/, 32];
                        _f.label = 25;
                    case 25:
                        _f.trys.push([25, 27, , 28]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, true)];
                    case 26:
                        liquidationThreshold = _f.sent();
                        results.liquidationThreshold = this.descale(liquidationThreshold);
                        return [3 /*break*/, 28];
                    case 27:
                        _2 = _f.sent();
                        return [3 /*break*/, 28];
                    case 28:
                        _f.trys.push([28, 30, , 31]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, false)];
                    case 29:
                        safetyThreshold = _f.sent();
                        results.safetyThreshold = this.descale(safetyThreshold);
                        return [3 /*break*/, 31];
                    case 30:
                        _3 = _f.sent();
                        return [3 /*break*/, 31];
                    case 31:
                        if (!(0, lodash_1.isUndefined)(results.liquidationThreshold) && !(0, lodash_1.isUndefined)(results.safetyThreshold)) {
                            results.healthFactor = (results.margin < results.liquidationThreshold) ? 1 : (results.margin < results.safetyThreshold ? 2 : 3);
                        }
                        _f.label = 32;
                    case 32:
                        notionalInUnderlyingToken = (position.positionType === 3)
                            ? Math.abs(position.notional) // LP
                            : Math.abs(position.effectiveVariableTokenBalance);
                        // need to change when introduce non-stable coins
                        results.notionalInUSD = notionalInUnderlyingToken;
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
    AMM.prototype.hasEnoughUnderlyingTokens = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tokenAddress, token, currentBalance, scaledAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error("No underlying token");
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.balanceOf(signerAddress)];
                    case 2:
                        currentBalance = _a.sent();
                        scaledAmount = ethers_1.BigNumber.from(this.scale(amount));
                        return [2 /*return*/, currentBalance.gte(scaledAmount)];
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
                        scaledAmount = ethers_1.BigNumber.from(this.scale(amount));
                        return [2 /*return*/, currentBalance.gte(scaledAmount)];
                }
            });
        });
    };
    // caps
    AMM.prototype.setCap = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var peripheryContract, marginEngineContract, vammAddress, vammContract, isAlphaTransaction, error_15, isAlphaTransactionME, error_16, setCapTransaction, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.signer);
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.vamm()];
                    case 1:
                        vammAddress = _a.sent();
                        vammContract = typechain_1.VAMM__factory.connect(vammAddress, this.signer);
                        return [4 /*yield*/, vammContract.setIsAlpha(true)];
                    case 2:
                        isAlphaTransaction = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, isAlphaTransaction.wait()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_15 = _a.sent();
                        throw new Error("Setting Alpha failed");
                    case 6: return [4 /*yield*/, marginEngineContract.setIsAlpha(true)];
                    case 7:
                        isAlphaTransactionME = _a.sent();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, isAlphaTransactionME.wait()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        error_16 = _a.sent();
                        throw new Error("Setting Alpha failed");
                    case 11: return [4 /*yield*/, peripheryContract.setLPMarginCap(vammAddress, this.scale(amount))];
                    case 12:
                        setCapTransaction = _a.sent();
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, setCapTransaction.wait()];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_17 = _a.sent();
                        throw new Error("Setting cap failed");
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.getCapPercentage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var peripheryContract, marginEngineContract, vammAddress, vammContract, isAlpha, accumulated, cap, percentage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        peripheryContract = typechain_1.Periphery__factory.connect(this.peripheryAddress, this.provider);
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.provider);
                        return [4 /*yield*/, marginEngineContract.vamm()];
                    case 1:
                        vammAddress = _a.sent();
                        vammContract = typechain_1.VAMM__factory.connect(vammAddress, this.provider);
                        return [4 /*yield*/, vammContract.isAlpha()];
                    case 2:
                        isAlpha = _a.sent();
                        if (!isAlpha) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, peripheryContract.lpMarginCumulatives(vammAddress)];
                    case 3:
                        accumulated = _a.sent();
                        return [4 /*yield*/, peripheryContract.lpMarginCaps(vammAddress)];
                    case 4:
                        cap = _a.sent();
                        if (cap.eq(ethers_1.BigNumber.from(0))) {
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
            var lastBlock, oneBlockAgo, _a, _b, twoBlocksAgo, _c, _d, rateOracleContract, oneWeekApy;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 1:
                        lastBlock = _e.sent();
                        _b = (_a = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 2:
                        oneBlockAgo = _b.apply(_a, [(_e.sent()).timestamp]);
                        _d = (_c = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 2)];
                    case 3:
                        twoBlocksAgo = _d.apply(_c, [(_e.sent()).timestamp]);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(twoBlocksAgo, oneBlockAgo)];
                    case 4:
                        oneWeekApy = _e.sent();
                        return [2 /*return*/, oneWeekApy.div(ethers_1.BigNumber.from(1000000000000)).toNumber() / 1000000];
                }
            });
        });
    };
    return AMM;
}());
exports.default = AMM;
