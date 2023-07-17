import { Dialog } from 'brokoli-ui';
import React, { useEffect } from 'react';

import {
  selectAlphaPassVerificationFlowStep,
  verifyAlphaPassThunk,
} from '../../../app/features/alpha-pass-verification-flow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useWallet } from '../../../hooks/useWallet';
import { ConfirmV2Warning } from './ConfirmV2Warning';
import { NoPassDetected } from './NoPassDetected';

export const AlphaPassFlow: React.FunctionComponent = () => {
  const { signer, account } = useWallet();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectAlphaPassVerificationFlowStep(account));
  useEffect(() => {
    if (!signer || !account) {
      return;
    }
    if (step !== 'idle') {
      return;
    }
    void dispatch(
      verifyAlphaPassThunk({
        signer,
        account,
      }),
    );
  }, [step, signer, account, dispatch]);
  if (!step) {
    return null;
  }
  if (step === 'verified-and-confirmed' || step === 'verification-error') {
    return null;
  }
  return (
    <Dialog open={step !== null}>
      {step === 'not-verified' ? <NoPassDetected /> : null}{' '}
      {step === 'verified' ? <ConfirmV2Warning /> : null}
    </Dialog>
  );
};
