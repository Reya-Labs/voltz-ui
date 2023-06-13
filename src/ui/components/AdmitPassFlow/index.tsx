import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectAdmitPassVerificationFlowStep } from '../../../app/features/admit-pass-verification-flow';
import { useAppSelector } from '../../../app/hooks';
import { NoPassDetected } from './NoPassDetected';
import { VerifyStep } from './VerifyStep';

export const AdmitPassFlow: React.FunctionComponent<{
  poolCap: number;
}> = ({ poolCap }) => {
  const step = useAppSelector(selectAdmitPassVerificationFlowStep);
  if (step === 'admit-pass-found') {
    return null;
  }
  return (
    <Dialog open={step !== null}>
      {step === 'verify' ? <VerifyStep poolCap={poolCap} /> : null}
      {step === 'no-admit-pass-found' ? <NoPassDetected /> : null}
    </Dialog>
  );
};
