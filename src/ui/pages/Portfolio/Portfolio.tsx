import React from 'react';

import { selectChainId } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { ConnectWallet } from '../../components/ConnectWallet';

export const Portfolio: React.FunctionComponent = () => {
  const chainId = useAppSelector(selectChainId);

  if (!chainId) {
    return null;
  }

  return <ConnectWallet heading="Welcome to the Voltz Portfolio" subheading="Hi" />;
};
