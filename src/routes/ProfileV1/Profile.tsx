import React, { useEffect } from 'react';
import { useCurrentSeason, useWallet } from '@hooks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import { GetProfileBadgesResponse, SEASON_BADGE_VARIANTS, getPhase1Badges } from '@graphql';
import { getENSDetails, setPageTitle } from '@utilities';
import { Season } from '../../hooks/season/types';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [achievedBadges, setAchievedBadges] = React.useState<GetProfileBadgesResponse>([]);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();

  const getBadges = async (account: string, seasonId: Season['id']) => {
    setLoading(true);
    const result = await getPhase1Badges( account);
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
    void getBadges(wallet.account, currentActiveSeason.id);
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
      season={currentActiveSeason}
      account={name}
      achievedBadges={achievedBadges}
      loading={loading}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[currentActiveSeason.id]}
    />
  );
};

export default Profile;
