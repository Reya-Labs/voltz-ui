import React, { useEffect } from 'react';

import { selectChainId } from '../../../../../app/features/network';
import {
  initialisePortfolioPositionsThunk,
  selectPositionsLoadedState,
} from '../../../../../app/features/portfolio';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { ConnectWallet } from '../../../../components/ConnectWallet';
import { useWallet } from '../../../../hooks/useWallet';
import { Positions } from '../Positions';
import { PortfolioPositionsBox } from './PortfolioPositions.styled';

export const PortfolioPositions: React.FunctionComponent = () => {
  const { account, signer } = useWallet();
  const chainId = useAppSelector(selectChainId);
  const positionsLoadedState = useAppSelector(selectPositionsLoadedState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (!account) {
      return;
    }
    if (positionsLoadedState === 'succeeded') {
      return;
    }
    void dispatch(
      initialisePortfolioPositionsThunk({
        account,
      }),
    );
  }, [positionsLoadedState, account, chainId, dispatch]);
  if (!chainId) {
    return null;
  }

  if (!account || !signer) {
    return (
      <ConnectWallet
        heading="Welcome to the your Portfolio"
        subheading="Please connect your wallet"
      />
    );
  }

  return (
    <PortfolioPositionsBox>
      <Positions />
    </PortfolioPositionsBox>
  );
};
