import { BigNumber, Signer, providers, providers } from 'ethers';
import { CommunitySBT } from '../typechain-sbt';
export declare type SBTConstructorArgs = {
    id: string;
    signer: Signer | null;
};
export declare type BadgeRecord = {
    badgeType: number;
    awardedTimestamp: number;
};
export declare type LeafInfo = {
    account: string;
    badgeId: number;
};
export declare type BadgeResponse = {
    id: string;
    badgeType: string;
    badgeName: string;
    awardedTimestamp: string;
    mintedTimestamp: string;
};
export declare enum BadgeClaimingStatus {
    CLAIMED = 0,
    CLAIMING = 1,
    NOT_CLAIMED = 2
}
export declare type BadgeWithStatus = {
    badgeType: number;
    claimingStatus: BadgeClaimingStatus;
};
export declare type GetBadgesStatusArgs = {
    apiKey: string;
    subgraphUrl: string;
    season: number;
    potentialClaimingBadgeTypes: Array<number>;
};
export declare type NonProgramaticBadgeResponse = {
    address: string;
    badge: string;
    awardedTimestamp: number;
    mintedTimestamp: number;
};
export declare const NON_SUBGRAPH_BADGES_SEASONS: Record<number, string[]>;
export declare const TOP_BADGES_VARIANT: Record<string, string>;
export declare const NON_PROGRAMATIC_BADGES_VARIANT: Record<string, string>;
declare class SBT {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider: providers.Provider | undefined;
    readonly provider: providers.Provider | undefined;
    contract: CommunitySBT | null;
    /**
     *
     * @param id: CommunitySBT contract address (depends on the network)
     * @param signer: Signer object according to the user's wallet
     */
    constructor({ id, signer }: SBTConstructorArgs);
    /**
     * @notice This function calls the SBT contract's
     * @param badgeType: number associated with the badge to redeem
     * @param owner: user's address
     * @param awardedTimestamp: time at which the badge was awarded (taken from the subgraph)
     * @param subgraphAPI: the api link used to query the subgraph
     * @returns
     */
    redeemSbt(badgeType: number, owner: string, awardedTimestamp: number, subgraphAPI: string): Promise<BigNumber | void>;
    /**
   * @notice This function calls the SBT contract's
   * @param badges: array of badgeTypes and the time at which they were awarded
   * @param owner: user's address
   * @param subgraphAPI: the api link used to query the subgraph
   * @returns
   */
    redeemMultipleSbts(badges: BadgeRecord[], owner: string, subgraphAPI: string): Promise<{
        claimedBadgeTypes: number[];
    }>;
    getSeasonBadges({ subgraphUrl, dbUrl, userId, seasonId, }: {
        subgraphUrl: string;
        dbUrl: string;
        userId: string;
        seasonId: number;
    }): Promise<BadgeResponse[]>;
    getTopTraderBadge(subgraphUrl: string, userId: string, seasonId: number, badgeType: string): Promise<BadgeResponse | undefined>;
    getNonProgramaticBadges(userId: string, nonProgramaticBadgesUrl: string): Promise<Record<string, BadgeResponse>>;
    getSeasonBadges({ subgraphUrl, dbUrl, userId, seasonId, }: {
        subgraphUrl: string;
        dbUrl: string;
        userId: string;
        seasonId: number;
    }): Promise<BadgeResponse[]>;
    getTopTraderBadge(subgraphUrl: string, userId: string, seasonId: number, badgeType: string): Promise<BadgeResponse | undefined>;
    getNonProgramaticBadges(userId: string, nonProgramaticBadgesUrl: string): Promise<Record<string, BadgeResponse>>;
    getUserBalance(user: string): Promise<BigNumber | void>;
    getTokenOwner(tokenId: string): Promise<string | void>;
    getTotalSupply(): Promise<BigNumber | void>;
    getBadgeStatus(args: GetBadgesStatusArgs): Promise<Array<BadgeWithStatus>>;
    claimedBadgesInSubgraph(subgraphUrl: string, userAddress: string, season: number): Promise<Array<BadgeWithStatus>>;
    getBadgeStatus(args: GetBadgesStatusArgs): Promise<Array<BadgeWithStatus>>;
    claimedBadgesInSubgraph(subgraphUrl: string, userAddress: string, season: number): Promise<Array<BadgeWithStatus>>;
}
export default SBT;
//# sourceMappingURL=communitySbt.d.ts.map