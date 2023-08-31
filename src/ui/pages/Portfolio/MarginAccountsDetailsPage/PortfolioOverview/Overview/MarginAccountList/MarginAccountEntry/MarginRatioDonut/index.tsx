import { Donut } from 'brokoli-ui';
import React from 'react';

import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { MARGIN_RATIO_COLOR_MAP } from './constants';

export const MarginRatioDonut: React.FunctionComponent<{
  health: MarginAccountUI['marginRatioHealth'];
  percentage: number;
}> = ({ health, percentage }) => {
  if (MARGIN_RATIO_COLOR_MAP[health] === undefined) {
    return null;
  }
  return (
    <Donut
      colorToken={MARGIN_RATIO_COLOR_MAP[health]!}
      holeColorToken="lavenderWeb8"
      percentage={percentage}
    />
  );
};
