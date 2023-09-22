import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import { selectChainId } from '../../../../../app/features/network';
import {
  fetchMarginAccountPositionsThunk,
  fetchMarginAccountSummaryThunk,
  selectPositionsLoadedState,
} from '../../../../../app/features/portfolio';
import { ConnectWallet } from '../../../../components/ConnectWallet';
import { useWallet } from '../../../../hooks/useWallet';
import { MarginAccountSummaryHeader } from '../MarginAccountSummaryHeader';
import { Positions } from '../Positions';
import { DetailsBox, WrapperBox } from './Details.styled';

export const DetailsPage: React.FunctionComponent = () => {
  const { marginAccountId } = useParams();
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
    if (!marginAccountId) {
      return;
    }
    if (positionsLoadedState === 'succeeded') {
      return;
    }
    void dispatch(
      fetchMarginAccountSummaryThunk({
        account,
        marginAccountId,
      }),
    );
    void dispatch(
      fetchMarginAccountPositionsThunk({
        id: marginAccountId,
      }),
    );
  }, [positionsLoadedState, marginAccountId, account, chainId, dispatch]);
  if (!chainId) {
    return null;
  }

  if (!account || !signer || !marginAccountId) {
    return (
      <ConnectWallet
        heading="Welcome to the your Portfolio"
        subheading="Please connect your wallet"
      />
    );
  }

  return (
    <DetailsBox>
      <WrapperBox>
        <MarginAccountSummaryHeader />
        <Positions />
      </WrapperBox>
    </DetailsBox>
  );
};
