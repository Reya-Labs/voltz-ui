"use strict";
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
var MellowDepositWrapper_json_1 = require("../../ABIs/MellowDepositWrapper.json");
var sentry_1 = require("../../utils/sentry");
var config_1 = require("./config");
var MellowLpVault = /** @class */ (function () {
    function MellowLpVault(_a) {
        var id = _a.id, ethWrapperAddress = _a.ethWrapperAddress, erc20RootVaultAddress = _a.erc20RootVaultAddress, provider = _a.provider, metadata = _a.metadata;
        var _this = this;
        this.userIndividualCommittedDeposits = [];
        this.userIndividualPendingDeposit = [];
        this.vaultInitialized = false;
        this.userInitialized = false;
        this.vaultsCount = 1;
        this.descale = function (amount, decimals) {
            return Number(ethers_1.ethers.utils.formatUnits(amount, decimals));
        };
        this.scale = function (amount) {
            return ethers_1.ethers.utils.parseUnits(amount.toString(), _this.tokenDecimals);
        };
        // NEXT: to offload this to subgraph
        this.vaultInit = function () { return __awaiter(_this, void 0, void 0, function () {
            var erc20RootVaultContract, tokenAddress, tokenContract, erc20RootVaultGovernanceAddress, erc20RootVaultGovernanceContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.vaultInitialized) {
                            return [2 /*return*/];
                        }
                        if ((0, lodash_1.isUndefined)(this.provider)) {
                            return [2 /*return*/];
                        }
                        erc20RootVaultContract = new ethers_1.ethers.Contract(this.erc20RootVaultAddress, Erc20RootVault_json_1.abi, this.provider);
                        return [4 /*yield*/, erc20RootVaultContract.vaultTokens()];
                    case 1:
                        tokenAddress = (_a.sent())[0];
                        tokenContract = new ethers_1.Contract(tokenAddress, IERC20Minimal_json_1.abi, this.provider);
                        return [4 /*yield*/, erc20RootVaultContract.vaultGovernance()];
                    case 2:
                        erc20RootVaultGovernanceAddress = _a.sent();
                        erc20RootVaultGovernanceContract = new ethers_1.ethers.Contract(erc20RootVaultGovernanceAddress, Erc20RootVaultGovernance_json_1.abi, this.provider);
                        this.readOnlyContracts = {
                            token: tokenContract,
                            erc20RootVault: [erc20RootVaultContract],
                            erc20RootVaultGovernance: [erc20RootVaultGovernanceContract],
                        };
                        return [4 /*yield*/, this.refreshVaultCumulative()];
                    case 3:
                        _a.sent();
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
                            token: new ethers_1.ethers.Contract(this.readOnlyContracts.token.address, IERC20Minimal_json_1.abi, this.signer),
                            erc20RootVault: this.readOnlyContracts.erc20RootVault.map(function (contract) { return new ethers_1.ethers.Contract(contract.address, Erc20RootVault_json_1.abi, _this.signer); }),
                            ethWrapper: new ethers_1.ethers.Contract(this.ethWrapperAddress, MellowDepositWrapper_json_1.abi, this.signer),
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
            var totalLpTokens, tvl, nft, strategyParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts)) {
                            this.vaultCumulative = 0;
                            this.vaultCap = 0;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].totalSupply()];
                    case 1:
                        totalLpTokens = _a.sent();
                        if (totalLpTokens.eq(0)) {
                            this.vaultCumulative = 0;
                            this.vaultCap = 0;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].tvl()];
                    case 2:
                        tvl = _a.sent();
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].nft()];
                    case 3:
                        nft = _a.sent();
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVaultGovernance[0].strategyParams(nft)];
                    case 4:
                        strategyParams = _a.sent();
                        this.vaultCumulative = this.descale(tvl.minTokenAmounts[0], this.tokenDecimals);
                        this.vaultCap = this.descale(totalLpTokens.mul((0, evm_bn_1.toBn)('1', 18)).div(strategyParams.tokenLimit), 16);
                        return [2 /*return*/];
                }
            });
        }); };
        this.refreshUserDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
            var lpTokens, totalLpTokens, tvl, userFunds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userIndividualCommittedDeposits = [0];
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].balanceOf(this.userAddress)];
                    case 1:
                        lpTokens = _a.sent();
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].totalSupply()];
                    case 2:
                        totalLpTokens = _a.sent();
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].tvl()];
                    case 3:
                        tvl = _a.sent();
                        if (totalLpTokens.gt(0)) {
                            userFunds = lpTokens.mul(tvl[0][0]).div(totalLpTokens);
                            this.userIndividualCommittedDeposits[0] = this.descale(userFunds, this.tokenDecimals);
                        }
                        else {
                            this.userIndividualCommittedDeposits[0] = 0;
                        }
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isETH) {
                            return [2 /*return*/, true];
                        }
                        if ((0, lodash_1.isUndefined)(this.userAddress) ||
                            (0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.tokenDecimals)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.readOnlyContracts.token.allowance(this.userAddress, this.readOnlyContracts.erc20RootVault[0].address)];
                    case 1:
                        tokenApproval = _a.sent();
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
                        return [4 /*yield*/, this.writeContracts.token.estimateGas.approve(this.readOnlyContracts.erc20RootVault[0].address, constants_1.MaxUint256Bn)];
                    case 1:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.token.approve(this.readOnlyContracts.erc20RootVault[0].address, constants_1.MaxUint256Bn, {
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
                        console.error('Unsuccessful approval confirmation.', error_1);
                        sentry_1.sentryTracker.captureException(error_1);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful approval confirmation.');
                        throw new Error('Unsuccessful approval confirmation.');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deposit = function (amount) { return __awaiter(_this, void 0, void 0, function () {
            var scaledAmount, minLPTokens, tempOverrides, error_2, gasLimit, gasLimit, tx, _a, receipt, error_3, error_4, error_5, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.writeContracts) ||
                            (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        scaledAmount = this.scale(amount);
                        minLPTokens = ethers_1.BigNumber.from(0);
                        tempOverrides = {};
                        if (this.isETH) {
                            tempOverrides.value = scaledAmount;
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!this.isETH) return [3 /*break*/, 2];
                        this.writeContracts.ethWrapper.callStatic.deposit(this.readOnlyContracts.erc20RootVault[0].address, minLPTokens, [], tempOverrides);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.writeContracts.erc20RootVault[0].callStatic.deposit([scaledAmount], minLPTokens, [])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        console.error('Unsuccessful deposit simulation.', error_2);
                        sentry_1.sentryTracker.captureException(error_2);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful deposit simulation.');
                        throw new Error('Unsuccessful deposit simulation.');
                    case 6:
                        if (!this.isETH) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.writeContracts.ethWrapper.estimateGas.deposit(this.readOnlyContracts.erc20RootVault[0].address, minLPTokens, [], tempOverrides)];
                    case 7:
                        gasLimit = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.writeContracts.erc20RootVault[0].estimateGas.deposit([scaledAmount], minLPTokens, [])];
                    case 9:
                        gasLimit = _b.sent();
                        tempOverrides.gasLimit = (0, constants_1.getGasBuffer)(gasLimit);
                        _b.label = 10;
                    case 10:
                        if (!this.isETH) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.writeContracts.ethWrapper.deposit(this.readOnlyContracts.erc20RootVault[0].address, minLPTokens, [], tempOverrides)];
                    case 11:
                        _a = _b.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.writeContracts.erc20RootVault[0].deposit([scaledAmount], minLPTokens, [], tempOverrides)];
                    case 13:
                        _a = _b.sent();
                        _b.label = 14;
                    case 14:
                        tx = _a;
                        _b.label = 15;
                    case 15:
                        _b.trys.push([15, 27, , 28]);
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
                        error_3 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_3);
                        sentry_1.sentryTracker.captureMessage('Wallet user balance failed to refresh after deposit');
                        console.error('Wallet user balance failed to refresh after deposit.', error_3);
                        return [3 /*break*/, 20];
                    case 20:
                        _b.trys.push([20, 22, , 23]);
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 21:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 22:
                        error_4 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_4);
                        sentry_1.sentryTracker.captureMessage('User deposit failed to refresh after deposit');
                        console.error('User deposit failed to refresh after deposit.', error_4);
                        return [3 /*break*/, 23];
                    case 23:
                        _b.trys.push([23, 25, , 26]);
                        return [4 /*yield*/, this.refreshVaultCumulative()];
                    case 24:
                        _b.sent();
                        return [3 /*break*/, 26];
                    case 25:
                        error_5 = _b.sent();
                        sentry_1.sentryTracker.captureException(error_5);
                        sentry_1.sentryTracker.captureMessage('Vault accumulative failed to refresh after deposit');
                        console.error('Vault accumulative failed to refresh after deposit.', error_5);
                        return [3 /*break*/, 26];
                    case 26: return [2 /*return*/, receipt];
                    case 27:
                        err_1 = _b.sent();
                        console.error('Unsucessful deposit confirmation.', err_1);
                        sentry_1.sentryTracker.captureException(err_1);
                        sentry_1.sentryTracker.captureMessage('Unsucessful deposit confirmation.');
                        throw new Error('Unsucessful deposit confirmation.');
                    case 28: return [2 /*return*/];
                }
            });
        }); };
        this.withdraw = function () { return __awaiter(_this, void 0, void 0, function () {
            var lpTokens, subvaultsCount, minTokenAmounts, vaultsOptions, error_6, gasLimit, tx, receipt, err_2, err_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isUndefined)(this.readOnlyContracts) ||
                            (0, lodash_1.isUndefined)(this.writeContracts) ||
                            (0, lodash_1.isUndefined)(this.userAddress)) {
                            throw new Error('Uninitialized contracts.');
                        }
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].balanceOf(this.userAddress)];
                    case 1:
                        lpTokens = _a.sent();
                        return [4 /*yield*/, this.readOnlyContracts.erc20RootVault[0].subvaultNfts()];
                    case 2:
                        subvaultsCount = (_a.sent())
                            .length;
                        minTokenAmounts = ethers_1.BigNumber.from(0);
                        vaultsOptions = new Array(subvaultsCount).fill(0x0);
                        console.log("Calling withdraw(".concat(this.userAddress, ", ").concat(lpTokens.toString(), ", ").concat([
                            minTokenAmounts.toString(),
                        ], ", ").concat(vaultsOptions, ")"));
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.writeContracts.erc20RootVault[0].callStatic.withdraw(this.userAddress, lpTokens, [minTokenAmounts], vaultsOptions)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        console.error('Error in withdrawal simulation:', error_6);
                        sentry_1.sentryTracker.captureException(error_6);
                        sentry_1.sentryTracker.captureMessage('Unsuccessful withdrawal simulation.');
                        throw new Error('Unsuccessful withdrawal simulation.');
                    case 6: return [4 /*yield*/, this.writeContracts.erc20RootVault[0].estimateGas.withdraw(this.userAddress, lpTokens, [minTokenAmounts], vaultsOptions)];
                    case 7:
                        gasLimit = _a.sent();
                        return [4 /*yield*/, this.writeContracts.erc20RootVault[0].withdraw(this.userAddress, lpTokens, [minTokenAmounts], vaultsOptions, {
                                gasLimit: (0, constants_1.getGasBuffer)(gasLimit),
                            })];
                    case 8:
                        tx = _a.sent();
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 18, , 19]);
                        return [4 /*yield*/, tx.wait()];
                    case 10:
                        receipt = _a.sent();
                        _a.label = 11;
                    case 11:
                        _a.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, this.refreshWalletBalance()];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        err_2 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_2);
                        sentry_1.sentryTracker.captureMessage('Wallet user balance failed to refresh after withdrawal');
                        console.error('Wallet user balance failed to refresh after withdrawal.', err_2);
                        return [3 /*break*/, 14];
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, this.refreshUserDeposit()];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        err_3 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_3);
                        sentry_1.sentryTracker.captureMessage('User deposit failed to refresh after withdrawal');
                        console.error('User deposit failed to refresh after withdrawal.', err_3);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/, receipt];
                    case 18:
                        err_4 = _a.sent();
                        sentry_1.sentryTracker.captureException(err_4);
                        sentry_1.sentryTracker.captureMessage('Unsucessful withdrawal confirmation.');
                        throw new Error('Unsucessful withdraw confirmation.');
                    case 19: return [2 /*return*/];
                }
            });
        }); };
        this.rollover = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('This is not supported.');
            });
        }); };
        this.registerForAutoRollover = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('This is not supported');
            });
        }); };
        this.gasRegisterForAutoRollover = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 0];
            });
        }); };
        this.getAutorolloverRegistrationFlag = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        }); };
        this.id = id;
        this.ethWrapperAddress = ethWrapperAddress;
        this.erc20RootVaultAddress = erc20RootVaultAddress;
        this.provider = provider;
        this.metadata = metadata;
        if (!(this.metadata.vaults.length === 1)) {
            throw Error('This should be used for only one vault');
        }
        this.userIndividualCommittedDeposits = [0];
        this.userIndividualPendingDeposit = [0];
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
    Object.defineProperty(MellowLpVault.prototype, "isETH", {
        get: function () {
            return this.tokenName === 'ETH';
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
    Object.defineProperty(MellowLpVault.prototype, "expired", {
        get: function () {
            var latestMaturity = Math.max.apply(Math, this.metadata.vaults.map(function (v) { return v.maturityTimestampMS; }));
            return (0, config_1.closeOrPastMaturity)(latestMaturity);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpVault.prototype, "depositable", {
        get: function () {
            return !this.metadata.deprecated && !this.expired;
        },
        enumerable: false,
        configurable: true
    });
    MellowLpVault.prototype.withdrawable = function () {
        return (this.metadata.vaults[0].withdrawable &&
            Date.now().valueOf() > this.metadata.vaults[0].maturityTimestampMS);
    };
    // eslint-disable-next-line class-methods-use-this
    MellowLpVault.prototype.rolloverable = function () {
        return false;
    };
    Object.defineProperty(MellowLpVault.prototype, "userComittedDeposit", {
        get: function () {
            return this.userIndividualCommittedDeposits.reduce(function (total, deposit) { return total + deposit; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpVault.prototype, "userPendingDeposit", {
        get: function () {
            return this.userIndividualPendingDeposit.reduce(function (total, deposit) { return total + deposit; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MellowLpVault.prototype, "userIndividualDeposits", {
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
    Object.defineProperty(MellowLpVault.prototype, "userDeposit", {
        get: function () {
            return this.userIndividualDeposits.reduce(function (total, deposit) { return total + deposit; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    return MellowLpVault;
}());
exports.default = MellowLpVault;
//# sourceMappingURL=mellowLpVault.js.map