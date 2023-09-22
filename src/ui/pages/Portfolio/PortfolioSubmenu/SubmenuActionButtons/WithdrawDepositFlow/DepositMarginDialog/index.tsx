import { Dialog } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../app';
import { selectMarginAccountDepositFlowStep } from '../../../../../../../app/features/portfolio';
import { DepositMarginDialogContent } from './DepositMarginDialogContent';
import { DepositMarginSuccessDialogContent } from './DepositMarginSuccessDialogContent';

export const DepositMarginDialog: React.FunctionComponent = () => {
  const step = useAppSelector(selectMarginAccountDepositFlowStep);
  return (
    <Dialog open={step !== 'closed'}>
      {step === 'opened' || step === 'depositing' || step === 'deposit-error' ? (
        <DepositMarginDialogContent />
      ) : null}
      {step === 'deposit-success' ? <DepositMarginSuccessDialogContent /> : null}
    </Dialog>
  );
};
