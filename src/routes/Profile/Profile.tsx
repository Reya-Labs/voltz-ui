import React, { useEffect, useState } from 'react';
import { useCurrentSeason, usePastSeasons, useWallet } from '@hooks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import {
  BadgeVariant,
  GetProfileBadgesResponse,
  getSeasonBadges,
  getSeasonUserId,
  SEASON_BADGE_VARIANTS,
} from '@graphql';
import { getENSDetails, setPageTitle } from '@utilities';
import { Season } from '../../hooks/season/types';
import { ClaimButtonProps } from './ClaimButton/ClaimButton';
import { getCacheValue, invalidateCache, setCacheValue } from './cache';
import { getClaimButtonModesForVariants } from './helpers';
import { DateTime } from 'luxon';
import { CopyLinkButtonProps } from './CopyLinkButton/CopyLinkButton';

import { CommunitySBT, BadgeClaimingStatus } from '@voltz-protocol/v1-sdk';
import { deleteFromStorage, getFromStorage, getId, setToStorage } from './claim-status-storage';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [collectionBadges, setCollectionBadges] = React.useState<GetProfileBadgesResponse>([]);
  const pastSeasons = usePastSeasons();
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();
  const [season, setSeason] = React.useState<Season>(currentActiveSeason);

  const [claimButtonBulkMode, setClaimButtonBulkMode] = useState<ClaimButtonProps['mode']>('claim');
  const [claimButtonModes, setClaimButtonModes] = useState<
    Record<BadgeVariant, ClaimButtonProps['mode']>
  >(getClaimButtonModesForVariants(SEASON_BADGE_VARIANTS[season.id] as BadgeVariant[], 'claim'));

  const [copyLinkButtonMode, setCopyLinkButtonMode] = useState<CopyLinkButtonProps['mode']>('copy');
  const isOnGoingSeason = season.id === currentActiveSeason.id;

  const fetchBadges = async (seasonId: Season['id'], account: string) => {
    return await getSeasonBadges({
      userId: account,
      seasonId,
    });
  };

  const getBadges = async (seasonId: Season['id'], account: string) => {
    const seasonUserId = getSeasonUserId(account, seasonId);
    let result = getCacheValue(seasonUserId);

    if (!result) {
      setLoading(true);
      result = await fetchBadges(seasonId, account);
      setCacheValue(seasonUserId, result);
      setLoading(false);
    }
    setCollectionBadges(result);
    setClaimButtonBulkMode('claim');
    const claimedTodayVariants = SEASON_BADGE_VARIANTS[season.id].filter((badgeVariant) =>
      result!.find(
        ({ claimedAt, variant }) =>
          variant === badgeVariant &&
          claimedAt &&
          DateTime.now().startOf('day').valueOf() <= claimedAt &&
          claimedAt <= DateTime.now().endOf('day').valueOf(),
      ),
    );
    const claimedInThePastVariants = SEASON_BADGE_VARIANTS[season.id].filter((badgeVariant) =>
      result!.find(
        ({ claimedAt, variant }) =>
          variant === badgeVariant &&
          claimedAt &&
          claimedAt < DateTime.now().startOf('day').valueOf(),
      ),
    );
    let notClaimedVariants = SEASON_BADGE_VARIANTS[season.id].filter((badgeVariant) =>
      result!.find(({ claimedAt, variant }) => variant === badgeVariant && !claimedAt),
    );
    const claimingVariants: BadgeVariant[] = [];

    // check with SDK if some of them are claimed or claiming is in progress
    const notClaimedInStorage = notClaimedVariants.filter((nCB) =>
      getFromStorage(getId(account, nCB)),
    );
    if (!isOnGoingSeason && notClaimedInStorage.length !== 0) {
      const badgeTypes = [];
      for (const notClaimedVariant of notClaimedInStorage) {
        const badgeType = result.find((b) => b.variant === notClaimedVariant)?.badgeResponseRaw
          ?.badgeType;
        if (badgeType) {
          badgeTypes.push(badgeType);
        }
      }
      if (badgeTypes.length !== 0) {
        const params = getSDKInitParams();
        if (
          params &&
          process.env.REACT_APP_ETHERSCAN_API_KEY &&
          process.env.REACT_APP_SUBGRAPH_BADGES_URL
        ) {
          try {
            const communitySBT = new CommunitySBT(params);
            const claimingStatuses =
              (await communitySBT.getBadgeStatus({
                apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY,
                subgraphUrl: process.env.REACT_APP_SUBGRAPH_BADGES_URL,
                season: season.id,
                potentialClaimingBadgeTypes: badgeTypes.map((bT) => parseInt(bT, 10)),
              })) || [];
            for (const claimStatus of claimingStatuses) {
              const badgeVariant = result.find(
                (b) =>
                  parseInt(b.badgeResponseRaw?.badgeType || '-1', 10) === claimStatus.badgeType,
              )?.variant;
              if (!badgeVariant) {
                continue;
              }
              if (claimStatus.claimingStatus === BadgeClaimingStatus.CLAIMING) {
                notClaimedVariants = notClaimedVariants.filter((v) => v !== badgeVariant);
                claimingVariants.push(badgeVariant);
              }
              if (claimStatus.claimingStatus === BadgeClaimingStatus.CLAIMED) {
                notClaimedVariants = notClaimedVariants.filter((v) => v !== badgeVariant);
                claimedTodayVariants.push(badgeVariant);
                deleteFromStorage(getId(account, badgeVariant));
              }
              if (claimStatus.claimingStatus === BadgeClaimingStatus.NOT_CLAIMED) {
                deleteFromStorage(getId(account, badgeVariant));
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    setClaimButtonModes((p) => ({
      ...p,
      ...getClaimButtonModesForVariants(notClaimedVariants as BadgeVariant[], 'claim'),
      ...getClaimButtonModesForVariants(claimedTodayVariants as BadgeVariant[], 'claimed'),
      ...getClaimButtonModesForVariants(claimedInThePastVariants as BadgeVariant[], 'claimedDate'),
      ...getClaimButtonModesForVariants(claimingVariants, 'claiming'),
    }));
  };
  const isClaimingInProgress = () =>
    Object.values(claimButtonModes).some((bM) => bM === 'claiming');
  const fetchEnsDetails = async (account: string) => {
    const details = await getENSDetails(account);
    setName(details?.name || account);
  };

  const getSDKInitParams = () => {
    if (!process.env.REACT_APP_COMMUNITY_SBT_ADDRESS || !Boolean(wallet.signer)) {
      return undefined;
    }
    return {
      id: process.env.REACT_APP_COMMUNITY_SBT_ADDRESS,
      signer: wallet.signer,
    };
  };

  async function handleOnClaimButtonClick(variant: BadgeVariant) {
    if (claimButtonBulkMode === 'claiming') {
      return;
    }
    const params = getSDKInitParams();
    if (!params) {
      return;
    }
    const badge = collectionBadges.find((b) => b.variant === variant);
    const subgraphAPI = process.env.REACT_APP_SUBGRAPH_BADGES_URL;
    const owner = wallet.account;
    if (!badge?.badgeResponseRaw || badge.claimedAt || !owner || !subgraphAPI) {
      return;
    }
    const communitySBT = new CommunitySBT(params);
    setClaimButtonModes((prev) => ({
      ...prev,
      [variant]: 'claiming',
    }));
    try {
      setToStorage(getId(owner, badge.variant));
      await communitySBT.redeemSbt(
        parseInt(badge.badgeResponseRaw.badgeType, 10),
        owner,
        parseInt(badge.badgeResponseRaw.awardedTimestamp, 10),
        subgraphAPI,
      );
      deleteFromStorage(getId(owner, badge.variant));

      setClaimButtonModes((prev) => ({
        ...prev,
        [variant]: 'claimed',
      }));
      const nextCollectionBadges = collectionBadges.map((b) => ({
        ...b,
        claimedAt: b.variant === variant ? Date.now().valueOf() : b.claimedAt,
      }));
      const seasonUserId = getSeasonUserId(wallet.account || '', season.id);
      setCollectionBadges(nextCollectionBadges);
      setCacheValue(seasonUserId, nextCollectionBadges);
    } catch (err) {
      deleteFromStorage(getId(owner, badge.variant));
      setClaimButtonModes((prev) => ({
        ...prev,
        [variant]: 'claimError',
      }));
    }
  }

  async function handleOnClaimBulkClick(variants: BadgeVariant[]) {
    const params = getSDKInitParams();
    if (!params) {
      return;
    }
    if (isClaimingInProgress()) {
      return;
    }
    const badges = collectionBadges.filter(
      (b) => !b.claimedAt && variants.find((v) => v === b.variant),
    );
    const subgraphAPI = process.env.REACT_APP_SUBGRAPH_BADGES_URL;
    const owner = wallet.account;
    if (!badges.length || !owner || !subgraphAPI) {
      return;
    }
    const communitySBT = new CommunitySBT(params);
    setClaimButtonBulkMode('claiming');
    setClaimButtonModes((p) => ({
      ...p,
      ...getClaimButtonModesForVariants(variants, 'claiming'),
    }));
    try {
      badges.forEach((badge) => {
        setToStorage(getId(owner, badge.variant));
      });
      const response = await communitySBT.redeemMultipleSbts(
        badges.map((badge) => ({
          badgeType: parseInt(badge.badgeResponseRaw!.badgeType, 10),
          awardedTimestamp: parseInt(badge.badgeResponseRaw!.awardedTimestamp, 10),
        })),
        owner,
        subgraphAPI,
      );
      badges.forEach((badge) => {
        deleteFromStorage(getId(owner, badge.variant));
      });
      const claimedVariants = response.claimedBadgeTypes
        .map((bT) => {
          const badge = collectionBadges.find(
            (b) => b.badgeResponseRaw && parseInt(b.badgeResponseRaw?.badgeType, 10) === bT,
          );
          return badge?.variant as BadgeVariant;
        })
        .filter((v) => v);

      const nextCollectionBadges = collectionBadges.map((b) => ({
        ...b,
        claimedAt: claimedVariants.indexOf(b.variant) !== -1 ? Date.now().valueOf() : b.claimedAt,
      }));
      const seasonUserId = getSeasonUserId(wallet.account || '', season.id);
      setCollectionBadges(nextCollectionBadges);
      setCacheValue(seasonUserId, nextCollectionBadges);
      setClaimButtonBulkMode(claimedVariants.length === variants.length ? 'claimed' : 'claim');
      setClaimButtonModes((p) => ({
        ...p,
        ...getClaimButtonModesForVariants(claimedVariants, 'claimed'),
      }));
    } catch (err) {
      setClaimButtonBulkMode('claimError');
      setClaimButtonModes((p) => ({
        ...p,
        ...getClaimButtonModesForVariants(variants, 'claimError'),
      }));
      badges.forEach((badge) => {
        deleteFromStorage(getId(owner, badge.variant));
      });
    }
  }

  function handleOnCopyLinkButtonClick() {
    // todo: implement logic for fetching the referrer link
    setCopyLinkButtonMode('copying');
    try {
      setTimeout(() => {
        setCopyLinkButtonMode('copied');
        setTimeout(() => {
          setCopyLinkButtonMode('copy');
        }, 1500);
      }, 3000);
    } catch (e) {
      setCopyLinkButtonMode('copyError');
    }
  }
  useEffect(() => {
    if (!wallet.account) {
      return;
    }
    void fetchEnsDetails(wallet.account);
    invalidateCache();
  }, [wallet.account]);

  useEffect(() => {
    if (!wallet.account) {
      setLoading(false);
      return;
    }
    void getBadges(season.id, wallet.account);
  }, [season.id, wallet.account]);

  useEffect(() => {
    setPageTitle('Profile', wallet.account);
    invalidateCache();
  }, []);

  if (!wallet.account) {
    return <ProfilePageNoWallet />;
  }

  return (
    <ProfilePageWalletConnected
      isOnGoingSeason={isOnGoingSeason}
      season={season}
      account={name}
      achievedBadges={collectionBadges}
      loading={loading}
      onSeasonChange={(newSeason) => {
        if (claimButtonBulkMode === 'claiming' || isClaimingInProgress()) {
          return;
        }
        setSeason(newSeason);
        setClaimButtonBulkMode('claim');
      }}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      seasonOptions={[...pastSeasons, currentActiveSeason]}
      claimButtonBulkMode={claimButtonBulkMode}
      claimButtonModes={claimButtonModes}
      onClaimButtonClick={handleOnClaimButtonClick}
      onClaimBulkClick={handleOnClaimBulkClick}
      copyLinkButtonMode={copyLinkButtonMode}
      onCopyLinkButtonClick={handleOnCopyLinkButtonClick}
    />
  );
};

export default Profile;
