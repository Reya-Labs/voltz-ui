import React from 'react';

import { ConnectWallet } from '../../components/composite/ConnectWallet/ConnectWallet';
import { useWallet } from '../../hooks/useWallet';
import { LPPortfolioBox } from './LPPortfolio.styled';
import { LPPositions } from './LPPositions/LPPositions';

export const LPPortfolio: React.FunctionComponent = () => {
  const { status } = useWallet();

  if (status !== 'connected') {
    return (
      <LPPortfolioBox>
        <ConnectWallet
          connectWalletText="CONNECT YOUR WALLET"
          heading="🚫 RESTRICTED"
          subheading="Your wallet needs to be connected before proceeding."
        />
      </LPPortfolioBox>
    );
  }

  return (
    <LPPortfolioBox>
      <LPPositions />
    </LPPortfolioBox>
  );
};
