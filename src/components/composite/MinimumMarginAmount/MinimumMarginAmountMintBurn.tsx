import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type MinimumMarginAmountMintBurnProps = {
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
};

const MinimumMarginAmountMintBurn: React.FunctionComponent<MinimumMarginAmountMintBurnProps> = ({
  fixedLow,
  fixedHigh,
  notional,
}) => {
  const { loadMinimumMarginAmountMintBurn, minimumMarginAmountMintBurnLoading, minimumMarginAmountMintBurn } =
    useAMMContext();

  useEffect(() => {
    if (!isUndefined(fixedLow) && !isUndefined(fixedHigh) && !isUndefined(notional)) {
      loadMinimumMarginAmountMintBurn({ fixedLow, fixedHigh, notional });
    }
  }, [loadMinimumMarginAmountMintBurn, fixedLow, fixedHigh, notional]);

  const renderMarginAmount = () => {
    if (minimumMarginAmountMintBurnLoading) {
      return 'Loading...';
    }

    if (!minimumMarginAmountMintBurn) {
      return '0';
    }

    return minimumMarginAmountMintBurn.toFixed(2);
  };

  return (
    <Typography variant="h3" label="Minimum Margin Amount">
      {renderMarginAmount()}
    </Typography>
  );
};

export default MinimumMarginAmountMintBurn;
