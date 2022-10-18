import React from 'react';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';

export type RankingHeaderBoxProps = {
  season?: number;
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

const RankingHeaderBox = ({ season, loading }: RankingHeaderBoxProps) => {
  const renderedValue =
    season !== undefined && !loading
      ? season < 10
        ? 'Voltz Trading Season - 0' + season.toString()
        : season.toString()
      : 'Loading...';
  return (
    <Box sx={{ textTransform: 'uppercase' }}>
      <Typography variant="h1" sx={titleStyles}>
        {renderedValue}
      </Typography>
      <Typography variant="subtitle1" sx={labelStyles}>
        Compete against other traders for rewards by trading or bringging people to the platform.
      </Typography>
    </Box>
  );
};

export default RankingHeaderBox;
