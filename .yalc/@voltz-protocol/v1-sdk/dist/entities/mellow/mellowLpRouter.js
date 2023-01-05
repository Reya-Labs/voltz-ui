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
var getTokenInfo_1 = require("../../services/getTokenInfo");
var constants_1 = require("../../constants");
var Erc20RootVault_json_1 = require("../../ABIs/Erc20RootVault.json");
var Erc20RootVaultGovernance_json_1 = require("../../ABIs/Erc20RootVaultGovernance.json");
var IERC20Minimal_json_1 = require("../../ABIs/IERC20Minimal.json");
var MellowMultiVaultRouterABI_json_1 = require("../../ABIs/MellowMultiVaultRouterABI.json");
var sentry_1 = require("../../utils/sentry");
var config_1 = require("./config");
var convertGasUnitsToUSD_1 = require("../../utils/mellowHelpers/convertGasUnitsToUSD");
var MellowLpRouter = /** @class */ (function () {
    function MellowLpRouter(_a) {
        var mellowRouterAddress = _a.mellowRouterAddress, id = _a.id, provider = _a.provider, metadata = _a.metadata;
        var _this = this;
        this.userIndividualCommittedDeposits = [];
        this.userIndividualPendingDeposit = [];
        this.vaultInitialized = false;
        this.userInitialized = false;
        this.vaultsCount = 0;
        this.descale = function (amount, decimals) {
            return Number(ethers_1.ethers.utils.formatUnits(amount, decimals));
        };
        this.scale = function (amount) {
            return ethers_1.ethers.utils.parseUnits(amount.toString(), _this.tokenDecimals);
        };
        this.validateWeights = function (weights) {
            if (!weights.every(function (value) { return Number.isInteger(value); })) {
                // All values of default weights must be integer
                return false;
            }
            if (weights.length !== _this.vaultsCount) {
                // Lengths of vault indices and default weights array do not match
                return false;
            }
            return true;
        };
        // NEXT: to offload this to subgraph
        this.vaultInit = function () { return __awaiter(_this, void 0, void 0, function () {
            var mellowRouterContract, tokenAddress, tokenContract, ERC20RootVaultAddresses, erc20RootVaultContracts, erc20RootVaultGovernanceAddresses, _i, erc20RootVaultContracts_1, erc20RootVaultContract, _a, _b, erc20RootVaultGovernanceContracts;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.vaultInitialized) {
                            return [2 /*return*/];
                        }
                        if ((0, lodash_1.isUndefined)(this.provider)) {
                            return [2 /*return*/];
                        }
                        mellowRouterContract = new ethers_1.ethers.Contract(this.mellowRouterAddress, MellowMultiVaultRouterABI_json_1.abi, this.provider);
                        return [4 /*yield*/, mellowRouterContract.token()];
                    case 1:
                        tokenAddress = _c.sent();
                        tokenContract = new ethers_1.Contract(tokenAddress, IERC20Minimal_json_1.abi, this.provider);
                        return [4 /*yield*/, mellowRouterContract.getVaults()];
                    case 2:
                        ERC20RootVaultAddresses = _c.sent();
                        this.vaultsCount = ERC20RootVaultAddresses.length;
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
                        return [4 /*yield*/, this.refreshVaultCumulative()];
                    case 7:
                        _c.sent();
                        this.userIndividualCommittedDeposits = new Array(this.vaultsCount).fill(0x0);
                        this.userIndividualPendingDeposit = new Array(this.vaultsCount).fill(0x0);
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
                            return [2 /*return*/];
                        }
                        if (!this.vaultInitialized) {
                            return [2 /*return*/];
                        }
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        _a = this;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        _a.userAddress = _b.sent();
                        this.writeContracts = {
                            token: new ethers_1.Contract(this.readOnlyContracts.token.address, IERC20Minimal_json_1.abi, this.signer),
                            erc20RootVault: this.readOnlyContracts.erc20RootVault.map(function (contract) { return new ethers_1.ethers.Contract(contract.address, Erc20RootVault_json_1.abi, _this.signer); }),
                            mellowRouter: new ethers_1.ethers.Contract(this.mellowRouterAddress, MellowMultiVaultRouterABI_json_1.abi, this.signer),
                        };
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 3:
                        _b.sent();
                        this.userInitialized = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.refreshVaultCumulative = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, erc20RootVaultContract, totalLpTokens, tvl, nft, _b, _c, erc20RootVaultGovernanceContract, strategyParams, vaultCumulative, vaultCap;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.vaultCumulative = 0;
                        this.vaultCap = 0;
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                            return [2 /*return*/];
                        }
                        _i = 0, _a = this.readOnlyContracts.erc20RootVault;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        erc20RootVaultContract = _a[_i];
                        return [4 /*yield*/, erc20RootVaultContract.totalSupply()];
                    case 2:
                        totalLpTokens = _d.sent();
                        return [4 /*yield*/, erc20RootVaultContract.tvl()];
                    case 3:
                        tvl = _d.sent();
                        return [4 /*yield*/, erc20RootVaultContract.nft()];
                    case 4:
                        nft = _d.sent();
                        _b = 0, _c = this.readOnlyContracts
                            .erc20RootVaultGovernance;
                        _d.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3 /*break*/, 8];
                        erc20RootVaultGovernanceContract = _c[_b];
                        return [4 /*yield*/, erc20RootVaultGovernanceContract.strategyParams(nft)];
                    case 6:
                        strategyParams = _d.sent();
                        vaultCumulative = this.descale(tvl.minTokenAmounts[0], this.tokenDecimals);
                        vaultCap = this.descale(totalLpTokens.mul((0, evm_bn_1.toBn)('1', 18)).div(strategyParams.tokenLimit), 16);
                        this.vaultCumulative += vaultCumulative;
                        this.vaultCap += vaultCap;
                        _d.label = 7;
                    case 7:
                        _b++;
                        return [3 /*break*/, 5];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.refreshUserComittedDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
            var lpTokensBalances, i, erc20RootVaultContract, lpTokensBalance, totalLpTokens, tvl, userFunds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userIndividualCommittedDeposits = this.userIndividualCommittedDeposits.map(function () { return 0; });
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
                        return [4 /*yield*/, erc20RootVaultContract.tvl()];
                    case 4:
                        tvl = _a.sent();
                        if (totalLpTokens.gt(0)) {
                            userFunds = lpTokensBalance.mul(tvl[0][0]).div(totalLpTokens);
                            this.userIndividualCommittedDeposits[i] = this.descale(userFunds, this.tokenDecimals);
                        }
                        _a.label = 5;
                    case 5:
                        i += 1;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.refreshUserPendingDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
            var i, batchedDeposits, userBatchedDeposits, userPendingFunds, userPendingDeposit;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userIndividualPendingDeposit = this.userIndividualPendingDeposit.map(function () { return 0; });
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            return [2 /*return*/];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.vaultsCount)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.readOnlyContracts.mellowRouterContract.getBatchedDeposits(i)];
                    case 2:
                        batchedDeposits = _a.sent();
                        userBatchedDeposits = batchedDeposits.filter(function (batchedDeposit) { var _a; return batchedDeposit.author.toLowerCase() === ((_a = _this.userAddress) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
                        userPendingFunds = userBatchedDeposits.reduce(function (sum, batchedDeposit) { return sum.add(batchedDeposit.amount); }, ethers_1.BigNumber.from(0));
                        userPendingDeposit = this.descale(userPendingFunds, this.tokenDecimals);
                        this.userIndividualPendingDeposit[i] += userPendingDeposit;
                        _a.label = 3;
                    case 3:
                        i += 1;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.refreshUserDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshUserComittedDeposit()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.refreshUserPendingDeposit()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
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
            var gasLimit, tx, receipt, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) || (0, lodash_1.isUndefined)(this.writeContracts)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        return [4 /*yield*/, this.writeContracts.token.estimateGas.approve(this.writeContracts.mellowRouter.address, constants_1.MaxUint256Bn)];
                    case 1:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.token.approve(this.writeContracts.mellowRouter.address, constants_1.MaxUint256Bn, {
                                gasLimit: (0, constants_1.getGasBuffer)(gasLimit),
                            })];
                    case 2:
                        tx = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, tx.wait()];
                    case 4:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 5:
                        error_1 = _a.sent();
                        sentry_1.sentryTracker.captureException(error_1);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful approval confirmation.');
                        throw new Error('Unsuccessful approval confirmation.');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deposit = function (amount, _weights, registration) { return __awaiter(_this, void 0, void 0, function () {
            var weights, scaledAmount, tempOverrides, error_2, gasLimit, gasLimit, tx, _a, receipt, error_3, error_4, error_5, error_6, gasLimit, gasLimit, tx, _b, receipt, error_7, error_8, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.writeContracts) ||
                            (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        weights = _weights;
                        while (weights.length < this.vaultsCount) {
                            weights.push(0);
                        }
                        if (!this.validateWeights(weights)) {
                            throw new Error('Weights are invalid');
                        }
                        scaledAmount = this.scale(amount);
                        tempOverrides = {};
                        if (this.isETH) {
                            tempOverrides.value = scaledAmount;
                        }
                        if (!(registration !== undefined)) return [3 /*break*/, 26];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (!this.isETH) return [3 /*break*/, 2];
                        this.writeContracts.mellowRouter.callStatic.depositEthAndRegisterForAutoRollover(weights, registration, tempOverrides);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.depositErc20AndRegisterForAutoRollover(scaledAmount, weights, registration)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _c.sent();
                        console.error('Error when simulating depositAndRegisterForAutoRollover.', error_2);
                        sentry_1.sentryTracker.captureException(error_2);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful depositAndRegisterForAutoRollover simulation.');
                        throw new Error('Unsuccessful depositAndRegisterForAutoRollover simulation.');
                    case 6:
                        if (!this.isETH) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.depositEthAndRegisterForAutoRollover(weights, registration, tempOverrides)];
                    case 7:
                        gasLimit = _c.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.depositErc20AndRegisterForAutoRollover(scaledAmount, weights, registration, tempOverrides)];
                    case 9:
                        gasLimit = _c.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                        _c.label = 10;
                    case 10:
                        if (!this.isETH) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.writeContracts.mellowRouter.depositEthAndRegisterForAutoRollover(weights, registration, tempOverrides)];
                    case 11:
                        _a = _c.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.writeContracts.mellowRouter.depositErc20AndRegisterForAutoRollover(scaledAmount, weights, registration, tempOverrides)];
                    case 13:
                        _a = _c.sent();
                        _c.label = 14;
                    case 14:
                        tx = _a;
                        _c.label = 15;
                    case 15:
                        _c.trys.push([15, 24, , 25]);
                        return [4 /*yield*/, tx.wait()];
                    case 16:
                        receipt = _c.sent();
                        _c.label = 17;
                    case 17:
                        _c.trys.push([17, 19, , 20]);
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 18:
                        _c.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        error_3 = _c.sent();
                        sentry_1.sentryTracker.captureException(error_3);
                        sentry_1.sentryTracker.captureMessage('User deposit failed to refresh after depositAndRegisterForAutoRollover');
                        console.error('User deposit failed to refresh after depositAndRegisterForAutoRollover.', error_3);
                        return [3 /*break*/, 20];
                    case 20:
                        _c.trys.push([20, 22, , 23]);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 21:
                        _c.sent();
                        return [3 /*break*/, 23];
                    case 22:
                        error_4 = _c.sent();
                        sentry_1.sentryTracker.captureException(error_4);
                        sentry_1.sentryTracker.captureMessage('Wallet user balance failed to refresh after depositAndRegisterForAutoRollover');
                        console.error('Wallet user balance failed to refresh after depositAndRegisterForAutoRollover.', error_4);
                        return [3 /*break*/, 23];
                    case 23: return [2 /*return*/, receipt];
                    case 24:
                        error_5 = _c.sent();
                        console.error('Unsuccessful depositAndRegisterForAutoRollover confirmation.', error_5);
                        sentry_1.sentryTracker.captureException(error_5);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful depositAndRegisterForAutoRollover confirmation.');
                        throw new Error('Unsuccessful depositAndRegisterForAutoRollover confirmation.');
                    case 25: return [3 /*break*/, 50];
                    case 26:
                        _c.trys.push([26, 30, , 31]);
                        if (!this.isETH) return [3 /*break*/, 27];
                        this.writeContracts.mellowRouter.callStatic.depositEth(weights, tempOverrides);
                        return [3 /*break*/, 29];
                    case 27: return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.depositErc20(scaledAmount, weights)];
                    case 28:
                        _c.sent();
                        _c.label = 29;
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        error_6 = _c.sent();
                        console.error('Error when simulating deposit.', error_6);
                        sentry_1.sentryTracker.captureException(error_6);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful deposit simulation.');
                        throw new Error('Unsuccessful deposit simulation.');
                    case 31:
                        if (!this.isETH) return [3 /*break*/, 33];
                        return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.depositEth(weights, tempOverrides)];
                    case 32:
                        gasLimit = _c.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                        return [3 /*break*/, 35];
                    case 33: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.depositErc20(scaledAmount, weights, tempOverrides)];
                    case 34:
                        gasLimit = _c.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                        _c.label = 35;
                    case 35:
                        if (!this.isETH) return [3 /*break*/, 37];
                        return [4 /*yield*/, this.writeContracts.mellowRouter.depositEth(weights, tempOverrides)];
                    case 36:
                        _b = _c.sent();
                        return [3 /*break*/, 39];
                    case 37: return [4 /*yield*/, this.writeContracts.mellowRouter.depositErc20(scaledAmount, weights, tempOverrides)];
                    case 38:
                        _b = _c.sent();
                        _c.label = 39;
                    case 39:
                        tx = _b;
                        _c.label = 40;
                    case 40:
                        _c.trys.push([40, 49, , 50]);
                        return [4 /*yield*/, tx.wait()];
                    case 41:
                        receipt = _c.sent();
                        _c.label = 42;
                    case 42:
                        _c.trys.push([42, 44, , 45]);
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 43:
                        _c.sent();
                        return [3 /*break*/, 45];
                    case 44:
                        error_7 = _c.sent();
                        sentry_1.sentryTracker.captureException(error_7);
                        sentry_1.sentryTracker.captureMessage('User deposit failed to refresh after deposit');
                        console.error('User deposit failed to refresh after deposit.', error_7);
                        return [3 /*break*/, 45];
                    case 45:
                        _c.trys.push([45, 47, , 48]);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 46:
                        _c.sent();
                        return [3 /*break*/, 48];
                    case 47:
                        error_8 = _c.sent();
                        sentry_1.sentryTracker.captureException(error_8);
                        sentry_1.sentryTracker.captureMessage('Wallet user balance failed to refresh after deposit');
                        console.error('Wallet user balance failed to refresh after deposit.', error_8);
                        return [3 /*break*/, 48];
                    case 48: return [2 /*return*/, receipt];
                    case 49:
                        error_9 = _c.sent();
                        console.error('Unsuccessful deposit confirmation.', error_9);
                        sentry_1.sentryTracker.captureException(error_9);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful deposit confirmation.');
                        throw new Error('Unsuccessful deposit confirmation.');
                    case 50: return [2 /*return*/];
                }
            });
        }); };
        this.withdraw = function (vaultIndex) { return __awaiter(_this, void 0, void 0, function () {
            var subvaultsCount, minTokenAmounts, vaultsOptions, err_1, gasLimit, tx, receipt, err_2, err_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.writeContracts) ||
                            (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[vaultIndex].subvaultNfts()];
                    case 1:
                        subvaultsCount = (_a.sent()).length;
                        minTokenAmounts = ethers_1.BigNumber.from(0);
                        vaultsOptions = new Array(subvaultsCount).fill(0x0);
                        console.log("Calling claimLPTokens(".concat(vaultIndex, ", ").concat([minTokenAmounts], ", [").concat(vaultsOptions, "])"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.claimLPTokens(vaultIndex, [minTokenAmounts], vaultsOptions)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.error('Error during claimLPTokens:', err_1);
                        sentry_1.sentryTracker.captureException(err_1);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful claimLPTokens simulation.');
                        throw new Error('Unsuccessful claimLPTokens simulation.');
                    case 5: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.claimLPTokens(vaultIndex, [minTokenAmounts], vaultsOptions)];
                    case 6:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.mellowRouter.claimLPTokens(vaultIndex, [minTokenAmounts], vaultsOptions, {
                                gasLimit: (0, constants_1.getGasBuffer)(gasLimit),
                            })];
                    case 7:
                        tx = _a.sent();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 17, , 18]);
                        return [4 /*yield*/, tx.wait()];
                    case 9:
                        receipt = _a.sent();
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_2 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_2);
                        sentry_1.sentryTracker.captureMessage('Wallet user balance failed to refresh after withdrawal');
                        console.error('Wallet user balance failed to refresh after withdraw');
                        return [3 /*break*/, 13];
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        err_3 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_3);
                        sentry_1.sentryTracker.captureMessage('User deposit failed to refresh after withdrawal');
                        console.error('User deposit failed to refresh after withdraw');
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, receipt];
                    case 17:
                        err_4 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_4);
                        sentry_1.sentryTracker.captureMessage('Unsucessful withdrawal confirmation.');
                        throw new Error('Unsucessful withdraw confirmation.');
                    case 18: return [2 /*return*/];
                }
            });
        }); };
        this.rollover = function (vaultIndex, _weights) { return __awaiter(_this, void 0, void 0, function () {
            var weights, subvaultsCount, minTokenAmounts, vaultsOptions, err_5, gasLimit, tx, receipt, err_6, err_7, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.writeContracts) ||
                            (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        weights = _weights;
                        while (weights.length < this.vaultsCount) {
                            weights.push(0);
                        }
                        if (!this.validateWeights(weights)) {
                            throw new Error('Weights are invalid');
                        }
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[vaultIndex].subvaultNfts()];
                    case 1:
                        subvaultsCount = (_a.sent()).length;
                        minTokenAmounts = ethers_1.BigNumber.from(0);
                        vaultsOptions = new Array(subvaultsCount).fill(0x0);
                        console.log("Calling rolloverLPTokens(".concat(vaultIndex, ", ").concat([
                            minTokenAmounts,
                        ], ", [").concat(vaultsOptions, "], ").concat(weights, ")"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.rolloverLPTokens(vaultIndex, [minTokenAmounts], vaultsOptions, weights)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        console.error('Error during rolloverLPTokens', err_5);
                        throw new Error('Unsuccessful rolloverLPTokens simulation.');
                    case 5: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.rolloverLPTokens(vaultIndex, [minTokenAmounts], vaultsOptions, weights)];
                    case 6:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.mellowRouter.rolloverLPTokens(vaultIndex, [minTokenAmounts], vaultsOptions, weights, {
                                gasLimit: (0, constants_1.getGasBuffer)(gasLimit),
                            })];
                    case 7:
                        tx = _a.sent();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 17, , 18]);
                        return [4 /*yield*/, tx.wait()];
                    case 9:
                        receipt = _a.sent();
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_6 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_6);
                        sentry_1.sentryTracker.captureMessage('Wallet user balance failed to refresh after rollover');
                        console.error('Wallet user balance failed to refresh after rollover');
                        return [3 /*break*/, 13];
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        err_7 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_7);
                        sentry_1.sentryTracker.captureMessage('User deposit failed to refresh after rollover');
                        console.error('User deposit failed to refresh after rollover');
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, receipt];
                    case 17:
                        err_8 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_8);
                        sentry_1.sentryTracker.captureMessage('Unsucessful rollover confirmation.');
                        throw new Error('Unsucessful rollover confirmation.');
                    case 18: return [2 /*return*/];
                }
            });
        }); };
        this.registerForAutoRollover = function (registration) { return __awaiter(_this, void 0, void 0, function () {
            var err_9, gasLimit, tx, receipt, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.writeContracts) || (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.registerForAutoRollover(registration)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_9 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_9);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful auto-rollover registration simulation');
                        console.error('Error during registration for auto-rollover', err_9);
                        throw new Error('Unsuccessful auto-rollover registration simulation');
                    case 4: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.registerForAutoRollover(registration)];
                    case 5:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.mellowRouter.registerForAutoRollover(registration, {
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
                        err_10 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_10);
                        sentry_1.sentryTracker.captureMessage('Unsucessful auto-rollover registration confirmation.');
                        throw new Error('Unsucessful auto-rollover registration confirmation.');
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.gasRegisterForAutoRollover = function (registration) { return __awaiter(_this, void 0, void 0, function () {
            var err_11, gasUnitsEstimate, gasPriceUSD;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.writeContracts) || (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.writeContracts.mellowRouter.callStatic.registerForAutoRollover(registration)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_11 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_11);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful auto-rollover registration simulation');
                        console.error('Error during registration for auto-rollover', err_11);
                        throw new Error('Unsuccessful auto-rollover registration simulation');
                    case 4: return [4 /*yield*/, this.writeContracts.mellowRouter.estimateGas.registerForAutoRollover(registration)];
                    case 5:
                        gasUnitsEstimate = _a.sent();
                        return [4 /*yield*/, (0, convertGasUnitsToUSD_1.convertGasUnitsToUSD)(gasUnitsEstimate)];
                    case 6:
                        gasPriceUSD = _a.sent();
                        return [2 /*return*/, gasPriceUSD];
                }
            });
        }); };
        this.getAutorolloverRegistrationFlag = function () { return __awaiter(_this, void 0, void 0, function () {
            var isWalletAutorolloverRegistered, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) || (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.readOnlyContracts.mellowRouterContract.isRegisteredForAutoRollover(this.userAddress)];
                    case 2:
                        isWalletAutorolloverRegistered = _a.sent();
                        return [2 /*return*/, isWalletAutorolloverRegistered];
                    case 3:
                        err_12 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_12);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful auto-rollover registration verificaiton simulation');
                        console.error('Error during auto-rollover registration verificaiton simulation', err_12);
                        throw new Error('Unsuccessful auto-rollover registration verificaiton simulation');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.mellowRouterAddress = mellowRouterAddress;
        this.id = id;
        this.provider = provider;
        this.metadata = metadata;
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
    Object.defineProperty(MellowLpRouter.prototype, "expired", {
        get: function () {
            var latestMaturity = Math.max.apply(Math, this.metadata.vaults.map(function (v) { return v.maturityTimestampMS; }));
            return (0, config_1.closeOrPastMaturity)(latestMaturity);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpRouter.prototype, "depositable", {
        get: function () {
            return !this.metadata.deprecated && !this.expired;
        },
        enumerable: false,
        configurable: true
    });
    MellowLpRouter.prototype.withdrawable = function (vaultIndex) {
        return (this.metadata.vaults[vaultIndex].withdrawable &&
            Date.now().valueOf() > this.metadata.vaults[vaultIndex].maturityTimestampMS);
    };
    MellowLpRouter.prototype.rolloverable = function (vaultIndex) {
        return this.withdrawable(vaultIndex);
    };
    Object.defineProperty(MellowLpRouter.prototype, "userComittedDeposit", {
        get: function () {
            return this.userIndividualCommittedDeposits.reduce(function (total, deposit) { return total + deposit; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpRouter.prototype, "userPendingDeposit", {
        get: function () {
            return this.userIndividualPendingDeposit.reduce(function (total, deposit) { return total + deposit; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpRouter.prototype, "userIndividualDeposits", {
        get: function () {
            var _this = this;
            if (!(this.userIndividualPendingDeposit.length === this.userIndividualCommittedDeposits.length)) {
                return [];
            }
            return this.userIndividualPendingDeposit.map(function (pendingDeposit, index) { return pendingDeposit + _this.userIndividualCommittedDeposits[index]; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpRouter.prototype, "userDeposit", {
        get: function () {
            return this.userIndividualDeposits.reduce(function (total, deposit) { return total + deposit; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    return MellowLpRouter;
}());
exports.default = MellowLpRouter;
//# sourceMappingURL=mellowLpRouter.js.map