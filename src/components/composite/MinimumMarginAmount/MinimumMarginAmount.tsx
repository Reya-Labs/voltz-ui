import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type MinimumMarginAmountProps = {
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
};

const MinimumMarginAmount: React.FunctionComponent<MinimumMarginAmountProps> = ({
  fixedLow,
  fixedHigh,
  notional,
}) => {
  const { loadMinimumMarginAmount, minimumMarginAmountLoading, minimumMarginAmount } =
    useAMMContext();

  useEffect(() => {
    if (!isUndefined(fixedLow) && !isUndefined(fixedHigh) && !isUndefined(notional)) {
      loadMinimumMarginAmount({ fixedLow, fixedHigh, notional });
    }
  }, [loadMinimumMarginAmount, fixedLow, fixedHigh, notional]);

  const renderMarginAmount = () => {
    if (minimumMarginAmountLoading) {
      return 'Loading...';
    }

    if (!minimumMarginAmount) {
      return '0';
    }

    return minimumMarginAmount.toFixed(2);
  };

  return (
    <Typography variant="h3" label="Minimum Margin Amount">
      {renderMarginAmount()}
    </Typography>
  );
};

export default MinimumMarginAmount;
