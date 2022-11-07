import { BigNumber } from "ethers";
import { LeafEntry } from "./getSubgraphLeaves";
export declare const getRoot: (leaves: Array<LeafEntry>) => string;
export declare const getProof: (address: string, badgeType: number, metadataURI: string, leaves: Array<LeafEntry>) => string[];
export declare const getTokenId: (account: string, metadataURI: string) => BigNumber;
//# sourceMappingURL=merkle-tree.d.ts.map