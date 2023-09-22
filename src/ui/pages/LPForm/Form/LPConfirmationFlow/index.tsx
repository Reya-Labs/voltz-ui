import { Dialog } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectLpConfirmationFlowStep } from '../../../../../app/features/forms/lps/lp';
import { LPCompletedStep } from './LPCompletedStep';
import { LPConfirmationStep } from './LPConfirmationStep';
import { WaitingForLPConfirmationStep } from './WaitingForLPConfirmationStep';

export const LPConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectLpConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'lpConfirmation' ? <LPConfirmationStep /> : null}
      {step === 'lpCompleted' ? <LPCompletedStep /> : null}
      {step === 'waitingForLpConfirmation' ? <WaitingForLPConfirmationStep /> : null}
    </Dialog>
  );
};
