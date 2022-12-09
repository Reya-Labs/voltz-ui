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
exports.geLeavesIpfsUri = exports.geckoEthToUsd = exports.get100KRefereeBenchmark = exports.get2MRefereeBenchmark = exports.toMillis = exports.getTopBadgeType = exports.getEtherscanURL = exports.decodeMultipleBadgeTypes = exports.decodeBadgeType = exports.getBadgeTypeFromMetadataUri = void 0;
var axios_1 = __importDefault(require("axios"));
var ethers_1 = require("ethers");
var constants_1 = require("../../constants");
var communitySbt_1 = require("../../entities/communitySbt");
var typechain_sbt_1 = require("../../typechain-sbt");
var seasonsConfig_1 = require("./seasonsConfig");
var sentry_1 = require("../sentry");
function getBadgeTypeFromMetadataUri(metadataURI) {
    var filenamme = metadataURI.split('/')[3];
    var badgeType = parseInt(filenamme.split('.')[0]);
    return badgeType;
}
exports.getBadgeTypeFromMetadataUri = getBadgeTypeFromMetadataUri;
function decodeBadgeType(input) {
    var inter = new ethers_1.ethers.utils.Interface(typechain_sbt_1.CommunitySBT__factory.abi);
    var decoded = inter.decodeFunctionData("redeem", input);
    var badgeType = getBadgeTypeFromMetadataUri(decoded[0].metadataURI);
    return badgeType;
}
exports.decodeBadgeType = decodeBadgeType;
function decodeMultipleBadgeTypes(input) {
    var badgeTypes = new Array();
    var inter = new ethers_1.ethers.utils.Interface(typechain_sbt_1.CommunitySBT__factory.abi);
    var decoded = inter.decodeFunctionData("multiRedeem", input);
    for (var _i = 0, _a = decoded[0]; _i < _a.length; _i++) {
        var leafInfo = _a[_i];
        var badgeType = getBadgeTypeFromMetadataUri(leafInfo.metadataURI);
        badgeTypes.push(badgeType);
    }
    return badgeTypes;
}
exports.decodeMultipleBadgeTypes = decodeMultipleBadgeTypes;
function getEtherscanURL(network, apiKey, userAddress) {
    switch (network) {
        case "goerli":
            return "https://api-goerli.etherscan.io/api?module=account&action=txlist&address=".concat(userAddress, "&page=1&offset=50&sort=desc&apikey=").concat(apiKey);
        case "mainnet":
            return "https://api.etherscan.io/api?module=account&action=txlist&address=".concat(userAddress, "&page=1&offset=50&sort=desc&apikey=").concat(apiKey);
        default:
            return "";
    }
}
exports.getEtherscanURL = getEtherscanURL;
function getTopBadgeType(season, isTrader) {
    var actor = isTrader ? 'trader' : 'liquidityProvider';
    return communitySbt_1.NON_SUBGRAPH_BADGES_SEASONS[season].find(function (b) { return communitySbt_1.TOP_BADGES_VARIANT[actor].includes(b); });
}
exports.getTopBadgeType = getTopBadgeType;
/**
 * "Convert seconds to milliseconds, but only if the input is a number and not zero."
 *
 * @param {number} seconds - number - The number of seconds to convert to milliseconds.
 * @returns A function that takes a number and returns a number or undefined.
 */
function toMillis(seconds) {
    if (isNaN(seconds) || seconds === 0) {
        return undefined;
    }
    return seconds * 1000;
}
exports.toMillis = toMillis;
;
function get2MRefereeBenchmark(subgraphUrl) {
    return (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes("goerli")) || (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes("testnet")) ?
        constants_1.GOERLI_TWO_MILLON : constants_1.MAINNET_TWO_MILLON;
}
exports.get2MRefereeBenchmark = get2MRefereeBenchmark;
function get100KRefereeBenchmark(subgraphUrl) {
    return (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes("goerli")) || (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes("testnet")) ?
        constants_1.GOERLI_ONE_HUNDRED_THOUSAND : constants_1.MAINNET_ONE_HUNDRED_THOUSAND;
}
exports.get100KRefereeBenchmark = get100KRefereeBenchmark;
function geckoEthToUsd(apiKey) {
    return __awaiter(this, void 0, void 0, function () {
        var attempt, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attempt = 0;
                    _a.label = 1;
                case 1:
                    if (!(attempt < 5)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("https://pro-api.coingecko.com/api/v3/simple/price?x_cg_pro_api_key=".concat(apiKey, "&ids=ethereum&vs_currencies=usd"))];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.data.ethereum.usd];
                case 4:
                    error_1 = _a.sent();
                    sentry_1.sentryTracker.captureException(error_1);
                    return [3 /*break*/, 5];
                case 5:
                    attempt++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, 0];
            }
        });
    });
}
exports.geckoEthToUsd = geckoEthToUsd;
;
function geLeavesIpfsUri(network, seasonId, isClaiming) {
    if (network === "goerli") {
        return "https://gateway.pinata.cloud/ipfs/".concat(seasonsConfig_1.goerliSeasonLeavesCid[seasonId]);
    }
    if (isClaiming) {
        return "https://gateway.pinata.cloud/ipfs/".concat(seasonsConfig_1.mainnetSeasonLeavesCid[seasonId]);
    }
    return "https://gateway.pinata.cloud/ipfs/".concat(seasonsConfig_1.mainnetSeasonBadgesCid[seasonId]);
}
exports.geLeavesIpfsUri = geLeavesIpfsUri;
