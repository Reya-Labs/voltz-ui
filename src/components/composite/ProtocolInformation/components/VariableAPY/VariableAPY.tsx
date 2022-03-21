import React, { useEffect } from 'react';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type VariableAPYProps = {};

const VariableAPY: React.FunctionComponent<VariableAPYProps> = () => {
  const { loadVariableApy, variableApy, variableApyLoading } = useAMMContext();

  useEffect(() => {
    loadVariableApy();
  }, [loadVariableApy]);

  return (
      <Typography variant="h3" label="Variable APY">
        {variableApyLoading ? 'Loading...' : `${(variableApy) ? (variableApy*100).toFixed(2) : "0" || "0"}%`}
      </Typography>
  );
};

export default VariableAPY;
