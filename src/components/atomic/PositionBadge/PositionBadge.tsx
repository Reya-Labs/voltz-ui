import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';
import React from 'react';

import { colors } from '../../../theme';
import { Typography } from '../Typography/Typography';

type PositionBadgeVariant = 'FT' | 'VT' | 'LP' | 'FC';

export type PositionBadgeProps = {
  sx?: SystemStyleObject<Theme>;
  size?: 'small' | 'medium';
  text?: string;
  variant?: PositionBadgeVariant;
};

const labels: Record<PositionBadgeVariant, string> = {
  FT: 'Fixed taker',
  VT: 'Variable taker',
  LP: 'Liquidity provider',
  FC: 'Fully collateralised',
};

const baseStyles: SystemStyleObject<Theme> = {
  border: '1px solid transparent',
  display: 'inline-block',
  padding: (theme) => theme.spacing(1, 2),
  textTransform: 'uppercase',
  borderRadius: '4px',
  fontFamily: 'PixelOperatorMono',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '14px',
};

const styles: Record<PositionBadgeVariant, SystemStyleObject<Theme>> = {
  FT: {
    ...baseStyles,
    borderColor: colors.skyBlueCrayola,
    color: colors.skyBlueCrayola,
    background: colors.skyBlueCrayola5,
  },
  VT: {
    ...baseStyles,
    borderColor: 'secondary.base',
    color: 'secondary.base',
    background: 'tertiary.base',
  },
  LP: {
    ...baseStyles,
    borderColor: colors.lavenderWeb8,
    color: colors.skyBlueCrayola,
    /* Liberty 6 */
    background: '#19152A',
  },
  FC: {
    ...baseStyles,
    borderColor: colors.skyBlueCrayola,
    color: colors.skyBlueCrayola,
    background: 'transparent',
  },
};

/**
 * Returns the 2 letter variant for a position type
 * @param positionType - positionType from your position (1, 2 or 3)
 */
export const getPositionBadgeVariant = (positionType: number) => {
  switch (positionType) {
    case 1:
      return 'FT';
    case 2:
      return 'VT';
    case 3:
      return 'LP';
  }
};

export const PositionBadge = ({ size = 'medium', sx = {}, text, variant }: PositionBadgeProps) => {
  if (variant)
    return (
      <Box sx={{ ...sx, ...styles[variant] }}>
        <Typography
          sx={{ color: 'unset', fontSize: size === 'small' ? '12px' : '14px', lineHeight: '1' }}
          variant="body2"
        >
          {text || labels[variant]}
        </Typography>
      </Box>
    );

  return null;
};
