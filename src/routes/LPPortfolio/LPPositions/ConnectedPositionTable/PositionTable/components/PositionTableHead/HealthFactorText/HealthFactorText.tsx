import { HealthFactorStatus } from '@voltz-protocol/v1-sdk';
import React from 'react';

import {
  DangerTypography,
  HealthFactorBox,
  HealthyTypography,
  WarningTypography,
} from './HealthFactorText.styled';

interface HealthFactorTextProps {
  healthFactor: HealthFactorStatus;
}

export const HealthFactorText = ({ healthFactor }: HealthFactorTextProps) => {
  const HealthFactorTypography =
    healthFactor === HealthFactorStatus.DANGER
      ? DangerTypography
      : healthFactor === HealthFactorStatus.WARNING
      ? WarningTypography
      : HealthyTypography;

  const healthFactorText =
    healthFactor === HealthFactorStatus.DANGER
      ? 'DANGER'
      : healthFactor === HealthFactorStatus.WARNING
      ? 'WARNING'
      : 'HEALTHY';

  return (
    <HealthFactorBox>
      HEALTH FACTOR:&nbsp;
      <HealthFactorTypography>{healthFactorText}</HealthFactorTypography>
    </HealthFactorBox>
  );
};
