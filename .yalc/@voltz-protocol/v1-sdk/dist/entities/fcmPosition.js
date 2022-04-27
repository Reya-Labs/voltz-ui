"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var luxon_1 = require("luxon");
var ethers_1 = require("ethers");
var FCMPosition = /** @class */ (function () {
    function FCMPosition(_a) {
        var id = _a.id, createdTimestamp = _a.createdTimestamp, amm = _a.amm, owner = _a.owner, updatedTimestamp = _a.updatedTimestamp, marginInScaledYieldBearingTokens = _a.marginInScaledYieldBearingTokens, fixedTokenBalance = _a.fixedTokenBalance, variableTokenBalance = _a.variableTokenBalance, isSettled = _a.isSettled, fcmSwaps = _a.fcmSwaps, fcmUnwinds = _a.fcmUnwinds, fcmSettlements = _a.fcmSettlements;
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
    }
    Object.defineProperty(FCMPosition.prototype, "effectiveMargin", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.marginInScaledYieldBearingTokens.toString()));
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FCMPosition.prototype, "effectiveFixedTokenBalance", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.fixedTokenBalance.toString()));
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FCMPosition.prototype, "effectiveVariableTokenBalance", {
        get: function () {
            var result = this.amm.descale(ethers_1.BigNumber.from(this.variableTokenBalance.toString()));
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FCMPosition.prototype, "createdDateTime", {
        get: function () {
            return luxon_1.DateTime.fromMillis(jsbi_1.default.toNumber(this.createdTimestamp));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FCMPosition.prototype, "updatedDateTime", {
        get: function () {
            return luxon_1.DateTime.fromMillis(jsbi_1.default.toNumber(this.updatedTimestamp));
        },
        enumerable: false,
        configurable: true
    });
    return FCMPosition;
}());
exports.default = FCMPosition;
