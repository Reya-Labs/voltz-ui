import React from 'react';
import Box from '@mui/material/Box';

import { Typography } from '@components/atomic';
import IconLabel from '../IconLabel/IconLabel';
import { VariableAPY, FixedAPR } from './components';

export type ProtocolInformationProps = {
  protocol?: string;
};

const ProtocolInformation: React.FunctionComponent<ProtocolInformationProps> = ({
  protocol,
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
      <Typography
        label={<IconLabel label="pool" icon="information-circle" info="The underlying yield bearing token." removeIcon />}
        variant="h3"
      >
        {protocol}
      </Typography>
      <FixedAPR />
      <VariableAPY />
    </Box>
  );
};

export default ProtocolInformation;
