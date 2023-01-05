import { BigNumber, Bytes, Signer, providers } from 'ethers';
import { gql } from '@apollo/client';
import axios from 'axios';
import { DateTime } from 'luxon';
import { CommunitySBT, CommunitySBT__factory } from '../typechain-sbt';
import { createLeaves } from '../utils/communitySbt/getIpfsLeaves';
import { getRootFromSubgraph } from '../utils/communitySbt/getSubgraphRoot';
import { getProof } from '../utils/communitySbt/merkle-tree';
import { MULTI_REDEEM_METHOD_ID, ONE_DAY_IN_SECONDS, REDEEM_METHOD_ID } from '../constants';
import {
  decodeBadgeType,
  decodeMultipleBadgeTypes,
  get100KRefereeBenchmark,
  get2MRefereeBenchmark,
  getEtherscanURL,
  getLeavesIpfsUri,
  getSelectedSeasonBadgesUrl,
  getTopBadgeType,
  toMillis,
} from '../utils/communitySbt/helpers';
import { getScores, GetScoresArgs } from '../utils/communitySbt/getTopBadges';
import { getSubgraphBadges } from '../utils/communitySbt/getSubgraphBadges';

import { sentryTracker } from '../utils/sentry';
import { getApolloClient } from '../utils/communitySbt/getApolloClient';
import { geckoEthToUsd } from '../utils/priceFetch';

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

type MultiRedeemData = {
  leaves: Array<LeafInfo>;
  proofs: Array<string[]>;
  roots: Array<Bytes>;
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

enum TxBadgeStatus {
  SUCCESSFUL,
  FAILED,
  PENDING,
}

export enum BadgeClaimingStatus {
  CLAIMED,
  CLAIMING,
  NOT_CLAIMED,
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

export const TOP_BADGES_VARIANT: Record<string, string[]> = {
  trader: ['15', '31', '56'],
  liquidityProvider: ['12', '28', '53'],
};

export const NON_PROGRAMATIC_BADGES_VARIANT: Record<number, Record<string, string>> = {
  1: {
    diplomatz: '33',
    governorz: '34',
    senatorz: '35',
  },
  2: {
    diplomatz: '57',
    governorz: '58',
    senatorz: '59',
  },
};

export const REFERROR_BADGES_VARIANT: Record<number, Record<string, string>> = {
  1: {
    referror: '36',
    notionalInfluencer: '37',
    whaleWhisperer: '38',
  },
  2: {
    referror: '60',
    notionalInfluencer: '61',
    whaleWhisperer: '62',
  },
};

export const NON_SUBGRAPH_BADGES_SEASONS: Record<number, string[]> = {
  0: [TOP_BADGES_VARIANT.trader[0], TOP_BADGES_VARIANT.liquidityProvider[0]],
  1: [
    TOP_BADGES_VARIANT.trader[1],
    TOP_BADGES_VARIANT.liquidityProvider[1],
    NON_PROGRAMATIC_BADGES_VARIANT[1].diplomatz,
    NON_PROGRAMATIC_BADGES_VARIANT[1].governorz,
    NON_PROGRAMATIC_BADGES_VARIANT[1].senatorz,
    REFERROR_BADGES_VARIANT[1].referror,
    REFERROR_BADGES_VARIANT[1].notionalInfluencer,
    REFERROR_BADGES_VARIANT[1].whaleWhisperer,
  ],
  2: [
    TOP_BADGES_VARIANT.trader[2],
    TOP_BADGES_VARIANT.liquidityProvider[2],
    NON_PROGRAMATIC_BADGES_VARIANT[2].diplomatz,
    NON_PROGRAMATIC_BADGES_VARIANT[2].governorz,
    NON_PROGRAMATIC_BADGES_VARIANT[2].senatorz,
    REFERROR_BADGES_VARIANT[2].referror,
    REFERROR_BADGES_VARIANT[2].notionalInfluencer,
    REFERROR_BADGES_VARIANT[2].whaleWhisperer,
  ],
};

class SBT {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider: providers.Provider | undefined;
  public readonly coingeckoKey?: string;
  public readonly currentBadgesSubgraphUrl?: string;
  public readonly nextBadgesSubgraphUrl?: string;
  public readonly nonProgDbUrl?: string;
  public readonly referralsDbUrl?: string;
  public readonly subgraphUrl?: string;
  public readonly ignoredWalletIds?: Record<string, boolean>;
  public readonly badgesCids?: Array<string>;
  public readonly leavesCids?: Array<string>;
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
    currentBadgesSubgraphUrl,
    nextBadgesSubgraphUrl,
    nonProgDbUrl,
    referralsDbUrl,
    subgraphUrl,
    ignoredWalletIds,
    badgesCids,
    leavesCids,
  }: SBTConstructorArgs) {
    this.id = id;
    this.signer = signer;

    this.coingeckoKey = coingeckoKey;
    this.currentBadgesSubgraphUrl = currentBadgesSubgraphUrl;
    this.nextBadgesSubgraphUrl = nextBadgesSubgraphUrl;
    this.nonProgDbUrl = nonProgDbUrl;
    this.referralsDbUrl = referralsDbUrl;
    this.subgraphUrl = subgraphUrl;
    this.ignoredWalletIds = ignoredWalletIds ?? {};
    this.badgesCids = badgesCids;
    this.leavesCids = leavesCids;
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

    const selectedBadgesSubgraphUrl = getSelectedSeasonBadgesUrl(
      seasonId,
      this.badgesCids,
      this.currentBadgesSubgraphUrl,
      this.nextBadgesSubgraphUrl,
    );

    try {
      if (
        !selectedBadgesSubgraphUrl ||
        !this.coingeckoKey ||
        !this.subgraphUrl ||
        !this.provider ||
        !this.leavesCids
      ) {
        throw new Error('Missing env vars');
      }

      const awardedTimestampSec = Math.floor(awardedTimestamp / 1000);
      // create merkle tree from subgraph derived leaves and get the root
      const rootEntity = await getRootFromSubgraph(awardedTimestampSec, selectedBadgesSubgraphUrl);
      if (!rootEntity) {
        throw new Error('No root found');
      }
      const leafInfo: LeafInfo = {
        account: owner,
        badgeId: parseInt(badgeType),
      };

      const leaves = await createLeaves(seasonId, this.leavesCids);
      const proof = getProof(owner, parseInt(badgeType), leaves);

      const tokenId = await this.contract.callStatic.redeem(leafInfo, proof, rootEntity.merkleRoot);
      const tx = await this.contract.redeem(leafInfo, proof, rootEntity.merkleRoot);
      await tx.wait();
      return tokenId;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Unable to claim');
      throw new Error('Unable to claim');
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
    claimedBadgeTypes: number[];
  }> {
    // wallet was not connected when the object was initialised
    // therefore, it couldn't obtain the contract connection
    if (!this.contract || !this.provider || !this.leavesCids) {
      throw new Error('Wallet not connected');
    }

    // parse through badges and create
    // multiRedeem(LeafInfo[] memory leafInfos, bytes32[][] calldata proofs, bytes32[] memory merkleRoots)
    const data: MultiRedeemData = {
      leaves: [],
      proofs: [],
      roots: [],
    };

    const selectedBadgesSubgraphUrl = getSelectedSeasonBadgesUrl(
      seasonId,
      this.badgesCids,
      this.currentBadgesSubgraphUrl,
      this.nextBadgesSubgraphUrl,
    );

    const claimedBadgeTypes: number[] = [];
    for (const badge of badges) {
      if (!selectedBadgesSubgraphUrl || !this.coingeckoKey || !this.subgraphUrl) {
        break;
      }

      const awardedTimestampSec = Math.floor(badge.awardedTimestamp / 1000);
      // create merkle tree from subgraph derived leaves and get the root
      const rootEntity = await getRootFromSubgraph(awardedTimestampSec, selectedBadgesSubgraphUrl);
      if (!rootEntity) {
        continue;
      }
      const leafInfo: LeafInfo = {
        account: owner,
        badgeId: parseInt(badge.badgeType),
      };

      const leaves = await createLeaves(seasonId, this.leavesCids);
      const proof = getProof(owner, parseInt(badge.badgeType), leaves);

      data.leaves.push(leafInfo);
      data.proofs.push(proof);
      data.roots.push(rootEntity.merkleRoot);
      claimedBadgeTypes.push(parseInt(badge.badgeType));
    }

    try {
      await this.contract.callStatic.multiRedeem(data.leaves, data.proofs, data.roots);
      const tx = await this.contract.multiRedeem(data.leaves, data.proofs, data.roots);
      await tx.wait();
      return {
        claimedBadgeTypes,
      };
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Unable to claim multiple badges');
      throw new Error('Unable to claim multiple badges');
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
    seasonStart: number;
    seasonEnd: number;
  }): Promise<BadgeResponse[]> {
    try {
      const selectedBadgesSubgraphUrl = getSelectedSeasonBadgesUrl(
        seasonId,
        this.badgesCids,
        this.currentBadgesSubgraphUrl,
        this.nextBadgesSubgraphUrl,
      );
      if (seasonEnd < DateTime.now().toSeconds() && this.badgesCids && this.badgesCids[seasonId]) {
        const badges = await this.getOldSeasonBadges({
          userId,
          seasonId,
          seasonStart,
          seasonEnd,
          selectedBadgesSubgraphUrl,
        });
        return badges;
      }
      const badges = await this.computeSeasonBadges({
        userId,
        seasonId,
        seasonStart,
        seasonEnd,
        selectedBadgesSubgraphUrl,
      });
      return badges;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Failed to get season badges');
      throw new Error('Failed to get season badges');
    }
  }

  public async getOldSeasonBadges({
    userId,
    seasonId,
    seasonStart,
    seasonEnd,
    selectedBadgesSubgraphUrl,
  }: {
    userId: string;
    seasonId: number;
    seasonStart: number;
    seasonEnd: number;
    selectedBadgesSubgraphUrl?: string;
  }): Promise<BadgeResponse[]> {
    if (!this.provider || !this.signer || !this.badgesCids) {
      throw new Error('Wallet not connected');
    }

    // programmatic badges
    const badgesResponse: BadgeResponse[] = await getSubgraphBadges({
      userId,
      seasonId,
      seasonStart,
      seasonEnd,
      badgesSubgraphUrl: selectedBadgesSubgraphUrl,
    });
    const mapBadges = new Map<string, BadgeResponse>();
    badgesResponse.forEach((entry) => {
      mapBadges.set(entry.id, entry);
    });

    const data = await axios.get(getLeavesIpfsUri(seasonId, this.badgesCids), {
      headers: {
        Accept: 'text/plain',
      },
    });

    const snasphots: Array<{
      owner: string;
      badgeType: number;
      metadataURI: string;
    }> = data.data.snapshot;

    // to speed things up, awarded timestamp
    const subgraphSnapshots: BadgeResponse[] = [];
    snasphots.forEach((entry) => {
      if (entry.owner.toLowerCase() === userId.toLowerCase()) {
        const id = `${entry.owner.toLowerCase()}#${entry.badgeType}#${seasonId}`;
        subgraphSnapshots.push({
          id,
          badgeType: entry.badgeType.toString(),
          awardedTimestampMs:
            mapBadges.get(id)?.awardedTimestampMs || toMillis(seasonEnd - ONE_DAY_IN_SECONDS),
          mintedTimestampMs: mapBadges.get(id)?.mintedTimestampMs || undefined,
        });
      }
    });

    return subgraphSnapshots;
  }

  public async computeSeasonBadges({
    userId,
    seasonId,
    seasonStart,
    seasonEnd,
    selectedBadgesSubgraphUrl,
  }: {
    userId: string;
    seasonId: number;
    seasonStart: number;
    seasonEnd: number;
    selectedBadgesSubgraphUrl?: string;
  }): Promise<BadgeResponse[]> {
    try {
      // programmatic badges
      const badgesResponse: BadgeResponse[] = await getSubgraphBadges({
        userId,
        seasonId,
        seasonStart,
        seasonEnd,
        badgesSubgraphUrl: selectedBadgesSubgraphUrl,
      });

      // referrer badges & non-programatic badges
      let referroorBadges: Record<string, BadgeResponse> = {};
      let nonProgBadges: Record<string, BadgeResponse> = {};
      if (this.nonProgDbUrl) {
        nonProgBadges = await this.getNonProgramaticBadges(
          userId,
          seasonId,
          seasonStart,
          seasonEnd,
        );
      }

      if (this.referralsDbUrl && selectedBadgesSubgraphUrl) {
        referroorBadges = await this.getReferrorBadges(userId, seasonId, selectedBadgesSubgraphUrl);
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
      if (
        selectedBadgesSubgraphUrl &&
        this.subgraphUrl &&
        this.coingeckoKey &&
        DateTime.now().toSeconds() > seasonEnd
      ) {
        const topLpBadge = await this.getTopBadge(
          userId,
          seasonId,
          false,
          seasonStart,
          seasonEnd,
          selectedBadgesSubgraphUrl,
        );
        const topTraderBadge = await this.getTopBadge(
          userId,
          seasonId,
          true,
          seasonStart,
          seasonEnd,
          selectedBadgesSubgraphUrl,
        );
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
    selectedBadgesSubgraphUrl?: string,
  ): Promise<BadgeResponse | undefined> {
    const badgeType = getTopBadgeType(seasonId, !isLP);
    if (!badgeType) return undefined;

    if (!selectedBadgesSubgraphUrl || !this.coingeckoKey || !this.ignoredWalletIds) {
      return undefined;
    }

    if (!this.ethPrice) {
      this.ethPrice = await geckoEthToUsd(this.coingeckoKey);
    }

    const rankResult = await this.getRanking({
      seasonStart,
      seasonEnd,
      isLP,
    });

    for (let rank = 0; rank < 5; rank++) {
      if (!rankResult[rank]) {
        return undefined;
      }
      const entry = rankResult[rank];
      if (entry.address === userId) {
        const badge = await this.constructTopBadge(
          userId,
          seasonId,
          seasonEnd,
          badgeType,
          selectedBadgesSubgraphUrl,
        );
        return badge;
      }
    }

    return undefined;
  }

  public async getRanking(args: GetRankingArgs): Promise<RankType[]> {
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
      isLP: args.isLP ?? false,
    };

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
    selectedBadgesSubgraphUrl?: string,
  ): Promise<BadgeResponse> {
    const badgeQuery = `
            query( $id: String) {
                badge(id: $id){
                    id
                    mintedTimestamp
                }
            }
        `;
    const client = getApolloClient(selectedBadgesSubgraphUrl ?? '');

    const idBadge = `${userId.toLowerCase()}#${badgeType}#${seasonId}`;
    const badgeData = await client.query<{
      badge: SubgraphBadgeResponse;
    }>({
      query: gql(badgeQuery),
      variables: {
        id: idBadge,
      },
    });
    const badge: BadgeResponse = {
      id: `${userId}#${seasonId}#${badgeType}`,
      badgeType,
      awardedTimestampMs: toMillis(seasonEnd),
      mintedTimestampMs: toMillis(
        parseInt(badgeData?.data?.badge ? badgeData.data.badge.mintedTimestamp : '0'),
      ),
    };
    return badge;
  }

  public async getNonProgramaticBadges(
    userId: string,
    seasonId: number,
    seasonStart: number,
    seasonEnd: number,
  ): Promise<Record<string, BadgeResponse>> {
    const badgeResponseRecord: Record<string, BadgeResponse> = {};

    const resp = await axios.get(`${this.nonProgDbUrl}/get-badges/${userId}`);
    if (!resp.data) {
      return badgeResponseRecord;
    }

    const badges: NonProgramaticBadgeResponse[] = resp.data.badges;
    badges.forEach((entry) => {
      const badgeType = NON_PROGRAMATIC_BADGES_VARIANT[seasonId][entry.badge];
      if (
        badgeType &&
        entry.awardedTimestamp <= seasonEnd &&
        entry.awardedTimestamp >= seasonStart
      ) {
        badgeResponseRecord[badgeType] = {
          id: `${userId}#${badgeType}#${seasonId}`,
          badgeType,
          awardedTimestampMs: toMillis(entry.awardedTimestamp),
          mintedTimestampMs: undefined,
        } as BadgeResponse;
      }
    });
    return badgeResponseRecord;
  }

  public async getReferrorBadges(
    userId: string,
    seasonId: number,
    selectedBadgesSubgraphUrl: string,
  ): Promise<Record<string, BadgeResponse>> {
    const badgeResponseRecord: Record<string, BadgeResponse> = {};

    const resp = await axios.get(`${this.referralsDbUrl}/referrals-by/${userId.toLowerCase()}`);
    if (!resp.data) {
      return badgeResponseRecord;
    }
    const referees: string[] = resp.data;
    const lowerCaseReferees = referees.reduce(
      (pV, cV) => [...pV, cV.toLowerCase()],
      [] as Array<string>,
    );

    const refereesQuery = `
            query( $ids: [String], $season: BigInt) {
                seasonUsers( where: {owner_in: $ids, seasonNumber: $season}) {
                    id
                    owner {
                        id
                    }
                    totalWeightedNotionalTraded
                }
            }
        `;

    const client = getApolloClient(selectedBadgesSubgraphUrl ?? '');
    const data = await client.query<{
      seasonUsers: {
        totalWeightedNotionalTraded: string;
        owner: { id: string };
      }[];
    }>({
      query: gql(refereesQuery),
      variables: {
        ids: lowerCaseReferees,
        season: seasonId,
      },
    });

    if (!data?.data?.seasonUsers) {
      throw new Error('Unable to get referees from subgraph');
    }

    let refereesWith100kNotionalTraded = 0;
    let refereesWith2mNotionalTraded = 0;
    for (const seasonUser of data.data.seasonUsers) {
      const totalPointz = parseFloat(seasonUser.totalWeightedNotionalTraded);
      if (totalPointz >= get100KRefereeBenchmark(selectedBadgesSubgraphUrl)) {
        refereesWith100kNotionalTraded++;
        if (totalPointz >= get2MRefereeBenchmark(selectedBadgesSubgraphUrl)) {
          refereesWith2mNotionalTraded++;
        }
      }
    }

    if (refereesWith100kNotionalTraded >= 1) {
      let badgeType = REFERROR_BADGES_VARIANT[seasonId].referror;
      badgeResponseRecord[badgeType] = this.createReferroorBadgeRecord(badgeType, userId, seasonId);
      if (refereesWith100kNotionalTraded >= 10) {
        badgeType = REFERROR_BADGES_VARIANT[seasonId].notionalInfluencer;
        badgeResponseRecord[badgeType] = this.createReferroorBadgeRecord(
          badgeType,
          userId,
          seasonId,
        );
      }
    }
    if (refereesWith2mNotionalTraded >= 5) {
      const badgeType = REFERROR_BADGES_VARIANT[seasonId].whaleWhisperer;
      badgeResponseRecord[badgeType] = this.createReferroorBadgeRecord(badgeType, userId, seasonId);
    }
    return badgeResponseRecord;
  }

  createReferroorBadgeRecord(badgeType: string, userId: string, seasonId: number): BadgeResponse {
    return {
      id: `${userId}#${badgeType}#${seasonId}`,
      badgeType,
      awardedTimestampMs: toMillis(DateTime.now().toSeconds()),
      mintedTimestampMs: undefined,
    } as BadgeResponse;
  }

  public async getUserBalance(user: string): Promise<BigNumber | void> {
    const balance = await this.contract?.balanceOf(user);
    return balance;
  }

  public async getTokenOwner(tokenId: string): Promise<string | void> {
    const owner = await this.contract?.ownerOf(tokenId);
    return owner;
  }

  public async getTotalSupply(): Promise<BigNumber | void> {
    const totalSupply = await this.contract?.totalSupply();
    return totalSupply;
  }

  public async getBadgeStatus(args: GetBadgesStatusArgs): Promise<Array<BadgeWithStatus>> {
    if (!this.signer) {
      throw new Error('No provider found');
    }
    const userAddress = await this.signer.getAddress();
    const network = await this.provider?.getNetwork();
    const networkName = network ? network.name : '';

    const getURL = getEtherscanURL(networkName, args.apiKey, userAddress);
    const resp = await axios.get(getURL);

    if (!resp.data) {
      throw new Error('Etherscan api failed');
    }
    const transactions = resp.data.result;

    // get last 50 transactions, match is redeem and set SUCC/FAILED status
    const txBadges = new Map<number, TxBadgeStatus>();
    for (const transaction of transactions) {
      if (transaction.to.toLowerCase() !== this.contract?.address.toLowerCase()) {
        continue;
      }
      const status =
        transaction.txreceipt_status === 1 ? TxBadgeStatus.SUCCESSFUL : TxBadgeStatus.FAILED;
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
    const selectedBadgesSubgraphUrl = getSelectedSeasonBadgesUrl(
      args.season,
      this.badgesCids,
      this.currentBadgesSubgraphUrl,
      this.nextBadgesSubgraphUrl,
    );
    const subgraphClaimedBadges = await this.claimedBadgesInSubgraph(
      userAddress,
      args.season,
      selectedBadgesSubgraphUrl,
    );

    // final claiming status verdict
    const badgeStatuses = subgraphClaimedBadges.map((badge) => {
      if (badge.claimingStatus === BadgeClaimingStatus.CLAIMED) {
        return badge;
      }
      const txStatus = txBadges.get(badge.badgeType);

      // badge not found in recent successful txs or in potential pending txs
      // meaning their status is desided by the subgraph
      if (!txStatus || txStatus === TxBadgeStatus.FAILED) {
        return {
          badgeType: badge.badgeType,
          claimingStatus: badge.claimingStatus,
        };
      }
      // subgraph is not updated yet
      return {
        badgeType: badge.badgeType,
        claimingStatus: BadgeClaimingStatus.CLAIMING,
      };
    });

    return badgeStatuses;
  }

  async claimedBadgesInSubgraph(
    userAddress: string,
    season: number,
    selectedBadgesSubgraphUrl?: string,
  ): Promise<Array<BadgeWithStatus>> {
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
    const client = getApolloClient(selectedBadgesSubgraphUrl ?? '');
    const id = `${userAddress.toLowerCase()}#${season}`;
    const data = await client.query<{
      badges: SubgraphBadgeResponse[];
    }>({
      query: gql(badgeQuery),
      variables: {
        id,
      },
    });

    const badgesClaimed = new Array<BadgeWithStatus>();
    for (const badge of data.data.badges) {
      badgesClaimed.push({
        badgeType: parseInt(badge.badgeType, 10),
        claimingStatus:
          parseInt(badge.mintedTimestamp, 10) === 0
            ? BadgeClaimingStatus.NOT_CLAIMED
            : BadgeClaimingStatus.CLAIMED, // only from subgraph's perspective
      });
    }

    return badgesClaimed;
  }
}

export default SBT;
