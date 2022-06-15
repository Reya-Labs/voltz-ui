import React, { ReactNode } from 'react';
import { Typography } from '@components/atomic';
import { Box } from '@mui/system';
import { colors } from '@theme';

type ProgressBarProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  percentageComplete?: number;
}

export const ProgressBar = ({leftContent, rightContent, percentageComplete = 0}: ProgressBarProps) => (
  <Box sx={{ width: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6">
        {leftContent}
      </Typography>
      <Typography variant="h6" sx={{marginLeft: (theme) => theme.spacing(5)}}>
        {rightContent}
      </Typography>
    </Box>
    <Box sx={{
      width: '100%',
      background: colors.lavenderWeb.darken030,
      height: '4px',
      marginTop: (theme) => theme.spacing(1)
    }}>
      <Box sx={{
        width: `${percentageComplete}%`,
        background: colors.lavenderWeb.base,
        height: '100%',
      }}/>
    </Box>
  </Box>
);

export default ProgressBar;