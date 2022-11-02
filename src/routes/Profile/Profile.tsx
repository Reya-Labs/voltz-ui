import React, { useEffect } from 'react';
import { useCurrentSeason, useWallet } from '@hooks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import { getSeasonBadges, GetProfileBadgesResponse } from '@graphql';
import { getENSDetails, setPageTitle } from '@utilities';
import { SEASON_BADGE_VARIANTS } from './helpers';
import usePastSeasons from '../../hooks/season/usePastSeasons';
import { Season } from '../../hooks/season/types';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [collectionBadges, setCollectionBadges] = React.useState<GetProfileBadgesResponse>([]);
  const pastSeasons = usePastSeasons();
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();
  const [season, setSeason] = React.useState<Season>(currentActiveSeason);
  const seasonOptions =
    process.env.REACT_APP_COMMUNITY_P2 && process.env.REACT_APP_COMMUNITY_P2 !== `UNPROVIDED`
      ? [...pastSeasons, currentActiveSeason]
      : [currentActiveSeason];

  const getBadges = async (seasonId: Season['id'], account: string) => {
    setLoading(true);
    const result = await getSeasonBadges(account, seasonId);
    setCollectionBadges(result);
    setLoading(false);
  };

  const fetchEnsDetails = async (account: string) => {
    const details = await getENSDetails(account);
    setName(details?.name || account);
  };

  useEffect(() => {
    if (!wallet.account) {
      return;
    }
    void fetchEnsDetails(wallet.account);
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
      onSeasonChange={setSeason}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      seasonOptions={seasonOptions}
      claimButtonBulkMode="claim"
    />
  );
};

export default Profile;
