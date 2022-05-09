import React from 'react';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';

type LoadingProps = {
  sx?: SystemStyleObject<Theme>;
};

const Loading: React.FunctionComponent<LoadingProps> = ({ sx = {} }) => {
  return (
    <Box sx={{ height: 40, width: 40, ...sx }}>
      <img src="/images/loading.gif" alt="image" height="100%" width="100%" />
    </Box>
  );
};

export default Loading;
