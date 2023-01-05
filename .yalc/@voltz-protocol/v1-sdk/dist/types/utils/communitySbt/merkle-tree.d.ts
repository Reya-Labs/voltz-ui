import { BigNumber } from 'ethers';
import { LeafInfo } from '../../entities/communitySbt';
export declare const getProof: (address: string, badgeType: number, leaves: Array<LeafInfo>) => string[];
export declare const getTokenId: (account: string, merkleRoot: string, badgeType: number) => BigNumber;
//# sourceMappingURL=merkle-tree.d.ts.map