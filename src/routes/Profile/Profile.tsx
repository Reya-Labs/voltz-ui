import React, { useEffect } from 'react';
import { useCurrentSeason, useWallet } from '@hooks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';
import { getProfileBadges, GetProfileBadgesResponse } from '@graphql';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [claimedBadges, setClaimedBadges] = React.useState<
    GetProfileBadgesResponse['claimedBadges']
  >([]);
  const [collectionBadges, setCollectionBadges] = React.useState<
    GetProfileBadgesResponse['achievedBadges']
  >([]);
  const [loading, setLoading] = React.useState(true);
  const season = useCurrentSeason();

  const getBadges = async (account: string) => {
    setLoading(true);
    const result = await getProfileBadges(account);
    setClaimedBadges(result.claimedBadges);
    setCollectionBadges(result.achievedBadges);
    setLoading(false);
  };

  useEffect(() => {
    if (!wallet.account) {
      setLoading(false);
      return;
    }
    void getBadges(wallet.account);
  }, [wallet.account]);

  if (!wallet.account) {
    return <ProfilePageNoWallet />;
  }
  return (
    <ProfilePageWalletConnected
      season={season.id.toString().padStart(2, '0')}
      account={wallet.account}
      claimedBadges={claimedBadges}
      collection={collectionBadges}
      loading={loading}
    />
  );
};

export default Profile;
