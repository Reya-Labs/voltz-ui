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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccruedCashflow = exports.transformSwaps = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable no-lonely-if */
var ethers_1 = require("ethers");
var constants_1 = require("../constants");
var getAnnualizedTime = function (start, end) {
    return (end - start) / constants_1.ONE_YEAR_IN_SECONDS;
};
// get all swaps of some position, descale the values to numbers and sort by time
function transformSwaps(swaps, decimals) {
    return swaps
        .map(function (s) {
        return {
            notional: Number(ethers_1.utils.formatUnits(ethers_1.BigNumber.from(s.variableTokenDelta.toString()), decimals)),
            time: Number(s.transactionTimestamp.toString()),
            avgFixedRate: Math.abs(Number(ethers_1.utils.formatUnits(ethers_1.BigNumber.from(s.fixedTokenDeltaUnbalanced.toString())
                .mul(ethers_1.BigNumber.from(10).pow(18))
                .div(ethers_1.BigNumber.from(s.variableTokenDelta.toString())), 20))),
        };
    })
        .sort(function (a, b) { return a.time - b.time; });
}
exports.transformSwaps = transformSwaps;
// get accrued cashflow of some position between two timestamps
function getAccruedCashflowBetween(notional, fixedRate, rateOracle, from, to) {
    return __awaiter(this, void 0, void 0, function () {
        var nTime, variableRate, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    nTime = getAnnualizedTime(from, to);
                    _a = Number;
                    _c = (_b = ethers_1.utils).formatUnits;
                    return [4 /*yield*/, rateOracle.getApyFromTo(from, to)];
                case 1:
                    variableRate = _a.apply(void 0, [_c.apply(_b, [_d.sent(), 18])]);
                    return [2 /*return*/, notional * nTime * (variableRate - fixedRate)];
            }
        });
    });
}
// in the case of an unwind, get the locked "profit" in the fixed token balance
// e.g. some position of 1,000 VT notional @ avg fixed rate 5%
// an unwind of 500 FT notional is triggered @ avg fixed rate 6% (at time T)
// the locked "profit" is 500 * (5% - 6%) * (Maturity - T) / YEAR
function getLockedInProfit(notional, // notional of unwind
timeInYears, fixedRate0, fixedRate1) {
    // if the notional in unwind > 0, this means that the position is FT, then unwind (VT)
    // if the notional in unwind < 0, this means that the position is VT, then unwind (FT)
    return notional * timeInYears * (fixedRate0 - fixedRate1);
}
// get the accrued cashflow and average fixed rate of particular position
var getAccruedCashflow = function (_a) {
    var swaps = _a.swaps, rateOracle = _a.rateOracle, currentTime = _a.currentTime, endTime = _a.endTime;
    return __awaiter(void 0, void 0, void 0, function () {
        var info, i, timeUntilMaturity, lockedInProfit, accruedCashflowBetween, lockedInProfit, accruedCashflowBetween, accruedCashflowBetween, accruedCashflowBetween, lockedInProfit, accruedCashflowBetween, lockedInProfit, accruedCashflowBetween, accruedCashflowBetween;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (swaps.length === 0) {
                        return [2 /*return*/, {
                                avgFixedRate: 0,
                                accruedCashflow: 0,
                            }];
                    }
                    info = __assign({ accruedCashflow: 0 }, swaps[0]);
                    i = 1;
                    _b.label = 1;
                case 1:
                    if (!(i < swaps.length)) return [3 /*break*/, 16];
                    timeUntilMaturity = getAnnualizedTime(swaps[i].time, endTime);
                    if (!(info.notional >= 0)) return [3 /*break*/, 9];
                    if (!(swaps[i].notional < 0)) return [3 /*break*/, 6];
                    if (!(info.notional + swaps[i].notional > 0)) return [3 /*break*/, 3];
                    lockedInProfit = getLockedInProfit(swaps[i].notional, timeUntilMaturity, info.avgFixedRate, swaps[i].avgFixedRate);
                    return [4 /*yield*/, getAccruedCashflowBetween(-swaps[i].notional, // notional > 0
                        info.avgFixedRate, rateOracle, info.time, swaps[i].time)];
                case 2:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
                        notional: info.notional + swaps[i].notional,
                        time: info.time,
                        avgFixedRate: info.avgFixedRate,
                    };
                    return [3 /*break*/, 5];
                case 3:
                    lockedInProfit = getLockedInProfit(-info.notional, timeUntilMaturity, info.avgFixedRate, swaps[i].avgFixedRate);
                    return [4 /*yield*/, getAccruedCashflowBetween(info.notional, // notional > 0
                        info.avgFixedRate, rateOracle, info.time, swaps[i].time)];
                case 4:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
                        notional: info.notional + swaps[i].notional,
                        time: swaps[i].time,
                        avgFixedRate: swaps[i].avgFixedRate,
                    };
                    _b.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, getAccruedCashflowBetween(info.notional, info.avgFixedRate, rateOracle, info.time, swaps[i].time)];
                case 7:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + accruedCashflowBetween,
                        notional: info.notional + swaps[i].notional,
                        time: swaps[i].time,
                        avgFixedRate: (info.avgFixedRate * info.notional + swaps[i].avgFixedRate * swaps[i].notional) /
                            (info.notional + swaps[i].notional),
                    };
                    _b.label = 8;
                case 8: return [3 /*break*/, 15];
                case 9:
                    if (!(swaps[i].notional < 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, getAccruedCashflowBetween(info.notional, info.avgFixedRate, rateOracle, info.time, swaps[i].time)];
                case 10:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + accruedCashflowBetween,
                        notional: info.notional + swaps[i].notional,
                        time: swaps[i].time,
                        avgFixedRate: (info.avgFixedRate * info.notional + swaps[i].avgFixedRate * swaps[i].notional) /
                            (info.notional + swaps[i].notional),
                    };
                    return [3 /*break*/, 15];
                case 11:
                    if (!(info.notional + swaps[i].notional < 0)) return [3 /*break*/, 13];
                    lockedInProfit = getLockedInProfit(swaps[i].notional, timeUntilMaturity, info.avgFixedRate, swaps[i].avgFixedRate);
                    return [4 /*yield*/, getAccruedCashflowBetween(-swaps[i].notional, // notional < 0
                        info.avgFixedRate, rateOracle, info.time, swaps[i].time)];
                case 12:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
                        notional: info.notional + swaps[i].notional,
                        time: info.time,
                        avgFixedRate: info.avgFixedRate,
                    };
                    return [3 /*break*/, 15];
                case 13:
                    lockedInProfit = getLockedInProfit(-info.notional, timeUntilMaturity, info.avgFixedRate, swaps[i].avgFixedRate);
                    return [4 /*yield*/, getAccruedCashflowBetween(info.notional, // notional < 0
                        info.avgFixedRate, rateOracle, info.time, swaps[i].time)];
                case 14:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
                        notional: info.notional + swaps[i].notional,
                        time: swaps[i].time,
                        avgFixedRate: swaps[i].avgFixedRate,
                    };
                    _b.label = 15;
                case 15:
                    i += 1;
                    return [3 /*break*/, 1];
                case 16: return [4 /*yield*/, getAccruedCashflowBetween(info.notional, info.avgFixedRate, rateOracle, info.time, currentTime)];
                case 17:
                    accruedCashflowBetween = _b.sent();
                    info = {
                        accruedCashflow: info.accruedCashflow + accruedCashflowBetween,
                        notional: info.notional,
                        time: currentTime,
                        avgFixedRate: info.avgFixedRate,
                    };
                    return [2 /*return*/, {
                            avgFixedRate: 100 * info.avgFixedRate,
                            accruedCashflow: info.accruedCashflow,
                        }];
            }
        });
    });
};
exports.getAccruedCashflow = getAccruedCashflow;
