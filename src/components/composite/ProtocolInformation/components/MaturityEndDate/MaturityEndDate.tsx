import { Typography } from '@components/atomic';

import { DateTime } from 'luxon';
import { formatDateTime } from '../../../../../utilities';
import Box from '@mui/material/Box';
import React from 'react';

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
      <Typography variant="h3" label="Fixed Until" sx={{ fontSize: 24 }}>
        {formattedEndDate}
      </Typography>
    </Box>
  );
};
