import React, { useEffect } from 'react';

import { selectChainId } from '../../../../../app/features/network';
import {
  fetchPortfolioMarginAccountsThunk,
  fetchPortfolioSummaryThunk,
} from '../../../../../app/features/portfolio';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';
import { ConnectWallet } from '../../../../components/ConnectWallet';
import { Positions } from '../Positions';
import { PortfolioPositionsBox } from './PortfolioPositions.styled';

export const PortfolioPositions: React.FunctionComponent = () => {
  const { account, signer } = useWallet();
  const chainId = useAppSelector(selectChainId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (!account) {
      return;
    }
    void dispatch(
      fetchPortfolioSummaryThunk({
        account,
      }),
    );
    void dispatch(
      fetchPortfolioMarginAccountsThunk({
        account,
      }),
    );
  }, [account, chainId, dispatch]);

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
