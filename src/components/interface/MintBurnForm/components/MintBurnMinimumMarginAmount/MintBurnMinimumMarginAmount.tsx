import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type MintBurnMinimumMarginAmountProps = {
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
};

const MintBurnMinimumMarginAmount: React.FunctionComponent<MintBurnMinimumMarginAmountProps> = ({
  fixedLow,
  fixedHigh,
  notional,
}) => {
  const { mintMinimumMarginRequirement } = useAMMContext();
  const { result, loading, call } = mintMinimumMarginRequirement;

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

export default MintBurnMinimumMarginAmount;
