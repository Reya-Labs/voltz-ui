import { Button, Confetti, ExternalLink, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  closeSwapConfirmationFlowAction,
  selectSwapConfirmationFlowEtherscanLink,
} from '../../../../../../app/features/forms/trader/swap';
import { resetPortfolioStateAction } from '../../../../../../app/features/portfolio';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { routes } from '../../../../../../routes/paths';
import { isPortfolioNextEnabled } from '../../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { SwapDetails } from '../SwapDetails';
import { SwapCompletedStepBox } from './SwapCompletedStep.styled';

export const SwapCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectSwapConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    if (isPortfolioNextEnabled()) {
      navigate(`/${routes.PORTFOLIO_POSITIONS}`);
      return;
    }
    navigate(`/${routes.DEPRECATED_PORTFOLIO}`);
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
        <ExternalLink
          colorToken="lavenderWeb"
          href={etherscanLink}
          typographyToken="primaryBodyXSmallRegular"
        >
          Open transaction on Etherscan
        </ExternalLink>
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
