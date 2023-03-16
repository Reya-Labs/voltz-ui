import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectMarginUpdateConfirmationFlowStep } from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MarginUpdateCompletedStep } from './MarginUpdateCompletedStep';
import { MarginUpdateConfirmationStep } from './MarginUpdateConfirmationStep';
import { WaitingForMarginUpdateConfirmationStep } from './WaitingForMarginUpdateConfirmationStep';

export const MarginUpdateConfirmationFlow: React.FunctionComponent = () => {
  const step = useAppSelector(selectMarginUpdateConfirmationFlowStep);

  return (
    <Dialog open={step !== null}>
      {step === 'marginUpdateConfirmation' ? <MarginUpdateConfirmationStep /> : null}
      {step === 'marginUpdateCompleted' ? <MarginUpdateCompletedStep /> : null}
      {step === 'waitingForMarginUpdateConfirmation' ? (
        <WaitingForMarginUpdateConfirmationStep />
      ) : null}
    </Dialog>
  );
};
