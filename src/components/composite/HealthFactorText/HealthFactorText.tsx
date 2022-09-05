import React from 'react';
import { isUndefined } from 'lodash';

interface HealthFactorTextProps {
  healthFactor?: number;
  label?: string;
  showNumber?: boolean;
}

export const getHealthTextColor = (healthFactor = 1) => {
  return (healthFactor === 1) ? '#F61067' : (healthFactor === 2 ? '#F1D302' : '#00d395');
};

export const getFixedRateHealthTextColor = (fixedRateHealthFactor = 1) => {
  return (fixedRateHealthFactor === 1) ? '#F61067' : (fixedRateHealthFactor === 2 ? '#F1D302' :  '#00d395' );
}

export const HealthFactorText = ({ healthFactor, label = 'Health factor: ', showNumber = false }: HealthFactorTextProps) => {
  if(isUndefined(healthFactor)) return null;

  const healthFactorText = healthFactor === 1 ? 'DANGER' : healthFactor === 2 ? 'WARNING' : 'HEALTHY';
  
  return (
    <>
      {label}
      <span style={{color: getHealthTextColor(healthFactor)}}>
        {" "}{showNumber ? healthFactor : healthFactorText}
      </span>
    </>
  )
}

export default HealthFactorText;