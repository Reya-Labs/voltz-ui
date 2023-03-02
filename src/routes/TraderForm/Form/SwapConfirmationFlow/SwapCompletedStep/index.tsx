import { Button, ExternalLink, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  closeSwapConfirmationFlowAction,
  selectSwapConfirmationFlowEtherscanLink,
} from '../../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../paths';
import { SwapDetails } from '../SwapDetails';
import { SwapCompletedStepBox } from './SwapCompletedStep.styled';

export const SwapCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectSwapConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
    navigate(`/${routes.TRADER_PORTFOLIO}`);
  }, [dispatch, navigate]);
  return (
    <SwapCompletedStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Swap Completed
      </Typography>
      <SwapDetails />
      <ExternalLink
        colorToken="lavenderWeb"
        href={etherscanLink}
        typographyToken="primaryBodyXSmallRegular"
      >
        Open transaction on Etherscan
      </ExternalLink>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Your position will be available in few minutes. You can track it from your your portfolio.
      </Typography>
      <Button variant="primary" onClick={handleVisitPortfolio}>
        Visit Your Portfolio
      </Button>
    </SwapCompletedStepBox>
  );
};
