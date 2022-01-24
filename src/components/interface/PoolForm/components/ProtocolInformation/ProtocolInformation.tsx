import React from 'react';
import Box from '@mui/material/Box';

import { AgentProps } from '@theme';
import { Typography } from '@components/atomic';

export type ProtocolInformationProps = AgentProps & {
  protocol?: string;
  fixedApr?: number;
  variableApr?: number;
};

const ProtocolInformation: React.FunctionComponent<ProtocolInformationProps> = ({
  agent,
  protocol,
  fixedApr,
  variableApr,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        '& .MuiBox-root': {
          paddingRight: 3,
          paddingBottom: 3,
        },
      }}
    >
      <Box>
        <Typography>Protocol</Typography>
        <Typography variant="body1">{protocol}</Typography>
      </Box>
      <Box>
        <Typography>Fixed APR</Typography>
        <Typography variant="body1">{fixedApr}%</Typography>
      </Box>
      <Box>
        <Typography>Variable APR</Typography>
        <Typography variant="body1">{variableApr}%</Typography>
      </Box>
    </Box>
  );
};

export default ProtocolInformation;
