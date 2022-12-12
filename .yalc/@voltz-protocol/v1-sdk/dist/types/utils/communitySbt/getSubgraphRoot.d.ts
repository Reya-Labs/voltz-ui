import { Bytes } from 'ethers';
export type RootEntity = {
    merkleRoot: Bytes;
    baseMetadataUri: string;
    startTimestamp: number;
    endTimestamp: number;
};
export declare function getRootFromSubgraph(timestamp: number, subgraphUrl: string): Promise<RootEntity | undefined>;
//# sourceMappingURL=getSubgraphRoot.d.ts.map