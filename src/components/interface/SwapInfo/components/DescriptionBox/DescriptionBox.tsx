import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '../../../../atomic/Typography/Typography';

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
        variant="h3"
        sx={{
          fontSize: '24px',
          paddingBottom: (theme) => theme.spacing(3),
        }}
      >
        {titleText}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '14px' }}>
        {descriptionText}
      </Typography>
    </Box>
  );
};
