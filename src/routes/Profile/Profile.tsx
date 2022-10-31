import React, { useEffect } from 'react';
import { useCurrentSeason, useWallet } from '@hooks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import { getProfileBadges, GetProfileBadgesResponse } from '@graphql';
import { getENSDetails, setPageTitle } from '@utilities';
import { Season } from '../../hooks/useCurrentSeason/constants';
import { SEASON_BADGE_VARIANTS } from './helpers';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [achievedBadges, setAchievedBadges] = React.useState<
    GetProfileBadgesResponse['achievedBadges']
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();
  const [season] = React.useState<Season>(currentActiveSeason);

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
      seasonLabel={season.label}
      seasonStartDateFormatted={season.startDate.toFormat('DDD')}
      seasonEndDateFormatted={season.endDate.toFormat('DDD')}
      account={name}
      achievedBadges={achievedBadges}
      loading={loading}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
    />
  );
};

export default Profile;
