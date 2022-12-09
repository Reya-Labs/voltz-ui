export type GetScoresArgs = {
    seasonStart: number;
    seasonEnd: number;
    subgraphUrl: string;
    ethPrice: number;
    ignoredWalletIds: Record<string, boolean>;
    isLP: boolean;
};
export type MintOrBurnAction = {
    transaction: {
        createdTimestamp: number;
    };
    amount: number;
};
export type SwapAction = {
    transaction: {
        createdTimestamp: number;
    };
    cumulativeFeeIncurred: number;
    variableTokenDelta: number;
};
export declare enum ActionType {
    SWAP = 0,
    MINT = 1,
    BURN = 2
}
export type UpdateScoreArgs = {
    score: number;
    actions: MintOrBurnAction[] | SwapAction[];
    actionType: ActionType;
    decimals: number;
    token: string;
    seasonStart: number;
    seasonEnd: number;
    termEnd: number;
    ethPrice: number;
};
/**
  * @dev Query the Main subgraph and retrieve season's liquidity
  * or trading score of all users based on time weighted liquidity.
  * Score is based on both mints and swaps.
  */
export declare function getScores({ seasonStart, seasonEnd, subgraphUrl, ethPrice, ignoredWalletIds, isLP }: GetScoresArgs): Promise<Record<string, number>>;
//# sourceMappingURL=getTopBadges.d.ts.map