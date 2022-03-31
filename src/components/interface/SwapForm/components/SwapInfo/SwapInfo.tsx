import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type SwapInfoProps = {
  notional?: number;
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ notional }) => {
  const { swapInfo } = useAMMContext();
  const { result, loading, call } = swapInfo;

  useEffect(() => {
    if (!isUndefined(notional)) {
      call({ notional });
    }
  }, [call, notional]);

  const renderMarginAmount = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '0';
    }

    return result.marginRequirement.toFixed(2);
  };

  return (
    <Typography variant="h3" label="Swap info">
      {renderMarginAmount()}
    </Typography>
  );
};

export default SwapInfo;
