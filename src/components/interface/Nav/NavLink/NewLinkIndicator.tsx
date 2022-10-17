import Box from '@mui/material/Box';
import { colors } from '@theme';
import React from 'react';

export const NewLinkIndicator: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1,
        borderRadius: '50%',
        background: colors.wildStrawberry.base,
        width: (theme) => theme.spacing(1),
        height: (theme) => theme.spacing(1),
      }}
    />
  );
};
