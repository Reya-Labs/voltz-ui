import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type MinimumMarginAmountSwapProps = {
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  isFT?: boolean;
};

const MinimumMarginAmountSwap: React.FunctionComponent<MinimumMarginAmountSwapProps> = ({
  fixedLow,
  fixedHigh,
  notional,
  isFT
}) => {
  const { loadMinimumMarginAmountSwap, minimumMarginAmountSwapLoading, minimumMarginAmountSwap } =
    useAMMContext();

  useEffect(() => {
    if (!isUndefined(fixedLow) && !isUndefined(fixedHigh) && !isUndefined(notional) && !isUndefined(isFT)) {
      loadMinimumMarginAmountSwap({ fixedLow, fixedHigh, notional, isFT });
    }
  }, [loadMinimumMarginAmountSwap, fixedLow, fixedHigh, notional]);

  const renderMarginAmount = () => {
    if (minimumMarginAmountSwapLoading) {
      return 'Loading...';
    }

    if (!minimumMarginAmountSwap) {
      return '0';
    }

    return minimumMarginAmountSwap.toFixed(2);
  };

  return (
    <Typography variant="h3" label="Minimum Margin Amount">
      {renderMarginAmount()}
    </Typography>
  );
};

export default MinimumMarginAmountSwap;
