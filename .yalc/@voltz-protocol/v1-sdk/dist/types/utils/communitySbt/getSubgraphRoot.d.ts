import { Bytes } from 'ethers';
export declare type RootEntity = {
    merkleRoot: Bytes;
    baseMetadataUri: string;
    startTimestamp: number;
    endTimestamp: number;
};
export declare function getRoot(timestamp: number, subgraphUrl: string): Promise<RootEntity | undefined>;
//# sourceMappingURL=getSubgraphRoot.d.ts.map