import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '../../../../atomic/Typography/Typography';
import { colors } from '../../../../../theme';

export type WarningBoxProps = {
  warningText: string;
};

export const WarningBox: React.FunctionComponent<WarningBoxProps> = ({ warningText }) => {
  return (
    <Box sx={{ bgcolor: colors.orangeYellow.darken030, borderRadius: 2 }}>
      <Typography
        variant="h4"
        sx={{
          color: colors.orangeYellow.base,
          fontSize: '16px',
          paddingTop: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(4),
        }}
      >
        WARNING
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: colors.orangeYellow.darken015,
          fontSize: '14px',
          paddingLeft: (theme) => theme.spacing(3),
          paddingTop: (theme) => theme.spacing(1),
          paddingRight: (theme) => theme.spacing(3),
          paddingBottom: (theme) => theme.spacing(3),
        }}
      >
        {warningText}
      </Typography>
    </Box>
  );
};
