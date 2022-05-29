import React, { ReactNode } from 'react';
import { Typography, Slider } from '@components/atomic';
import { Box } from '@mui/system';

type ProgressBarProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  percentageComplete?: number;
}

export const ProgressBar = ({leftContent, rightContent, percentageComplete = 0}: ProgressBarProps) => (
  <Box sx={{ width: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6">{leftContent}</Typography>
      <Typography variant="h6" sx={{marginLeft: (theme) => theme.spacing(5)}}>{rightContent}</Typography>
    </Box>
    <Slider controlled value={percentageComplete} />
  </Box>
);

export default ProgressBar;