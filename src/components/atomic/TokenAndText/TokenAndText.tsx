import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';

export type TokenAndTextProps = {
  token: string;
  tokenLabel: ReactNode;
  text: string;
  textLabel: ReactNode;
};

const TokenAndText: React.FunctionComponent<TokenAndTextProps> = ({
  token,
  tokenLabel,
  text,
  textLabel,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: (theme) => theme.spacing(6),
        ' > div': {
          width: 'auto',
          marginRight: (theme) => theme.spacing(8),
          '&:last-child': {
            marginRight: '0',
          },
        },
      }}
    >
      <Typography label={tokenLabel} variant="h3">
        {token}
      </Typography>
      <Typography label={textLabel} variant="h3" agentStyling>
        {text}
      </Typography>
    </Box>
  );
};

export default TokenAndText;
