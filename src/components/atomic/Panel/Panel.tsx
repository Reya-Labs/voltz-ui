import React from 'react';
import { SxProps, Theme } from '@mui/system';
import Box from '@mui/material/Box';

export type PanelProps = {
  type?: 'error' | 'warning' | 'info' | 'main' | 'dark' | 'darker';
};

const Panel: React.FunctionComponent<PanelProps> = ({ type, children }) => {
  const commonOverrides: SxProps<Theme> = {
    border: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    padding: (theme) => theme.spacing(2),
  };
  const typeStyleOverrides = (): SxProps<Theme> => {
    if (!type) {
      return {
        backgroundColor: `primary.dark`,
      };
    }

    switch (type) {
      case 'main':
        return {
          backgroundColor: `secondary.darken030`,
        };

      case 'dark':
        return {
          backgroundColor: `secondary.darken040`,
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken050`,
        };

      default:
        return {
          backgroundColor: `${type}.main`,
          borderColor: `${type}.light`,
          '& > *': {
            color: `${type}.light`,
          },
        };
    }
  };

  return <Box sx={{ ...commonOverrides, ...typeStyleOverrides() }}>{children}</Box>;
};

export default Panel;
