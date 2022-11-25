import React, { cloneElement } from 'react';
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';
import isString from 'lodash/isString';

import { Button } from '@components/atomic';
import { doNothing } from '../../../utilities';

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
    if (isString(Trigger)) {
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
        onClose={onClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        {children}
      </MuiModal>
    </>
  );
};
