import { RootState } from '../../store';

export const selectHistoricalRates = (
  state: RootState,
): {
  x: Date;
  y: number;
}[] =>
  state.historicalRates.historicalRates.map((d) => ({
    x: new Date(d.timestampInMs),
    y: d.value * 100,
  }));
export const selectHistoricalRatesStatus = (state: RootState) => state.historicalRates.status;
export const selectOppositeSideCurrentRate = (state: RootState) =>
  state.historicalRates.oppositeSideCurrentRate;
