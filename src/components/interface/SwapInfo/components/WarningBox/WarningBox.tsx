import Box from '@mui/material/Box';
import React from 'react';

import { colors } from '../../../../../theme';
import { Typography } from '../../../../atomic/Typography/Typography';

export type WarningBoxProps = {
  warningText: string;
};

export const WarningBox: React.FunctionComponent<WarningBoxProps> = ({ warningText }) => {
  return (
    <Box sx={{ bgcolor: colors.orangeYellow.darken030, borderRadius: 2 }}>
      <Typography
        sx={{
          color: colors.orangeYellow.base,
          fontSize: '16px',
          paddingTop: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(4),
        }}
        variant="h4"
      >
        WARNING
      </Typography>
      <Typography
        sx={{
          color: colors.orangeYellow.darken015,
          fontSize: '14px',
          paddingLeft: (theme) => theme.spacing(3),
          paddingTop: (theme) => theme.spacing(1),
          paddingRight: (theme) => theme.spacing(3),
          paddingBottom: (theme) => theme.spacing(3),
        }}
        variant="body1"
      >
        {warningText}
      </Typography>
    </Box>
  );
};
