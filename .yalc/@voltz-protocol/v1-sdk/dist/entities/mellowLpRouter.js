"use strict";
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
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
var ethers_1 = require("ethers");
var lodash_1 = require("lodash");
var evm_bn_1 = require("evm-bn");
var getTokenInfo_1 = require("../services/getTokenInfo");
var constants_1 = require("../constants");
var Erc20RootVault_json_1 = require("../ABIs/Erc20RootVault.json");
var Erc20RootVaultGovernance_json_1 = require("../ABIs/Erc20RootVaultGovernance.json");
var IERC20Minimal_json_1 = require("../ABIs/IERC20Minimal.json");
var MellowMultiVaultRouterABI_json_1 = require("../ABIs/MellowMultiVaultRouterABI.json");
var MellowLpRouter = /** @class */ (function () {
    function MellowLpRouter(_a) {
        var mellowRouterAddress = _a.mellowRouterAddress, defaultWeights = _a.defaultWeights, provider = _a.provider;
        var _this = this;
        this.defaultWeights = [];
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
            var mellowRouterContract, tokenAddress, tokenContract, ERC20RootVaultAddresses, erc20RootVaultContracts, erc20RootVaultGovernanceAddresses, _i, erc20RootVaultContracts_1, erc20RootVaultContract, _a, _b, erc20RootVaultGovernanceContracts;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.vaultInitialized) {
                            console.log('The vault is already initialized');
                            return [2 /*return*/];
                        }
                        if ((0, lodash_1.isUndefined)(this.provider)) {
                            console.log('Stop here... No provider provided');
                            return [2 /*return*/];
                        }
                        mellowRouterContract = new ethers_1.ethers.Contract(this.mellowRouterAddress, MellowMultiVaultRouterABI_json_1.abi, this.provider);
                        return [4 /*yield*/, mellowRouterContract.token()];
                    case 1:
                        tokenAddress = _c.sent();
                        tokenContract = new ethers_1.Contract(tokenAddress, IERC20Minimal_json_1.abi, this.provider);
                        console.log('token address:', tokenAddress);
                        return [4 /*yield*/, mellowRouterContract.getVaults()];
                    case 2:
                        ERC20RootVaultAddresses = _c.sent();
                        erc20RootVaultContracts = ERC20RootVaultAddresses.map(function (address) { return new ethers_1.ethers.Contract(address, Erc20RootVault_json_1.abi, _this.provider); });
                        erc20RootVaultGovernanceAddresses = [];
                        _i = 0, erc20RootVaultContracts_1 = erc20RootVaultContracts;
                        _c.label = 3;
                    case 3:
                        if (!(_i < erc20RootVaultContracts_1.length)) return [3 /*break*/, 6];
                        erc20RootVaultContract = erc20RootVaultContracts_1[_i];
                        _b = (_a = erc20RootVaultGovernanceAddresses).push;
                        return [4 /*yield*/, erc20RootVaultContract.vaultGovernance()];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        erc20RootVaultGovernanceContracts = erc20RootVaultGovernanceAddresses.map(function (address) { return new ethers_1.ethers.Contract(address, Erc20RootVaultGovernance_json_1.abi, _this.provider); });
                        this.readOnlyContracts = {
                            token: tokenContract,
                            erc20RootVault: erc20RootVaultContracts,
                            erc20RootVaultGovernance: erc20RootVaultGovernanceContracts,
                            mellowRouterContract: mellowRouterContract,
                        };
                        console.log('Read-only contracts are ready');
                        return [4 /*yield*/, this.refreshVaultCumulative()];
                    case 7:
                        _c.sent();
                        console.log('vault cumulative refreshed', this.vaultCumulative);
                        console.log('vault cap refreshed', this.vaultCap);
                        this.vaultInitialized = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.userInit = function (signer) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
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
                            token: new ethers_1.Contract(this.readOnlyContracts.token.address, IERC20Minimal_json_1.abi, this.provider),
                            erc20RootVault: this.readOnlyContracts.erc20RootVault.map(function (contract) { return new ethers_1.ethers.Contract(contract.address, Erc20RootVault_json_1.abi, _this.signer); }),
                            mellowRouter: new ethers_1.ethers.Contract(this.mellowRouterAddress, MellowMultiVaultRouterABI_json_1.abi, this.signer),
                        };
                        console.log('write contracts ready');
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 2:
                        _b.sent();
                        console.log('user deposit refreshed', this.userDeposit);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 3:
                        _b.sent();
                        console.log('user wallet balance refreshed', this.userWalletBalance);
                        this.userInitialized = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.refreshVaultCumulative = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, erc20RootVaultContract, totalLpTokens, tvl, nft, strategyParams, vaultCumulative, vaultCap;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.vaultCumulative = 0;
                        this.vaultCap = 0;
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                            return [2 /*return*/];
                        }
                        _i = 0, _a = this.readOnlyContracts.erc20RootVault;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        erc20RootVaultContract = _a[_i];
                        return [4 /*yield*/, erc20RootVaultContract.totalSupply()];
                    case 2:
                        totalLpTokens = _b.sent();
                        return [4 /*yield*/, erc20RootVaultContract.tvl()];
                    case 3:
                        tvl = _b.sent();
                        console.log('accumulated (tvl):', tvl.minTokenAmounts[0].toString());
                        return [4 /*yield*/, erc20RootVaultContract.nft()];
                    case 4:
                        nft = _b.sent();
                        return [4 /*yield*/, erc20RootVaultContract.strategyParams(nft)];
                    case 5:
                        strategyParams = _b.sent();
                        console.log('strategy params:', strategyParams);
                        console.log('token limit', strategyParams.tokenLimit.toString());
                        vaultCumulative = this.descale(tvl.minTokenAmounts[0], this.tokenDecimals);
                        vaultCap = this.descale(totalLpTokens.mul((0, evm_bn_1.toBn)('1', 18)).div(strategyParams.tokenLimit), 16);
                        console.log('vault cumulative:', vaultCumulative);
                        console.log('vault cap:', vaultCap);
                        this.vaultCumulative += vaultCumulative;
                        this.vaultCap += vaultCap;
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.refreshUserDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
            var lpTokensBalances, i, erc20RootVaultContract, lpTokensBalance, totalLpTokens, tvl, userFunds, userDeposit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userDeposit = 0;
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.mellowRouterContract.getLPTokenBalances(this.userAddress)];
                    case 1:
                        lpTokensBalances = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.readOnlyContracts.erc20RootVault.length)) return [3 /*break*/, 6];
                        erc20RootVaultContract = this.readOnlyContracts.erc20RootVault[i];
                        lpTokensBalance = lpTokensBalances[i];
                        return [4 /*yield*/, erc20RootVaultContract.totalSupply()];
                    case 3:
                        totalLpTokens = _a.sent();
                        console.log('lp tokens', lpTokensBalance.toString());
                        console.log('total lp tokens:', totalLpTokens);
                        return [4 /*yield*/, erc20RootVaultContract.tvl()];
                    case 4:
                        tvl = _a.sent();
                        console.log('tvl', tvl.toString());
                        if (totalLpTokens.gt(0)) {
                            userFunds = lpTokensBalance.mul(tvl[0][0]).div(totalLpTokens);
                            console.log('user funds:', userFunds.toString());
                            userDeposit = this.descale(userFunds, this.tokenDecimals);
                            console.log('user deposit:', userDeposit);
                            this.userDeposit += userDeposit;
                        }
                        _a.label = 5;
                    case 5:
                        i += 1;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.refreshWalletBalance = function () { return __awaiter(_this, void 0, void 0, function () {
            var walletBalance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.provider) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            this.userWalletBalance = 0;
                            return [2 /*return*/];
                        }
                        if (!this.isETH) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.provider.getBalance(this.userAddress)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.readOnlyContracts.token.balanceOf(this.userAddress)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        walletBalance = _a;
                        this.userWalletBalance = this.descale(walletBalance, this.tokenDecimals);
                        return [2 /*return*/];
                }
            });
        }); };
        this.isTokenApproved = function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenApproval;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isETH) {
                            return [2 /*return*/, true];
                        }
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.token.allowance(this.userAddress, (_a = this.writeContracts) === null || _a === void 0 ? void 0 : _a.mellowRouter.address)];
                    case 1:
                        tokenApproval = _b.sent();
                        return [2 /*return*/, tokenApproval.gte(constants_1.TresholdApprovalBn)];
                }
            });
        }); };
        this.approveToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var _1, gasLimit, tx, receipt, _2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) || (0, lodash_1.isUndefined)(this.writeContracts)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.writeContracts.token.callStatic.approve(this.writeContracts.mellowRouter.address, constants_1.MaxUint256Bn)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _1 = _a.sent();
                        throw new Error('Unsuccessful approval simulation.');
                    case 4: return [4 /*yield*/, this.writeContracts.token.estimateGas.approve(this.writeContracts.mellowRouter.address, constants_1.MaxUint256Bn)];
                    case 5:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.token.approve(this.writeContracts.mellowRouter.address, constants_1.MaxUint256Bn, {
                                gasLimit: (0, constants_1.getGasBuffer)(gasLimit),
                            })];
                    case 6:
                        tx = _a.sent();
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, tx.wait()];
                    case 8:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 9:
                        _2 = _a.sent();
                        throw new Error('Unsucessful approval confirmation.');
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.deposit = function (amount, weights) {
            if (weights === void 0) { weights = _this.defaultWeights; }
            return __awaiter(_this, void 0, void 0, function () {
                var scaledAmount, tempOverrides, err_1, gasLimit, gasLimit, tx, _a, receipt, _3, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if ((0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                                (0, lodash_1.isUndefined)(this.writeContracts) ||
                                (0, lodash_1.isUndefined)(this.userAddress)) {
                                throw new Error('Uninitialized contracts.');
                            }
                            scaledAmount = this.scale(amount);
                            console.log("Calling deposit(".concat(scaledAmount, ")..."));
                            tempOverrides = {};
                            if (this.isETH) {
                                tempOverrides.value = scaledAmount;
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, , 6]);
                            if (!this.isETH) return [3 /*break*/, 2];
                            this.writeContracts.mellowRouter.callStatic.depositEth(weights, tempOverrides);
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.depositErc20(scaledAmount, weights)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            err_1 = _b.sent();
                            console.log('ERROR', err_1);
                            throw new Error('Unsuccessful deposit simulation.');
                        case 6:
                            if (!this.isETH) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.depositEth(weights, tempOverrides)];
                        case 7:
                            gasLimit = _b.sent();
                            tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.depositErc20(scaledAmount, weights, tempOverrides)];
                        case 9:
                            gasLimit = _b.sent();
                            tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                            _b.label = 10;
                        case 10:
                            if (!this.isETH) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.writeContracts.mellowRouter.depositEth(weights, tempOverrides)];
                        case 11:
                            _a = _b.sent();
                            return [3 /*break*/, 14];
                        case 12: return [4 /*yield*/, this.writeContracts.mellowRouter.depositErc20(scaledAmount, weights, tempOverrides)];
                        case 13:
                            _a = _b.sent();
                            _b.label = 14;
                        case 14:
                            tx = _a;
                            _b.label = 15;
                        case 15:
                            _b.trys.push([15, 21, , 22]);
                            return [4 /*yield*/, tx.wait()];
                        case 16:
                            receipt = _b.sent();
                            _b.label = 17;
                        case 17:
                            _b.trys.push([17, 19, , 20]);
                            return [4 /*yield*/, this.refreshWalletBalance()];
                        case 18:
                            _b.sent();
                            return [3 /*break*/, 20];
                        case 19:
                            _3 = _b.sent();
                            console.error('Wallet user balance failed to refresh after deposit');
                            return [3 /*break*/, 20];
                        case 20: return [2 /*return*/, receipt];
                        case 21:
                            err_2 = _b.sent();
                            console.log('ERROR', err_2);
                            throw new Error('Unsucessful deposit confirmation.');
                        case 22: return [2 /*return*/];
                    }
                });
            });
        };
        this.mellowRouterAddress = mellowRouterAddress;
        this.defaultWeights = defaultWeights;
        this.provider = provider;
    }
    Object.defineProperty(MellowLpRouter.prototype, "tokenName", {
        get: function () {
            if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                return '-';
            }
            return (0, getTokenInfo_1.getTokenInfo)(this.readOnlyContracts.token.address).name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpRouter.prototype, "isETH", {
        get: function () {
            return this.tokenName === 'ETH';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpRouter.prototype, "tokenDecimals", {
        get: function () {
            if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                return 18;
            }
            return (0, getTokenInfo_1.getTokenInfo)(this.readOnlyContracts.token.address).decimals;
        },
        enumerable: false,
        configurable: true
    });
    return MellowLpRouter;
}());
exports.default = MellowLpRouter;
