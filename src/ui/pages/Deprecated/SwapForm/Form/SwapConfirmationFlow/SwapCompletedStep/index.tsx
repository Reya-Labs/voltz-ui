import { Button, Confetti, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, useAppDispatch, useAppSelector } from '../../../../../../../app';
import {
  closeSwapConfirmationFlowAction,
  selectSwapConfirmationFlowEtherscanLink,
} from '../../../../../../../app/features/forms/trader/deprecated/swap';
import { resetPortfolioStateAction } from '../../../../../../../app/features/portfolio';
import { ExplorerLink } from '../../../../../../components/ExplorerLink';
import { SwapDetails } from '../SwapDetails';
import { SwapCompletedStepBox } from './SwapCompletedStep.styled';

export const SwapCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectSwapConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  return (
    <SwapCompletedStepBox>
      <Confetti>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Swap Completed
        </Typography>
      </Confetti>
      <SwapDetails />
      <Confetti>
        <ExplorerLink link={etherscanLink} />
      </Confetti>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Your position will be available in few minutes. You can track it from your your portfolio.
      </Typography>
      <Confetti>
        <Button variant="primary" onClick={handleVisitPortfolio}>
          Visit Your Portfolio
        </Button>
      </Confetti>
    </SwapCompletedStepBox>
  );
};
