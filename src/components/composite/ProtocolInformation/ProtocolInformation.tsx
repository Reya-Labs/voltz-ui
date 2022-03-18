import React from 'react';
import Box from '@mui/material/Box';

import { Typography } from '../../atomic';
import { VariableAPY } from './components';

export type ProtocolInformationProps = {
  protocol?: string;
  fixedApr?: number;
};

const ProtocolInformation: React.FunctionComponent<ProtocolInformationProps> = ({
  protocol,
  fixedApr,
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
          {fixedApr.toFixed(2)}%
        </Typography>
      )},
      <VariableAPY />
    </Box>
  );
};

export default ProtocolInformation;
