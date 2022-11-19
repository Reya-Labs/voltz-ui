import Box from '@mui/material/Box';
import React from 'react';
import { Icon, IconProps } from '@components/atomic';

type InputTokenLabelProps = {
  tokenName: string;
};

const TOKEN_NAME_ICON_MAP: Record<string, IconProps['name']> = {
  DAI: 'token-dai',
  ETH: 'token-eth',
  LIDO: 'token-lido',
  USDC: 'token-usdc',
  USDT: 'token-usdt',
};

const InputTokenLabel = ({ tokenName }: InputTokenLabelProps) => {
  const iconName = TOKEN_NAME_ICON_MAP[tokenName.toUpperCase()];
  const icon = iconName ? <Icon name={iconName} sx={{ display: 'block' }} /> : null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: (theme) => theme.spacing(2) }}>{icon}</Box>
      <Box>{tokenName}</Box>
    </Box>
  );
};

export default InputTokenLabel;
