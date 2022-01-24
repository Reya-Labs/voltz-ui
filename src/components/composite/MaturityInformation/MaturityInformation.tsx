import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { Typography, Slider } from '../../atomic';

export type MaturityInformationProps = {
  startDate?: DateTime;
  endDate?: DateTime;
};

const MaturityInformation: React.FunctionComponent<MaturityInformationProps> = ({
  startDate,
  endDate,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography>Maturity</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Some date</Typography>
        <Typography>90%</Typography>
      </Box>
      <Slider controlled />
    </Box>
  );
};

export default MaturityInformation;
