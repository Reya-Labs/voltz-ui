import React from 'react';
import { Box } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';
import { colors } from '@theme';
import { Typography } from '@components/atomic';

type PositionBadgeVariant = 'FT' | 'VT' | 'LP' | 'FC';

export type PositionBadgeProps = {
  sx?: SystemStyleObject<Theme>;
  size?: 'small' | 'medium'
  text?: string;
  variant?: PositionBadgeVariant;
}

const labels:Record<PositionBadgeVariant, string> = {
  FT: 'Fixed taker',
  VT: 'Variable taker',
  LP: 'Liquidity provider',
  FC: 'Fully collateralised'
}

const baseStyles:SystemStyleObject<Theme> = {
  border: '1px solid transparent',
  display: 'inline-block',
  padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
  textTransform: 'uppercase',
  borderRadius: '4px',
}

const styles:Record<PositionBadgeVariant, SystemStyleObject<Theme>> = {
  FT: {
    ...baseStyles,
    borderColor: 'primary.base',
    color: 'primary.base',
    background: colors.skyBlueCrayola.darken030
  },
  VT: {
    ...baseStyles,
    borderColor: 'secondary.base',
    color: 'secondary.base',
    background: 'tertiary.base'
  },
  LP: {
    ...baseStyles,
    borderColor: colors.lavenderWeb.darken045,
    color: 'primary.base',
    background: colors.lavenderWeb.darken045
  },
  FC: {
    ...baseStyles,
    borderColor: 'primary.base',
    color: 'primary.base',
    background: 'transparent'
  }
}

/**
 * Returns the 2 letter variant for a position type
 * @param positionType - positionType from your position (1, 2 or 3)
 */
export const getPositionBadgeVariant = (positionType: number) => {
  switch(positionType) {
    case 1:
      return 'FT';
    case 2:
      return 'VT';
    case 3:
      return 'LP';
  }
};

export const PositionBadge = ({ size='medium', sx = {}, text, variant }:PositionBadgeProps) => {
  if (variant) return (
    <Box sx={{ ...sx, ...styles[variant] }}>
      <Typography variant='body2' sx={{ color: 'unset', fontSize: size === 'small' ? '12px' : '14px', lineHeight: '1' }}>
        {text || labels[variant]}
      </Typography>
    </Box>
  );

  return null;
}

export default PositionBadge;
