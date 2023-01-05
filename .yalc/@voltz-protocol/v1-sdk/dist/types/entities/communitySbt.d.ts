import { BigNumber, Signer, providers } from 'ethers';
import { CommunitySBT } from '../typechain-sbt';
export type SBTConstructorArgs = {
    id: string;
    signer: Signer | null;
    coingeckoKey?: string;
    currentBadgesSubgraphUrl?: string;
    nextBadgesSubgraphUrl?: string;
    nonProgDbUrl?: string;
    referralsDbUrl?: string;
    subgraphUrl?: string;
    ignoredWalletIds?: Record<string, boolean>;
    badgesCids?: Array<string>;
    leavesCids?: Array<string>;
};
export type BadgeRecord = {
    badgeType: string;
    awardedTimestamp: number;
};
export type LeafInfo = {
    account: string;
    badgeId: number;
};
export type BadgeResponse = {
    id: string;
    badgeType: string;
    awardedTimestampMs?: number;
    mintedTimestampMs?: number;
};
export type SubgraphBadgeResponse = {
    id: string;
    badgeType: string;
    awardedTimestamp: string;
    mintedTimestamp: string;
};
export type GetRankingArgs = {
    seasonStart: number;
    seasonEnd: number;
    subgraphUrl?: string;
    ethPrice?: number;
    ignoredWalletIds?: Record<string, boolean>;
    isLP?: boolean;
};
export type RankType = {
    address: string;
    points: number;
    rank: number;
};
export declare enum BadgeClaimingStatus {
    CLAIMED = 0,
    CLAIMING = 1,
    NOT_CLAIMED = 2
}
export type BadgeWithStatus = {
    badgeType: number;
    claimingStatus: BadgeClaimingStatus;
};
export type GetBadgesStatusArgs = {
    apiKey: string;
    subgraphUrl: string;
    season: number;
    potentialClaimingBadgeTypes: Array<number>;
};
export type NonProgramaticBadgeResponse = {
    address: string;
    badge: string;
    awardedTimestamp: number;
};
export declare const TOP_BADGES_VARIANT: Record<string, string[]>;
export declare const NON_PROGRAMATIC_BADGES_VARIANT: Record<number, Record<string, string>>;
export declare const REFERROR_BADGES_VARIANT: Record<number, Record<string, string>>;
export declare const NON_SUBGRAPH_BADGES_SEASONS: Record<number, string[]>;
declare class SBT {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider: providers.Provider | undefined;
    readonly coingeckoKey?: string;
    readonly currentBadgesSubgraphUrl?: string;
    readonly nextBadgesSubgraphUrl?: string;
    readonly nonProgDbUrl?: string;
    readonly referralsDbUrl?: string;
    readonly subgraphUrl?: string;
    readonly ignoredWalletIds?: Record<string, boolean>;
    readonly badgesCids?: Array<string>;
    readonly leavesCids?: Array<string>;
    contract: CommunitySBT | null;
    ethPrice: number | undefined;
    /**
     *
     * @param id: CommunitySBT contract address (depends on the network)
     * @param signer: Signer object according to the user's wallet
     */
    constructor({ id, signer, coingeckoKey, currentBadgesSubgraphUrl, nextBadgesSubgraphUrl, nonProgDbUrl, referralsDbUrl, subgraphUrl, ignoredWalletIds, badgesCids, leavesCids, }: SBTConstructorArgs);
    /**
     * @notice This function calls the SBT contract's
     * @param badgeType: number associated with the badge to redeem
     * @param owner: user's address
     * @param awardedTimestamp: time at which the badge was awarded (taken from the subgraph)
     * @param subgraphAPI: the api link used to query the subgraph
     * @returns
     */
    redeemSbt(badgeType: string, owner: string, seasonId: number, awardedTimestamp: number): Promise<BigNumber | void>;
    /**
     * @notice This function calls the SBT contract's
     * @param badges: array of badgeTypes and the time at which they were awarded
     * @param owner: user's address
     * @param subgraphAPI: the api link used to query the subgraph
     * @returns
     */
    redeemMultipleSbts(badges: BadgeRecord[], owner: string, seasonId: number): Promise<{
        claimedBadgeTypes: number[];
    }>;
    getSeasonBadges({ userId, seasonId, seasonStart, seasonEnd, }: {
        userId: string;
        seasonId: number;
        seasonStart: number;
        seasonEnd: number;
    }): Promise<BadgeResponse[]>;
    getOldSeasonBadges({ userId, seasonId, seasonStart, seasonEnd, selectedBadgesSubgraphUrl, }: {
        userId: string;
        seasonId: number;
        seasonStart: number;
        seasonEnd: number;
        selectedBadgesSubgraphUrl?: string;
    }): Promise<BadgeResponse[]>;
    computeSeasonBadges({ userId, seasonId, seasonStart, seasonEnd, selectedBadgesSubgraphUrl, }: {
        userId: string;
        seasonId: number;
        seasonStart: number;
        seasonEnd: number;
        selectedBadgesSubgraphUrl?: string;
    }): Promise<BadgeResponse[]>;
    /**
     * @dev Retrieve season's notional
     * ranking of all users. Check if given user is in top 5.
     * If so, assign a top trader/LP badge, otherwise return undefined
     */
    getTopBadge(userId: string, seasonId: number, isLP: boolean, seasonStart: number, seasonEnd: number, selectedBadgesSubgraphUrl?: string): Promise<BadgeResponse | undefined>;
    getRanking(args: GetRankingArgs): Promise<RankType[]>;
    /**
     * @dev Query the Badges subgraph to assess if the top
     * badge was claimed. Create a Badge Response with
     * the awarded time as end of season and claimed time
     * as eithr zero if not claimed or subgrap's minted timestamp
     */
    constructTopBadge(userId: string, seasonId: number, seasonEnd: number, badgeType: string, selectedBadgesSubgraphUrl?: string): Promise<BadgeResponse>;
    getNonProgramaticBadges(userId: string, seasonId: number, seasonStart: number, seasonEnd: number): Promise<Record<string, BadgeResponse>>;
    getReferrorBadges(userId: string, seasonId: number, selectedBadgesSubgraphUrl: string): Promise<Record<string, BadgeResponse>>;
    createReferroorBadgeRecord(badgeType: string, userId: string, seasonId: number): BadgeResponse;
    getUserBalance(user: string): Promise<BigNumber | void>;
    getTokenOwner(tokenId: string): Promise<string | void>;
    getTotalSupply(): Promise<BigNumber | void>;
    getBadgeStatus(args: GetBadgesStatusArgs): Promise<Array<BadgeWithStatus>>;
    claimedBadgesInSubgraph(userAddress: string, season: number, selectedBadgesSubgraphUrl?: string): Promise<Array<BadgeWithStatus>>;
}
export default SBT;
//# sourceMappingURL=communitySbt.d.ts.map