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
  >(
    SEASON_BADGE_VARIANTS[season.id].reduce(
      (pV, cI) => ({
        ...pV,
        [cI as BadgeVariant]: 'claim',
      }),
      {} as Record<BadgeVariant, ClaimButtonProps['mode']>,
    ),
  );

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
    setClaimButtonModes(
      SEASON_BADGE_VARIANTS[season.id].reduce(
        (pV, cI) => ({
          ...pV,
          [cI as BadgeVariant]: 'claim',
        }),
        {} as Record<BadgeVariant, ClaimButtonProps['mode']>,
      ),
    );
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
    if (!badge?.badgeResponseRaw || !owner || !subgraphAPI) {
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

  const setBulkButtonModes = (variants: BadgeVariant[], mode: ClaimButtonProps['mode']) => {
    setClaimButtonModes((prev) => ({
      ...prev,
      ...variants.reduce(
        (pV, cI) => ({
          ...pV,
          [cI]: mode,
        }),
        {},
      ),
    }));
  };

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
    setBulkButtonModes(variants, 'claiming');
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

      setBulkButtonModes(claimedVariants, 'claimed');
    } catch (err) {
      setClaimButtonBulkMode('claimError');
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
