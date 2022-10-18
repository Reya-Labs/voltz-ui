import React from 'react';
import { useWallet } from '@hooks';
import { claimedBadges, collectionBadges } from './mocks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  if (!wallet.account) {
    return <ProfilePageNoWallet />;
  }
  return (
    <ProfilePageWalletConnected
      season={'1'}
      account={wallet.account}
      claimedBadges={claimedBadges}
      collection={collectionBadges}
      loading={true}
    />
  );
};

export default Profile;
