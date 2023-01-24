import { HealthFactorStatus } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';

import { colors } from '../../../theme';

type HealthFactorTextProps = {
  healthFactor?: number;
  label?: string;
  showNumber?: boolean;
};

export const getHealthTextColor = (healthFactor = 1) => {
  return healthFactor === HealthFactorStatus.DANGER
    ? colors.vzCustomRed1.base
    : healthFactor === HealthFactorStatus.WARNING
    ? colors.vzCustomYellow1.base
    : colors.vzCustomGreen2.base;
};

export const HealthFactorText = ({
  healthFactor,
  label = 'Health factor: ',
  showNumber = false,
}: HealthFactorTextProps) => {
  if (isUndefined(healthFactor)) return null;

  const healthFactorText =
    healthFactor === HealthFactorStatus.DANGER
      ? 'DANGER'
      : healthFactor === HealthFactorStatus.WARNING
      ? 'WARNING'
      : 'HEALTHY';

  return (
    <>
      {label}
      <span style={{ color: getHealthTextColor(healthFactor) }}>
        {showNumber ? healthFactor : healthFactorText}
      </span>
    </>
  );
};
