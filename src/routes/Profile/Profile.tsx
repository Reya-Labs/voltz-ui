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
import { CommunitySBT } from '@voltz-protocol/v1-sdk';
import { getClaimButtonModesForVariants } from './helpers';
import { DateTime } from 'luxon';

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
    const notClaimedVariants = SEASON_BADGE_VARIANTS[season.id].filter((badgeVariant) =>
      result!.find(({ claimedAt, variant }) => variant === badgeVariant && !claimedAt),
    );
    setClaimButtonModes((p) => ({
      ...p,
      ...getClaimButtonModesForVariants(notClaimedVariants as BadgeVariant[], 'claim'),
      ...getClaimButtonModesForVariants(claimedTodayVariants as BadgeVariant[], 'claimed'),
      ...getClaimButtonModesForVariants(claimedInThePastVariants as BadgeVariant[], 'claimedDate'),
    }));
  };

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
      await communitySBT.redeemSbt(
        parseInt(badge.badgeResponseRaw.badgeType, 10),
        owner,
        parseInt(badge.badgeResponseRaw.awardedTimestamp, 10),
        subgraphAPI,
      );

      setClaimButtonModes((prev) => ({
        ...prev,
        [variant]: 'claimed',
      }));
      setCollectionBadges((prev) => {
        return prev.map((b) => ({
          ...b,
          claimedAt: b.variant === variant ? Date.now().valueOf() : b.claimedAt,
        }));
      });
    } catch (err) {
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
      const response = await communitySBT.redeemMultipleSbts(
        badges.map((badge) => ({
          badgeType: parseInt(badge.badgeResponseRaw!.badgeType, 10),
          awardedTimestamp: parseInt(badge.badgeResponseRaw!.awardedTimestamp, 10),
        })),
        owner,
        subgraphAPI,
      );
      const claimedVariants = response.claimedBadgeTypes
        .map((bT) => {
          const badge = collectionBadges.find(
            (b) => b.badgeResponseRaw && parseInt(b.badgeResponseRaw?.badgeType, 10) === bT,
          );
          return badge?.variant as BadgeVariant;
        })
        .filter((v) => v);

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
      isOnGoingSeason={season.id === currentActiveSeason.id}
      season={season}
      account={name}
      achievedBadges={collectionBadges}
      loading={loading}
      onSeasonChange={(newSeason) => {
        setSeason(newSeason);
        setClaimButtonBulkMode('claim');
      }}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      seasonOptions={[...pastSeasons, currentActiveSeason]}
      claimButtonBulkMode={claimButtonBulkMode}
      claimButtonModes={claimButtonModes}
      onClaimButtonClick={handleOnClaimButtonClick}
      onClaimBulkClick={handleOnClaimBulkClick}
    />
  );
};

export default Profile;
