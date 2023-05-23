import { Button, Confetti, ExternalLink, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  closeMarginUpdateConfirmationFlowAction,
  selectMarginUpdateConfirmationFlowEtherscanLink,
} from '../../../../../../app/features/forms/trader/swap';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { routes } from '../../../../../../routes/paths';
import { isPortfolioNextEnabled } from '../../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { MarginUpdateDetails } from '../MarginUpdateDetails';
import { MarginUpdateCompletedStepBox } from './MarginUpdateCompletedStep.styled';

export const MarginUpdateCompletedStep: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectMarginUpdateConfirmationFlowEtherscanLink);

  const handleVisitPortfolio = useCallback(() => {
    dispatch(closeMarginUpdateConfirmationFlowAction());
    if (isPortfolioNextEnabled()) {
      navigate(`/${routes.PORTFOLIO_POSITIONS}`);
      return;
    }
    navigate(`/${routes.DEPRECATED_PORTFOLIO}`);
  }, [dispatch, navigate]);
  return (
    <MarginUpdateCompletedStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Margin Update Completed
      </Typography>
      <MarginUpdateDetails />
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
