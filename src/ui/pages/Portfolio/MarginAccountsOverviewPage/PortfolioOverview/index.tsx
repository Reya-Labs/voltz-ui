import React, { useEffect } from 'react';

import { selectChainId } from '../../../../../app/features/network';
import {
  fetchMarginAccountsThunk,
  fetchPortfolioSummaryThunk,
  MARGIN_ACCOUNTS_INITIAL_PAGE,
  MARGIN_ACCOUNTS_PER_PAGE,
} from '../../../../../app/features/portfolio';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';
import { ConnectWallet } from '../../../../components/ConnectWallet';
import { Overview } from './Overview';
import { PortfolioOverviewBox } from './PortfolioOverview.styled';

export const PortfolioOverview: React.FunctionComponent = () => {
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
      fetchMarginAccountsThunk({
        account,
        page: MARGIN_ACCOUNTS_INITIAL_PAGE,
        perPage: MARGIN_ACCOUNTS_PER_PAGE,
        sort: {
          id: 'balance',
          direction: 'descending',
        },
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
    <PortfolioOverviewBox>
      <Overview />
    </PortfolioOverviewBox>
  );
};
