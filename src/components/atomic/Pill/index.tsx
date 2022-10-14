import React from 'react';
import { BaseColors, colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';

export type PillProps = {
  sx?: SystemStyleObject<Theme>;
  text: string;
  variant: Extract<BaseColors, 'wildStrawberry' | 'orangeYellow' | 'skyBlueCrayola'>;
};

export const Pill = ({ text, variant, sx }: PillProps) => (
  <Typography
    component="span"
    sx={{
      fontSize: '14px',
      lineHeight: '14px',
      padding: (theme) => theme.spacing(1, 2),
      color: colors[variant].base,
      background: colors[variant].darken035,
      borderRadius: '4px',
      fontFamily: 'PixelOperatorMono',
      ...sx,
    }}
  >
    {text}
  </Typography>
);
