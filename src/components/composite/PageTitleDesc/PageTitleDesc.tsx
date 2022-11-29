import Typography from '@mui/material/Typography';
import React from 'react';

interface PageTitleDescProps {
  title: string;
  desc: string;
}

export const PageTitleDesc = ({ title, desc }: PageTitleDescProps) => (
  <>
    <Typography variant="h1">{title}</Typography>
    <Typography
      sx={{
        maxWidth: (theme) => theme.spacing(90),
        marginBottom: (theme) => theme.spacing(4),
        marginTop: (theme) => theme.spacing(2),
      }}
      variant="body1"
    >
      {desc}
    </Typography>
  </>
);
