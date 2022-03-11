"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var ethers_1 = require("ethers");
var constants_1 = require("../constants");
var price_1 = require("./fractions/price");
var typechain_1 = require("../typechain");
var tickMath_1 = require("../utils/tickMath");
var timestampWadToDateTime_1 = __importDefault(require("../utils/timestampWadToDateTime"));
var priceTickConversions_1 = require("../utils/priceTickConversions");
var nearestUsableTick_1 = require("../utils/nearestUsableTick");
var AMM = /** @class */ (function () {
    function AMM(_a) {
        var id = _a.id, signer = _a.signer, marginEngineAddress = _a.marginEngineAddress, fcmAddress = _a.fcmAddress, rateOracle = _a.rateOracle, createdTimestamp = _a.createdTimestamp, updatedTimestamp = _a.updatedTimestamp, termStartTimestamp = _a.termStartTimestamp, termEndTimestamp = _a.termEndTimestamp, underlyingToken = _a.underlyingToken, sqrtPriceX96 = _a.sqrtPriceX96, liquidity = _a.liquidity, tick = _a.tick, tickSpacing = _a.tickSpacing, txCount = _a.txCount;
        this.id = id;
        this.signer = signer;
        this.marginEngineAddress = marginEngineAddress;
        this.fcmAddress = fcmAddress;
        this.rateOracle = rateOracle;
        this.createdTimestamp = jsbi_1.default.BigInt(createdTimestamp);
        this.updatedTimestamp = jsbi_1.default.BigInt(updatedTimestamp);
        this.termStartTimestamp = jsbi_1.default.BigInt(termStartTimestamp);
        this.termEndTimestamp = jsbi_1.default.BigInt(termEndTimestamp);
        this.underlyingToken = underlyingToken;
        this.sqrtPriceX96 = jsbi_1.default.BigInt(sqrtPriceX96);
        this.liquidity = jsbi_1.default.BigInt(liquidity);
        this.tickSpacing = jsbi_1.default.BigInt(tickSpacing);
        this.tick = jsbi_1.default.BigInt(tick);
        this.txCount = jsbi_1.default.BigInt(txCount);
    }
    AMM.prototype.getMinimumMarginRequirementPostSwap = function (_a) {
        var recipient = _a.recipient, isFT = _a.isFT, notional = _a.notional, sqrtPriceLimitX96 = _a.sqrtPriceLimitX96, tickLower = _a.tickLower, tickUpper = _a.tickUpper;
        return __awaiter(this, void 0, void 0, function () {
            var peripheryContract, swapPeripheryParams, marginRequirement;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
                        swapPeripheryParams = {
                            marginEngineAddress: this.marginEngineAddress,
                            recipient: recipient,
                            isFT: isFT,
                            notional: notional,
                            sqrtPriceLimitX96: sqrtPriceLimitX96,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                        };
                        marginRequirement = ethers_1.BigNumber.from(0);
                        return [4 /*yield*/, peripheryContract.callStatic.swap(swapPeripheryParams).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    marginRequirement = result[4];
                                    return [2 /*return*/];
                                });
                            }); }, function (error) {
                                if (error.message.includes('MarginRequirementNotMet')) {
                                    var args = error.message
                                        .split('(')[1]
                                        .split(')')[0]
                                        .replaceAll(' ', '')
                                        .split(',');
                                    marginRequirement = ethers_1.BigNumber.from(args[0]);
                                }
                                else {
                                    console.error(error.message);
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, marginRequirement];
                }
            });
        });
    };
    AMM.prototype.getMinimumMarginRequirementPostMint = function (_a) {
        var recipient = _a.recipient, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, notional = _a.notional;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower, peripheryContract, mintOrBurnParams, marginRequirement;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                        tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
                        mintOrBurnParams = {
                            marginEngineAddress: this.marginEngineAddress,
                            recipient: recipient,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: notional,
                            isMint: true,
                        };
                        marginRequirement = ethers_1.BigNumber.from(0);
                        return [4 /*yield*/, peripheryContract.callStatic.mintOrBurn(mintOrBurnParams).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    marginRequirement = result[0];
                                    return [2 /*return*/];
                                });
                            }); }, function (error) {
                                if (error.message.includes('MarginRequirementNotMet')) {
                                    var args = error.message
                                        .split('(')[1]
                                        .split(')')[0]
                                        .replaceAll(' ', '')
                                        .split(',');
                                    marginRequirement = ethers_1.BigNumber.from(args[0]);
                                }
                                else {
                                    console.error(error.message);
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, marginRequirement];
                }
            });
        });
    };
    AMM.prototype.settlePosition = function (_a) {
        var owner = _a.owner, tickLower = _a.tickLower, tickUpper = _a.tickUpper;
        return __awaiter(this, void 0, void 0, function () {
            var marginEngineContract, settlePositionReceipt;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.settlePosition(tickLower, tickUpper, owner)];
                    case 1:
                        settlePositionReceipt = _b.sent();
                        return [2 /*return*/, settlePositionReceipt];
                }
            });
        });
    };
    AMM.prototype.updatePositionMargin = function (_a) {
        var owner = _a.owner, tickLower = _a.tickLower, tickUpper = _a.tickUpper, marginDelta = _a.marginDelta;
        return __awaiter(this, void 0, void 0, function () {
            var marginEngineContract, updatePositionMarginReceipt;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        // approve the margin engine
                        return [4 /*yield*/, this.approveMarginEngine(marginDelta)];
                    case 1:
                        // approve the margin engine
                        _b.sent();
                        tickLower = parseInt(tickLower.toString());
                        tickUpper = parseInt(tickUpper.toString());
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(this.marginEngineAddress, this.signer);
                        return [4 /*yield*/, marginEngineContract.updatePositionMargin(owner, tickLower, tickUpper, marginDelta)];
                    case 2:
                        updatePositionMarginReceipt = _b.sent();
                        return [2 /*return*/, updatePositionMarginReceipt];
                }
            });
        });
    };
    AMM.prototype.mint = function (_a) {
        var recipient = _a.recipient, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, margin = _a.margin, leverage = _a.leverage;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower;
            return __generator(this, function (_b) {
                tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                return [2 /*return*/, this.mintUsingTicks({
                        recipient: recipient,
                        tickLower: tickLower,
                        tickUpper: tickUpper,
                        notional: margin * leverage,
                    })];
            });
        });
    };
    AMM.prototype.updateSqrtPriceX96 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vammContract, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        vammContract = typechain_1.VAMM__factory.connect(this.id, this.signer);
                        _a = this;
                        _c = (_b = jsbi_1.default).BigInt;
                        return [4 /*yield*/, vammContract.callStatic.vammVars()];
                    case 1:
                        _a.sqrtPriceX96 = _c.apply(_b, [(_d.sent())[0].toString()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.initVamm = function (tickLower) {
        return __awaiter(this, void 0, void 0, function () {
            var vammContract, sqrtPriceX96;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        vammContract = typechain_1.VAMM__factory.connect(this.id, this.signer);
                        if (!jsbi_1.default.EQ(this.sqrtPriceX96, jsbi_1.default.BigInt(0))) return [3 /*break*/, 2];
                        sqrtPriceX96 = tickMath_1.TickMath.getSqrtRatioAtTick(ethers_1.BigNumber.from(tickLower).toNumber()).toString();
                        return [4 /*yield*/, vammContract.initializeVAMM(sqrtPriceX96)];
                    case 1:
                        _a.sent();
                        this.sqrtPriceX96 = jsbi_1.default.BigInt(sqrtPriceX96);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.mintUsingTicks = function (_a) {
        var tickLower = _a.tickLower, args = __rest(_a, ["tickLower"]);
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!this.signer) {
                    return [2 /*return*/];
                }
                this.initVamm(tickLower);
                return [2 /*return*/, this.mintOrBurnUsingTicks(__assign(__assign({}, args), { tickLower: tickLower, isMint: true }))];
            });
        });
    };
    AMM.prototype.burn = function (_a) {
        var recipient = _a.recipient, fixedLow = _a.fixedLow, fixedHigh = _a.fixedHigh, margin = _a.margin, leverage = _a.leverage;
        return __awaiter(this, void 0, void 0, function () {
            var tickUpper, tickLower;
            return __generator(this, function (_b) {
                tickUpper = this.closestTickAndFixedRate(fixedLow).closestUsableTick;
                tickLower = this.closestTickAndFixedRate(fixedHigh).closestUsableTick;
                return [2 /*return*/, this.burnUsingTicks({
                        recipient: recipient,
                        tickLower: tickLower,
                        tickUpper: tickUpper,
                        notional: margin * leverage,
                    })];
            });
        });
    };
    AMM.prototype.burnUsingTicks = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mintOrBurnUsingTicks(__assign(__assign({}, args), { isMint: false }))];
            });
        });
    };
    AMM.prototype.mintOrBurnUsingTicks = function (_a) {
        var recipient = _a.recipient, tickLower = _a.tickLower, tickUpper = _a.tickUpper, notional = _a.notional, isMint = _a.isMint;
        return __awaiter(this, void 0, void 0, function () {
            var peripheryContract, mintOrBurnParams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        console.log("approvePeriphery");
                        return [4 /*yield*/, this.approvePeriphery()];
                    case 1:
                        _b.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
                        mintOrBurnParams = {
                            marginEngineAddress: this.marginEngineAddress,
                            recipient: recipient,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            notional: notional,
                            isMint: isMint,
                        };
                        console.log("mintOrBurn");
                        return [2 /*return*/, peripheryContract.mintOrBurn(mintOrBurnParams)];
                }
            });
        });
    };
    AMM.prototype.approvePeriphery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var factoryContract, signerAddress, isApproved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        factoryContract = typechain_1.Factory__factory.connect(constants_1.FACTORY_ADDRESS, this.signer);
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        signerAddress = _a.sent();
                        return [4 /*yield*/, factoryContract.isApproved(signerAddress, constants_1.PERIPHERY_ADDRESS)];
                    case 2:
                        isApproved = _a.sent();
                        if (!!isApproved) return [3 /*break*/, 4];
                        return [4 /*yield*/, factoryContract.setApproval(constants_1.PERIPHERY_ADDRESS, true)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.approveMarginEngine = function (marginDelta) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        if (!this.underlyingToken.id) {
                            return [2 /*return*/];
                        }
                        token = typechain_1.ERC20Mock__factory.connect(this.underlyingToken.id, this.signer);
                        return [4 /*yield*/, token.approve(this.marginEngineAddress, marginDelta)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AMM.prototype.swap = function (_a) {
        var recipient = _a.recipient, isFT = _a.isFT, notional = _a.notional, sqrtPriceLimitX96 = _a.sqrtPriceLimitX96, _b = _a.tickLower, tickLower = _b === void 0 ? 0 : _b, _c = _a.tickUpper, tickUpper = _c === void 0 ? 0 : _c;
        return __awaiter(this, void 0, void 0, function () {
            var peripheryContract, swapPeripheryParams;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.signer) {
                            return [2 /*return*/];
                        }
                        if (sqrtPriceLimitX96.toString() === '0') {
                            if (isFT) {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MAX_TICK - 1).toString();
                            }
                            else {
                                sqrtPriceLimitX96 = tickMath_1.TickMath.getSqrtRatioAtTick(tickMath_1.TickMath.MIN_TICK + 1).toString();
                            }
                        }
                        return [4 /*yield*/, this.approvePeriphery()];
                    case 1:
                        _d.sent();
                        peripheryContract = typechain_1.Periphery__factory.connect(constants_1.PERIPHERY_ADDRESS, this.signer);
                        swapPeripheryParams = {
                            marginEngineAddress: this.marginEngineAddress,
                            recipient: recipient,
                            isFT: isFT,
                            notional: notional,
                            sqrtPriceLimitX96: sqrtPriceLimitX96,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                        };
                        return [2 /*return*/, peripheryContract.swap(swapPeripheryParams)];
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
    Object.defineProperty(AMM.prototype, "fixedRate", {
        get: function () {
            if (!this._fixedRate) {
                this._fixedRate = new price_1.Price(jsbi_1.default.multiply(this.sqrtPriceX96, this.sqrtPriceX96), constants_1.Q192);
            }
            return this._fixedRate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AMM.prototype, "fixedApr", {
        get: function () {
            return parseInt(this.fixedRate.toFixed(2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AMM.prototype, "price", {
        get: function () {
            if (!this._price) {
                this._price = new price_1.Price(constants_1.Q192, jsbi_1.default.multiply(this.sqrtPriceX96, this.sqrtPriceX96));
            }
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AMM.prototype, "variableApr", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AMM.prototype, "protocol", {
        get: function () {
            var firstProtocolCharacter = this.rateOracle.protocol[0];
            var tokenName = this.underlyingToken.name;
            return "".concat(firstProtocolCharacter.toLowerCase()).concat(tokenName);
        },
        enumerable: false,
        configurable: true
    });
    AMM.prototype.closestTickAndFixedRate = function (fixedRate) {
        var fixedRatePrice = price_1.Price.fromNumber(fixedRate);
        var closestTick = (0, priceTickConversions_1.fixedRateToClosestTick)(fixedRatePrice);
        var closestUsableTick = (0, nearestUsableTick_1.nearestUsableTick)(closestTick, jsbi_1.default.toNumber(this.tickSpacing));
        var closestUsableFixedRate = (0, priceTickConversions_1.tickToFixedRate)(closestUsableTick);
        return {
            closestUsableTick: closestUsableTick,
            closestUsableFixedRate: closestUsableFixedRate,
        };
    };
    return AMM;
}());
exports.default = AMM;
