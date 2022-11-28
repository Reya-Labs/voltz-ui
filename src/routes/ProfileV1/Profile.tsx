import React, { useEffect } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import { Season } from '../../hooks/season/types';
import {
  SEASON_BADGE_VARIANTS,
  getPhase1Badges,
  GetProfileBadgesResponse1,
} from './getters/getPhase1Badges';
import { useCurrentSeason } from '../../hooks/season/useCurrentSeason';
import { getENSDetails } from '../../utilities/getENSDetails';
import { setPageTitle } from '../../utilities/page';

export const ProfileV1: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [achievedBadges, setAchievedBadges] = React.useState<
    GetProfileBadgesResponse1['achievedBadges']
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentActiveSeason = useCurrentSeason();

  const getBadges = async (account: string, seasonId: Season['id']) => {
    setLoading(true);
    const result = await getPhase1Badges(account);
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
