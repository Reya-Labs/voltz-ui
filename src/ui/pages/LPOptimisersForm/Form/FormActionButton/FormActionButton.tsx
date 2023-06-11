import React from 'react';

import { BouncedLoading } from '../../../../../components/atomic/BouncedLoading/BouncedLoading';
import { Tick } from '../../../../../components/atomic/Tick/Tick';
import { BlueActionButton, DarkBlueActionButton, IconWrapper } from './FormActionButton.styled';

export type FormActionButtonProps = {
  onClick?: () => void;
  disabled: boolean;
  success: boolean;
  loading: boolean;
  dataTestId: string;
  variant: 'blue' | 'dark-blue';
};

export const FormActionButton: React.FunctionComponent<FormActionButtonProps> = ({
  children,
  onClick,
  disabled,
  success,
  loading,
  dataTestId,
  variant,
}) => {
  const ActionButtonUI = variant === 'blue' ? BlueActionButton : DarkBlueActionButton;
  return (
    <ActionButtonUI data-testid={dataTestId} disabled={disabled} onClick={onClick}>
      {children}
      {success && (
        <IconWrapper>
          <Tick />
        </IconWrapper>
      )}
      {loading && <BouncedLoading />}
    </ActionButtonUI>
  );
};
