import { Donut } from 'brokoli-ui';
import React from 'react';

import { MarginAccountUI } from '../../../app/features/portfolio/types';
import { MARGIN_RATIO_COLOR_MAP } from './constants';

export type MarginRatioDonutProps = {
  health: MarginAccountUI['marginRatioHealth'];
  percentage: number;
};

export const MarginRatioDonut: React.FunctionComponent<MarginRatioDonutProps> = ({
  health,
  percentage,
}) => {
  if (MARGIN_RATIO_COLOR_MAP[health] === undefined) {
    return null;
  }
  return (
    <Donut
      colorToken={`${MARGIN_RATIO_COLOR_MAP[health]!}100`}
      holeColorToken="white900"
      percentage={percentage}
    />
  );
};
