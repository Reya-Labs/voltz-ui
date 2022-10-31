import React from 'react';
import { PillTypography, PillTypographyVariant } from './Pill.styled';

export type PillProps = {
  text: string;
  className?: string;
  variant: PillTypographyVariant;
};

export const Pill = ({ text, variant, className }: PillProps) => (
  <PillTypography component="span" className={className} coloringVariant={variant}>
    {text}
  </PillTypography>
);
