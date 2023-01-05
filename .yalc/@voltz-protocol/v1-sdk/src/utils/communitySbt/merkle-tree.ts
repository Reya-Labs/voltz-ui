import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { BigNumber, ethers } from 'ethers';
import { LeafInfo } from '../../entities/communitySbt';

const getLeaf = (address: string, badgeType: number): Buffer => {
  return Buffer.from(
    ethers.utils.solidityKeccak256(['address', 'uint96'], [address, badgeType]).slice(2),
    'hex',
  );
};

const getMerkleTree = (leaves: Array<LeafInfo>): MerkleTree => {
  const leafNodes = leaves.map((entry) => {
    return getLeaf(entry.account, entry.badgeId);
  });

  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  return merkleTree;
};

export const getProof = (address: string, badgeType: number, leaves: Array<LeafInfo>): string[] => {
  const merkleTree = getMerkleTree(leaves);

  const proof = merkleTree.getHexProof(getLeaf(address, badgeType));

  if (proof.length === 0) {
    throw new Error(
      `Cannot prove something that is not in tree: { address: ${address}, badgeType: ${badgeType}}`,
    );
  }

  return proof;
};

export const getTokenId = (account: string, merkleRoot: string, badgeType: number): BigNumber => {
  return BigNumber.from(
    ethers.utils.solidityKeccak256(
      ['address', 'bytes32', 'uint96'],
      [account, merkleRoot, badgeType],
    ),
  );
};
