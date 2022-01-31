import React, { useState, cloneElement } from 'react';
import Box from '@mui/material/Box';
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';
import isString from 'lodash/isString';

import { Button } from '../../atomic';

export type ModalProps = Omit<MuiModalProps, 'open'> & {
  open?: boolean;
  trigger: React.ReactElement | string;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  trigger,
  open: defaultOpen = false,
  onClose,
  ...props
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const handleClickTrigger = () => setOpen(true);
  const renderTrigger = () => {
    if (isString(trigger)) {
      return <Button onClick={handleClickTrigger}>{trigger}</Button>;
    }

    return cloneElement(trigger, { onClick: handleClickTrigger });
  };
  const handleClose = (
    event: Record<string, unknown>,
    reason: 'escapeKeyDown' | 'backdropClick',
  ) => {
    if (onClose) {
      onClose(event, reason);
    }

    setOpen(false);
  };

  return (
    <>
      {renderTrigger()}
      <MuiModal
        {...props}
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(2px)',
        }}
      />
    </>
  );
};

export default Modal;
