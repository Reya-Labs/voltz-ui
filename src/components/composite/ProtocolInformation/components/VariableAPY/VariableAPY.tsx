import React, { useEffect } from 'react';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

const VariableAPY: React.FunctionComponent = () => {
  const { variableApy } = useAMMContext();
  const { result, loading, call } = variableApy;

  useEffect(() => {
    call();
  }, [call]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '0%';
    }

    return `${(result * 100).toFixed(2)}%`;
  };

  return (
    <Typography variant="h3" label="Variable APY">
      {renderValue()}
    </Typography>
  );
};

export default VariableAPY;
