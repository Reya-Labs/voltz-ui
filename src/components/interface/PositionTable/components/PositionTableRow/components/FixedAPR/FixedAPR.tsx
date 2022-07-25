import React, { useEffect } from 'react';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';

const FixedAPR: React.FunctionComponent = () => {
  const { fixedApr } = useAMMContext();
  const { result, loading, call } = fixedApr;

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

    return `${result.toFixed(2)}%`;
  };

  return (
    <Typography
      variant="h3"
      label={<IconLabel label="fixed apr" icon="information-circle" info="something" removeIcon />}
      agentStyling
    >
      {renderValue()}
    </Typography>
  );
};

export default FixedAPR;
