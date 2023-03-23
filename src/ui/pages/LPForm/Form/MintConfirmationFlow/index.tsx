import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectSwapConfirmationFlowStep } from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MintCompletedStep } from './MintCompletedStep';
import { MintConfirmationStep } from './MintConfirmationStep';
import { WaitingForMintConfirmationStep } from './WaitingForMintConfirmationStep';

export const MintConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectSwapConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'swapConfirmation' ? <MintConfirmationStep /> : null}
      {step === 'swapCompleted' ? <MintCompletedStep /> : null}
      {step === 'waitingForSwapConfirmation' ? <WaitingForMintConfirmationStep /> : null}
    </Dialog>
  );
};
