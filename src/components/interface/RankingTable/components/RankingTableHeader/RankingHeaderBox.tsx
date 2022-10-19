import React from 'react';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';

export type RankingHeaderBoxProps = {
  season: number;
  loading?: boolean;
};

const labelStyles: SystemStyleObject<Theme> = {
  textTransform: 'uppercase',
  fontWeight: 400,
  fontSize: 14,
  color: '#B3AFC6',
};
const titleStyles: SystemStyleObject<Theme> = {
  fontSize: '40px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(2),
};

const RankingHeaderBox = ({ season, loading }: RankingHeaderBoxProps) => (
  <Box sx={{ textTransform: 'uppercase' }}>
    <Typography variant="h1" sx={titleStyles}>
      {loading ? 'Loading...' : 'Voltz Trading Season - ' + season.toString().padStart(2, '0')}
    </Typography>
    <Typography variant="subtitle1" sx={labelStyles}>
      Compete against other traders for rewards by trading or bringging people to the platform.
    </Typography>
  </Box>
);

export default RankingHeaderBox;
