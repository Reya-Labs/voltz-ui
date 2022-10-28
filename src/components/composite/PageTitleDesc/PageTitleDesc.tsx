import React from 'react';
import Typography from '@mui/material/Typography';

interface PageTitleDescProps {
  title: string;
  desc?: string;
}

const PageTitleDesc = ({ title, desc }: PageTitleDescProps) => (
  <>
    <Typography variant="h1">{title}</Typography>
    {desc && (
      <Typography
        variant="body1"
        sx={{
          maxWidth: (theme) => theme.spacing(90),
          marginBottom: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        {desc}
      </Typography>
    )}
  </>
);

export default PageTitleDesc;
