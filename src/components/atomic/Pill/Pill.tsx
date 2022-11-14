import React from 'react';
import {
  WildStrawberryPill,
  OrangeYellowPill,
  SkyBlueCrayolaPill,
  LibertyDarkPill,
  LibertyPill,
  PillTypography,
} from './Pill.styled';

export type PillProps = {
  text: string;
  className?: string;
  variant: 'wildStrawberry' | 'orangeYellow' | 'skyBlueCrayola' | 'liberty' | 'libertyDark';
};

const PillUIMap: Record<PillProps['variant'], typeof PillTypography> = {
  liberty: LibertyPill,
  libertyDark: LibertyDarkPill,
  orangeYellow: OrangeYellowPill,
  skyBlueCrayola: SkyBlueCrayolaPill,
  wildStrawberry: WildStrawberryPill,
};

export const Pill = ({ text, variant, className }: PillProps) => {
  const PillUI = PillUIMap[variant] || PillUIMap['wildStrawberry'];

  return (
    <PillUI component="span" className={className} coloringVariant={variant}>
      {text}
    </PillUI>
  );
};
