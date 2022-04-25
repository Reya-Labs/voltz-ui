import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';

export type PanelProps = {
  variant?: 'error' | 'warning' | 'info' | 'iconLabel' | 'main' | 'dark' | 'darker' ;
  borderRadius?: 'small' | 'large';
  padding?: 'small' | 'large' | 'container'; 
  sx?: SystemStyleObject<Theme>;
};

const Panel: React.FunctionComponent<PanelProps> = ({ variant, borderRadius = 'small', padding = 'large', sx, children }) => {
  const commonOverrides: SystemStyleObject<Theme> = {
    border: 1,
    borderColor: 'transparent',
    borderRadius: borderRadius === 'small' ? '8px' : '16px',
    boxSizing: 'border-box',
    padding: (theme) => {
      if (padding === 'small') return theme.spacing(4);
      if (padding === 'large') return theme.spacing(6);
      return `${theme.spacing(4)} ${theme.spacing(6)} ${theme.spacing(6)}`;
    },
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
          backgroundColor: `secondary.darken040`,
        };

      case 'dark':
        return {
          backgroundColor: `secondary.darken045`,
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken050`,
        };
      
      case 'iconLabel':
        return {
          borderRadius: 1, 
          padding: (theme) => `${theme.spacing(3)} ${theme.spacing(4)}`,
          maxWidth: 200, 
          backgroundColor: "#0F0C1D",
          borderColor: "#383545", 
          borderStyle: "solid", 
          boxShadow: '0px 4px 15px rgba(229, 225, 249, 0.1)',
          '& > *': {
            color: `${variant}.light`,
          },
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
