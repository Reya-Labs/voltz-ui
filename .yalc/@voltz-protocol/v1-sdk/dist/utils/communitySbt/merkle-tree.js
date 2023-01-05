"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenId = exports.getProof = void 0;
var merkletreejs_1 = require("merkletreejs");
var keccak256_1 = __importDefault(require("keccak256"));
var ethers_1 = require("ethers");
var getLeaf = function (address, badgeType) {
    return Buffer.from(ethers_1.ethers.utils.solidityKeccak256(['address', 'uint96'], [address, badgeType]).slice(2), 'hex');
};
var getMerkleTree = function (leaves) {
    var leafNodes = leaves.map(function (entry) {
        return getLeaf(entry.account, entry.badgeId);
    });
    var merkleTree = new merkletreejs_1.MerkleTree(leafNodes, keccak256_1.default, { sortPairs: true });
    return merkleTree;
};
var getProof = function (address, badgeType, leaves) {
    var merkleTree = getMerkleTree(leaves);
    var proof = merkleTree.getHexProof(getLeaf(address, badgeType));
    if (proof.length === 0) {
        throw new Error("Cannot prove something that is not in tree: { address: ".concat(address, ", badgeType: ").concat(badgeType, "}"));
    }
    return proof;
};
exports.getProof = getProof;
var getTokenId = function (account, merkleRoot, badgeType) {
    return ethers_1.BigNumber.from(ethers_1.ethers.utils.solidityKeccak256(['address', 'bytes32', 'uint96'], [account, merkleRoot, badgeType]));
};
exports.getTokenId = getTokenId;
//# sourceMappingURL=merkle-tree.js.map