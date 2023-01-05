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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMM = void 0;
var ethers_1 = require("ethers");
var constants_1 = require("../../constants");
var typechain_1 = require("../../typechain");
var tickMath_1 = require("../../utils/tickMath");
var timestampWadToDateTime_1 = __importDefault(require("../../utils/timestampWadToDateTime"));
var priceTickConversions_1 = require("../../utils/priceTickConversions");
var nearestUsableTick_1 = require("../../utils/nearestUsableTick");
var price_1 = require("../fractions/price");
var tokenAmount_1 = require("../fractions/tokenAmount");
var errorHandling_1 = require("../../utils/errors/errorHandling");
var getExpectedApy_1 = require("../../services/getExpectedApy");
var getAccruedCashflow_1 = require("../../services/getAccruedCashflow");
var getTokenInfo_1 = require("../../services/getTokenInfo");
var sentry_1 = require("../../utils/sentry");
var priceFetch_1 = require("../../utils/priceFetch");
var AMM = /** @class */ (function () {
    function AMM(_a) {
        var id = _a.id, signer = _a.signer, provider = _a.provider, factoryAddress = _a.factoryAddress, marginEngineAddress = _a.marginEngineAddress, rateOracle = _a.rateOracle, termStartTimestamp = _a.termStartTimestamp, termEndTimestamp = _a.termEndTimestamp, underlyingToken = _a.underlyingToken, tickSpacing = _a.tickSpacing, wethAddress = _a.wethAddress, ethPrice = _a.ethPrice;
        var _this = this;
        // expected apy
        this.expectedApy = function (ft, vt, margin, rate) { return __awaiter(_this, void 0, void 0, function () {
            var now, end, scaledFt, scaledVt, _a, pnl, ecs;
            return __generator(this, function (_b) {
                now = Math.round(new Date().getTime() / 1000);
                end = ethers_1.BigNumber.from(this.termEndTimestamp.toString()).div(ethers_1.BigNumber.from(10).pow(12)).toNumber() /
                    1000000;
                scaledFt = 0;
                scaledVt = 0;
                if (this.underlyingToken.decimals <= 6) {
                    scaledFt = ft.toNumber() / Math.pow(10, this.underlyingToken.decimals);
                    scaledVt = vt.toNumber() / Math.pow(10, this.underlyingToken.decimals);
                }
                else {
                    scaledFt =
                        ft.div(ethers_1.BigNumber.from(10).pow(this.underlyingToken.decimals - 6)).toNumber() / 1000000;
                    scaledVt =
                        vt.div(ethers_1.BigNumber.from(10).pow(this.underlyingToken.decimals - 6)).toNumber() / 1000000;
                }
                _a = (0, getExpectedApy_1.getExpectedApy)(now, end, scaledFt, scaledVt, margin, rate), pnl = _a[0], ecs = _a[1];
                return [2 /*return*/, [100 * pnl, ecs]];
            });
        }); };
        this.id = id;
        this.signer = signer;
        this.provider = provider || (signer === null || signer === void 0 ? void 0 : signer.provider);
        this.factoryAddress = factoryAddress;
        this.marginEngineAddress = marginEngineAddress;
        this.rateOracle = rateOracle;
        this.termStartTimestamp = termStartTimestamp;
        this.termEndTimestamp = termEndTimestamp;
        this.underlyingToken = underlyingToken;
        this.tickSpacing = tickSpacing;
        this.wethAddress = wethAddress;
        this.isETH = this.underlyingToken.name === 'ETH';
        this.ethPrice =
            ethPrice || (function () { return (0, priceFetch_1.geckoEthToUsd)(process.env.REACT_APP_COINGECKO_API_KEY || ''); });
    }
    // rollover with swap
    AMM.prototype.rolloverWithSwap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, newMarginEngine = _a.newMarginEngine, rolloverPosition = _a.rolloverPosition;
        return __awaiter(this, void 0, void 0, function () {
            var owner, tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, factoryContract, peripheryAddress, peripheryContract, scaledNotional, scaledMarginDelta, tempOverrides, settlementBalance, swapPeripheryParams, estimatedGas, swapTransaction, receipt, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
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
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        owner = _b.sent();
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else if (isFT) {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        scaledMarginDelta = '0';
                        tempOverrides = {};
                        if (this.isETH) {
                            settlementBalance = rolloverPosition.settlementBalance;
                            if (settlementBalance >= margin) {
                                // Case 1. If you get from the settled pool more than want to roll over
                                scaledMarginDelta = this.scale(margin);
                            }
                            else {
                                // Case 2. if you get from the settled pool less than want to roll over, then need to deposit extra ETH
                                scaledMarginDelta = this.scale(settlementBalance);
                                tempOverrides.value = ethers_1.BigNumber.from(this.scale(margin - settlementBalance));
                            }
                        }
                        else {
                            scaledMarginDelta = this.scale(margin);
                        }
                        swapPeripheryParams = {
                            marginEngine: newMarginEngine,
                            isFT: isFT,
                            notional: scaledNotional,
                            sqrtPriceLimitX96: sqrtPriceLimitX96,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            marginDelta: scaledMarginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic
                                .rolloverWithSwap(this.marginEngineAddress, owner, rolloverPosition.tickLower, rolloverPosition.tickUpper, swapPeripheryParams, tempOverrides)
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .rolloverWithSwap(this.marginEngineAddress, owner, rolloverPosition.tickLower, rolloverPosition.tickUpper, swapPeripheryParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .rolloverWithSwap(this.marginEngineAddress, owner, rolloverPosition.tickLower, rolloverPosition.tickUpper, swapPeripheryParams, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
                            })];
                    case 5:
                        swapTransaction = _b.sent();
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 7:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 8:
                        error_1 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_1);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // rollover with mint
    AMM.prototype.rolloverWithMint = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, margin = _a.margin, newMarginEngine = _a.newMarginEngine, rolloverPosition = _a.rolloverPosition;
        return __awaiter(this, void 0, void 0, function () {
            var owner, tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, scaledNotional, scaledMarginDelta, tempOverrides, settlementMargin, mintOrBurnParams, estimatedGas, mintTransaction, receipt, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
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
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        owner = _b.sent();
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        scaledMarginDelta = '0';
                        tempOverrides = {};
                        if (this.isETH) {
                            settlementMargin = rolloverPosition.settlementBalance;
                            if (settlementMargin >= margin) {
                                // Case 1. If you get from the settled pool more than want to roll over
                                scaledMarginDelta = this.scale(margin);
                            }
                            else {
                                // Case 2. if you get from the settled pool less than want to roll over, then need to deposit extra ETH
                                scaledMarginDelta = this.scale(settlementMargin);
                                tempOverrides.value = ethers_1.BigNumber.from(this.scale(margin)).sub(ethers_1.BigNumber.from(scaledMarginDelta));
                            }
                        }
                        else {
                            scaledMarginDelta = this.scale(margin);
                        }
                        mintOrBurnParams = {
                            marginEngine: newMarginEngine,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: scaledNotional,
                            isMint: true,
                            marginDelta: scaledMarginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic
                                .rolloverWithMint(this.marginEngineAddress, owner, rolloverPosition.tickLower, rolloverPosition.tickUpper, mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .rolloverWithMint(this.marginEngineAddress, owner, rolloverPosition.tickLower, rolloverPosition.tickUpper, mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 4:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .rolloverWithMint(this.marginEngineAddress, owner, rolloverPosition.tickLower, rolloverPosition.tickUpper, mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
                            })];
                    case 5:
                        mintTransaction = _b.sent();
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, mintTransaction.wait()];
                    case 7:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 8:
                        error_2 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_2);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // swap
    AMM.prototype.getInfoPostSwap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, scaledNotional, factoryContract, peripheryAddress, peripheryContract, swapPeripheryParams, tickBefore, tickAfter, marginRequirement, fee, availableNotional, fixedTokenDeltaUnbalanced, fixedTokenDelta, fixedRateBefore, fixedRateAfter, fixedRateDelta, fixedRateDeltaRaw, marginEngineContract, currentMargin, scaledCurrentMargin, scaledAvailableNotional, scaledFee, scaledMarginRequirement, additionalMargin, averageFixedRate, maxAvailableNotional, swapPeripheryParamsLargeSwap, scaledMaxAvailableNotional, result;
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
                        else if (isFT) {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                        }
                        scaledNotional = this.scale(notional);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _b.sent();
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
                        tickBefore = _b.sent();
                        tickAfter = 0;
                        marginRequirement = ethers_1.BigNumber.from(0);
                        fee = ethers_1.BigNumber.from(0);
                        availableNotional = ethers_1.BigNumber.from(0);
                        fixedTokenDeltaUnbalanced = ethers_1.BigNumber.from(0);
                        fixedTokenDelta = ethers_1.BigNumber.from(0);
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams).then(function (result) {
                                availableNotional = result[1];
                                fee = result[2];
                                fixedTokenDeltaUnbalanced = result[3];
                                marginRequirement = result[4];
                                tickAfter = parseInt(result[5], 10);
                                fixedTokenDelta = result[0];
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostSwap)(error);
                                marginRequirement = result.marginRequirement;
                                tickAfter = result.tick;
                                fee = result.fee;
                                availableNotional = result.availableNotional;
                                fixedTokenDeltaUnbalanced = result.fixedTokenDeltaUnbalanced;
                                fixedTokenDelta = result.fixedTokenDelta;
                            })];
                    case 4:
                        _b.sent();
                        fixedRateBefore = (0, priceTickConversions_1.tickToFixedRate)(tickBefore);
                        fixedRateAfter = (0, priceTickConversions_1.tickToFixedRate)(tickAfter);
                        fixedRateDelta = fixedRateAfter.subtract(fixedRateBefore);
                        fixedRateDeltaRaw = fixedRateDelta.toNumber();
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 5:
                        currentMargin = (_b.sent()).margin;
                        scaledCurrentMargin = this.descale(currentMargin);
                        scaledAvailableNotional = this.descale(availableNotional);
                        scaledFee = this.descale(fee);
                        scaledMarginRequirement = (this.descale(marginRequirement) + scaledFee) * 1.01;
                        additionalMargin = scaledMarginRequirement > scaledCurrentMargin
                            ? scaledMarginRequirement - scaledCurrentMargin
                            : 0;
                        averageFixedRate = availableNotional.eq(ethers_1.BigNumber.from(0))
                            ? 0
                            : fixedTokenDeltaUnbalanced.mul(ethers_1.BigNumber.from(1000)).div(availableNotional).toNumber() /
                                1000;
                        maxAvailableNotional = ethers_1.BigNumber.from(0);
                        swapPeripheryParamsLargeSwap = {
                            marginEngine: this.marginEngineAddress,
                            isFT: isFT,
                            notional: this.scale(1000000000000000),
                            sqrtPriceLimitX96: sqrtPriceLimitX96,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            marginDelta: '0',
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParamsLargeSwap).then(function (result) {
                                maxAvailableNotional = result[1];
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostSwap)(error);
                                maxAvailableNotional = result.availableNotional;
                            })];
                    case 6:
                        _b.sent();
                        scaledMaxAvailableNotional = this.descale(maxAvailableNotional);
                        result = {
                            marginRequirement: additionalMargin,
                            availableNotional: scaledAvailableNotional < 0 ? -scaledAvailableNotional : scaledAvailableNotional,
                            fee: scaledFee < 0 ? -scaledFee : scaledFee,
                            slippage: fixedRateDeltaRaw < 0 ? -fixedRateDeltaRaw : fixedRateDeltaRaw,
                            averageFixedRate: averageFixedRate < 0 ? -averageFixedRate : averageFixedRate,
                            fixedTokenDeltaBalance: this.descale(fixedTokenDelta),
                            variableTokenDeltaBalance: this.descale(availableNotional),
                            fixedTokenDeltaUnbalanced: this.descale(fixedTokenDeltaUnbalanced),
                            maxAvailableNotional: scaledMaxAvailableNotional < 0 ? -scaledMaxAvailableNotional : scaledMaxAvailableNotional,
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AMM.prototype.getExpectedApyInfo = function (_a) {
        var margin = _a.margin, position = _a.position, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, fixedTokenDeltaUnbalanced = _a.fixedTokenDeltaUnbalanced, availableNotional = _a.availableNotional, predictedVariableApy = _a.predictedVariableApy;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, signerAddress, marginEngineContract, currentMargin, rateOracleContract, lastBlock, lastBlockTimestamp, _b, _c, scaledCurrentMargin, positionMargin, accruedCashflow, positionUft, positionVt, accruedCashflowInfo, error_3, _d, expectedApy, expectedCashflow, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
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
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _e.sent();
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.callStatic.getPosition(signerAddress, tickLower, tickUpper)];
                    case 2:
                        currentMargin = (_e.sent()).margin;
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 3:
                        lastBlock = _e.sent();
                        _c = (_b = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 4:
                        lastBlockTimestamp = _c.apply(_b, [(_e.sent()).timestamp]);
                        scaledCurrentMargin = this.descale(currentMargin);
                        positionMargin = 0;
                        accruedCashflow = 0;
                        positionUft = ethers_1.BigNumber.from(0);
                        positionVt = ethers_1.BigNumber.from(0);
                        if (!position) return [3 /*break*/, 9];
                        positionUft = position.swaps.reduce(function (acc, swap) { return acc.add(swap.fixedTokenDeltaUnbalanced.toString()); }, ethers_1.BigNumber.from(0));
                        positionVt = position.swaps.reduce(function (acc, swap) { return acc.add(swap.variableTokenDelta.toString()); }, ethers_1.BigNumber.from(0));
                        positionMargin = scaledCurrentMargin;
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, 8, , 9]);
                        if (!(position.swaps.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, getAccruedCashflow_1.getAccruedCashflow)({
                                swaps: (0, getAccruedCashflow_1.transformSwaps)(position.swaps, this.underlyingToken.decimals),
                                rateOracle: rateOracleContract,
                                currentTime: Number(lastBlockTimestamp.toString()),
                                endTime: Number(ethers_1.utils.formatUnits(this.termEndTimestamp.toString(), 18)),
                            })];
                    case 6:
                        accruedCashflowInfo = _e.sent();
                        accruedCashflow = accruedCashflowInfo.accruedCashflow;
                        _e.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_3 = _e.sent();
                        sentry_1.sentryTracker.captureException(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [4 /*yield*/, this.expectedApy(positionUft.add(this.scale(fixedTokenDeltaUnbalanced)), positionVt.add(this.scale(availableNotional)), margin + positionMargin + accruedCashflow, predictedVariableApy)];
                    case 10:
                        _d = _e.sent(), expectedApy = _d[0], expectedCashflow = _d[1];
                        result = {
                            expectedApy: expectedApy,
                            expectedCashflow: expectedCashflow,
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AMM.prototype.swap = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, fullyCollateralisedVTSwap = _a.fullyCollateralisedVTSwap;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, factoryContract, peripheryAddress, peripheryContract, scaledNotional, swapPeripheryParams, tempOverrides, scaledMarginDelta, swapTransaction, estimatedGas, rateOracleContract, variableFactorFromStartToNowWad, estimatedGas, receipt, error_4;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
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
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else if (isFT) {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
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
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(margin.toFixed(18).toString());
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
                        if (!(fullyCollateralisedVTSwap === undefined || fullyCollateralisedVTSwap === false)) return [3 /*break*/, 5];
                        return [4 /*yield*/, peripheryContract.callStatic
                                .swap(swapPeripheryParams, tempOverrides)
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .swap(swapPeripheryParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .swap(swapPeripheryParams, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
                            })];
                    case 4:
                        swapTransaction = _b.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.variableFactor(ethers_1.BigNumber.from(this.termStartTimestamp.toString()), ethers_1.BigNumber.from(this.termEndTimestamp.toString()))];
                    case 6:
                        variableFactorFromStartToNowWad = _b.sent();
                        return [4 /*yield*/, peripheryContract.callStatic
                                .fullyCollateralisedVTSwap(swapPeripheryParams, variableFactorFromStartToNowWad, tempOverrides)
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .fullyCollateralisedVTSwap(swapPeripheryParams, variableFactorFromStartToNowWad, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 8:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .fullyCollateralisedVTSwap(swapPeripheryParams, variableFactorFromStartToNowWad, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
                            })];
                    case 9:
                        swapTransaction = _b.sent();
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, swapTransaction.wait()];
                    case 11:
                        receipt = _b.sent();
                        return [2 /*return*/, receipt];
                    case 12:
                        error_4 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_4);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.swapWithWeth = function (_a) {
        var isFT = _a.isFT, notional = _a.notional, margin = _a.margin, marginEth = _a.marginEth, fixedRateLimit = _a.fixedRateLimit, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, sqrtPriceLimitX96, tickLimit, factoryContract, peripheryAddress, peripheryContract, scaledNotional, tempOverrides, scaledMarginDelta, swapPeripheryParams, estimatedGas, swapTransaction, receipt, error_5;
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
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        if (fixedRateLimit) {
                            tickLimit = this.closestTickAndFixedRate(fixedRateLimit).closestUsableTick;
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickLimit).toString();
                        }
                        else if (isFT) {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                        }
                        else {
                            sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH && marginEth) {
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginEth.toFixed(18).toString());
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
                        return [4 /*yield*/, peripheryContract.callStatic
                                .swap(swapPeripheryParams, tempOverrides)
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .swap(swapPeripheryParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .swap(swapPeripheryParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
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
                        error_5 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_5);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
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
                        marginRequirement = ethers_1.BigNumber.from('0');
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).then(function (result) {
                                marginRequirement = ethers_1.BigNumber.from(result);
                            }, function (error) {
                                var result = (0, errorHandling_1.decodeInfoPostMint)(error);
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
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    AMM.prototype.mint = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, margin = _a.margin;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, scaledNotional, mintOrBurnParams, tempOverrides, scaledMarginDelta, estimatedGas, mintTransaction, receipt, error_6;
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
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH) {
                            mintOrBurnParams = {
                                marginEngine: this.marginEngineAddress,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                notional: scaledNotional,
                                isMint: true,
                                marginDelta: 0,
                            };
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(margin.toFixed(18).toString());
                        }
                        else {
                            scaledMarginDelta = this.scale(margin);
                            mintOrBurnParams = {
                                marginEngine: this.marginEngineAddress,
                                tickLower: tickLower,
                                tickUpper: tickUpper,
                                notional: scaledNotional,
                                isMint: true,
                                marginDelta: scaledMarginDelta,
                            };
                        }
                        return [4 /*yield*/, peripheryContract.callStatic
                                .mintOrBurn(mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .mintOrBurn(mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .mintOrBurn(mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
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
                        sentry_1.sentryTracker.captureException(error_6);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.mintWithWeth = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional, margin = _a.margin, marginEth = _a.marginEth;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, scaledNotional, tempOverrides, scaledMarginDelta, mintOrBurnParams, estimatedGas, mintTransaction, receipt, error_7;
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
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        tempOverrides = {};
                        if (this.isETH && marginEth) {
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginEth.toFixed(18).toString());
                        }
                        scaledMarginDelta = this.scale(margin);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: scaledNotional,
                            isMint: true,
                            marginDelta: scaledMarginDelta,
                        };
                        return [4 /*yield*/, peripheryContract.callStatic
                                .mintOrBurn(mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas
                                .mintOrBurn(mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .mintOrBurn(mintOrBurnParams, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
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
                        error_7 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_7);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // burn
    AMM.prototype.burn = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, scaledNotional, mintOrBurnParams, estimatedGas, burnTransaction, receipt, error_8;
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
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        scaledNotional = this.scale(notional);
                        mintOrBurnParams = {
                            marginEngine: this.marginEngineAddress,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: scaledNotional,
                            isMint: false,
                            marginDelta: '0',
                        };
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.mintOrBurn(mintOrBurnParams)];
                    case 3:
                        estimatedGas = _b.sent();
                        return [4 /*yield*/, peripheryContract
                                .mintOrBurn(mintOrBurnParams, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas),
                            })
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
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
                        error_8 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_8);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // update position margin
    AMM.prototype.updatePositionMargin = function (_a) {
        var fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, marginDelta = _a.marginDelta;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, tempOverrides, scaledMarginDelta, factoryContract, peripheryAddress, peripheryContract, estimatedGas, updatePositionMarginTransaction, receipt, error_9;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
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
                            tempOverrides.value = ethers_1.ethers.utils.parseEther(marginDelta.toFixed(18).toString());
                            scaledMarginDelta = '0';
                        }
                        else {
                            scaledMarginDelta = this.scale(marginDelta);
                        }
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(peripheryAddress, this.signer);
                        return [4 /*yield*/, peripheryContract.callStatic
                                .updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, tempOverrides)
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var errorMessage;
                                return __generator(this, function (_a) {
                                    errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                    throw new Error(errorMessage);
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, tempOverrides)];
                    case 3:
                        estimatedGas = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(estimatedGas);
                        return [4 /*yield*/, peripheryContract
                                .updatePositionMargin(this.marginEngineAddress, tickLower, tickUpper, scaledMarginDelta, false, tempOverrides)
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
                            })];
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
                        error_9 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_9);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // settlement
    AMM.prototype.settlePosition = function (_a) {
        var owner = _a.owner, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh;
        return __awaiter(this, void 0, void 0, function () {
            var effectiveOwner, _b, tickUpper, tickLower, factoryContract, peripheryAddress, peripheryContract, estimatedGas, settlePositionTransaction, receipt, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        if (!!owner) return [3 /*break*/, 2];
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
                        return [4 /*yield*/, peripheryContract.callStatic
                                .settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper)
                                .catch(function (error) {
                                var errorMessage = (0, errorHandling_1.getReadableErrorMessage)(error);
                                throw new Error(errorMessage);
                            })];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, peripheryContract.estimateGas.settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper)];
                    case 6:
                        estimatedGas = _c.sent();
                        return [4 /*yield*/, peripheryContract
                                .settlePositionAndWithdrawMargin(this.marginEngineAddress, effectiveOwner, tickLower, tickUpper, {
                                gasLimit: (0, constants_1.getGasBuffer)(estimatedGas),
                            })
                                .catch(function (error) {
                                sentry_1.sentryTracker.captureException(error);
                                sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                                throw new Error('Transaction Confirmation Error');
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
                        sentry_1.sentryTracker.captureException(error_10);
                        sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                        throw new Error('Transaction Confirmation Error');
                    case 11: return [2 /*return*/];
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
        return Number(ethers_1.ethers.utils.formatUnits(value, this.underlyingToken.decimals));
    };
    // token approval for periphery
    AMM.prototype.isTokenApprovedForPeriphery = function (_a) {
        var forceErc20Check = _a.forceErc20Check, approvalAmount = _a.approvalAmount;
        return __awaiter(this, void 0, void 0, function () {
            var scaledAmount, signerAddress, tokenAddress, token, factoryContract, peripheryAddress, allowance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!forceErc20Check && this.isETH) {
                            return [2 /*return*/, true];
                        }
                        scaledAmount = approvalAmount && this.scale(approvalAmount);
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _b.sent();
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.IERC20Minimal__factory.connect(tokenAddress, this.signer);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 2:
                        peripheryAddress = _b.sent();
                        return [4 /*yield*/, token.allowance(signerAddress, peripheryAddress)];
                    case 3:
                        allowance = _b.sent();
                        if (scaledAmount === undefined) {
                            return [2 /*return*/, allowance.gte(constants_1.TresholdApprovalBn)];
                        }
                        return [2 /*return*/, allowance.gte(scaledAmount)];
                }
            });
        });
    };
    AMM.prototype.approveUnderlyingTokenForPeriphery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddress, token, factoryContract, peripheryAddress, estimatedGas, error_11, _a, _b, _c, _d, approvalTransaction, error_12;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying token');
                        }
                        if (!this.signer) {
                            throw new Error('Wallet not connected');
                        }
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.IERC20Minimal__factory.connect(tokenAddress, this.signer);
                        factoryContract = typechain_1.Factory__factory.connect(this.factoryAddress, this.signer);
                        return [4 /*yield*/, factoryContract.periphery()];
                    case 1:
                        peripheryAddress = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, token.estimateGas.approve(peripheryAddress, constants_1.MaxUint256Bn)];
                    case 3:
                        estimatedGas = _e.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_11 = _e.sent();
                        sentry_1.sentryTracker.captureException(error_11);
                        _b = (_a = sentry_1.sentryTracker).captureMessage;
                        _d = (_c = "Could not increase periphery allowance (".concat(tokenAddress, ", ")).concat;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 5:
                        _b.apply(_a, [_d.apply(_c, [_e.sent(), ", "]).concat(constants_1.MaxUint256Bn.toString(), ")")]);
                        throw new Error("Unable to approve. If your existing allowance is non-zero but lower than needed, some tokens like USDT require you to call approve(\"".concat(peripheryAddress, "\", 0) before you can increase the allowance."));
                    case 6: return [4 /*yield*/, token
                            .approve(peripheryAddress, constants_1.MaxUint256Bn, {
                            gasLimit: (0, constants_1.getGasBuffer)(estimatedGas),
                        })
                            .catch(function (error) {
                            sentry_1.sentryTracker.captureException(error);
                            sentry_1.sentryTracker.captureMessage('Transaction Confirmation Error');
                            throw new Error('Transaction Confirmation Error');
                        })];
                    case 7:
                        approvalTransaction = _e.sent();
                        _e.label = 8;
                    case 8:
                        _e.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, approvalTransaction.wait()];
                    case 9:
                        _e.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        error_12 = _e.sent();
                        sentry_1.sentryTracker.captureException(error_12);
                        sentry_1.sentryTracker.captureMessage('Token approval failed');
                        throw new Error('Token approval failed');
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AMM.prototype, "protocol", {
        // protocol name
        get: function () {
            var tokenName = this.underlyingToken.name;
            var prefix = (0, getTokenInfo_1.getProtocolPrefix)(this.rateOracle.protocolId);
            return "".concat(prefix).concat(tokenName);
        },
        enumerable: false,
        configurable: true
    });
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
    AMM.prototype.getVariableFactor = function (termStartTimestamp, termEndTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var rateOracleContract, result, resultScaled, error_13;
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
                        error_13 = _a.sent();
                        sentry_1.sentryTracker.captureException(error_13);
                        sentry_1.sentryTracker.captureMessage('Cannot get variable factor');
                        throw new Error('Cannot get variable factor');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // tick functionalities
    AMM.prototype.closestTickAndFixedRate = function (fixedRate) {
        var inRangeFixedRate = Math.min(Math.max(fixedRate, constants_1.MIN_FIXED_RATE), constants_1.MAX_FIXED_RATE);
        var fixedRatePrice = price_1.Price.fromNumber(inRangeFixedRate);
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
    AMM.prototype.underlyingTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, currentBalance, tokenAddress, token;
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
                            throw new Error('No underlying token');
                        }
                        tokenAddress = this.underlyingToken.id;
                        token = typechain_1.IERC20Minimal__factory.connect(tokenAddress, this.signer);
                        return [4 /*yield*/, token.balanceOf(signerAddress)];
                    case 4:
                        currentBalance = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, this.descale(currentBalance)];
                }
            });
        });
    };
    // one week look-back window apy
    AMM.prototype.getInstantApy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blocksPerDay, blockPerHour, _a, rateOracleContract, lendingPoolAddress, lendingPool, reservesData, rateInRay, result, daysPerYear, rateOracle, cTokenAddress, cTokenContract, supplyRatePerBlock, supplyApy, lastBlock, to, _b, _c, from, _d, _e, rateOracleContract, oneWeekApy, lastBlock, to, _f, _g, from, _h, _j, rateOracleContract, oneWeekApy, rateOracleContract, lendingPoolAddress, lendingPool, reservesData, rateInRay, result, daysPerYear, rateOracle, cTokenAddress, cTokenContract, borrowRatePerBlock, borrowApy;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!this.provider) {
                            throw new Error('Blockchain not connected');
                        }
                        blocksPerDay = 6570;
                        blockPerHour = 274;
                        _a = this.rateOracle.protocolId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 1];
                            case 2: return [3 /*break*/, 4];
                            case 3: return [3 /*break*/, 7];
                            case 4: return [3 /*break*/, 12];
                            case 5: return [3 /*break*/, 17];
                            case 6: return [3 /*break*/, 20];
                        }
                        return [3 /*break*/, 23];
                    case 1:
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        rateOracleContract = typechain_1.AaveBorrowRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.aaveLendingPool()];
                    case 2:
                        lendingPoolAddress = _k.sent();
                        lendingPool = typechain_1.IAaveV2LendingPool__factory.connect(lendingPoolAddress, this.provider);
                        return [4 /*yield*/, lendingPool.getReserveData(this.underlyingToken.id)];
                    case 3:
                        reservesData = _k.sent();
                        rateInRay = reservesData.currentLiquidityRate;
                        result = rateInRay.div(ethers_1.BigNumber.from(10).pow(21)).toNumber() / 1000000;
                        return [2 /*return*/, result];
                    case 4:
                        daysPerYear = 365;
                        rateOracle = typechain_1.CompoundRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracle.ctoken()];
                    case 5:
                        cTokenAddress = _k.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.provider);
                        return [4 /*yield*/, cTokenContract.supplyRatePerBlock()];
                    case 6:
                        supplyRatePerBlock = _k.sent();
                        supplyApy = Math.pow(((supplyRatePerBlock.toNumber() / 1e18) * blocksPerDay + 1), daysPerYear) - 1;
                        return [2 /*return*/, supplyApy];
                    case 7: return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 8:
                        lastBlock = _k.sent();
                        _c = (_b = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 9:
                        to = _c.apply(_b, [(_k.sent()).timestamp]);
                        _e = (_d = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 28 * blockPerHour)];
                    case 10:
                        from = _e.apply(_d, [(_k.sent()).timestamp]);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(from, to)];
                    case 11:
                        oneWeekApy = _k.sent();
                        return [2 /*return*/, oneWeekApy.div(ethers_1.BigNumber.from(1000000000000)).toNumber() / 1000000];
                    case 12: return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 13:
                        lastBlock = _k.sent();
                        _g = (_f = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 1)];
                    case 14:
                        to = _g.apply(_f, [(_k.sent()).timestamp]);
                        _j = (_h = ethers_1.BigNumber).from;
                        return [4 /*yield*/, this.provider.getBlock(lastBlock - 28 * blockPerHour)];
                    case 15:
                        from = _j.apply(_h, [(_k.sent()).timestamp]);
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.callStatic.getApyFromTo(from, to)];
                    case 16:
                        oneWeekApy = _k.sent();
                        return [2 /*return*/, oneWeekApy.div(ethers_1.BigNumber.from(1000000000000)).toNumber() / 1000000];
                    case 17:
                        if (!this.underlyingToken.id) {
                            throw new Error('No underlying error');
                        }
                        rateOracleContract = typechain_1.AaveBorrowRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracleContract.aaveLendingPool()];
                    case 18:
                        lendingPoolAddress = _k.sent();
                        lendingPool = typechain_1.IAaveV2LendingPool__factory.connect(lendingPoolAddress, this.provider);
                        return [4 /*yield*/, lendingPool.getReserveData(this.underlyingToken.id)];
                    case 19:
                        reservesData = _k.sent();
                        rateInRay = reservesData.currentVariableBorrowRate;
                        result = rateInRay.div(ethers_1.BigNumber.from(10).pow(21)).toNumber() / 1000000;
                        return [2 /*return*/, result];
                    case 20:
                        daysPerYear = 365;
                        rateOracle = typechain_1.CompoundBorrowRateOracle__factory.connect(this.rateOracle.id, this.provider);
                        return [4 /*yield*/, rateOracle.ctoken()];
                    case 21:
                        cTokenAddress = _k.sent();
                        cTokenContract = typechain_1.ICToken__factory.connect(cTokenAddress, this.provider);
                        return [4 /*yield*/, cTokenContract.borrowRatePerBlock()];
                    case 22:
                        borrowRatePerBlock = _k.sent();
                        borrowApy = Math.pow(((borrowRatePerBlock.toNumber() / 1e18) * blocksPerDay + 1), daysPerYear) - 1;
                        return [2 /*return*/, borrowApy];
                    case 23: throw new Error('Unrecognized protocol');
                }
            });
        });
    };
    return AMM;
}());
exports.AMM = AMM;
//# sourceMappingURL=amm.js.map