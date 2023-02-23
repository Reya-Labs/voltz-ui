import { LineChart } from 'brokoli-ui';
import React from 'react';

import { ChartBox } from './Chart.styled';
import { mockData } from './mock-data';
type ChartProps = {};

export const Chart: React.FunctionComponent<ChartProps> = () => {
  return (
    <ChartBox>
      <LineChart
        colorToken="ultramarineBlue"
        data={mockData}
        yMarker={2.35}
        yMarkerColorToken="skyBlueCrayola3"
        yMarkerText="Fixed rate"
      />
    </ChartBox>
  );
};
