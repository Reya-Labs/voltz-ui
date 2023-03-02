import { Typography } from 'brokoli-ui';
import React from 'react';

import { MetamaskIcon, OptionButton, WalletConnectIcon } from './WalletOptionButton.styled';

export type WalletOptionButtonProps = {
  onClick?: () => void;
  title: string;
  icon?: 'metamask' | 'walletConnect';
  disabled: boolean;
};

export const WalletOptionButton: React.FunctionComponent<WalletOptionButtonProps> = ({
  onClick,
  title,
  icon,
  disabled,
}) => (
  <OptionButton data-testid={`WalletOptionButton-${title}`} disabled={disabled} onClick={onClick}>
    <Typography colorToken="lavenderWeb" typographyToken="primaryBodyLargeRegular">
      {title}
    </Typography>
    {icon === 'metamask' && !disabled ? <MetamaskIcon viewBox="0 0 17 16" /> : null}
    {icon === 'walletConnect' && !disabled ? <WalletConnectIcon viewBox="0 0 20 14" /> : null}
  </OptionButton>
);
