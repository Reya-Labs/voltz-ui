import { Button, Confetti, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../app';
import {
  closeSettleFlowAction,
  selectConfirmationFlowEtherscanLink,
} from '../../../../app/features/settle-flow';
import { ExplorerLink } from '../../ExplorerLink';
import { SettleDetails } from '../SettleDetails';
import { SettleCompletedStepBox } from './SettleCompletedStep.styled';

export const SettleCompletedStep: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const etherscanLink = useAppSelector(selectConfirmationFlowEtherscanLink);

  const handleClose = useCallback(() => {
    dispatch(closeSettleFlowAction());
  }, [dispatch]);

  return (
    <SettleCompletedStepBox>
      <Confetti>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Settle Completed
        </Typography>
      </Confetti>
      <SettleDetails />
      <Confetti>
        <ExplorerLink link={etherscanLink} />
      </Confetti>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Your position will be settled in few minutes. You can track it from your your portfolio.
      </Typography>
      <Confetti>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Confetti>
    </SettleCompletedStepBox>
  );
};
