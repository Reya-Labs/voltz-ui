import { Button, Confetti, ExternalLink, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  closeLpConfirmationFlowAction,
  selectLpConfirmationFlowEtherscanLink,
} from '../../../../../../app/features/forms/lps/lp';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { routes } from '../../../../../../routes/paths';
import { isPortfolioNextEnabled } from '../../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { LPDetails } from '../LPDetails';
import { LPCompletedStepBox } from './LPCompletedStep.styled';

export const LPCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectLpConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeLpConfirmationFlowAction());
    if (isPortfolioNextEnabled()) {
      navigate(`/${routes.PORTFOLIO_POSITIONS}`);
      return;
    }
    navigate(`/${routes.DEPRECATED_LP_PORTFOLIO_2}`);
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
    </LPCompletedStepBox>
  );
};
