import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectLpConfirmationFlowStep } from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MintCompletedStep } from './MintCompletedStep';
import { MintConfirmationStep } from './MintConfirmationStep';
import { WaitingForMintConfirmationStep } from './WaitingForMintConfirmationStep';

export const MintConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectLpConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'lpConfirmation' ? <MintConfirmationStep /> : null}
      {step === 'lpCompleted' ? <MintCompletedStep /> : null}
      {step === 'waitingForLpConfirmation' ? <WaitingForMintConfirmationStep /> : null}
    </Dialog>
  );
};
