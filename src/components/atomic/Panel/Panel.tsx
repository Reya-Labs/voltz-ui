import React from 'react';
import { SxProps, Theme } from '@mui/system';
import Box from '@mui/material/Box';

export type PanelProps = {
  type: 'error' | 'warning' | 'info';
};

const Panel: React.FunctionComponent<PanelProps> = ({ type, children }) => {
  const commonOverrides: SxProps<Theme> = {
    border: 2,
    borderRadius: 2,
    padding: (theme) => theme.spacing(2),
  };
  const typeStyleOverrides = (): SxProps<Theme> => ({
    backgroundColor: `${type}.dark`,
    borderColor: `${type}.main`,
    color: `${type}.main`,
  });

  return <Box sx={{ ...commonOverrides, ...typeStyleOverrides() }}>{children}</Box>;
};

export default Panel;
