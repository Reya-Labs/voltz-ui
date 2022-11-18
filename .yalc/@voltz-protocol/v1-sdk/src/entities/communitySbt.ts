import { BigNumber, Bytes, Signer, providers, ContractTransaction, providers, ContractTransaction } from 'ethers';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { CommunitySBT, CommunitySBT__factory } from '../typechain-sbt';
import { createLeaves } from '../utils/communitySbt/getSubgraphLeaves';
import { getRootFromSubgraphFromSubgraph } from '../utils/communitySbt/getSubgraphRoot';
import { getProof } from '../utils/communitySbt/merkle-tree';
import  axios from 'axios';
import fetch from 'cross-fetch';
import { MULTI_REDEEM_METHOD_ID, REDEEM_METHOD_ID } from '../constants';
import { decodeBadgeType, decodeMultipleBadgeTypes, getBadgeTypeFromMetadataUri, getEtherscanURL } from '../utils/communitySbt/helpers';
import  axios from 'axios';
import fetch from 'cross-fetch';
import { MULTI_REDEEM_METHOD_ID, REDEEM_METHOD_ID } from '../constants';
import { decodeBadgeType, decodeMultipleBadgeTypes, getBadgeTypeFromMetadataUri, getEtherscanURL } from '../utils/communitySbt/helpers';

export type SBTConstructorArgs = {
    id: string;
    signer: Signer| null;
};

export type BadgeRecord = {
    badgeType: number;
    awardedTimestamp: number;
};

export export type LeafInfo = {
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
    badgeName: string;
    awardedTimestamp: string;
    mintedTimestamp: string;
}

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
        'ogTopTrader',
        'ogBeWaterMyFriend'
    ],
    1: [
        'topTrader',
        'beWaterMyFriend',
        'diplomatz',
        'governorz',
        'senatorz',
        'theOgActivity'
    ]
}
export const TOP_BADGES_VARIANT: Record<string, string> = {
    'topTrader' : '31',
    'beWaterMyFriend' : '28',
    'ogTopTrader' : '15',
    'ogBeWaterMyFriend' : '12'
}

export const NON_PROGRAMATIC_BADGES_VARIANT: Record<string, string> = {
    'diplomatz' : '33',
    'governorz' : '34',
    'senatorz' : '35',
    'theOgActivity' : '36'
}



class SBT {

  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider: providers.Provider | undefined;
  public readonly provider: providers.Provider | undefined;
  public contract: CommunitySBT | null;

  /**
   * 
   * @param id: CommunitySBT contract address (depends on the network)
   * @param signer: Signer object according to the user's wallet
   */
  public constructor({ id, signer }: SBTConstructorArgs) {
    this.id = id;
    this.signer = signer;
    if (signer) {
        this.contract = CommunitySBT__factory.connect(id, signer);
        this.provider = signer.provider;
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
    badgeType: number,
    owner: string,
    awardedTimestamp: number,
    subgraphAPI: string
  ): Promise<BigNumber | void> {

    // wallet was not connected when the object was initialised
    // therefore, it couldn't obtain the contract connection
    if (!this.contract) {
        throw new Error('Cannot connect to community SBT contract');
    }

    try {
        // create merkle tree from subgraph derived leaves and get the root
        const rootEntity = await getRootFromSubgraphFromSubgraph(awardedTimestamp, subgraphAPI);
        if(!rootEntity) {
            throw new Error('No root found')
        }
        const leafInfo : LeafInfo = {
            account: owner,
            badgeId: badgeType
        }

        const startTimestamp = rootEntity.startTimestamp;
        const endTimestamp = rootEntity.endTimestamp;

        const leaves = await createLeaves(startTimestamp, endTimestamp, subgraphAPI);
        const proof = getProof(owner, badgeType, leaves);


        const tokenId = await this.contract.callStatic.redeem(leafInfo, proof, rootEntity.merkleRoot);
        const tx = await this.contract.redeem(leafInfo, proof, rootEntity.merkleRoot);
        await tx.wait();
        return tokenId;
    } catch (err) {
        console.error(err);
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
        subgraphAPI: string
    ): Promise<{
        claimedBadgeTypes: number[]
    }> {
        // wallet was not connected when the object was initialised
        // therefore, it couldn't obtain the contract connection
        if (!this.contract) {
            throw new Error('Wallet not connected');
        }

        // parse through badges and create 
        // multiRedeem(LeafInfo[] memory leafInfos, bytes32[][] calldata proofs, bytes32[] memory merkleRoots) 
        let data: MultiRedeemData = {
            leaves: [],
            proofs: [],
            roots: []
        }
        const claimedBadgeTypes: number[] = [];
        for (const badge of badges) {
            // create merkle tree from subgraph derived leaves and get the root
            const rootEntity = await getRootFromSubgraphFromSubgraph(badge.awardedTimestamp, subgraphAPI);
            if(!rootEntity) {
                continue;
            }
            const leafInfo: LeafInfo = {
                account: owner,
                badgeId: badge.badgeType
            }
            const startTimestamp = rootEntity.startTimestamp;
            const endTimestamp = rootEntity.endTimestamp;

            const leaves = await createLeaves(startTimestamp, endTimestamp, subgraphAPI);
            const proof = getProof(owner, badge.badgeType, leaves);

            data.leaves.push(leafInfo);
            data.proofs.push(proof);
            data.roots.push(rootEntity.merkleRoot)
            claimedBadgeTypes.push(badge.badgeType);
        }

        try {
            await this.contract.callStatic.multiRedeem(data.leaves, data.proofs, data.roots);
            const tx = await this.contract.multiRedeem(data.leaves, data.proofs, data.roots);
            return {
                claimedBadgeTypes,,
            }
        } catch (err) {
            throw new Error("Unable to claim multiple badges");
        }
    }

    public async getSeasonBadges({
        subgraphUrl,
        dbUrl,
        userId,
        seasonId,
      }: {
        subgraphUrl: string;
        dbUrl: string;
        userId: string;
        seasonId: number;
      }): Promise<BadgeResponse[]> {
        if (!subgraphUrl || !dbUrl) {
          return [];
        }
        try {
            const badgeQuery = `
                query( $id: BigInt) {
                    seasonUser(id: $id) {
                        id
                        badges {
                          id
                          awardedTimestamp
                          mintedTimestamp
                          badgeType
                          badgeName
                        }
                    }
                }
            `;
            const client = new ApolloClient({
                cache: new InMemoryCache(),
                link: new HttpLink({ uri: subgraphUrl, fetch })
            })
            const id = `${userId.toLowerCase()}#${seasonId}`
            const data = await client.query({
                query: gql(badgeQuery),
                variables: {
                    id: id,
                },
            });
      
            if (!data.data.seasonUser) {
                return [];// empty array
            }

            const nonProgBadges = await this.getNonProgramaticBadges(userId, dbUrl);
      
            const subgraphBadges = data.data.seasonUser.badges as BadgeResponse[];
            let badgesResponse : BadgeResponse[] = [];
            for (const badge of subgraphBadges) {
                badgesResponse.push(badge);
            }
            for (const badgeVariant of NON_SUBGRAPH_BADGES_SEASONS[seasonId]) {
                if (TOP_BADGES_VARIANT[badgeVariant]) {
                    const topBadge = await this.getTopTraderBadge(subgraphUrl, userId, seasonId, TOP_BADGES_VARIANT[badgeVariant]);
                    if (topBadge) {
                        badgesResponse.push(topBadge);
                    }
                } else if (NON_PROGRAMATIC_BADGES_VARIANT[badgeVariant] && nonProgBadges[badgeVariant]) {
                    const nonProgBadge = nonProgBadges[badgeVariant];
                    badgesResponse.push(nonProgBadge);
                }
            }
            return badgesResponse;
        } catch (error) {
          return [];
        }
    }

    public async getTopTraderBadge(
        subgraphUrl: string,
        userId: string,
        seasonId: number,
        badgeType: string
      ): Promise<BadgeResponse | undefined> {
        if (!process.env.REACT_APP_SUBGRAPH_BADGES_URL) {
            return undefined;
          }
        try {
            const badgeQuery = `
                query( $id: BigInt, $unit: String) {
                    seasonUsers(first: 5, orderBy: $unit, orderDirection: desc) {
                        id
                        badges {
                        id
                        awardedTimestamp
                        mintedTimestamp
                        badgeType
                        badgeName
                        }
                        totalNotionalTraded
                        totalLiquidityProvided
                    }
                }
            `;
            const client = new ApolloClient({
                cache: new InMemoryCache(),
                link: new HttpLink({ uri: subgraphUrl, fetch })
            })
            const id = `${userId.toLowerCase()}#${seasonId}`;
            const isNotional = badgeType.indexOf("trade") > -1;
            const unit = isNotional ? "totalNotionalTraded" : "totalLiquidityProvided";
            const data = await client.query({
                query: gql(badgeQuery),
                variables: {
                    id: id,
                    unit: unit
                },
            });
    
            if (!data.data.seasonUsers) {
                return undefined;
            }

            for (const seasonUser of data.data.seasonUsers) {
                if (seasonUser.id === userId.toLowerCase()) {
                    const badge : BadgeResponse = {
                        id: `${userId}#${seasonId}#${badgeType}`,
                        badgeType: badgeType,
                        badgeName: TOP_BADGES_VARIANT[badgeType],
                        awardedTimestamp: isNotional ? seasonUser.notionalAwardedTimestamp : seasonUser.liquidityAwardedTimestamp,
                        mintedTimestamp: isNotional ? seasonUser.notionalMintedTimestamp : seasonUser.liquidityMintedTimestamp,
                    }
                    return badge;
                }
            }
        } catch (error) {
            return undefined;
        }
    }

    public async getNonProgramaticBadges(userId: string, nonProgramaticBadgesUrl: string) : Promise<Record<string, BadgeResponse>> {
        let badgeResponssRecord : Record<string, BadgeResponse> = {};

        const resp = await axios.get(nonProgramaticBadgesUrl + userId);
        if (!resp.data){
            return badgeResponssRecord ;
        }

        const badges: NonProgramaticBadgeResponse[] = resp.data.badges;
        badges.map((entry) => {
            const badgeType = NON_PROGRAMATIC_BADGES_VARIANT[entry.badge]
            badgeResponssRecord[entry.badge] = {
                id: `${userId}#${10000}#${badgeType}`,
                badgeType: badgeType,
                badgeName: NON_PROGRAMATIC_BADGES_VARIANT[badgeType],
                awardedTimestamp: entry.awardedTimestamp.toString(),
                mintedTimestamp: entry.mintedTimestamp.toString(),
            };
        });
        return badgeResponssRecord;
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
        const subgraphClaimedBadges = await this.claimedBadgesInSubgraph(args.subgraphUrl, userAddress, args.season);

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

    async claimedBadgesInSubgraph(subgraphUrl: string, userAddress: string, season: number): Promise<Array<BadgeWithStatus>> {
        const badgeQuery = `
            query( $id: BigInt) {
                badges(first: 50, where: {seasonUser_contains: $id}) {
                    id
                    badgeType
                    badgeName
                    awardedTimestamp
                    mintedTimestamp
                }
            }
        `;
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({ uri: subgraphUrl, fetch })
        })
        const id = `${userAddress.toLowerCase()}#${season}`
        const data = await client.query<{
            badges: BadgeResponse[]
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
        const subgraphClaimedBadges = await this.claimedBadgesInSubgraph(args.subgraphUrl, userAddress, args.season);

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

    async claimedBadgesInSubgraph(subgraphUrl: string, userAddress: string, season: number): Promise<Array<BadgeWithStatus>> {
        const badgeQuery = `
            query( $id: BigInt) {
                badges(first: 50, where: {seasonUser_contains: $id}) {
                    id
                    badgeType
                    badgeName
                    awardedTimestamp
                    mintedTimestamp
                }
            }
        `;
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({ uri: subgraphUrl, fetch })
        })
        const id = `${userAddress.toLowerCase()}#${season}`
        const data = await client.query<{
            badges: BadgeResponse[]
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