import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';
import React, { cloneElement } from 'react';

import { doNothing } from '../../../utilities/doNothing';
import { Button } from '../../atomic/Button/Button';

export type TriggerProps = {
  onClick: () => void;
};

export type ModalProps = Omit<MuiModalProps, 'open'> & {
  open: boolean;
  onOpen: () => void;
  trigger: React.FunctionComponent<TriggerProps> | React.ReactElement | string;
};

export const Modal: React.FunctionComponent<ModalProps> = ({
  trigger: Trigger,
  open,
  onOpen = doNothing,
  onClose = doNothing,
  children,
  ...props
}) => {
  const renderTrigger = () => {
    if (typeof Trigger === 'string') {
      return <Button onClick={onOpen}>{Trigger}</Button>;
    }

    if (React.isValidElement(Trigger)) {
      return cloneElement(Trigger, { onClick: onOpen });
    }

    return <Trigger onClick={onOpen} />;
  };

  return (
    <>
      {renderTrigger()}
      <MuiModal
        {...props}
        open={open}
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
    </>
  );
};
