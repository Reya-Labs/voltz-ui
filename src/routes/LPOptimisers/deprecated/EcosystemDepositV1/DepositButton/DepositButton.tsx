import React from 'react';

import { BouncedLoading } from '../../../../../components/atomic/BouncedLoading/BouncedLoading';
import { Tick } from '../../../../../components/atomic/Tick/Tick';
import { DepositButton as DepositButtonUI, IconWrapper } from './DepositButton.styled';

export type DepositButtonProps = {
  onClick?: () => void;
  disabled: boolean;
  success: boolean;
  loading: boolean;
};

export const DepositButton: React.FunctionComponent<DepositButtonProps> = ({
  children,
  onClick,
  disabled,
  success,
  loading,
}) => (
  <DepositButtonUI data-testid="DepositButton" disabled={disabled} onClick={onClick}>
    {children}
    {success && (
      <IconWrapper>
        <Tick />
      </IconWrapper>
    )}
    {loading && <BouncedLoading />}
  </DepositButtonUI>
);
