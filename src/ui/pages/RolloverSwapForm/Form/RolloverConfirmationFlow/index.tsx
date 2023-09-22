import { Dialog } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectSwapConfirmationFlowStep } from '../../../../../app/features/forms/trader/rollover-swap';
import { RolloverCompletedStep } from './RolloverCompletedStep';
import { RolloverConfirmationStep } from './RolloverConfirmationStep';
import { WaitingForRolloverConfirmationStep } from './WaitingForRolloverConfirmationStep';

export const RolloverConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectSwapConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'rolloverConfirmation' ? <RolloverConfirmationStep /> : null}
      {step === 'rolloverCompleted' ? <RolloverCompletedStep /> : null}
      {step === 'waitingForRolloverConfirmation' ? <WaitingForRolloverConfirmationStep /> : null}
    </Dialog>
  );
};
