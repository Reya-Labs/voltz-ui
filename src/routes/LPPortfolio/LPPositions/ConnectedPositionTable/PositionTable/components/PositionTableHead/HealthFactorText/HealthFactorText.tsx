import React from 'react';

import {
  DangerTypography,
  HealthFactorBox,
  HealthyTypography,
  WarningTypography,
} from './HealthFactorText.styled';

interface HealthFactorTextProps {
  healthFactor: number;
}

export const HealthFactorText = ({ healthFactor }: HealthFactorTextProps) => {
  const HealthFactorTypography =
    healthFactor === 1
      ? DangerTypography
      : healthFactor === 2
      ? WarningTypography
      : HealthyTypography;

  const healthFactorText =
    healthFactor === 1 ? 'DANGER' : healthFactor === 2 ? 'WARNING' : 'HEALTHY';

  return (
    <HealthFactorBox>
      HEALTH FACTOR:&nbsp;
      <HealthFactorTypography>{healthFactorText}</HealthFactorTypography>
    </HealthFactorBox>
  );
};
