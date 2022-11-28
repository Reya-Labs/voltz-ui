import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React from 'react';

import { formatDateTime } from '../../../../../utilities/date';
import { Typography } from '../../../../atomic/Typography/Typography';

export type MaturityEndDateProps = {
  endDate?: DateTime;
};

function removeSubstring(str: string, from: number, to: number): string {
  return str.slice(0, from) + str.slice(to);
}

export const MaturityEndDate: React.FunctionComponent<MaturityEndDateProps> = ({ endDate }) => {
  const formattedEndDate = endDate ? removeSubstring(formatDateTime(endDate), -4, -2) : '';

  return (
    <Box>
      <Typography label="Fixed Until" sx={{ fontSize: 24 }} variant="h3">
        {formattedEndDate}
      </Typography>
    </Box>
  );
};
