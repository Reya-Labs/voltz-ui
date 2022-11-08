import React from 'react';
import { isUndefined } from 'lodash';
import { colors } from '@theme';

interface HealthFactorTextProps {
  healthFactor?: number;
  label?: string;
  showNumber?: boolean;
}

export const getHealthTextColor = (healthFactor = 1) => {
  return healthFactor === 1 ? colors.vzCustomRed1.base : healthFactor === 2 ? colors.vzCustomYellow1.base : colors.vzCustomGreen2.base;
};

export const HealthFactorText = ({
  healthFactor,
  label = 'Health factor: ',
  showNumber = false,
}: HealthFactorTextProps) => {
  if (isUndefined(healthFactor)) return null;

  const healthFactorText =
    healthFactor === 1 ? 'DANGER' : healthFactor === 2 ? 'WARNING' : 'HEALTHY';

  return (
    <>
      {label}
      <span style={{ color: getHealthTextColor(healthFactor) }}>
        {showNumber ? healthFactor : healthFactorText}
      </span>
    </>
  );
};

export default HealthFactorText;
