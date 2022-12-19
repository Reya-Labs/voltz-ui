import React, { useState } from 'react';

import { ConnectWallet } from '../../components/composite/ConnectWallet/ConnectWallet';
import { MintBurnFormModes } from '../../contexts/MintBurnFormContext/MintBurnFormContext';
import { useWallet } from '../../hooks/useWallet';
import { ContentBox, LPPortfolioBox, Split } from './LPPortfolio.styled';
import { LPPositions } from './LPPositions/LPPositions';
import { Optimisers } from './Optimisers/Optimisers';

export const LPPortfolio: React.FunctionComponent = () => {
  const { status } = useWallet();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();

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
      <ContentBox>
        <LPPositions formMode={formMode} setFormMode={setFormMode} />
      </ContentBox>
      <ContentBox>
        <Split />
      </ContentBox>
      <ContentBox
        sx={{
          display: Boolean(formMode) ? 'none' : undefined,
        }}
      >
        <Optimisers />
      </ContentBox>
    </LPPortfolioBox>
  );
};
