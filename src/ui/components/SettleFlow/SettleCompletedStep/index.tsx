import { Button, Confetti, ExternalLink, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeSettleFlowAction,
  selectConfirmationFlowEtherscanLink,
} from '../../../../app/features/settle-flow';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { SettleDetails } from '../SettleDetails';
import { LPCompletedStepBox } from './SettleCompletedStep.styled';

export const SettleCompletedStep: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectConfirmationFlowEtherscanLink);

  const handleClose = useCallback(() => {
    dispatch(closeSettleFlowAction());
  }, [dispatch]);

  return (
    <LPCompletedStepBox>
      <Confetti>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Settle Completed
        </Typography>
      </Confetti>
      <SettleDetails />
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
        Your position will be settled in few minutes. You can track it from your your portfolio.
      </Typography>
      <Confetti>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Confetti>
    </LPCompletedStepBox>
  );
};
