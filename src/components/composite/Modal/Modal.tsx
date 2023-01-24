import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';
import React from 'react';

import { doNothing } from '../../../utilities/doNothing';

export const Modal: React.FunctionComponent<MuiModalProps> = ({
  onClose = doNothing,
  children,
  ...props
}) => (
  <MuiModal
    {...props}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(2px)',
    }}
    onClose={onClose}
  >
    {children}
  </MuiModal>
);
