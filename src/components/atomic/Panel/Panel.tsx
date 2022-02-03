import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';

export type PanelProps = {
  variant?: 'error' | 'warning' | 'info' | 'main' | 'dark' | 'darker';
  sx?: SystemStyleObject<Theme>;
};

const Panel: React.FunctionComponent<PanelProps> = ({ variant, sx, children }) => {
  const commonOverrides: SystemStyleObject<Theme> = {
    border: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    padding: (theme) => theme.spacing(2),
  };
  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!variant) {
      return {
        backgroundColor: `primary.dark`,
      };
    }

    switch (variant) {
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
          backgroundColor: `${variant}.main`,
          borderColor: `${variant}.light`,
          '& > *': {
            color: `${variant}.light`,
          },
        };
    }
  };

  return <Box sx={{ ...commonOverrides, ...typeStyleOverrides(), ...sx }}>{children}</Box>;
};

export default Panel;
