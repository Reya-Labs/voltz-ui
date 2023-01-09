import React from 'react';

import { PillTypography, PillTypographyVariant } from './Pill.styled';

export type PillProps = {
  text: string;
  className?: string;
  variant: PillTypographyVariant;
};

export const Pill = ({ text, variant, className }: PillProps) => (
  <PillTypography
    className={className}
    coloringVariant={variant}
    component="span"
    data-testid={`Pill-PillTypography-${variant}`}
  >
    {text}
  </PillTypography>
);
