import { Button, Confetti, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeRolloverConfirmationFlowAction,
  selectRolloverConfirmationFlowEtherscanLink,
} from '../../../../../../app/features/forms/lps/rollover-lp';
import { resetPortfolioStateAction } from '../../../../../../app/features/portfolio';
import { ExplorerLink } from '../../../../../components/ExplorerLink';
import { RolloverDetails } from '../RolloverDetails';
import { RolloverCompletedStepBox } from './RolloverCompletedStep.styled';

export const RolloverCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectRolloverConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeRolloverConfirmationFlowAction());
    dispatch(resetPortfolioStateAction());
    navigate(`/${routes.PORTFOLIO_POSITIONS}`);
  }, [dispatch, navigate]);
  return (
    <RolloverCompletedStepBox>
      <Confetti>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Rollover Completed
        </Typography>
      </Confetti>
      <RolloverDetails />
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
    </RolloverCompletedStepBox>
  );
};
