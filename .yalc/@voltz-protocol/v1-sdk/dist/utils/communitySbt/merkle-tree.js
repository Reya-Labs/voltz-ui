"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenId = exports.getProof = exports.getRoot = void 0;
var merkletreejs_1 = require("merkletreejs");
var keccak256_1 = __importDefault(require("keccak256"));
var ethers_1 = require("ethers");
var getLeaf = function (address, badgeUrl) {
    return Buffer.from(ethers_1.ethers.utils
        .solidityKeccak256(["address", "string"], [address, badgeUrl])
        .slice(2), "hex");
};
var getMerkleTree = function (leaves) {
    var leafNodes = leaves.map(function (entry) {
        return getLeaf(entry.owner, entry.metadataURI);
    });
    var merkleTree = new merkletreejs_1.MerkleTree(leafNodes, keccak256_1.default, { sortPairs: true });
    return merkleTree;
};
var getRoot = function (leaves) {
    var merkleTree = getMerkleTree(leaves);
    return merkleTree.getHexRoot();
};
exports.getRoot = getRoot;
var getProof = function (address, badgeType, metadataURI, leaves) {
    var merkleTree = getMerkleTree(leaves);
    var proof = merkleTree.getHexProof(getLeaf(address, metadataURI));
    if (proof.length === 0) {
        throw "Cannot prove something that is not in tree: { address: ".concat(address, ", badgeType: ").concat(badgeType, "}");
    }
    return proof;
};
exports.getProof = getProof;
var getTokenId = function (account, metadataURI) {
    return ethers_1.BigNumber.from(ethers_1.ethers.utils.solidityKeccak256(["address", "string"], [account, metadataURI]));
};
exports.getTokenId = getTokenId;
