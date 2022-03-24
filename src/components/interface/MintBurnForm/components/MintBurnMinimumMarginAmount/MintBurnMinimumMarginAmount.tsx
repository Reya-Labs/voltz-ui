import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';

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
    <Typography
      variant="h3"
      label={
        <IconLabel
          label="additional margin amount"
          icon="information-circle"
          info="Lorem Ipsum is standard dummy text, or placeholder text, used to visualize what text would look like, such as font, typography and layout. It is easier to identify visual aspects using lorem ipsum as opposed to writing or other filler text. For those of you who don't know what Lorem Ipsum looks like or have never seen it before, here it is:"
        />
      }
    >
      {renderMarginAmount()}
    </Typography>
  );
};

export default MintBurnMinimumMarginAmount;
