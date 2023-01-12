import React from 'react';

import { Icon, IconProps } from '../../../../atomic/Icon/Icon';
import { Typography } from '../../../../atomic/Typography/Typography';
import { OptionButton } from './WalletOptionButton.styled';

export type WalletOptionButtonProps = {
  onClick?: () => void;
  title: string;
  icon?: IconProps['name'];
  disabled: boolean;
};

export const WalletOptionButton: React.FunctionComponent<WalletOptionButtonProps> = ({
  onClick,
  title,
  icon,
  disabled,
}) => (
  <OptionButton
    data-testid={`WalletOptionButton-${title}`}
    disabled={disabled}
    selected={disabled}
    variant="darker"
    onClick={onClick}
  >
    <Typography variant="h6">{title}</Typography>
    {icon && <Icon name={icon} />}
  </OptionButton>
);
