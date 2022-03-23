import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type SwapMinimumMarginAmountProps = {
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  isFT?: boolean;
};

const SwapMinimumMarginAmount: React.FunctionComponent<SwapMinimumMarginAmountProps> = ({
  fixedLow,
  fixedHigh,
  notional,
}) => {
  const { swapMinimumMarginRequirement } = useAMMContext();
  const { result, loading, call } = swapMinimumMarginRequirement;

  useEffect(() => {
    if (!isUndefined(fixedLow) && !isUndefined(fixedHigh) && !isUndefined(notional)) {
      call({ fixedLow, fixedHigh, notional });
    }
  }, [call, fixedLow, fixedHigh, notional]);

  const renderMarginAmount = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '0';
    }

    return result.toFixed(2);
  };

  return (
    <Typography variant="h3" label="Minimum Margin Amount">
      {renderMarginAmount()}
    </Typography>
  );
};

export default SwapMinimumMarginAmount;
