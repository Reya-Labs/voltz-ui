import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectAlphaPassVerificationFlowStep } from '../../../app/features/alpha-pass-verification-flow';
import { useAppSelector } from '../../../app/hooks';
import { useWallet } from '../../../hooks/useWallet';
import { NoPassDetected } from './NoPassDetected';
import { VerifyStep } from './VerifyStep';

export const AlphaPassFlow: React.FunctionComponent<{
  poolCap: number;
}> = ({ poolCap }) => {
  const { account } = useWallet();
  const step = useAppSelector(selectAlphaPassVerificationFlowStep(account));
  if (!step) {
    return null;
  }
  if (step === 'alpha-pass-found') {
    return null;
  }
  return (
    <Dialog open={step !== null}>
      {step === 'verify' ? <VerifyStep poolCap={poolCap} /> : null}
      {step === 'no-alpha-pass-found' ? <NoPassDetected /> : null}
    </Dialog>
  );
};
