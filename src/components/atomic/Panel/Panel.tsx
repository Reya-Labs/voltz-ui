import Box from '@mui/material/Box';
import React from 'react';

import { colors, SystemStyleObject, Theme } from '../../../theme';

export type PanelProps = {
  variant?: 'error' | 'warning' | 'info' | 'iconLabel' | 'main' | 'grey-dashed' | 'dark' | 'darker';
  borderRadius?: 'small' | 'large';
  padding?: 'small' | 'large' | 'container';
  sx?: SystemStyleObject<Theme>;
};

export const Panel: React.FunctionComponent<PanelProps> = React.forwardRef(
  ({ variant, borderRadius = 'small', padding = 'large', sx, children }, ref) => {
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
          backgroundColor: colors.skyBlueCrayola7,
        };
      }

      switch (variant) {
        case 'main':
          return {
            backgroundColor: colors.lavenderWeb6,
          };

        case 'dark':
          return {
            backgroundColor: colors.lavenderWeb7,
          };

        case 'darker':
          return {
            backgroundColor: colors.lavenderWeb8,
          };

        case 'iconLabel':
          return {
            borderRadius: 1,
            padding: (theme) => `${theme.spacing(3)} ${theme.spacing(4)}`,
            maxWidth: 200,
            backgroundColor: colors.liberty7,
            borderColor: colors.liberty3,
            borderStyle: 'solid',
            boxShadow: '0px 4px 15px rgba(229, 225, 249, 0.1)',
            '& > *': {
              color: colors.liberty3,
            },
          };

        case 'error':
          return {
            background: 'transparent',
            border: `2px dashed ${colors.wildStrawberry}`,
            borderColor: colors.wildStrawberry,
            color: colors.wildStrawberry,
            textAlign: 'center',
          };

        case 'grey-dashed':
          return {
            background: 'transparent',
            border: `2px dashed ${colors.lavenderWeb6}`,
            borderColor: colors.lavenderWeb6,
            textAlign: 'center',
          };

        default:
          return {
            backgroundColor: colors.skyBlueCrayola3,
            borderColor: colors.skyBlueCrayola,
            '& > *': {
              color: colors.skyBlueCrayola,
            },
          };
      }
    };

    return (
      <Box ref={ref} sx={{ ...commonOverrides, ...typeStyleOverrides(), ...sx }}>
        {children}
      </Box>
    );
  },
);
