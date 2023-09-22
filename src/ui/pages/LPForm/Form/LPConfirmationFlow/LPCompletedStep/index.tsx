import { Button, Confetti, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeLpConfirmationFlowAction,
  selectLpConfirmationFlowEtherscanLink,
} from '../../../../../../app/features/forms/lps/lp';
import { resetPortfolioStateAction } from '../../../../../../app/features/portfolio';
import { routes } from '../../../../../../app/paths';
import { ExplorerLink } from '../../../../../components/ExplorerLink';
import { LPDetails } from '../LPDetails';
import { LPCompletedStepBox } from './LPCompletedStep.styled';

export const LPCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectLpConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeLpConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  return (
    <LPCompletedStepBox>
      <Confetti>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          LP Completed
        </Typography>
      </Confetti>
      <LPDetails />
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
    </LPCompletedStepBox>
  );
};
