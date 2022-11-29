import Box from '@mui/material/Box';
import React from 'react';

import { SystemStyleObject, Theme } from '../../../theme';

type LoadingProps = {
  sx?: SystemStyleObject<Theme>;
};

export const Loading: React.FunctionComponent<LoadingProps> = ({ sx = {} }) => {
  return (
    <Box sx={{ height: 40, width: 40, ...sx }}>
      <img alt="loading" height="100%" src="/images/loading.gif" width="100%" />
    </Box>
  );
};
