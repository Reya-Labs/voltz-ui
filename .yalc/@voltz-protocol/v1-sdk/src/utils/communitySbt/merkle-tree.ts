import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { BigNumber, ethers } from "ethers";
import { LeafEntry } from "./getSubgraphLeaves";

const getLeaf = (address: string, badgeUrl: string): Buffer => {

  return Buffer.from(
    ethers.utils
      .solidityKeccak256(
        ["address", "string"],
        [address, badgeUrl]
      )
      .slice(2),
    "hex"
  );
};

const getMerkleTree = (leaves: Array<LeafEntry>): MerkleTree => {

  const leafNodes = leaves.map((entry) => {
    return getLeaf(entry.owner, entry.metadataURI);
  });

  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  return merkleTree;
};

export const getRoot = (leaves: Array<LeafEntry>): string => {
  const merkleTree = getMerkleTree(leaves);

  return merkleTree.getHexRoot();
};

export const getProof = (
  address: string,
  badgeType: number,
  metadataURI: string,
  leaves: Array<LeafEntry>
): string[] => {
  const merkleTree = getMerkleTree(leaves);

  const proof = merkleTree.getHexProof(getLeaf(address, metadataURI));

  if (proof.length === 0) {
    throw `Cannot prove something that is not in tree: { address: ${address}, badgeType: ${badgeType}}`;
  }

  return proof;
};

export const getTokenId = (account: string, metadataURI: string): BigNumber => {
  return BigNumber.from(
    ethers.utils.solidityKeccak256(["address", "string"], [account, metadataURI])
  );
};
