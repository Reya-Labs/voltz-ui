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
exports.getScores = exports.ActionType = void 0;
var client_1 = require("@apollo/client");
var ethers_1 = require("ethers");
var constants_1 = require("../../constants");
var getApolloClient_1 = require("./getApolloClient");
var ActionType;
(function (ActionType) {
    ActionType[ActionType["SWAP"] = 0] = "SWAP";
    ActionType[ActionType["MINT"] = 1] = "MINT";
    ActionType[ActionType["BURN"] = 2] = "BURN";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
function updateScore(_a) {
    var score = _a.score, actions = _a.actions, actionType = _a.actionType, decimals = _a.decimals, token = _a.token, seasonStart = _a.seasonStart, seasonEnd = _a.seasonEnd, termEnd = _a.termEnd, ethPrice = _a.ethPrice;
    var calculatedScore = score;
    for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
        var action = actions_1[_i];
        var actionTime = action.transaction.createdTimestamp;
        var amount = '';
        switch (actionType) {
            case ActionType.SWAP:
                amount = action.variableTokenDelta.toString();
                break;
            case ActionType.MINT:
            case ActionType.BURN:
                amount = action.amount.toString();
                break;
            default:
                amount = '0';
                break;
        }
        var mintNotional = Number(ethers_1.ethers.utils.formatUnits(amount, decimals));
        if (seasonStart < actionTime && actionTime <= seasonEnd) {
            var timeWeightedNotional = (Math.abs(mintNotional) * (termEnd - actionTime)) / constants_1.ONE_YEAR_IN_SECONDS;
            switch (token) {
                case 'ETH': {
                    calculatedScore +=
                        (actionType === ActionType.BURN ? -1 : 1) * timeWeightedNotional * ethPrice;
                    break;
                }
                default: {
                    calculatedScore += (actionType === ActionType.BURN ? -1 : 1) * timeWeightedNotional;
                }
            }
        }
    }
    return calculatedScore;
}
/**
 * @dev Query the Main subgraph and retrieve season's liquidity
 * or trading score of all users based on time weighted liquidity.
 * Score is based on both mints and swaps.
 */
function getScores(_a) {
    var _b, _c;
    var seasonStart = _a.seasonStart, seasonEnd = _a.seasonEnd, subgraphUrl = _a.subgraphUrl, ethPrice = _a.ethPrice, ignoredWalletIds = _a.ignoredWalletIds, isLP = _a.isLP;
    return __awaiter(this, void 0, void 0, function () {
        var activityQuery, client, scores, lastId, data, wallets, _i, wallets_1, wallet, score, _d, _e, position, token, decimals, termEnd, args, burnArgs, mintArgs, swapArgs;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    activityQuery = "\n        query( $lastId: String) {\n            wallets(first: 1000, where: {id_gt: $lastId}) {\n                id\n                positions {\n                    amm {\n                        termEndTimestamp\n                        rateOracle {\n                            token {\n                                name\n                                decimals\n                            }\n                        }\n                    }\n                    mints {\n                        transaction {\n                            createdTimestamp\n                        }\n                        amount\n                    }\n                    burns {\n                        transaction {\n                            createdTimestamp\n                        }\n                        amount\n                    }\n                    swaps {\n                        transaction {\n                            createdTimestamp\n                        }\n                        cumulativeFeeIncurred\n                        variableTokenDelta\n                    }\n                }\n            }\n        }\n      ";
                    client = (0, getApolloClient_1.getApolloClient)(subgraphUrl);
                    scores = {};
                    lastId = '0';
                    _f.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.query({
                            query: (0, client_1.gql)(activityQuery),
                            variables: {
                                lastId: lastId,
                            },
                        })];
                case 2:
                    data = _f.sent();
                    wallets = (_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.wallets) !== null && _c !== void 0 ? _c : [];
                    for (_i = 0, wallets_1 = wallets; _i < wallets_1.length; _i++) {
                        wallet = wallets_1[_i];
                        score = 0;
                        for (_d = 0, _e = wallet.positions; _d < _e.length; _d++) {
                            position = _e[_d];
                            token = position.amm.rateOracle.token.name;
                            decimals = position.amm.rateOracle.token.decimals;
                            termEnd = Number(ethers_1.ethers.utils.formatUnits(position.amm.termEndTimestamp.toString(), 18));
                            args = {
                                score: score,
                                actions: position.burns,
                                actionType: ActionType.BURN,
                                decimals: decimals,
                                token: token,
                                seasonStart: seasonStart,
                                seasonEnd: seasonEnd,
                                termEnd: termEnd,
                                ethPrice: ethPrice,
                            };
                            if (isLP) {
                                burnArgs = __assign(__assign({}, args), { actionType: ActionType.BURN, actions: position.burns });
                                score = updateScore(burnArgs);
                                mintArgs = __assign(__assign({}, args), { score: score, actionType: ActionType.MINT, actions: position.mints });
                                score = updateScore(mintArgs);
                            }
                            else {
                                swapArgs = __assign(__assign({}, args), { actionType: ActionType.SWAP, actions: position.swaps });
                                score = updateScore(swapArgs);
                            }
                        }
                        if (score > 0 && !ignoredWalletIds[wallet.id.toLowerCase()]) {
                            scores[wallet.id] = score;
                        }
                        lastId = wallet.id;
                    }
                    if (wallets < 1000) {
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, scores];
            }
        });
    });
}
exports.getScores = getScores;
//# sourceMappingURL=getTopBadges.js.map