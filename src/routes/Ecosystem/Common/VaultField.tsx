import { IconLabel } from '@components/composite';
import { Typography } from '@components/atomic';
import { Box } from '@mui/system';
import React from 'react';
import { titleStyles } from './styles';
import { ReactComponent as USDC } from './usdc-icon.svg';
import { ReactComponent as ETH } from './eth-icon.svg';
import { ReactComponent as DAI } from './dai-icon.svg';

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
    default: {
      return <USDC />;
    } 
  }
}

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

        <Typography variant="h1" sx={titleStyles}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '16px', display: "flex", flexDirection: "row", gap: "32px", marginLeft: '8px' }}>
        <Typography
          variant="body2"
          sx={{ fontSize: '24px', color: '#FF4AA9', fontFamily: 'DM Sans', fontWeight: '700', width: '156px' }}
          label={
            <IconLabel
              label="Estimated Historic APY"
              icon="information-circle"
              info="This shows the estimated returns that would have been generated had the strategy been running from Jul 22 to Oct 22."
            />
          }
        >
          {expectedApy}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: '24px',
            color: '#E5E1F9',
            fontFamily: 'DM Sans',
            fontWeight: '700',
            width: '130px',
          }}
          label={
            <IconLabel
              label="Maturity"
              icon="information-circle"
              info={`This strategy will run until ${maturity}. At this point depositors can collect any returns that may have been generated and withdraw their funds.`}
            />
          }
        >
          {maturity}
        </Typography>
      </Box>
    </Box>
  );
};
