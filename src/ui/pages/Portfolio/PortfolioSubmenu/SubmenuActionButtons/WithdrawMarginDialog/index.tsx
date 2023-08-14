import { Dialog } from 'brokoli-ui';
import React from 'react';

import { WithdrawMarginDialogContent } from './WithdrawMarginDialogContent';

export const WithdrawMarginDialog: React.FunctionComponent = () => {
  const open = true;
  return (
    <Dialog open={open}>
      <WithdrawMarginDialogContent />
    </Dialog>
  );
};
