import Box from '@mui/material/Box';
import React from 'react';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { IconLabel } from '../../../components/composite/IconLabel/IconLabel';
import { ReactComponent as DAI } from './dai-icon.svg';
import { ReactComponent as ETH } from './eth-icon.svg';
import { titleStyles } from './styles';
import { ReactComponent as USDC } from './usdc-icon.svg';
import { ReactComponent as USDT } from './usdt-icon.svg';

const getTokenIcon = (token: string) => {
  switch (token) {
    case 'USDC': {
      return <USDC />;
    }
    case 'ETH': {
      return <ETH />;
    }
    case 'DAI': {
      return <DAI />;
    }
    case 'USDT': {
      return <USDT />;
    }
    default: {
      return <USDC />;
    }
  }
};

type VaultFieldProps = {
  title: string;
  token: string;
  expectedApy: string;
  maturity: string;
};

export const VaultField: React.FunctionComponent<VaultFieldProps> = ({
  title,
  token,
  expectedApy,
  maturity,
}: VaultFieldProps) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', marginLeft: '8px', marginTop: '16px', alignItems: 'center' }}>
        {getTokenIcon(token)}

        <Typography sx={titleStyles} variant="h1">
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          marginLeft: '8px',
        }}
      >
        <Typography
          label={
            <IconLabel
              icon="information-circle"
              info="This shows the estimated returns that would have been generated had the strategy been running from Jul 22 to Oct 22."
              label="Estimated Historic APY"
            />
          }
          sx={{
            fontSize: '24px',
            color: '#FF4AA9',
            fontFamily: 'DM Sans',
            fontWeight: '700',
            width: '156px',
          }}
          variant="body2"
        >
          {expectedApy}
        </Typography>

        <Typography
          label={
            <IconLabel
              icon="information-circle"
              info={`This strategy will run until ${maturity}. At this point depositors can collect any returns that may have been generated and withdraw their funds.`}
              label="Maturity"
            />
          }
          sx={{
            fontSize: '24px',
            color: '#E5E1F9',
            fontFamily: 'DM Sans',
            fontWeight: '700',
            width: '130px',
          }}
          variant="body2"
        >
          {maturity}
        </Typography>
      </Box>
    </Box>
  );
};
