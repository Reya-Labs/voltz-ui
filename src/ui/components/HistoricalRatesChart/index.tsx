import { Granularity } from '@voltz-protocol/v1-sdk';
import { LineChart, RainbowLoader } from 'brokoli-ui';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  fetchHistoricalRatesThunk,
  selectHistoricalRates,
  selectHistoricalRatesStatus,
} from '../../../app/features/historical-rates';
import { selectChainId } from '../../../app/features/network';
import { useResponsiveQuery } from '../../hooks/useResponsiveQuery';
import { ChartFilters, ChartFiltersProps } from './ChartFilters';
import {
  ChartBox,
  LineChartBox,
  LoadingBox,
  RainbowLoaderBox,
} from './HistoricalRatesChart.styled';

type HistoricalRatesChartProps = {
  poolId: string;
  poolRateOracleId: string;
  fixedRate: number;
  variableRate: number;
};

const filterOptions: ChartFiltersProps['filterOptions'] = [
  {
    id: '1d',
    label: '1d',
    isMode: false,
  },
  {
    id: '1w',
    label: '1w',
    isMode: false,
  },
  {
    id: '1m',
    label: '1m',
    isMode: false,
  },
  {
    id: '1y',
    label: '1y',
    isMode: false,
  },
  {
    id: 'fixed',
    label: 'Fix',
    underlineColorToken: 'skyBlueCrayola',
    isMode: true,
  },
  {
    id: 'variable',
    label: 'Var',
    underlineColorToken: 'ultramarineBlue',
    isMode: true,
  },
];

export const HistoricalRatesChart: React.FunctionComponent<HistoricalRatesChartProps> = ({
  poolId,
  poolRateOracleId,
  fixedRate,
  variableRate,
}) => {
  const data = useAppSelector(selectHistoricalRates);

  const loading = useAppSelector(selectHistoricalRatesStatus) === 'pending';
  const dispatch = useAppDispatch();
  const [activeTimeRangeId, setActiveTimeRangeId] = useState<string>('1m');
  const [activeModeId, setActiveModeId] = useState<string>('variable');
  const chainId = useAppSelector(selectChainId);
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const granularity =
    activeTimeRangeId === '1d' || activeModeId === '1w'
      ? Granularity.ONE_HOUR
      : Granularity.ONE_DAY;
  const timeframe =
    activeTimeRangeId === '1d'
      ? 1
      : activeTimeRangeId === '1w'
      ? 7
      : activeTimeRangeId === '1m'
      ? 31
      : 365;
  const isFixed = activeModeId === 'fixed';
  useEffect(() => {
    if (!poolId || !poolRateOracleId || !chainId) {
      return;
    }
    void dispatch(
      fetchHistoricalRatesThunk({
        isFixed,
        granularity,
        timeframeMs: timeframe * 24 * 60 * 60 * 1000,
        poolId: poolId,
      }),
    );
  }, [dispatch, timeframe, isFixed, granularity, chainId, poolId, poolRateOracleId]);

  let yMarker = -100;
  if (fixedRate !== null && !isFixed) {
    yMarker = fixedRate;
  }
  if (variableRate !== null && isFixed) {
    yMarker = variableRate;
  }

  return (
    <ChartBox>
      <LineChartBox>
        {loading ? (
          <LoadingBox>
            <RainbowLoaderBox>
              <RainbowLoader height={2} text="Printing historical rates..." />
            </RainbowLoaderBox>
          </LoadingBox>
        ) : null}
        <LineChart
          axisBottomFormat={activeTimeRangeId === '1d' ? 'hours' : 'days'}
          axisTypographyToken={
            isLargeDesktopDevice ? 'secondaryBodySmallRegular' : 'primaryBodyXSmallRegular'
          }
          colorToken={isFixed ? 'skyBlueCrayola' : 'ultramarineBlue'}
          data={[
            {
              id: 'graph1',
              data: data,
            },
          ]}
          yMarker={yMarker}
          yMarkerColorToken={isFixed ? 'ultramarineBlue3' : 'skyBlueCrayola3'}
          yMarkerText={
            isFixed
              ? `Current Variable Rate: ${yMarker.toFixed(2)}%`
              : `Current Fixed Rate: ${yMarker.toFixed(2)}%`
          }
          yMarkerTypographyToken="secondaryBodyXSmallRegular"
        />
      </LineChartBox>
      <ChartFilters
        activeModeId={activeModeId}
        activeTimeRangeId={activeTimeRangeId}
        disabled={loading}
        filterOptions={filterOptions}
        onModeChange={setActiveModeId}
        onTimeRangeChange={setActiveTimeRangeId}
      />
    </ChartBox>
  );
};
