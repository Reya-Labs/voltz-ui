import Box from '@mui/material/Box';
import React from 'react';

import { Typography } from '../../../atomic/Typography/Typography';

export type DescriptionBoxProps = {
  titleText: string;
  descriptionText: string;
};

export const DescriptionBox: React.FunctionComponent<DescriptionBoxProps> = ({
  titleText,
  descriptionText,
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '24px',
          paddingBottom: (theme) => theme.spacing(3),
        }}
        variant="h3"
      >
        {titleText}
      </Typography>
      <Typography sx={{ fontSize: '14px' }} variant="body1">
        {descriptionText}
      </Typography>
    </Box>
  );
};
