export declare type LeafEntry = {
    owner: string;
    metadataURI: string;
};
export declare function createLeaves(seasonStart: number, seasonEnd: number, baseMetadataUri: string, subgraphUrl: string): Promise<Array<LeafEntry>>;
//# sourceMappingURL=getSubgraphLeaves.d.ts.map