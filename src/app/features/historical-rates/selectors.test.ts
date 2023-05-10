import { selectHistoricalRates, selectHistoricalRatesStatus } from './selectors';

describe('historicalRates.selectors', () => {
  describe('selectHistoricalRates', () => {
    it('should return empty array when status is "idle"', () => {
      // Arrange
      const state = {
        historicalRates: {
          historicalRates: [],
          status: 'idle',
        },
      };

      // Act
      const result = selectHistoricalRates(state as never);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when status is "failed"', () => {
      // Arrange
      const state = {
        historicalRates: {
          historicalRates: [],
          status: 'failed',
        },
      };

      // Act
      const result = selectHistoricalRates(state as never);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return mapped historicalRates when status is "succeeded"', () => {
      // Arrange
      const state = {
        historicalRates: {
          historicalRates: [
            { timestampInMs: 1620302400000, value: 1 },
            { timestampInMs: 1620306000000, value: 2 },
            { timestampInMs: 1620309600000, value: 3 },
          ],
          status: 'succeeded',
        },
      };

      // Act
      const result = selectHistoricalRates(state as never);

      // Assert
      expect(result).toEqual([
        { x: new Date(1620302400000), y: 100 },
        { x: new Date(1620306000000), y: 200 },
        { x: new Date(1620309600000), y: 300 },
      ]);
    });
  });

  describe('selectHistoricalRatesStatus', () => {
    it('should return "pending" when status is "pending"', () => {
      // Arrange
      const state = {
        historicalRates: {
          historicalRates: [],
          status: 'pending',
        },
      };

      // Act
      const result = selectHistoricalRatesStatus(state as never);

      // Assert
      expect(result).toEqual('pending');
    });
  });
});
