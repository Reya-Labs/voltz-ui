import React, { useEffect } from 'react';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type MinimumMarginAmountProps = {};

const MinimumMarginAmount: React.FunctionComponent<MinimumMarginAmountProps> = ({
}) => {
  const { loadMinimumMarginAmount, minimumMarginAmount, minimumMarginAmountLoading } = useAMMContext();

  useEffect(() => {
    loadMinimumMarginAmount();
  }, [minimumMarginAmountLoading]);

  return (
      <Typography variant="h3" label="Minimum Margin Amount">
        {minimumMarginAmountLoading ? 'Loading...' : (minimumMarginAmount) ? minimumMarginAmount.toFixed(2) : "0" || "0"}
      </Typography>
  );
};

export default MinimumMarginAmount;
