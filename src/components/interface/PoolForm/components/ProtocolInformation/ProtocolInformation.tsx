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
        '& .MuiFormControl-root': {
          paddingRight: 3,
          paddingBottom: 3,
        },
      }}
    >
      <Typography label="protocol" variant="h3">
        {protocol}
      </Typography>
      <Typography label="fixed apr" variant="h3">
        {fixedApr}%
      </Typography>
      <Typography label="variable apr" variant="h3">
        {variableApr}%
      </Typography>
    </Box>
  );
};

export default ProtocolInformation;
