import React from 'react';
import { useWallet } from '@hooks';
import { claimedBadges } from './mocks';
import { ProfilePageNoWallet } from './ProfilePageNoWallet/ProfilePageNoWallet';
import { ProfilePageWalletConnected } from './ProfilePageWalletConnected/ProfilePageWalletConnected';

const Profile: React.FunctionComponent = () => {
  const wallet = useWallet();
  if (!wallet.account) {
    return <ProfilePageNoWallet />;
  }
  return <ProfilePageWalletConnected account={wallet.account} claimedBadges={claimedBadges} />;
};

export default Profile;
