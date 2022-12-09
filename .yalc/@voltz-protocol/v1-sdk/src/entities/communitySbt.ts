import { BigNumber, Bytes, Signer, providers } from 'ethers';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { CommunitySBT, CommunitySBT__factory } from '../typechain-sbt';
import { createLeaves } from '../utils/communitySbt/getIpfsLeaves';
import { getRootFromSubgraph } from '../utils/communitySbt/getSubgraphRoot';
import { getProof } from '../utils/communitySbt/merkle-tree';
import  axios from 'axios';
import fetch from 'cross-fetch';
import { MULTI_REDEEM_METHOD_ID, REDEEM_METHOD_ID } from '../constants';
import { decodeBadgeType, decodeMultipleBadgeTypes, geckoEthToUsd, geLeavesIpfsUri, get100KRefereeBenchmark, get2MRefereeBenchmark, getEtherscanURL, getTopBadgeType, toMillis } from '../utils/communitySbt/helpers';
import { DateTime } from 'luxon';
import { getScores, GetScoresArgs } from '../utils/communitySbt/getTopBadges';
import { getSubgraphBadges } from '../utils/communitySbt/getSubgraphBadges';

import { sentryTracker } from '../utils/sentry';

export type SBTConstructorArgs = {
    id: string;
    signer: Signer| null;
    coingeckoKey?: string;
    badgesSubgraphUrl?: string;
    nonProgDbUrl?: string;
    referralsDbUrl?: string;
    subgraphUrl?: string;
    ignoredWalletIds?: Record<string, boolean>;
};

export type BadgeRecord = {
    badgeType: string;
    awardedTimestamp: number;
};

export type LeafInfo = {
    account: string;
    badgeId: number;
}

type MultiRedeemData = {
    leaves: Array<LeafInfo>;
    proofs: Array<string[]>;
    roots: Array<Bytes>;
}

export type BadgeResponse = {
    id: string;
    badgeType: string;
    awardedTimestampMs?: number;
    mintedTimestampMs?: number;
}

export type SubgraphBadgeResponse = {
    id: string;
    badgeType: string;
    awardedTimestamp: string;
    mintedTimestamp: string;
}

export type GetRankingArgs = {
    seasonStart: number;
    seasonEnd: number;
    subgraphUrl?: string;
    ethPrice?: number;
    ignoredWalletIds?: Record<string, boolean>;
    isLP?: boolean;
}

export type RankType = {
    address: string;
    points: number;
    rank: number;
};

enum TxBadgeStatus {
    SUCCESSFUL,
    FAILED,
    PENDING
}

export enum BadgeClaimingStatus {
    CLAIMED,
    CLAIMING,
    NOT_CLAIMED
}

export type BadgeWithStatus = {
    badgeType: number;
    claimingStatus: BadgeClaimingStatus;
}

export type GetBadgesStatusArgs = {
    apiKey: string;
    subgraphUrl: string;
    season: number;
    potentialClaimingBadgeTypes: Array<number>;
}

export type NonProgramaticBadgeResponse = {
    address: string;
    badge: string;
    awardedTimestamp: number;
    mintedTimestamp: number;
}

export const NON_SUBGRAPH_BADGES_SEASONS: Record<number, string[]>  = {
    0: [
        '15',
        '12'
    ],
    1: [
        '31',
        '28',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38'
    ]
}

export const TOP_BADGES_VARIANT: Record<string, string[]> = {
    'trader': ['15', '31'],
    'liquidityProvider': ['12', '28']
}


export const NON_PROGRAMATIC_BADGES_VARIANT: Record<string, string> = {
    'diplomatz' : '33',
    'governorz' : '34',
    'senatorz' : '35'
}

export const REFERROR_BADGES_VARIANT: Record<string, string> = {
    'referror' : '36',
    'notionalInfluencer' : '37',
    'whaleWhisperer' : '38'
}



class SBT {

  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider: providers.Provider | undefined;
  public readonly coingeckoKey?: string;
  public readonly badgesSubgraphUrl?: string;
  public readonly nonProgDbUrl?: string;
  public readonly referralsDbUrl?: string;
  public readonly subgraphUrl?: string;
  public readonly ignoredWalletIds?: Record<string, boolean>; 
  public contract: CommunitySBT | null;
  public ethPrice: number | undefined;

  /**
   * 
   * @param id: CommunitySBT contract address (depends on the network)
   * @param signer: Signer object according to the user's wallet
   */
  public constructor({ 
    id,
    signer,
    coingeckoKey,
    badgesSubgraphUrl,
    nonProgDbUrl,
    referralsDbUrl,
    subgraphUrl,
    ignoredWalletIds
 }: SBTConstructorArgs) {
    this.id = id;
    this.signer = signer;

    this.coingeckoKey = coingeckoKey;
    this.badgesSubgraphUrl = badgesSubgraphUrl;
    this.nonProgDbUrl = nonProgDbUrl;
    this.referralsDbUrl = referralsDbUrl;
    this.subgraphUrl = subgraphUrl
    this.ignoredWalletIds = ignoredWalletIds ?? {};
    ;
    if (signer) {
        this.contract = CommunitySBT__factory.connect(id, signer);
        this.provider = signer.provider;
    } else {
        this.contract = null;
    }
  }

  /**
   * @notice This function calls the SBT contract's
   * @param badgeType: number associated with the badge to redeem
   * @param owner: user's address
   * @param awardedTimestamp: time at which the badge was awarded (taken from the subgraph)
   * @param subgraphAPI: the api link used to query the subgraph
   * @returns 
   */
  public async redeemSbt(
    badgeType: string,
    owner: string,
    seasonId: number,
    awardedTimestamp: number,
  ): Promise<BigNumber | void> {

    // wallet was not connected when the object was initialised
    // therefore, it couldn't obtain the contract connection
    if (!this.contract) {
        throw new Error('Cannot connect to community SBT contract');
    }

    try {
        if (!this.badgesSubgraphUrl || !this.coingeckoKey || !this.subgraphUrl || !this.provider) {
            throw new Error('Missing env vars');
        }

        const awardedTimestampSec = Math.floor(awardedTimestamp/1000);
        // create merkle tree from subgraph derived leaves and get the root
        const rootEntity = await getRootFromSubgraph(awardedTimestampSec, this.badgesSubgraphUrl);
        if(!rootEntity) {
            throw new Error('No root found')
        }
        const leafInfo : LeafInfo = {
            account: owner,
            badgeId: parseInt(badgeType)
        }

        const network = (await this.provider.getNetwork()).name;

        const leaves = await createLeaves(network, seasonId);
        const proof = getProof(owner, parseInt(badgeType), leaves);


        const tokenId = await this.contract.callStatic.redeem(leafInfo, proof, rootEntity.merkleRoot);
        const tx = await this.contract.redeem(leafInfo, proof, rootEntity.merkleRoot);
        await tx.wait();
        return tokenId;
    } catch (error) {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage("Unable to claim");
        throw new Error("Unable to claim");
    }
  }

    /**
   * @notice This function calls the SBT contract's
   * @param badges: array of badgeTypes and the time at which they were awarded
   * @param owner: user's address
   * @param subgraphAPI: the api link used to query the subgraph
   * @returns 
   */
    public async redeemMultipleSbts(
        badges: BadgeRecord[],
        owner: string,
        seasonId: number,
    ): Promise<{
        claimedBadgeTypes: number[]
    }> {
        // wallet was not connected when the object was initialised
        // therefore, it couldn't obtain the contract connection
        if (!this.contract || !this.provider) {
            throw new Error('Wallet not connected');
        }

        // parse through badges and create 
        // multiRedeem(LeafInfo[] memory leafInfos, bytes32[][] calldata proofs, bytes32[] memory merkleRoots) 
        let data: MultiRedeemData = {
            leaves: [],
            proofs: [],
            roots: []
        }

        const network = (await this.provider.getNetwork()).name;

        const claimedBadgeTypes: number[] = [];
        for (const badge of badges) {
            if (!this.badgesSubgraphUrl || !this.coingeckoKey || !this.subgraphUrl) {
                break;
            }

            const awardedTimestampSec = Math.floor(badge.awardedTimestamp/1000);
            // create merkle tree from subgraph derived leaves and get the root
            const rootEntity = await getRootFromSubgraph(awardedTimestampSec, this.badgesSubgraphUrl);
            if(!rootEntity) {
                continue;
            }
            const leafInfo: LeafInfo = {
                account: owner,
                badgeId: parseInt(badge.badgeType)
            }
            

            const leaves = await createLeaves(network, seasonId);
            const proof = getProof(owner, parseInt(badge.badgeType), leaves);

            data.leaves.push(leafInfo);
            data.proofs.push(proof);
            data.roots.push(rootEntity.merkleRoot)
            claimedBadgeTypes.push(parseInt(badge.badgeType));
        }

        try {
            await this.contract.callStatic.multiRedeem(data.leaves, data.proofs, data.roots);
            const tx = await this.contract.multiRedeem(data.leaves, data.proofs, data.roots);
            await tx.wait();
            return {
                claimedBadgeTypes,
            }
        } catch (error) {
            sentryTracker.captureException(error);
            sentryTracker.captureMessage("Unable to claim multiple badges");
            throw new Error("Unable to claim multiple badges");
        }
    }

    public async getSeasonBadges({
        userId,
        seasonId,
        seasonStart,
        seasonEnd,
      }: {
        userId: string;
        seasonId: number;
        seasonStart: number,
        seasonEnd: number,
      }): Promise<BadgeResponse[]> {

        // past season
        if (seasonEnd < DateTime.now().toSeconds()) {
            const badges = await this.getOldSeasonBadges({
                userId,
                seasonId,
                seasonStart,
                seasonEnd,
            })
            return badges;
        }

        const badges = await this.computeSeasonBadges({
            userId,
            seasonId,
            seasonStart,
            seasonEnd,
        });
        return badges;

    } 
    
    public async getOldSeasonBadges({
        userId,
        seasonId,
        seasonStart,
        seasonEnd,
    }: {
        userId: string;
        seasonId: number;
        seasonStart: number,
        seasonEnd: number,
    }): Promise<BadgeResponse[]> {

        if (!this.provider || !this.signer) {
            throw new Error('Wallet not connected');
        }

        //programmatic badges
        let badgesResponse : BadgeResponse[] = await getSubgraphBadges({
            userId,
            seasonId,
            seasonStart,
            seasonEnd,
            badgesSubgraphUrl: this.badgesSubgraphUrl
        });
        const mapBadges = new Map<string, BadgeResponse>();
        badgesResponse.forEach((entry) => {
            mapBadges.set(entry.id, entry);
        })

        const network = (await this.provider.getNetwork()).name;
        const data = await axios.get(geLeavesIpfsUri(network, seasonId, false));

        const snasphots : Array<{
                owner: string
                badgeType: number,
                metadataURI: string
            }> = data.data.snapshot;
    
        // to speed things up, awarded timestamp 
        const subgraphSnapshots : BadgeResponse[] = [];
        snasphots.forEach((entry) => {
            if(entry.owner.toLowerCase() === userId.toLowerCase()) {
                const id = `${entry.owner.toLowerCase()}#${entry.badgeType}#${seasonId}`
                subgraphSnapshots.push({
                    id: id,
                    badgeType: entry.badgeType.toString(),
                    awardedTimestampMs: mapBadges.get(id)?.awardedTimestampMs || toMillis(seasonEnd),
                    mintedTimestampMs: mapBadges.get(id)?.mintedTimestampMs || undefined,
                })
            }
            
        })
    
        return subgraphSnapshots;
    }

    public async computeSeasonBadges({
        userId,
        seasonId,
        seasonStart,
        seasonEnd,
      }: {
        userId: string;
        seasonId: number;
        seasonStart: number,
        seasonEnd: number,
      }): Promise<BadgeResponse[]> {
        try {
            //programmatic badges
            let badgesResponse : BadgeResponse[] = await getSubgraphBadges({
                userId,
                seasonId,
                seasonStart,
                seasonEnd,
                badgesSubgraphUrl: this.badgesSubgraphUrl
            });

            // referrer badges & non-programatic badges
            let referroorBadges : Record<string, BadgeResponse> = {};
            let nonProgBadges : Record<string, BadgeResponse> = {};
            if (this.nonProgDbUrl) {
                nonProgBadges = await this.getNonProgramaticBadges(userId);
            }
            
            if (this.referralsDbUrl && this.badgesSubgraphUrl) {
                referroorBadges = await this.getReferrorBadges(
                    userId,
                    seasonId
                );
            }

            for (const badgeType of NON_SUBGRAPH_BADGES_SEASONS[seasonId]) {
                if (nonProgBadges[badgeType]) {
                    const nonProgBadge = nonProgBadges[badgeType];
                    badgesResponse.push(nonProgBadge);
                }
                if (referroorBadges[badgeType]) {
                    const referroorBadge = referroorBadges[badgeType];
                    badgesResponse.push(referroorBadge);
                }
            }

            // top LP & trader badges
            if (this.badgesSubgraphUrl && this.subgraphUrl && this.coingeckoKey &&
                DateTime.now().toSeconds() > seasonEnd) {
                const topLpBadge =  await this.getTopBadge(userId, seasonId, false, seasonStart, seasonEnd);
                const topTraderBadge =  await this.getTopBadge(userId, seasonId, true, seasonStart, seasonEnd);
                if (topLpBadge) badgesResponse.push(topLpBadge);
                if (topTraderBadge) badgesResponse.push(topTraderBadge);
            }
            
            return badgesResponse;
        } catch (error) {
            sentryTracker.captureException(error);
          return [];
        }
    }

    /**
   * @dev Retrieve season's notional
   * ranking of all users. Check if given user is in top 5.
   * If so, assign a top trader/LP badge, otherwise return undefined
   */
    public async getTopBadge(
        userId: string,
        seasonId: number,
        isLP: boolean,
        seasonStart: number,
        seasonEnd: number,
    ): Promise<BadgeResponse | undefined> {
        const badgeType = getTopBadgeType(seasonId, !isLP);
        if (!badgeType) return undefined;

        if (!this.badgesSubgraphUrl || !this.coingeckoKey || !this.ignoredWalletIds) {
            return undefined;
        }

        if (!this.ethPrice) {
            this.ethPrice = await geckoEthToUsd(this.coingeckoKey);
        }

        const rankResult = await this.getRanking({
            seasonStart,
            seasonEnd,
            isLP
        })

        for (let rank = 0; rank < 5; rank++) {
            const entry = rankResult[rank];
            if (entry.address === userId) {
                const badge = await this.constructTopBadge(
                    userId,
                    seasonId,
                    seasonEnd,
                    badgeType
                );
                return badge;
            }
        }

        return undefined;
    }

    public async getRanking(args: GetRankingArgs) : Promise<RankType[]> {

        if (!this.subgraphUrl || !this.coingeckoKey || !this.ignoredWalletIds) {
            return [];
        }

        if (!this.ethPrice) {
            this.ethPrice = await geckoEthToUsd(this.coingeckoKey);
        }
    
        const scoreArgs: GetScoresArgs = {
            seasonStart: args.seasonStart,
            seasonEnd: args.seasonEnd,
            subgraphUrl: this.subgraphUrl,
            ethPrice: this.ethPrice,
            ignoredWalletIds: this.ignoredWalletIds,
            isLP: args.isLP ?? false
        }
            
        const scores = await getScores(scoreArgs);
    
        const rankResult: RankType[] = Object.keys(scores)
            .sort((a, b) => scores[b] - scores[a])
            .map((walletId, index) => ({
                address: walletId,
                points: scores[walletId] ?? 0,
                rank: index,
            }));
    
        return rankResult;
    }

    /**
   * @dev Query the Badges subgraph to assess if the top 
   * badge was claimed. Create a Badge Response with
   * the awarded time as end of season and claimed time 
   * as eithr zero if not claimed or subgrap's minted timestamp
   */
    async constructTopBadge(
        userId: string,
        seasonId: number,
        seasonEnd: number,
        badgeType: string,
    ) : Promise<BadgeResponse> {
        const badgeQuery = `
            query( $id: String) {
                badge(id: $id){
                    id
                    mintedTimestamp
                }
            }
        `;
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({ uri: this.badgesSubgraphUrl, fetch })
        })
      
        const idBadge = `${userId.toLowerCase()}#${badgeType}#${seasonId}`;
        const badgeData = await client.query<{
            badge: SubgraphBadgeResponse;
        }>({
            query: gql(badgeQuery),
            variables: {
                id: idBadge,
            },
        });
        const badge : BadgeResponse = {
            id: `${userId}#${seasonId}#${badgeType}`,
            badgeType: badgeType,
            awardedTimestampMs: toMillis(seasonEnd),
            mintedTimestampMs: toMillis(parseInt(badgeData?.data?.badge ? badgeData.data.badge.mintedTimestamp : "0")),
        }
        return badge;
    }

    public async getNonProgramaticBadges(userId: string) : Promise<Record<string, BadgeResponse>> {
        let badgeResponseRecord : Record<string, BadgeResponse> = {};

        const resp = await axios.get(`${this.nonProgDbUrl}/get-badges/${userId}`);
        if (!resp.data){
            return badgeResponseRecord;
        }

        const badges: NonProgramaticBadgeResponse[] = resp.data.badges;
        badges.forEach((entry) => {
            const badgeType = NON_PROGRAMATIC_BADGES_VARIANT[entry.badge];
            
            if(badgeType) {
                badgeResponseRecord[badgeType] = {
                    id: `${userId}#${badgeType}#1`,
                    badgeType: badgeType,
                    awardedTimestampMs: toMillis(entry.awardedTimestamp),
                    mintedTimestampMs: toMillis(entry.mintedTimestamp),
                } as BadgeResponse;
            }
        });
        return badgeResponseRecord;
    }

    async getReferrorBadges(userId: string, seasonId: number) : Promise<Record<string, BadgeResponse>> {
        let badgeResponseRecord : Record<string, BadgeResponse> = {};

        const resp = await axios.get(`${this.referralsDbUrl}/referrals-by/${userId.toLowerCase()}`);
        if (!resp.data){
            return badgeResponseRecord;
        }

        const referees: string[] = resp.data;
        let refereesWith100kNotionalTraded = 0;
        let refereesWith2mNotionalTraded = 0;
        for (const referee of referees){
            const badgeQuery = `
                query( $id: String) {
                    seasonUsers( where: {owner_contains: $id}) {
                        id
                        totalWeightedNotionalTraded
                      
                    }
                }
            `;
            const client = new ApolloClient({
                cache: new InMemoryCache(),
                link: new HttpLink({ uri: this.badgesSubgraphUrl, fetch })
            })
            const id = `${referee.toLowerCase()}`
            const data = await client.query<{
                seasonUsers: {
                    totalWeightedNotionalTraded: string
                }[]
            }>({
                query: gql(badgeQuery),
                variables: {
                    id: id,
                },
            });

            if(!data?.data?.seasonUsers){
                continue;
            }

            let totalPointz = 0;
            data.data.seasonUsers.forEach((user) => {
                totalPointz = totalPointz + parseFloat(user.totalWeightedNotionalTraded);
            });
            if(totalPointz >= get100KRefereeBenchmark(this.badgesSubgraphUrl)) {
                refereesWith100kNotionalTraded++;
                if(totalPointz >= get2MRefereeBenchmark(this.badgesSubgraphUrl)){
                    refereesWith2mNotionalTraded++;
                }
            }
        };

        if (refereesWith100kNotionalTraded >= 1) {
            let badgeType = '36'; //referror
            badgeResponseRecord[badgeType] = this.createReferroorBadgeRecord(badgeType, userId, seasonId);
            if (refereesWith100kNotionalTraded >= 10) {
                badgeType = '37'; // Notional Influence
                badgeResponseRecord[badgeType] = this.createReferroorBadgeRecord(badgeType, userId, seasonId);
            }
        }
        if (refereesWith2mNotionalTraded >= 5) {
            const badgeType = '38'; //whaleWhisperer
            badgeResponseRecord[badgeType] = this.createReferroorBadgeRecord(badgeType, userId, seasonId);
        }
        return badgeResponseRecord;
    }

    createReferroorBadgeRecord(badgeType: string, userId: string, seasonId: number) : BadgeResponse {
        return {
            id: `${userId}#${badgeType}#${seasonId}`,
            badgeType: badgeType,
            awardedTimestampMs: toMillis(DateTime.now().toSeconds()),
            mintedTimestampMs: undefined,
        } as BadgeResponse;
    }

    public async getUserBalance(user: string) : Promise<BigNumber | void> {
        const balance = await this.contract?.balanceOf(user);
        return balance;
    }

    public async getTokenOwner(tokenId: string) : Promise<string | void> {
        const owner = await this.contract?.ownerOf(tokenId);
        return owner;
    }

    public async getTotalSupply() : Promise<BigNumber | void> {
        const totalSupply = await this.contract?.totalSupply();
        return totalSupply;
    }

    public async getBadgeStatus(args: GetBadgesStatusArgs) : Promise<Array<BadgeWithStatus>> {
        if (!this.signer) { 
            throw new Error("No provider found")
        }
        const userAddress = await this.signer.getAddress();
        const network = await this.provider?.getNetwork();
        const networkName = network ? network.name : "";

        const getURL = getEtherscanURL(networkName, args.apiKey, userAddress);
        const resp = await axios.get(getURL);

        if (!resp.data) {
            throw new Error("Etherscan api failed")
        }
        const transactions = resp.data.result;

        // get last 50 transactions, match is redeem and set SUCC/FAILED status
        let txBadges = new Map<number, TxBadgeStatus>();
        for (const transaction of transactions) {
            if (transaction.to.toLowerCase() !== this.contract?.address.toLowerCase()) { 
                continue;
            }
            const status = transaction.txreceipt_status === 1 ? 
                TxBadgeStatus.SUCCESSFUL
                : TxBadgeStatus.FAILED;
            if (transaction.methodId === REDEEM_METHOD_ID) {
                const badgeType = decodeBadgeType(transaction.input);
                txBadges.set(badgeType, status);
            } else if (transaction.methodId === MULTI_REDEEM_METHOD_ID) {
                const badgeTypes = decodeMultipleBadgeTypes(transaction.input);
                for (const badgeType of badgeTypes) {
                    txBadges.set(badgeType, status);
                }
            }
        }

        // if badges of interest are not part of those 50 transactions, set them as pending
        for (const badgeType of args.potentialClaimingBadgeTypes) {
            if (!txBadges.get(badgeType)) {
                txBadges.set(badgeType, TxBadgeStatus.PENDING);
            }
        }

        // badges claiming status in subgraph - includes all bades earned by user in given season
        const subgraphClaimedBadges = await this.claimedBadgesInSubgraph(userAddress, args.season);

        // final claiming status verdict
        const badgeStatuses = subgraphClaimedBadges.map((badge) => {
            if(badge.claimingStatus === BadgeClaimingStatus.CLAIMED){
                return badge;
            }
            const txStatus = txBadges.get(badge.badgeType);

            // badge not found in recent successful txs or in potential pending txs
            // meaning their status is desided by the subgraph
            if (!txStatus || txStatus === TxBadgeStatus.FAILED) { 
                return {
                    badgeType: badge.badgeType, 
                    claimingStatus: badge.claimingStatus
                }
            } else { // subgraph is not updated yet
                return {
                    badgeType: badge.badgeType, 
                    claimingStatus: BadgeClaimingStatus.CLAIMING
                }
            }
        })

        return badgeStatuses;
        
    }

    async claimedBadgesInSubgraph(userAddress: string, season: number): Promise<Array<BadgeWithStatus>> {
        const badgeQuery = `
            query( $id: String) {
                badges(first: 50, where: {seasonUser_contains: $id}) {
                    id
                    badgeType
                    awardedTimestamp
                    mintedTimestamp
                }
            }
        `;
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({ uri: this.badgesSubgraphUrl, fetch })
        })
        const id = `${userAddress.toLowerCase()}#${season}`
        const data = await client.query<{
            badges: SubgraphBadgeResponse[]
        }>({
            query: gql(badgeQuery),
            variables: {
                id: id,
            },
        });

        let badgesClaimed = new Array<BadgeWithStatus>();
        for (const badge of data.data.badges) {
            badgesClaimed.push({
                badgeType: parseInt(badge.badgeType, 10),
                claimingStatus: parseInt(badge.mintedTimestamp, 10) === 0 ?
                    BadgeClaimingStatus.NOT_CLAIMED 
                    : BadgeClaimingStatus.CLAIMED // only from subgraph's perspective
            });
        }

        return badgesClaimed;
    }

}

export default SBT;