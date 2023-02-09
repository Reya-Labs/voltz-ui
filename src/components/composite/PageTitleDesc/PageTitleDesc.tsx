import Typography from '@mui/material/Typography';
import React from 'react';

type PageTitleDescProps = {
  title: string;
  desc: string;
};

export const PageTitleDesc = ({ title, desc }: PageTitleDescProps) => (
  <>
    <Typography variant="h1">{title}</Typography>
    <Typography
      sx={{
        marginTop: (theme) => theme.spacing(2),
        marginBottom: (theme) => theme.spacing(2),
      }}
      variant="body1"
    >
      {desc}
    </Typography>
  </>
);
