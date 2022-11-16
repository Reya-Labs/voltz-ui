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
exports.BadgeClaimingStatus = void 0;
var typechain_sbt_1 = require("../typechain-sbt");
var getSubgraphLeaves_1 = require("../utils/communitySbt/getSubgraphLeaves");
var getSubgraphRoot_1 = require("../utils/communitySbt/getSubgraphRoot");
var merkle_tree_1 = require("../utils/communitySbt/merkle-tree");
var axios_1 = __importDefault(require("axios"));
var client_1 = require("@apollo/client");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var constants_1 = require("../constants");
var helpers_1 = require("../utils/communitySbt/helpers");
var TxBadgeStatus;
(function (TxBadgeStatus) {
    TxBadgeStatus[TxBadgeStatus["SUCCESSFUL"] = 0] = "SUCCESSFUL";
    TxBadgeStatus[TxBadgeStatus["FAILED"] = 1] = "FAILED";
    TxBadgeStatus[TxBadgeStatus["PENDING"] = 2] = "PENDING";
})(TxBadgeStatus || (TxBadgeStatus = {}));
var BadgeClaimingStatus;
(function (BadgeClaimingStatus) {
    BadgeClaimingStatus[BadgeClaimingStatus["CLAIMED"] = 0] = "CLAIMED";
    BadgeClaimingStatus[BadgeClaimingStatus["CLAIMING"] = 1] = "CLAIMING";
    BadgeClaimingStatus[BadgeClaimingStatus["NOT_CLAIMED"] = 2] = "NOT_CLAIMED";
})(BadgeClaimingStatus = exports.BadgeClaimingStatus || (exports.BadgeClaimingStatus = {}));
var SBT = /** @class */ (function () {
    /**
     *
     * @param id: CommunitySBT contract address (depends on the network)
     * @param signer: Signer object according to the user's wallet
     */
    function SBT(_a) {
        var id = _a.id, signer = _a.signer;
        this.id = id;
        this.signer = signer;
        if (signer) {
            this.contract = typechain_sbt_1.CommunitySBT__factory.connect(id, signer);
            this.provider = signer.provider;
        }
        else {
            this.contract = null;
        }
    }
    /**
     * @notice This function calls the SBT contract's
     * @param badgeType: number associated with the badge to redeem
     * @param owner: user's address
     * @param awardedTimestamp: time at which the badge was awarded (taken from the subgraph)
     * @param subgraphAPI: the api link used to query the subgraph
     * @returns
     */
    SBT.prototype.redeemSbt = function (badgeType, owner, awardedTimestamp, subgraphAPI) {
        return __awaiter(this, void 0, void 0, function () {
            var rootEntity, metadataUri, leafInfo, startTimestamp, endTimestamp, leaves, proof, tokenId, tx, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // wallet was not connected when the object was initialised
                        // therefore, it couldn't obtain the contract connection
                        if (!this.contract) {
                            throw new Error('Cannot connect to community SBT contract');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, (0, getSubgraphRoot_1.getRoot)(awardedTimestamp, subgraphAPI)];
                    case 2:
                        rootEntity = _a.sent();
                        if (!rootEntity) {
                            throw new Error('No root found');
                        }
                        metadataUri = "".concat(rootEntity.baseMetadataUri).concat(badgeType, ".json");
                        leafInfo = {
                            account: owner,
                            metadataURI: metadataUri
                        };
                        startTimestamp = rootEntity.startTimestamp;
                        endTimestamp = rootEntity.endTimestamp;
                        return [4 /*yield*/, (0, getSubgraphLeaves_1.createLeaves)(startTimestamp, endTimestamp, rootEntity.baseMetadataUri, subgraphAPI)];
                    case 3:
                        leaves = _a.sent();
                        proof = (0, merkle_tree_1.getProof)(owner, badgeType, metadataUri, leaves);
                        return [4 /*yield*/, this.contract.callStatic.redeem(leafInfo, proof, rootEntity.merkleRoot)];
                    case 4:
                        tokenId = _a.sent();
                        return [4 /*yield*/, this.contract.redeem(leafInfo, proof, rootEntity.merkleRoot)];
                    case 5:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, tokenId];
                    case 7:
                        err_1 = _a.sent();
                        console.error(err_1);
                        throw new Error("Unable to claim");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * @notice This function calls the SBT contract's
   * @param badges: array of badgeTypes and the time at which they were awarded
   * @param owner: user's address
   * @param subgraphAPI: the api link used to query the subgraph
   * @returns
   */
    SBT.prototype.redeemMultipleSbts = function (badges, owner, subgraphAPI) {
        return __awaiter(this, void 0, void 0, function () {
            var data, claimedBadgeTypes, _i, badges_1, badge, rootEntity, metadataUri, leafInfo, startTimestamp, endTimestamp, leaves, proof, tx, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // wallet was not connected when the object was initialised
                        // therefore, it couldn't obtain the contract connection
                        if (!this.contract) {
                            throw new Error('Wallet not connected');
                        }
                        data = {
                            leaves: [],
                            proofs: [],
                            roots: []
                        };
                        claimedBadgeTypes = [];
                        _i = 0, badges_1 = badges;
                        _a.label = 1;
                    case 1:
                        if (!(_i < badges_1.length)) return [3 /*break*/, 5];
                        badge = badges_1[_i];
                        return [4 /*yield*/, (0, getSubgraphRoot_1.getRoot)(badge.awardedTimestamp, subgraphAPI)];
                    case 2:
                        rootEntity = _a.sent();
                        if (!rootEntity) {
                            return [3 /*break*/, 4];
                        }
                        metadataUri = "".concat(rootEntity.baseMetadataUri).concat(badge.badgeType, ".json");
                        leafInfo = {
                            account: owner,
                            metadataURI: metadataUri
                        };
                        startTimestamp = rootEntity.startTimestamp;
                        endTimestamp = rootEntity.endTimestamp;
                        return [4 /*yield*/, (0, getSubgraphLeaves_1.createLeaves)(startTimestamp, endTimestamp, rootEntity.baseMetadataUri, subgraphAPI)];
                    case 3:
                        leaves = _a.sent();
                        proof = (0, merkle_tree_1.getProof)(owner, badge.badgeType, metadataUri, leaves);
                        data.leaves.push(leafInfo);
                        data.proofs.push(proof);
                        data.roots.push(rootEntity.merkleRoot);
                        claimedBadgeTypes.push(badge.badgeType);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        _a.trys.push([5, 9, , 10]);
                        return [4 /*yield*/, this.contract.callStatic.multiRedeem(data.leaves, data.proofs, data.roots)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.contract.multiRedeem(data.leaves, data.proofs, data.roots)];
                    case 7:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, {
                                claimedBadgeTypes: claimedBadgeTypes
                            }];
                    case 9:
                        err_2 = _a.sent();
                        throw new Error("Unable to claim multiple badges");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SBT.prototype.getUserBalance = function (user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.balanceOf(user))];
                    case 1:
                        balance = _b.sent();
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    SBT.prototype.getTokenOwner = function (tokenId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var owner;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.ownerOf(tokenId))];
                    case 1:
                        owner = _b.sent();
                        return [2 /*return*/, owner];
                }
            });
        });
    };
    SBT.prototype.getTotalSupply = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var totalSupply;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.totalSupply())];
                    case 1:
                        totalSupply = _b.sent();
                        return [2 /*return*/, totalSupply];
                }
            });
        });
    };
    SBT.prototype.getBadgeStatus = function (args) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userAddress, network, networkName, getURL, resp, transactions, txBadges, _i, transactions_1, transaction, status_1, badgeType, badgeTypes, _c, badgeTypes_1, badgeType, _d, _e, badgeType, subgraphClaimedBadges, badgeStatuses;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error("No provider found");
                        }
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        userAddress = _f.sent();
                        return [4 /*yield*/, ((_a = this.provider) === null || _a === void 0 ? void 0 : _a.getNetwork())];
                    case 2:
                        network = _f.sent();
                        networkName = network ? network.name : "";
                        getURL = (0, helpers_1.getEtherscanURL)(networkName, args.apiKey, userAddress);
                        return [4 /*yield*/, axios_1.default.get(getURL)];
                    case 3:
                        resp = _f.sent();
                        if (!resp.data) {
                            throw new Error("Etherscan api failed");
                        }
                        transactions = resp.data.result;
                        txBadges = new Map();
                        for (_i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
                            transaction = transactions_1[_i];
                            if (transaction.to.toLowerCase() !== ((_b = this.contract) === null || _b === void 0 ? void 0 : _b.address.toLowerCase())) {
                                continue;
                            }
                            status_1 = transaction.txreceipt_status === 1 ?
                                TxBadgeStatus.SUCCESSFUL
                                : TxBadgeStatus.FAILED;
                            if (transaction.methodId === constants_1.REDEEM_METHOD_ID) {
                                badgeType = (0, helpers_1.decodeBadgeType)(transaction.input);
                                txBadges.set(badgeType, status_1);
                            }
                            else if (transaction.methodId === constants_1.MULTI_REDEEM_METHOD_ID) {
                                badgeTypes = (0, helpers_1.decodeMultipleBadgeTypes)(transaction.input);
                                for (_c = 0, badgeTypes_1 = badgeTypes; _c < badgeTypes_1.length; _c++) {
                                    badgeType = badgeTypes_1[_c];
                                    txBadges.set(badgeType, status_1);
                                }
                            }
                        }
                        // if badges of interest are not part of those 50 transactions, set them as pending
                        for (_d = 0, _e = args.potentialClaimingBadgeTypes; _d < _e.length; _d++) {
                            badgeType = _e[_d];
                            if (!txBadges.get(badgeType)) {
                                txBadges.set(badgeType, TxBadgeStatus.PENDING);
                            }
                        }
                        return [4 /*yield*/, this.claimedBadgesInSubgraph(args.subgraphUrl, userAddress, args.season)];
                    case 4:
                        subgraphClaimedBadges = _f.sent();
                        badgeStatuses = subgraphClaimedBadges.map(function (badge) {
                            if (badge.claimingStatus === BadgeClaimingStatus.CLAIMED) {
                                return badge;
                            }
                            var txStatus = txBadges.get(badge.badgeType);
                            // badge not found in recent successful txs or in potential pending txs
                            // meaning their status is desided by the subgraph
                            if (!txStatus || txStatus === TxBadgeStatus.FAILED) {
                                return {
                                    badgeType: badge.badgeType,
                                    claimingStatus: badge.claimingStatus
                                };
                            }
                            else { // subgraph is not updated yet
                                return {
                                    badgeType: badge.badgeType,
                                    claimingStatus: BadgeClaimingStatus.CLAIMING
                                };
                            }
                        });
                        return [2 /*return*/, badgeStatuses];
                }
            });
        });
    };
    SBT.prototype.claimedBadgesInSubgraph = function (subgraphUrl, userAddress, season) {
        return __awaiter(this, void 0, void 0, function () {
            var badgeQuery, client, id, data, badgesClaimed, _i, _a, badge;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        badgeQuery = "\n            query( $id: BigInt) {\n                badges(first: 50, where: {seasonUser_contains: $id}) {\n                    id\n                    badgeType\n                    badgeName\n                    awardedTimestamp\n                    mintedTimestamp\n                }\n            }\n        ";
                        client = new client_1.ApolloClient({
                            cache: new client_1.InMemoryCache(),
                            link: new client_1.HttpLink({ uri: subgraphUrl, fetch: cross_fetch_1.default })
                        });
                        id = "".concat(userAddress, "#").concat(season);
                        return [4 /*yield*/, client.query({
                                query: (0, client_1.gql)(badgeQuery),
                                variables: {
                                    id: id,
                                },
                            })];
                    case 1:
                        data = _b.sent();
                        badgesClaimed = new Array();
                        for (_i = 0, _a = data.data.badges; _i < _a.length; _i++) {
                            badge = _a[_i];
                            badgesClaimed.push({
                                badgeType: badge.badgeType,
                                claimingStatus: data.data.badge.mintedTimestamp == 0 ?
                                    BadgeClaimingStatus.NOT_CLAIMED
                                    : BadgeClaimingStatus.CLAIMED // only from subgraph's perspective
                            });
                        }
                        return [2 /*return*/, badgesClaimed];
                }
            });
        });
    };
    return SBT;
}());
exports.default = SBT;
