import React from 'react';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '../../../theme';

type LoadingProps = {
  sx?: SystemStyleObject<Theme>;
};

export const Loading: React.FunctionComponent<LoadingProps> = ({ sx = {} }) => {
  return (
    <Box sx={{ height: 40, width: 40, ...sx }}>
      <img src="/images/loading.gif" alt="loading" height="100%" width="100%" />
    </Box>
  );
};
