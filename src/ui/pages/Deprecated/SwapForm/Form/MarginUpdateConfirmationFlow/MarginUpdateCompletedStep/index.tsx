import { Button, Confetti, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, useAppDispatch, useAppSelector } from '../../../../../../../app';
import {
  closeMarginUpdateConfirmationFlowAction,
  selectMarginUpdateConfirmationFlowEtherscanLink,
} from '../../../../../../../app/features/forms/trader/deprecated/swap';
import { resetPortfolioStateAction } from '../../../../../../../app/features/portfolio';
import { ExplorerLink } from '../../../../../../components/ExplorerLink';
import { MarginUpdateDetails } from '../MarginUpdateDetails';
import { MarginUpdateCompletedStepBox } from './MarginUpdateCompletedStep.styled';

export const MarginUpdateCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectMarginUpdateConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeMarginUpdateConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  return (
    <MarginUpdateCompletedStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Margin Update Completed
      </Typography>
      <MarginUpdateDetails />
      <Confetti>
        <ExplorerLink link={etherscanLink} />
      </Confetti>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Your position will be updated in few minutes. You can track it from your your portfolio.
      </Typography>
      <Confetti>
        <Button variant="primary" onClick={handleVisitPortfolio}>
          Visit Your Portfolio
        </Button>
      </Confetti>
    </MarginUpdateCompletedStepBox>
  );
};
