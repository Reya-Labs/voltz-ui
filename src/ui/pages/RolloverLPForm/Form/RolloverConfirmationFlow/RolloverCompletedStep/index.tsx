import { Button, Confetti, ExternalLink, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  closeRolloverConfirmationFlowAction,
  selectRolloverConfirmationFlowEtherscanLink,
} from '../../../../../../app/features/forms/lps/rollover-lp';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { routes } from '../../../../../../routes/paths';
import { isPortfolioNextEnabled } from '../../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { RolloverDetails } from '../RolloverDetails';
import { RolloverCompletedStepBox } from './RolloverCompletedStep.styled';

export const RolloverCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectRolloverConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeRolloverConfirmationFlowAction());
    if (isPortfolioNextEnabled()) {
      navigate(`/${routes.PORTFOLIO_POSITIONS}`);
      return;
    }
    navigate(`/${routes.DEPRECATED_LP_PORTFOLIO_2}`);
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
    </RolloverCompletedStepBox>
  );
};