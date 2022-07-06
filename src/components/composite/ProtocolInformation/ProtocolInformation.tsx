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
        label={<IconLabel label="pool" icon="information-circle" removeIcon={(protocol === "stETH" || protocol === "rETH") ? false : true} info={(protocol === "stETH" || protocol === "rETH") ? `Trade rates in the ${protocol} pool by depositing ETH as margin. ${protocol} cannot be used as a form of margin until post-merge.` : ""} />}
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
