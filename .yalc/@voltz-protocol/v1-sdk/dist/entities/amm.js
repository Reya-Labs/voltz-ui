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
var evm_bn_1 = require("evm-bn");
var lodash_1 = require("lodash");
var AMM = /** @class */ (function () {
    function AMM(_a) {
        var id = _a.id, signer = _a.signer, provider = _a.provider, environment = _a.environment, marginEngineAddress = _a.marginEngineAddress, fcmAddress = _a.fcmAddress, rateOracle = _a.rateOracle, updatedTimestamp = _a.updatedTimestamp, termStartTimestamp = _a.termStartTimestamp, termEndTimestamp = _a.termEndTimestamp, underlyingToken = _a.underlyingToken, tick = _a.tick, tickSpacing = _a.tickSpacing, txCount = _a.txCount, totalNotionalTraded = _a.totalNotionalTraded, totalLiquidity = _a.totalLiquidity;
        this.id = id;
        this.signer = signer;
        this.provider = provider || (signer === null || signer === void 0 ? void 0 : signer.provider);
        this.environment = environment;
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
        this.overrides = {
            gasLimit: 10000000,
        };
    }
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
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
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
                        averageFixedRate = fixedTokenDeltaUnbalanced.mul(ethers_1.BigNumber.from(1000)).div(availableNotional).toNumber() / 1000;
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
    AMM.prototype.settlePosition = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, tickUpper, tickLower, marginEngineContract, settlePositionTransaction, receipt, error_1;
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
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.settlePosition(effectiveOwner, tickLower, tickUpper, this.overrides)];
                    case 4:
                        settlePositionTransaction = _c.sent();
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, settlePositionTransaction.wait()];
                    case 6:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 7:
                        error_1 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
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
    AMM.prototype.updatePositionMargin = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, marginDelta = _a.marginDelta;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, tickUpper, tickLower, scaledMarginDelta, marginEngineContract, updatePositionMarginTransaction, receipt, error_2;
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
                        return [4 /*yield*/, this.approveERC20(this.underlyingToken.id, scaledMarginDelta, this.marginEngineAddress)];
                    case 4:
                        _c.sent();
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.updatePositionMargin(effectiveOwner, tickLower, tickUpper, scaledMarginDelta, this.overrides)];
                    case 5:
                        updatePositionMarginTransaction = _c.sent();
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, updatePositionMarginTransaction.wait()];
                    case 7:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 8:
                        error_2 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.liquidatePosition = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, marginEngineContract, liquidatePositionTransaction, receipt, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.liquidatePosition(owner, tickLower, tickUpper, this.overrides)];
                    case 1:
                        liquidatePositionTransaction = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, liquidatePositionTransaction.wait()];
                    case 3:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 4:
                        error_3 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
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
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
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
            var tickUpper, tickLower, peripheryContract, _notional, _marginDelta, approvalError_1, mintOrBurnParams, mintTransaction, receipt, error_4;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
                        _notional = this.scale(notional);
                        _marginDelta = this.scale(margin);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.approveERC20(this.underlyingToken.id, _marginDelta, peripheryContract.address)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        approvalError_1 = _b.sent();
                        throw approvalError_1;
                    case 4:
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
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, this.overrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 6:
                        mintTransaction = _b.sent();
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, mintTransaction.wait()];
                    case 8:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 9:
                        error_4 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.burn = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, peripheryContract, _notional, mintOrBurnParams, burnTransaction, receipt, error_5;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
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
                        return [4 /*yield*/, peripheryContract.mintOrBurn(mintOrBurnParams, this.overrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        burnTransaction = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, burnTransaction.wait()];
                    case 4:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 5:
                        error_5 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.approveFCM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryContract, signerAddress, isApproved, approvalTransaction, receipt, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        factoryContract = typechain_1.Factory__factory.connect(constants_1.FACTORY_ADDRESS, this.signer);
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        return [4 /*yield*/, factoryContract.isApproved(signerAddress, this.fcmAddress)];
                    case 2:
                        isApproved = _a.sent();
                        if (isApproved) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, factoryContract.setApproval(this.fcmAddress, true, this.overrides)];
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
                        error_6 = _a.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.approveERC20 = function (tokenAddress, amountToApprove, addressToApprove) {
        return __awaiter(this, void 0, void 0, function () {
            var token, currentApproval, _a, _b, amountToApproveBN, approvalTransaction, receipt, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        token = typechain_1.ERC20Mock__factory.connect(tokenAddress, this.signer);
                        _b = (_a = token).allowance;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), addressToApprove])];
                    case 2:
                        currentApproval = _c.sent();
                        amountToApproveBN = ethers_1.BigNumber.from(amountToApprove).mul(ethers_1.BigNumber.from("101")).div(ethers_1.BigNumber.from("100"));
                        if (amountToApproveBN.lt(currentApproval)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, token.approve(addressToApprove, amountToApproveBN, this.overrides)];
                    case 3:
                        approvalTransaction = _c.sent();
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, approvalTransaction.wait()];
                    case 5:
                        receipt = _c.sent();
                        return [2 /*return*/, receipt];
                    case 6:
                        error_7 = _c.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.swap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, validationOnly = _a.validationOnly;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, peripheryContract, scaledNotional, scaledMarginDelta, approvalError_2, swapPeripheryParams, swapTransaction, receipt, error_8;
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
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
                        scaledNotional = this.scale(notional);
                        scaledMarginDelta = this.scale(margin);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.approveERC20(this.underlyingToken.id, scaledMarginDelta, peripheryContract.address)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        approvalError_2 = _b.sent();
                        throw approvalError_2;
                    case 4:
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
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.swap(swapPeripheryParams, this.overrides).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error, _this.environment);
                                throw new Error(errorMessage);
                            })];
                    case 6:
                        swapTransaction = _b.sent();
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 8:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 9:
                        error_8 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.fcmSwap = function (_a) {
        var notional = _a.notional, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var approvalError_3, sqrtPriceLimitX96, tickLimit, fcmContract, scaledNotional, vammContract, feeWad, maxFee, yieldBearingTokenAddress, fcmSwapTransaction, receipt, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.approveFCM()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        approvalError_3 = _b.sent();
                        throw approvalError_3;
                    case 4:
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        vammContract = typechain_1.VAMM__factory.connect(this.id, this.signer);
                        return [4 /*yield*/, vammContract.feeWad()];
                    case 5:
                        feeWad = _b.sent();
                        maxFee = ethers_1.BigNumber.from(scaledNotional).mul(feeWad).div((0, evm_bn_1.toBn)("10"));
                        return [4 /*yield*/, this.approveERC20(this.underlyingToken.id, maxFee, this.fcmAddress)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, fcmContract.underlyingYieldBearingToken()];
                    case 7:
                        yieldBearingTokenAddress = _b.sent();
                        return [4 /*yield*/, this.approveERC20(yieldBearingTokenAddress, scaledNotional, this.fcmAddress)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, fcmContract.initiateFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96, this.overrides)];
                    case 9:
                        fcmSwapTransaction = _b.sent();
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, fcmSwapTransaction.wait()];
                    case 11:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 12:
                        error_9 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.fcmUnwind = function (_a) {
        var notionalToUnwind = _a.notionalToUnwind, fixedRateLimit = _a.fixedRateLimit;
        return __awaiter(this, void 0, void 0, function () {
            var sqrtPriceLimitX96, tickLimit, approvalError_4, fcmContract, scaledNotional, vammContract, feeWad, maxFee, fcmUnwindTransaction, receipt, error_10;
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
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.approveFCM()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        approvalError_4 = _b.sent();
                        throw approvalError_4;
                    case 4:
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        scaledNotional = this.scale(notionalToUnwind);
                        vammContract = typechain_1.VAMM__factory.connect(this.id, this.signer);
                        return [4 /*yield*/, vammContract.feeWad()];
                    case 5:
                        feeWad = _b.sent();
                        maxFee = ethers_1.BigNumber.from(scaledNotional).mul(feeWad).div((0, evm_bn_1.toBn)("10"));
                        return [4 /*yield*/, this.approveERC20(this.underlyingToken.id, maxFee, this.fcmAddress)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, fcmContract.unwindFullyCollateralisedFixedTakerSwap(scaledNotional, sqrtPriceLimitX96, this.overrides)];
                    case 7:
                        fcmUnwindTransaction = _b.sent();
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, fcmUnwindTransaction.wait()];
                    case 9:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 10:
                        error_10 = _b.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.settleFCMTrader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcmContract, fcmSettleTraderTransaction, receipt, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.settleTrader(this.overrides)];
                    case 1:
                        fcmSettleTraderTransaction = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fcmSettleTraderTransaction.wait()];
                    case 3:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 4:
                        error_11 = _a.sent();
                        throw new Error("Transaction Confirmation Error");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AMM.prototype, "startDateTime", {
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
    AMM.prototype.fixedApr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var peripheryContract, currentTick, apr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.provider);
                        return [4 /*yield*/, peripheryContract.callStatic.getCurrentTick(this.marginEngineAddress)];
                    case 1:
                        currentTick = _a.sent();
                        apr = (0, priceTickConversions_1.tickToFixedRate)(currentTick).toNumber();
                        return [2 /*return*/, apr];
                }
            });
        });
    };
    Object.defineProperty(AMM.prototype, "protocol", {
        get: function () {
            var firstProtocolCharacter = this.rateOracle.protocol[0];
            var tokenName = this.underlyingToken.name;
            return "".concat(firstProtocolCharacter.toLowerCase()).concat(tokenName);
        },
        enumerable: false,
        configurable: true
    });
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
            var accruedCashflow, lenSwaps, untilTimestamp, rateOracleContract, excludeLast, i, currentSwapTimestamp, normalizedTime, variableFactorBetweenSwaps, fixedCashflow, variableCashflow, cashflow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        accruedCashflow = ethers_1.BigNumber.from(0);
                        lenSwaps = allSwaps.length;
                        untilTimestamp = (atMaturity) ? ethers_1.BigNumber.from(this.termEndTimestamp.toString()) : allSwaps[lenSwaps - 1].timestamp;
                        untilTimestamp = untilTimestamp.mul(ethers_1.BigNumber.from(10).pow(18));
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.signer);
                        excludeLast = (atMaturity) ? 0 : 1;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i + excludeLast < lenSwaps)) return [3 /*break*/, 4];
                        currentSwapTimestamp = allSwaps[i].timestamp.mul(ethers_1.BigNumber.from(10).pow(18));
                        normalizedTime = (untilTimestamp.sub(currentSwapTimestamp)).div(ethers_1.BigNumber.from(constants_1.ONE_YEAR_IN_SECONDS));
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(currentSwapTimestamp, untilTimestamp)];
                    case 2:
                        variableFactorBetweenSwaps = _a.sent();
                        fixedCashflow = allSwaps[i].fDelta.mul(normalizedTime).div(ethers_1.BigNumber.from(100)).div(ethers_1.BigNumber.from(10).pow(18));
                        variableCashflow = allSwaps[i].vDelta.mul(variableFactorBetweenSwaps).div(ethers_1.BigNumber.from(10).pow(18));
                        cashflow = fixedCashflow.add(variableCashflow);
                        accruedCashflow = accruedCashflow.add(cashflow);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this.descale(accruedCashflow)];
                }
            });
        });
    };
    AMM.prototype.getPositionInformation = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var results, signerAddress, lastBlock, lastBlockTimestamp, _a, _b, beforeMaturity, _c, allSwaps, lenSwaps, rateOracleContract, lastSwapTimestamp, variableApySinceLastSwap, _d, _e, fcmContract, margin, tickLower, tickUpper, marginEngineContract, rawPositionInfo, liquidationThreshold, _1, safetyThreshold, _2;
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
                            margin: 0,
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
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 4)];
                    case 3:
                        lastBlockTimestamp = _b.apply(_a, [(_f.sent()).timestamp]);
                        console.log("lastBlockTimestamp:", lastBlockTimestamp);
                        console.log("amm term end timestamp:", this.termEndTimestamp.toString());
                        beforeMaturity = (lastBlockTimestamp.mul(ethers_1.BigNumber.from(10).pow(18))).lt(ethers_1.BigNumber.from(this.termEndTimestamp.toString()));
                        results.beforeMaturity = beforeMaturity;
                        if (!beforeMaturity) return [3 /*break*/, 5];
                        _c = results;
                        return [4 /*yield*/, this.fixedApr()];
                    case 4:
                        _c.fixedApr = _f.sent();
                        _f.label = 5;
                    case 5:
                        allSwaps = this.getAllSwaps(position);
                        lenSwaps = allSwaps.length;
                        if (!(lenSwaps > 0)) return [3 /*break*/, 11];
                        if (!beforeMaturity) return [3 /*break*/, 9];
                        if (!(lenSwaps > 0)) return [3 /*break*/, 8];
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.signer);
                        lastSwapTimestamp = allSwaps[lenSwaps - 1].timestamp;
                        console.log("last swap timestamp:", lastSwapTimestamp);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(lastSwapTimestamp, lastBlockTimestamp)];
                    case 6:
                        variableApySinceLastSwap = _f.sent();
                        results.variableRateSinceLastSwap = variableApySinceLastSwap.div(ethers_1.BigNumber.from(10).pow(12)).toNumber() / 10000;
                        results.fixedRateSinceLastSwap = position.averageFixedRate;
                        _d = results;
                        return [4 /*yield*/, this.getAccruedCashflow(allSwaps, false)];
                    case 7:
                        _d.accruedCashflow = _f.sent();
                        _f.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        if (!!position.isSettled) return [3 /*break*/, 11];
                        _e = results;
                        return [4 /*yield*/, this.getAccruedCashflow(allSwaps, true)];
                    case 10:
                        _e.accruedCashflow = _f.sent();
                        _f.label = 11;
                    case 11:
                        if (!position.source.includes("FCM")) return [3 /*break*/, 13];
                        fcmContract = typechain_1.AaveFCM__factory.connect(this.fcmAddress, this.signer);
                        return [4 /*yield*/, fcmContract.getTraderMarginInATokens(signerAddress)];
                    case 12:
                        margin = (_f.sent());
                        results.margin = this.descale(margin);
                        if (beforeMaturity) {
                            results.healthFactor = 3;
                        }
                        return [3 /*break*/, 22];
                    case 13:
                        tickLower = position.tickLower;
                        tickUpper = position.tickUpper;
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 14:
                        rawPositionInfo = _f.sent();
                        results.margin = this.descale(rawPositionInfo.margin);
                        results.fees = this.descale(rawPositionInfo.accumulatedFees);
                        if (!beforeMaturity) return [3 /*break*/, 22];
                        _f.label = 15;
                    case 15:
                        _f.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, true)];
                    case 16:
                        liquidationThreshold = _f.sent();
                        results.liquidationThreshold = this.descale(liquidationThreshold);
                        return [3 /*break*/, 18];
                    case 17:
                        _1 = _f.sent();
                        return [3 /*break*/, 18];
                    case 18:
                        _f.trys.push([18, 20, , 21]);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPositionMarginRequirement(signerAddress, tickLower, tickUpper, false)];
                    case 19:
                        safetyThreshold = _f.sent();
                        results.safetyThreshold = this.descale(safetyThreshold);
                        return [3 /*break*/, 21];
                    case 20:
                        _2 = _f.sent();
                        return [3 /*break*/, 21];
                    case 21:
                        if (!(0, lodash_1.isUndefined)(results.liquidationThreshold) && !(0, lodash_1.isUndefined)(results.safetyThreshold)) {
                            results.healthFactor = (results.margin < results.liquidationThreshold) ? 1 : (results.margin < results.safetyThreshold ? 2 : 3);
                        }
                        _f.label = 22;
                    case 22:
                        console.log();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    AMM.prototype.getVariableFactor = function (termStartTimestamp, termEndTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var rateOracleContract, result, resultScaled, error_12;
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
                        error_12 = _a.sent();
                        console.log("Cannot get variable factor");
                        throw new Error("Cannot get variable factor");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.getApy = function (termStartTimestamp, termEndTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var rateOracleContract, result, resultScaled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(termStartTimestamp, termEndTimestamp)];
                    case 1:
                        result = _a.sent();
                        resultScaled = result.div(ethers_1.BigNumber.from(10).pow(12)).toNumber() / 1000000;
                        return [2 /*return*/, resultScaled];
                }
            });
        });
    };
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
    return AMM;
}());
exports.default = AMM;
