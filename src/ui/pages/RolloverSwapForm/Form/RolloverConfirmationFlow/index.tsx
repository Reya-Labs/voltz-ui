import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectSwapConfirmationFlowStep } from '../../../../../app/features/forms/trader/rollover-swap';
import { useAppSelector } from '../../../../../app/hooks';
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
