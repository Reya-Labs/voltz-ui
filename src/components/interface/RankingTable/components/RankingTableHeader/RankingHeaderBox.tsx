import React from 'react';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';

export type RankingHeaderBoxProps = {
  season: string;
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
  <Box>
    <Typography variant="h1" sx={titleStyles}>
      {loading ? 'LOADING...' : 'VOLTZ TRADING LEAGUE'}
    </Typography>
    <Typography variant="subtitle1" sx={labelStyles}>
      COMPETE AGAINST OTHER TRADERS FOR REWARDS BY TRADING.
    </Typography>
  </Box>
);

export default RankingHeaderBox;
