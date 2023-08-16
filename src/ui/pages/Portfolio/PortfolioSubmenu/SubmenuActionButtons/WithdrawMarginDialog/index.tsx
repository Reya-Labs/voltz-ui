import { Dialog } from 'brokoli-ui';
import React from 'react';

import { selectMarginAccountWithdrawFlowStep } from '../../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../../app/hooks';
import { WithdrawMarginDialogContent } from './WithdrawMarginDialogContent';

export const WithdrawMarginDialog: React.FunctionComponent = () => {
  const step = useAppSelector(selectMarginAccountWithdrawFlowStep);
  return (
    <Dialog open={step !== 'closed'}>
      <WithdrawMarginDialogContent />
    </Dialog>
  );
};
