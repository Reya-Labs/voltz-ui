import React from 'react';
import Box from '@mui/material/Box';

import { Typography } from '../../atomic';

export type ProtocolInformationProps = {
  protocol?: string;
  fixedApr?: number;
  variableApy?: number;
};

const ProtocolInformation: React.FunctionComponent<ProtocolInformationProps> = ({
  protocol,
  fixedApr,
  variableApy,
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
      {fixedApr && (
        <Typography label="fixed apr" variant="h3">
          {fixedApr}%
        </Typography>
      )}
      {variableApy && (
        <Typography label="variable apy" variant="h3">
          {variableApy}%
        </Typography>
      )}
    </Box>
  );
};

export default ProtocolInformation;
