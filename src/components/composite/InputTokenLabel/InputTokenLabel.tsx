import { Box } from '@mui/material';
import React from 'react';
import { Icon } from '@components/atomic';

type InputTokenLabelProps = {
  tokenName: string;
}

const InputTokenLabel = ({ tokenName }:InputTokenLabelProps) => {
  const getTokenIcon = () => {
    switch(tokenName.toUpperCase()) {
      case 'DAI':
        return <Icon name='token-dai' sx={{ display: 'block' }} />;
      // case 'ETH':
      //   return 'todo';
      case 'LIDO':
        return <Icon name='token-lido' sx={{ display: 'block' }} />;
      case 'USDC':
        return <Icon name='token-usdc' sx={{ display: 'block' }} />;
      default:
        return null;
    }
  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box sx={{marginRight: (theme) =>  theme.spacing(2)}}>
        {getTokenIcon()}
      </Box>
      <Box>
        {tokenName}
      </Box>
    </Box>
  );
}

export default InputTokenLabel;