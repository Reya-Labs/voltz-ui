import copy from 'copy-to-clipboard';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

import { selectChainId } from '../../app/features/network';
import { useAppSelector } from '../../app/hooks';
import { ConnectWallet } from '../../components/composite/ConnectWallet/ConnectWallet';
import { Season } from '../../hooks/season/types';
import { useCurrentSeason } from '../../hooks/season/useCurrentSeason';
import { usePastSeasons } from '../../hooks/season/usePastSeasons';
import { useWallet } from '../../hooks/useWallet';
import { getENSDetails } from '../../utilities/getENSDetails';
import { setPageTitle } from '../../utilities/page';
import { getSentryTracker } from '../../utilities/sentry';
import { ClaimButtonProps } from './components/ClaimButton/ClaimButton';
import { CopyLinkButtonProps } from './components/CopyLinkButton/CopyLinkButton';
import { ProfilePageWalletConnected } from './components/ProfilePageWalletConnected/ProfilePageWalletConnected';
import {
  BadgeVariant,
  GetProfileBadgesResponse,
  getSeasonBadges,
  SEASON_BADGE_VARIANTS,
} from './data/getSeasonBadges';
import { getCacheValue, invalidateCache, setCacheValue } from './data/getSeasonBadges/cache';
import { getReferrerLink } from './get-referrer-link';
import { getClaimButtonModesForVariants, getCommunitySbt, getSeasonUserId } from './helpers';

export const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [collectionBadges, setCollectionBadges] = React.useState<GetProfileBadgesResponse>([]);
  const pastSeasons = usePastSeasons();
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();
  const [season, setSeason] = React.useState<Season>(currentActiveSeason);

  const chainId = useAppSelector(selectChainId);

  const [claimButtonBulkMode, setClaimButtonBulkMode] = useState<ClaimButtonProps['mode']>('claim');
  const [claimButtonModes, setClaimButtonModes] = useState<
    Record<BadgeVariant, ClaimButtonProps['mode']>
  >(getClaimButtonModesForVariants(SEASON_BADGE_VARIANTS[season.id] as BadgeVariant[], 'claim'));

  const [copyLinkButtonMode, setCopyLinkButtonMode] = useState<CopyLinkButtonProps['mode']>('copy');

  const fetchBadges = async (account: string) => {
    const sbt = getCommunitySbt(wallet.signer, chainId);
    return await getSeasonBadges({
      userId: account,
      season: season,
      sbt: sbt,
    });
  };

  const getBadges = async (seasonId: Season['id'], account: string) => {
    const seasonUserId = getSeasonUserId(account, seasonId);
    let result = getCacheValue(seasonUserId);

    if (!result) {
      setLoading(true);
      result = await fetchBadges(account);
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
  const isClaimingInProgress = () =>
    Object.values(claimButtonModes).some((bM) => bM === 'claiming');
  const fetchEnsDetails = async (account: string) => {
    const details = await getENSDetails(account);
    setName(details?.name || account);
  };

  async function handleOnClaimButtonClick(variant: BadgeVariant) {
    if (claimButtonBulkMode === 'claiming') {
      return;
    }
    const badge = collectionBadges.find((b) => b.variant === variant);
    const owner = wallet.account;
    if (!badge?.badgeResponseRaw?.awardedTimestampMs || badge.claimedAt || !owner) {
      return;
    }
    const communitySBT = getCommunitySbt(wallet.signer, chainId);
    setClaimButtonModes((prev) => ({
      ...prev,
      [variant]: 'claiming',
    }));
    try {
      await communitySBT.redeemSbt(
        badge.badgeResponseRaw.badgeType,
        owner,
        season.id,
        badge.badgeResponseRaw.awardedTimestampMs,
      );

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
    } catch (error) {
      getSentryTracker().captureException(error);
      setClaimButtonModes((prev) => ({
        ...prev,
        [variant]: 'claimError',
      }));
    }
  }

  async function handleOnClaimBulkClick(variants: BadgeVariant[]) {
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
    const communitySBT = getCommunitySbt(wallet.signer, chainId);
    setClaimButtonBulkMode('claiming');
    setClaimButtonModes((p) => ({
      ...p,
      ...getClaimButtonModesForVariants(variants, 'claiming'),
    }));
    try {
      const response = await communitySBT.redeemMultipleSbts(
        badges.map((badge) => ({
          badgeType: badge.badgeResponseRaw!.badgeType,
          awardedTimestamp: badge.badgeResponseRaw!.awardedTimestampMs || 0,
        })),
        owner,
        season.id,
      );
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
    } catch (error) {
      getSentryTracker().captureException(error);
      setClaimButtonBulkMode('claimError');
      setClaimButtonModes((p) => ({
        ...p,
        ...getClaimButtonModesForVariants(variants, 'claimError'),
      }));
    }
  }

  async function handleOnCopyLinkButtonClick() {
    if (!wallet.account) {
      return;
    }
    setCopyLinkButtonMode('copying');
    const link = await getReferrerLink(wallet.account);
    if (!link) {
      setCopyLinkButtonMode('copyError');
      return;
    }
    try {
      copy(link);
      setCopyLinkButtonMode('copied');
      setTimeout(() => {
        setCopyLinkButtonMode('copy');
      }, 1500);
    } catch (error) {
      getSentryTracker().captureException(error);
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
    return (
      <ConnectWallet
        connectWalletText="CONNECT YOUR WALLET TO SEE YOUR BADGE COLLECTION"
        heading="WELCOME TO VOLTZ COMMUNITY"
        subheading="Please connect your wallet"
      />
    );
  }

  return (
    <ProfilePageWalletConnected
      account={name}
      badges={collectionBadges}
      claimButtonBulkMode={claimButtonBulkMode}
      claimButtonModes={claimButtonModes}
      copyLinkButtonMode={copyLinkButtonMode}
      isOnGoingSeason={season.id === currentActiveSeason.id}
      loading={loading}
      season={season}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      seasonOptions={[...pastSeasons, currentActiveSeason]}
      onClaimBulkClick={handleOnClaimBulkClick}
      onClaimButtonClick={handleOnClaimButtonClick}
      onCopyLinkButtonClick={handleOnCopyLinkButtonClick}
      onSeasonChange={(newSeason) => {
        if (claimButtonBulkMode === 'claiming' || isClaimingInProgress()) {
          return;
        }
        setSeason(newSeason);
        setClaimButtonBulkMode('claim');
      }}
    />
  );
};
