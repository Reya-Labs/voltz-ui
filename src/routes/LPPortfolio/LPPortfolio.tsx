import React, { useState } from 'react';

import { selectors } from '../../app';
import { selectChainId } from '../../app/features/network';
import { useAppSelector } from '../../app/hooks';
import { ConnectWallet } from '../../components/composite/ConnectWallet/ConnectWallet';
import { MintBurnFormModes } from '../../contexts/MintBurnFormContext/MintBurnFormContext';
import { useWallet } from '../../hooks/useWallet';
import { isArbitrumChain } from '../../utilities/network/is-arbitrum-chain';
import { ContentBox, LPPortfolioBox, Split } from './LPPortfolio.styled';
import { LPPositions } from './LPPositions/LPPositions';
import { Optimisers } from './Optimisers/Optimisers';

export const LPPortfolio: React.FunctionComponent = () => {
  const { status } = useWallet();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const hasActiveTransactions = (useAppSelector(selectors.transactionsSelector)?.length || 0) !== 0;
  const chainId = useAppSelector(selectChainId);

  if (status !== 'connected') {
    return (
      <LPPortfolioBox data-testid="LPPortfolio-WalletNotConnected">
        <ConnectWallet
          connectWalletText="CONNECT YOUR WALLET"
          heading="🚫 RESTRICTED"
          subheading="Your wallet needs to be connected before proceeding."
        />
      </LPPortfolioBox>
    );
  }

  return (
    <LPPortfolioBox data-testid="LPPortfolio-WalletConnected">
      <ContentBox data-testid="LPPortfolio-LPPositions-ContentBox">
        <LPPositions formMode={formMode} setFormMode={setFormMode} />
      </ContentBox>
      <ContentBox>
        <Split />
      </ContentBox>
      {isArbitrumChain(chainId) ? null : (
        <ContentBox
          data-testid="LPPortfolio-Optimisers-ContentBox"
          sx={{
            display: Boolean(formMode) || hasActiveTransactions ? 'none' : undefined,
          }}
        >
          <Optimisers />
        </ContentBox>
      )}
    </LPPortfolioBox>
  );
};
