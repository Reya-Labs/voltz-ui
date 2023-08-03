import { ColorTokens, Donut } from 'brokoli-ui';
import React from 'react';

import { MarginAccountUI } from '../../../../../../../app/features/portfolio/types';

const MarginRatioColorMap: Record<MarginAccountUI['marginRatioHealth'], ColorTokens | undefined> = {
  danger: 'wildStrawberry',
  healthy: 'skyBlueCrayola',
  warning: 'orangeYellow',
};

export const MarginRatioDonut: React.FunctionComponent<{
  health: MarginAccountUI['marginRatioHealth'];
  percentage: number;
}> = ({ health, percentage }) => {
  if (MarginRatioColorMap[health] === undefined) {
    return null;
  }
  return (
    <Donut
      colorToken={MarginRatioColorMap[health]!}
      holeColorToken="lavenderWeb8"
      percentage={percentage}
    />
  );
};
