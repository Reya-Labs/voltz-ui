import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectRolloverConfirmationFlowStep } from '../../../../../app/features/forms/lps/rollover-lp';
import { useAppSelector } from '../../../../../app/hooks';
import { RolloverCompletedStep } from './RolloverCompletedStep';
import { RolloverConfirmationStep } from './RolloverConfirmationStep';
import { WaitingForRolloverConfirmationStep } from './WaitingForRolloverConfirmationStep';

export const RolloverConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectRolloverConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'rolloverConfirmation' ? <RolloverConfirmationStep /> : null}
      {step === 'rolloverCompleted' ? <RolloverCompletedStep /> : null}
      {step === 'waitingForRolloverConfirmation' ? <WaitingForRolloverConfirmationStep /> : null}
    </Dialog>
  );
};
