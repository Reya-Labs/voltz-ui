import { Dialog } from 'brokoli-ui';
import React from 'react';

import { CreateMarginAccountDialogContent } from './CreateMarginAccountDialogContent';

export const CreateMarginAccountDialog: React.FunctionComponent = () => {
  return (
    <Dialog open={true}>
      <CreateMarginAccountDialogContent />
    </Dialog>
  );
};
