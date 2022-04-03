import React from 'react';
import Box from '@mui/material/Box';

const Loading: React.FunctionComponent = () => {
  return (
    <Box sx={{ height: 40, width: 40 }}>
      <img src="/images/loading.gif" alt="image" height="100%" width="100%" />
    </Box>
  );
};

export default Loading;
