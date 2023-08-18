import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectMarginAccountWithdrawFlowStep } from '../../../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../../../app/hooks';
import { WithdrawMarginDialogContent } from './WithdrawMarginDialogContent';
import { WithdrawMarginSuccessDialogContent } from './WithdrawMarginSuccessDialogContent';

export const WithdrawMarginDialog: React.FunctionComponent = () => {
  const step = useAppSelector(selectMarginAccountWithdrawFlowStep);
  return (
    <Dialog open={step !== 'closed'}>
      {step === 'opened' || step === 'withdrawing' || step === 'withdraw-error' ? (
        <WithdrawMarginDialogContent />
      ) : null}
      {step === 'withdraw-success' ? <WithdrawMarginSuccessDialogContent /> : null}
    </Dialog>
  );
};
