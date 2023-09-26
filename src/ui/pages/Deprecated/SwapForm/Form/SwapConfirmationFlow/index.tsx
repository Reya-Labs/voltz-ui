import { Dialog } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import { selectSwapConfirmationFlowStep } from '../../../../../../app/features/forms/trader/deprecated/swap';
import { SwapCompletedStep } from './SwapCompletedStep';
import { SwapConfirmationStep } from './SwapConfirmationStep';
import { WaitingForSwapConfirmationStep } from './WaitingForSwapConfirmationStep';

export const SwapConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectSwapConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'swapConfirmation' ? <SwapConfirmationStep /> : null}
      {step === 'swapCompleted' ? <SwapCompletedStep /> : null}
      {step === 'waitingForSwapConfirmation' ? <WaitingForSwapConfirmationStep /> : null}
    </Dialog>
  );
};
