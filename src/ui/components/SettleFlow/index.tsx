import { Dialog } from 'brokoli-ui';
import React, { useEffect } from 'react';

import {
  getInfoPostSettlePositionThunk,
  selectSettlePosition,
  selectSettleStep,
  selectSettleVariant,
} from '../../../app/features/settle-flow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { SettleCompletedStep } from './SettleCompletedStep';
import { SettleConfirmationStep } from './SettleConfirmationStep';
import { WaitingForConfirmationStep } from './WaitingForConfirmationStep';

export const SettleFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectSettleStep);
  const variant = useAppSelector(selectSettleVariant);
  const position = useAppSelector(selectSettlePosition);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!position?.id) {
      return;
    }
    void dispatch(getInfoPostSettlePositionThunk());
  }, [dispatch, position?.id]);

  return (
    <Dialog open={step !== null && variant !== null}>
      {step === 'confirmation' ? <SettleConfirmationStep /> : null}
      {step === 'completed' ? <SettleCompletedStep /> : null}
      {step === 'waitingForConfirmation' ? <WaitingForConfirmationStep /> : null}
    </Dialog>
  );
};
