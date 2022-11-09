import isUndefined from 'lodash.isundefined';

import { colors } from '../../../theme';

interface HealthFactorTextProps {
  healthFactor?: number;
  label?: string;
  showNumber?: boolean;
}

export const getHealthTextColor = (healthFactor = 1) => {
  return healthFactor === 1
    ? colors.wildStrawberry
    : healthFactor === 2
    ? colors.orangeYellow
    : colors.skyBlueCrayola;
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
