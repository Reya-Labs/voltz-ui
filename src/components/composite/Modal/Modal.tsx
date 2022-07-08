import React, { cloneElement } from 'react';
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';
import isString from 'lodash/isString';

import { useStateMemo } from '@hooks';
import { Button } from '@components/atomic';

export type TriggerProps = {
  onClick: () => void;
};

export type ModalProps = Omit<MuiModalProps, 'open'> & {
  open?: boolean;
  onOpen?: () => void;
  trigger: React.FunctionComponent<TriggerProps> | React.ReactElement | string;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  trigger: Trigger,
  open: defaultOpen = false,
  onOpen,
  onClose,
  ...props
}) => {
  const [open, setOpen] = useStateMemo(defaultOpen);
  const handleClickTrigger = () => {
    if (onOpen) {
      onOpen();
    }

    setOpen(true);
  };
  const renderTrigger = () => {
    if (isString(Trigger)) {
      return <Button onClick={handleClickTrigger}>{Trigger}</Button>;
    }

    if (React.isValidElement(Trigger)) {
      return cloneElement(Trigger, { onClick: handleClickTrigger });
    }

    return <Trigger onClick={handleClickTrigger} />;
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
