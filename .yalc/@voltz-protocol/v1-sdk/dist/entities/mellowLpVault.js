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
/* eslint-disable camelcase */
/* eslint-disable lines-between-class-members */
var ethers_1 = require("ethers");
var lodash_1 = require("lodash");
var getTokenInfo_1 = require("../services/getTokenInfo");
var timestampWadToDateTime_1 = __importDefault(require("../utils/timestampWadToDateTime"));
var typechain_1 = require("../typechain");
var MellowLpVault = /** @class */ (function () {
    function MellowLpVault(_a) {
        var id = _a.id, provider = _a.provider;
        var _this = this;
        this.vaultInitialized = false;
        this.userInitialized = false;
        this.descale = function (amount, decimals) {
            return Number(ethers_1.ethers.utils.formatUnits(amount, decimals));
        };
        this.scale = function (amount) {
            return ethers_1.ethers.utils.parseUnits(amount.toString(), _this.tokenDecimals);
        };
        // NEXT: to offload this to subgraph
        this.vaultInit = function () { return __awaiter(_this, void 0, void 0, function () {
            var marginEngineAddress, marginEngineContract, tokenAddress, tokenContract, rateOracleAddress, rateOracleContract, _a, maturityWad, date;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.vaultInitialized) {
                            console.log('The vault is already initialized');
                            return [2 /*return*/];
                        }
                        if ((0, lodash_1.isUndefined)(this.provider)) {
                            console.log('Stop here... No provider provided');
                            return [2 /*return*/];
                        }
                        marginEngineAddress = '0x0BC09825Ce9433B2cDF60891e1B50a300b069Dd2';
                        marginEngineContract = typechain_1.MarginEngine__factory.connect(marginEngineAddress, this.provider);
                        return [4 /*yield*/, marginEngineContract.underlyingToken()];
                    case 1:
                        tokenAddress = _b.sent();
                        tokenContract = typechain_1.IERC20Minimal__factory.connect(tokenAddress, this.provider);
                        console.log('token address:', tokenAddress);
                        return [4 /*yield*/, marginEngineContract.rateOracle()];
                    case 2:
                        rateOracleAddress = _b.sent();
                        rateOracleContract = typechain_1.BaseRateOracle__factory.connect(rateOracleAddress, this.provider);
                        console.log('rate oracle:', rateOracleAddress);
                        this.readOnlyContracts = {
                            marginEngine: marginEngineContract,
                            token: tokenContract,
                            rateOracle: rateOracleContract,
                            // TODO: build erc20Vault
                            erc20Vault: null,
                        };
                        console.log('read-only contracts ready');
                        _a = this;
                        return [4 /*yield*/, rateOracleContract.UNDERLYING_YIELD_BEARING_PROTOCOL_ID()];
                    case 3:
                        _a.protocolId = _b.sent();
                        console.log('protocol ID:', this.protocolId);
                        return [4 /*yield*/, marginEngineContract.termEndTimestampWad()];
                    case 4:
                        maturityWad = _b.sent();
                        date = (0, timestampWadToDateTime_1.default)(maturityWad);
                        this.maturity = "".concat(date.day, " ").concat(date.monthShort, " ").concat(date.year % 100);
                        console.log('maturity:', this.maturity);
                        return [4 /*yield*/, this.refreshVaultCap()];
                    case 5:
                        _b.sent();
                        console.log('vault cap refreshed', this.vaultCap);
                        return [4 /*yield*/, this.refreshVaultAccumulative()];
                    case 6:
                        _b.sent();
                        console.log('vault accumulative refreshed', this.vaultAccumulative);
                        return [4 /*yield*/, this.refreshVaultExpectedApy()];
                    case 7:
                        _b.sent();
                        console.log('vault expected apy refreshed', this.vaultExpectedApy);
                        this.vaultInitialized = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.userInit = function (signer) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.signer = signer;
                        if (this.userInitialized) {
                            console.log('The user is already initialized');
                            return [2 /*return*/];
                        }
                        if (!this.vaultInitialized) {
                            console.log('The vault should be initialized first');
                            return [2 /*return*/];
                        }
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        _a = this;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        _a.userAddress = _b.sent();
                        console.log('user address', this.userAddress);
                        this.writeContracts = {
                            token: typechain_1.IERC20Minimal__factory.connect(this.readOnlyContracts.token.address, this.signer),
                            // TODO: build erc20Vault
                            erc20Vault: null,
                        };
                        console.log('write contracts ready');
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 2:
                        _b.sent();
                        console.log('user deposit refreshed', this.userDeposit);
                        return [4 /*yield*/, this.refreshUserExpectedCashflow()];
                    case 3:
                        _b.sent();
                        console.log('user expected cashflow refreshed', this.userExpectedCashflow);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 4:
                        _b.sent();
                        console.log('user wallet balance refreshed', this.userWalletBalance);
                        this.userInitialized = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.refreshVaultCap = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.vaultCap = 20000;
                return [2 /*return*/];
            });
        }); };
        this.refreshVaultAccumulative = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.vaultAccumulative = 10000;
                return [2 /*return*/];
            });
        }); };
        this.refreshVaultExpectedApy = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.vaultExpectedApy = 7;
                return [2 /*return*/];
            });
        }); };
        this.refreshUserDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.userDeposit = 1999;
                return [2 /*return*/];
            });
        }); };
        this.refreshUserExpectedCashflow = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.userExpectedCashflow = 299;
                return [2 /*return*/];
            });
        }); };
        this.refreshWalletBalance = function () { return __awaiter(_this, void 0, void 0, function () {
            var walletBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            this.userWalletBalance = 0;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.token.balanceOf(this.userAddress)];
                    case 1:
                        walletBalance = _a.sent();
                        this.userWalletBalance = this.descale(walletBalance, this.tokenDecimals);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getTokenApproval = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ((0, lodash_1.isUndefined)(this.userAddress) ||
                    (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                    (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                    return [2 /*return*/, 0];
                }
                console.log("Querying allowance...");
                return [2 /*return*/, 123456];
            });
        }); };
        this.approveToken = function (amount) { return __awaiter(_this, void 0, void 0, function () {
            var scaledAmount;
            return __generator(this, function (_a) {
                if ((0, lodash_1.isUndefined)(this.readOnlyContracts) || (0, lodash_1.isUndefined)(this.writeContracts)) {
                    throw new Error('Uninitialized contracts.');
                }
                scaledAmount = this.scale(amount);
                console.log("Calling approve(".concat(scaledAmount, ")..."));
                throw new Error("Calling approve(".concat(scaledAmount, ")..."));
            });
        }); };
        this.deposit = function (amount) { return __awaiter(_this, void 0, void 0, function () {
            var scaledAmount;
            return __generator(this, function (_a) {
                if ((0, lodash_1.isUndefined)(this.readOnlyContracts) || (0, lodash_1.isUndefined)(this.writeContracts)) {
                    throw new Error('Uninitialized contracts.');
                }
                scaledAmount = this.scale(amount);
                console.log("Calling deposit(".concat(scaledAmount, ")..."));
                throw new Error("Calling deposit(".concat(scaledAmount, ")..."));
            });
        }); };
        this.id = id;
        this.provider = provider;
    }
    Object.defineProperty(MellowLpVault.prototype, "tokenName", {
        get: function () {
            if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                return '-';
            }
            return (0, getTokenInfo_1.getTokenInfo)(this.readOnlyContracts.token.address).name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpVault.prototype, "tokenDecimals", {
        get: function () {
            if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                return 18;
            }
            return (0, getTokenInfo_1.getTokenInfo)(this.readOnlyContracts.token.address).decimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpVault.prototype, "protocol", {
        get: function () {
            if ((0, lodash_1.isUndefined)(this.protocolId)) {
                return '-';
            }
            var prefix = (0, getTokenInfo_1.getProtocolPrefix)(this.protocolId);
            return "".concat(prefix).concat(this.tokenName);
        },
        enumerable: false,
        configurable: true
    });
    return MellowLpVault;
}());
exports.default = MellowLpVault;
