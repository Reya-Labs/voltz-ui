"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMillis = exports.getEtherscanURL = exports.decodeMultipleBadgeTypes = exports.decodeBadgeType = exports.getBadgeTypeFromMetadataUri = void 0;
var ethers_1 = require("ethers");
var typechain_sbt_1 = require("../../typechain-sbt");
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
