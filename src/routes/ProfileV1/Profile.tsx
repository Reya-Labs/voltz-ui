import React, { useEffect } from 'react';

import { Season } from '../../hooks/season/types';
import { useCurrentSeason } from '../../hooks/season/useCurrentSeason';
import { useWallet } from '../../hooks/useWallet';
import { getENSDetails } from '../../utilities/getENSDetails';
import { setPageTitle } from '../../utilities/page';
import {
  getPhase1Badges,
  GetProfileBadgesResponse1,
  SEASON_BADGE_VARIANTS,
} from './getters/getPhase1Badges';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';

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
      account={name}
      achievedBadges={achievedBadges}
      loading={loading}
      season={currentActiveSeason}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[currentActiveSeason.id]}
    />
  );
};
