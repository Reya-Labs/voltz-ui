import React, { ReactNode } from 'react';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { colors } from '@theme';

type ProgressBarProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  percentageComplete?: number;
  isMaturity?: boolean;
};

export const ProgressBar = ({
  leftContent,
  rightContent,
  percentageComplete = 0,
  isMaturity,
}: ProgressBarProps) => (
  <Box sx={{ width: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {isMaturity && <Typography variant="h6">{leftContent}</Typography>}
      {!isMaturity && (
        <Typography
          variant="body2"
          sx={{
            fontSize: 18,
            textTransform: 'uppercase',
            verticalAlign: 'middle',
            fontWeight: 700,
            letterSpacing: '0.02em',
            lineHeight: '130%',
          }}
        >
          <Box sx={{ display: 'flex', alignContent: 'center' }}>{leftContent}</Box>
        </Typography>
      )}
      <Typography variant="h6" sx={{ marginLeft: (theme) => theme.spacing(5) }}>
        {rightContent}
      </Typography>
    </Box>
    <Box
      sx={{
        width: '100%',
        background: colors.lavenderWeb.darken030,
        height: '4px',
        marginTop: (theme) => theme.spacing(1),
      }}
    >
      <Box
        sx={{
          width: `${Math.min(percentageComplete, 100)}%`,
          background: colors.lavenderWeb.base,
          height: '100%',
        }}
      />
    </Box>
  </Box>
);

export default ProgressBar;
