import React, { useEffect, useState } from 'react';
import { useCurrentSeason, useWallet } from '@hooks';
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
import usePastSeasons from '../../hooks/season/usePastSeasons';
import { Season } from '../../hooks/season/types';
import { ClaimButtonProps } from './ClaimButton/ClaimButton';
import { getCacheValue, invalidateCache, setCacheValue } from './cache';

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

  // mocking utils
  function handleOnClaimButtonClick(variant: BadgeVariant) {
    setClaimButtonModes((prev) => ({
      ...prev,
      [variant]: 'claiming',
    }));
    // fake minting
    setTimeout(() => {
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
    }, 1500);
  }

  function handleOnClaimBulkClick(variants: BadgeVariant[]) {
    setClaimButtonBulkMode('claiming');
    variants.forEach((v) => handleOnClaimButtonClick(v));
  }
  // end of mocking utils

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
