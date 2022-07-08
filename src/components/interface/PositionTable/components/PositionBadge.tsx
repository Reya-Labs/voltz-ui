import React from 'react';
import { Box } from '@mui/material';
import { colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';

type PositionBadgeVariant = 'FT' | 'VT' | 'LP' | 'FC';

export type PositionBadgeProps = {
  sx?: SystemStyleObject<Theme>,
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

const PositionBadge = ({ sx = {}, variant }:PositionBadgeProps) => {
  if (variant) return (
    <Box sx={{ ...sx, ...styles[variant] }}>
      <Typography variant='body2' sx={{ color: 'unset', fontSize: '14px', lineHeight: '1' }}>
        {labels[variant]}
      </Typography>
    </Box>
  );

  return null;
}

export default PositionBadge;
