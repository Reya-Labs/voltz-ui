"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedSeasonBadgesUrl = exports.getLeavesIpfsUri = exports.get100KRefereeBenchmark = exports.get2MRefereeBenchmark = exports.toMillis = exports.getTopBadgeType = exports.getEtherscanURL = exports.decodeMultipleBadgeTypes = exports.decodeBadgeType = exports.getBadgeTypeFromMetadataUri = void 0;
var ethers_1 = require("ethers");
var constants_1 = require("../../constants");
var communitySbt_1 = require("../../entities/communitySbt");
var typechain_sbt_1 = require("../../typechain-sbt");
function getBadgeTypeFromMetadataUri(metadataURI) {
    var filenamme = metadataURI.split('/')[3];
    var badgeType = parseInt(filenamme.split('.')[0]);
    return badgeType;
}
exports.getBadgeTypeFromMetadataUri = getBadgeTypeFromMetadataUri;
function decodeBadgeType(input) {
    var inter = new ethers_1.ethers.utils.Interface(typechain_sbt_1.CommunitySBT__factory.abi);
    var decoded = inter.decodeFunctionData('redeem', input);
    var badgeType = getBadgeTypeFromMetadataUri(decoded[0].metadataURI);
    return badgeType;
}
exports.decodeBadgeType = decodeBadgeType;
function decodeMultipleBadgeTypes(input) {
    var badgeTypes = new Array();
    var inter = new ethers_1.ethers.utils.Interface(typechain_sbt_1.CommunitySBT__factory.abi);
    var decoded = inter.decodeFunctionData('multiRedeem', input);
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
        case 'goerli':
            return "https://api-goerli.etherscan.io/api?module=account&action=txlist&address=".concat(userAddress, "&page=1&offset=50&sort=desc&apikey=").concat(apiKey);
        case 'mainnet':
            return "https://api.etherscan.io/api?module=account&action=txlist&address=".concat(userAddress, "&page=1&offset=50&sort=desc&apikey=").concat(apiKey);
        default:
            return '';
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
    if (Number.isNaN(seconds) || seconds === 0) {
        return undefined;
    }
    return seconds * 1000;
}
exports.toMillis = toMillis;
function get2MRefereeBenchmark(subgraphUrl) {
    return (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes('goerli')) || (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes('testnet'))
        ? constants_1.GOERLI_TWO_MILLON
        : constants_1.MAINNET_TWO_MILLON;
}
exports.get2MRefereeBenchmark = get2MRefereeBenchmark;
function get100KRefereeBenchmark(subgraphUrl) {
    return (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes('goerli')) || (subgraphUrl === null || subgraphUrl === void 0 ? void 0 : subgraphUrl.includes('testnet'))
        ? constants_1.GOERLI_ONE_HUNDRED_THOUSAND
        : constants_1.MAINNET_ONE_HUNDRED_THOUSAND;
}
exports.get100KRefereeBenchmark = get100KRefereeBenchmark;
function getLeavesIpfsUri(seasonId, cidsRecord) {
    if (!cidsRecord[seasonId]) {
        throw new Error("No IPFS CID found for season ".concat(seasonId));
    }
    return "https://gateway.pinata.cloud/ipfs/".concat(cidsRecord[seasonId]);
}
exports.getLeavesIpfsUri = getLeavesIpfsUri;
function getSelectedSeasonBadgesUrl(seasonId, badgesCids, currentUrl, nextUrl) {
    var selectedBadgesSubgraphUrl = currentUrl;
    if (badgesCids && (badgesCids === null || badgesCids === void 0 ? void 0 : badgesCids.length) < seasonId) {
        selectedBadgesSubgraphUrl = nextUrl;
    }
    if (!selectedBadgesSubgraphUrl || !badgesCids) {
        throw new Error("Unable to find badges subgraph URL");
    }
    return selectedBadgesSubgraphUrl;
}
exports.getSelectedSeasonBadgesUrl = getSelectedSeasonBadgesUrl;
//# sourceMappingURL=helpers.js.map