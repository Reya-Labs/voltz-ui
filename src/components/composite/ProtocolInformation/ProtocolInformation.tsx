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
        marginBottom: (theme) => theme.spacing(6),
        '.MuiFormControl-root': {
          paddingRight: 3,
          '&:last-child': {
            paddingRight: 0,
          }
        },
      }}
    >
      <Typography
        label={<IconLabel label="pool" icon="information-circle" info="Trade rates in the stETH pool by depositing ETH as margin. stETH cannot be used as a form of margin until post-merge." />}
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
