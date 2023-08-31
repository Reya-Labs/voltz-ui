import { Dialog } from 'brokoli-ui';
import React from 'react';

import { CreateMarginAccountDialogContent } from './CreateMarginAccountDialogContent';

type CreateMarginAccountDialogProps = {
  onCloseClick: () => void;
  open: boolean;
};

export const CreateMarginAccountDialog: React.FunctionComponent<CreateMarginAccountDialogProps> = ({
  open,
  onCloseClick,
}: CreateMarginAccountDialogProps) => {
  return (
    <Dialog open={open}>
      <CreateMarginAccountDialogContent onCloseClick={onCloseClick} />
    </Dialog>
  );
};
