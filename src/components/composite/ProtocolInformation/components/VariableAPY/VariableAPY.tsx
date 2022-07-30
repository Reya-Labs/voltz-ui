import React, { useEffect } from 'react';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import IconLabel from '../../../IconLabel/IconLabel';

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
    <Typography
      variant="h3"
      label={<IconLabel label="variable apy" icon="information-circle" info="The historical Annual Percentage Yield of the pool. The value is computed by aggregating the historical rates of the underlying rate oracle over a fixed look-back window." removeIcon />}
      agentStyling
    >
      {renderValue()}
    </Typography>
  );
};

export default VariableAPY;
