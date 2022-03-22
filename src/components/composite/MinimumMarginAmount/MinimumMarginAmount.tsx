import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';
import IconLabel from '../IconLabel/IconLabel';

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
    <Typography
      variant="h3"
      label={
        <IconLabel
          label="minimum margin amount"
          icon="information-circle"
          info="Lorem Ipsum is standard dummy text, or placeholder text, used to visualize what text would look like, such as font, typography and layout. It is easier to identify visual aspects using lorem ipsum as opposed to writing or other filler text. For those of you who don't know what Lorem Ipsum looks like or have never seen it before, here it is:"
        />
      }
    >
      {renderMarginAmount()}
    </Typography>
  );
};

export default MinimumMarginAmount;
