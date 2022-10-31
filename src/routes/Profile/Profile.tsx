import React, { useEffect } from 'react';
import { useCurrentSeason, useWallet } from '@hooks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import { getProfileBadges, GetProfileBadgesResponse } from '@graphql';
import { getENSDetails, setPageTitle } from '@utilities';
import { SEASON_BADGE_VARIANTS } from './helpers';
import usePastSeasons from '../../hooks/season/usePastSeasons';
import { Season } from '../../hooks/season/types';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [achievedBadges, setAchievedBadges] = React.useState<
    GetProfileBadgesResponse['achievedBadges']
  >([]);
  const pastSeasons = usePastSeasons();
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();
  const [season, setSeason] = React.useState<Season>(currentActiveSeason);
  const seasonOptions =
    process.env.REACT_APP_COMMUNITY_P2 && process.env.REACT_APP_COMMUNITY_P2 !== `UNPROVIDED`
      ? [...pastSeasons, currentActiveSeason]
      : [currentActiveSeason];

  const getBadges = async (account: string) => {
    setLoading(true);
    const result = await getProfileBadges(account);
    setAchievedBadges(result.achievedBadges);
    setLoading(false);
  };

  const fetchEnsDetails = async (account: string) => {
    const details = await getENSDetails(account);
    setName(details?.name || account);
  };

  useEffect(() => {
    if (!wallet.account) {
      setLoading(false);
      return;
    }
    void getBadges(wallet.account);
    void fetchEnsDetails(wallet.account);
  }, [wallet.account]);

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
      achievedBadges={achievedBadges}
      loading={loading}
      onSeasonChange={setSeason}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      seasonOptions={seasonOptions}
    />
  );
};

export default Profile;
