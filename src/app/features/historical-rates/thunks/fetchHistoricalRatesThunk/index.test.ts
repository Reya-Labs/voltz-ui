import { getHistoricalRates, Granularity } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { fetchHistoricalRatesThunkHandler } from '.';
import { CACHE, getCacheId } from './cache';

// Mock CACHE object
const mockCache = {
  cacheId1: { historicalRates: [] },
  cacheId360000086400000: { historicalRates: [{ time: 1, value: 10 }] },
} as never;

// Mock getHistoricalRates function
jest.mock('@voltz-protocol/v1-sdk', () => ({
  ...jest.requireActual('@voltz-protocol/v1-sdk'),
  getHistoricalRates: jest.fn(),
}));

// Mock rejectThunkWithError function
jest.mock('../../../helpers', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('./cache', () => ({
  get CACHE() {
    return mockCache;
  },
  getCacheId: jest.fn(
    (params: { timeframeMs: number; granularity: Granularity }) =>
      `cacheId${params.timeframeMs}${params.granularity}`,
  ),
}));

describe('fetchHistoricalRatesThunkHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if available', async () => {
    // Arrange
    const payload = {
      isFixed: true,
      poolId: 'ammId1',
      timeframeMs: 60 * 60 * 1000, // 1 hour
      granularity: Granularity.ONE_DAY,
    };
    const thunkAPI = { getState: jest.fn() };
    const expectedOutput = mockCache['cacheId360000086400000'];

    // Act
    const result = await fetchHistoricalRatesThunkHandler(payload, thunkAPI as never);

    // Assert
    expect(getCacheId).toHaveBeenCalledWith(payload);
    expect(getHistoricalRates).not.toHaveBeenCalled();
    expect(rejectThunkWithError).not.toHaveBeenCalled();
    expect(result).toEqual(expectedOutput);
  });

  it('should call getHistoricalRates and update CACHE with new data', async () => {
    // Arrange
    const payload = {
      isFixed: true,
      poolId: 'ammId1',
      timeframeMs: 60 * 60 * 1000, // 1 hour
      granularity: Granularity.ONE_WEEK,
    };
    const thunkAPI = { getState: jest.fn() };
    const historicalRates = [
      { time: 1, value: 10 },
      { time: 2, value: 20 },
    ];
    (getHistoricalRates as jest.Mock).mockResolvedValueOnce({ historicalRates });
    const expectedOutput = { historicalRates };

    // Act
    const result = await fetchHistoricalRatesThunkHandler(payload, thunkAPI as never);
    // Assert
    expect(getCacheId).toHaveBeenCalledWith(payload);
    expect(getHistoricalRates).toHaveBeenCalledWith({
      isFixed: true,
      filters: {
        granularity: Granularity.ONE_WEEK,
        timeframeMs: 60 * 60 * 1000,
      },
      poolId: 'ammId1',
    });
    expect(rejectThunkWithError).not.toHaveBeenCalled();
    expect(CACHE['cacheId3600000604800000']).toEqual(expectedOutput);
    expect(result).toEqual(expectedOutput);
  });

  it('should call rejectThunkWithError if getHistoricalRates throws an error', async () => {
    // Arrange
    const payload = {
      isFixed: true,
      poolId: 'ammId1',
      timeframeMs: 60 * 60 * 1000, // 1 hour
      granularity: Granularity.ONE_HOUR,
    };
    const thunkAPI = { getState: jest.fn() };
    const error = new Error('Some error');
    (rejectThunkWithError as jest.Mock).mockReturnValueOnce(error);
    (getHistoricalRates as jest.Mock).mockRejectedValueOnce(error);
    // Act
    const result = await fetchHistoricalRatesThunkHandler(payload, thunkAPI as never);

    // Assert
    expect(getCacheId).toHaveBeenCalledWith(payload);
    expect(getHistoricalRates).toHaveBeenCalledWith({
      isFixed: true,
      filters: {
        granularity: Granularity.ONE_HOUR,
        timeframeMs: 60 * 60 * 1000,
      },
      poolId: 'ammId1',
    });
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkAPI, error);
    expect(result).toBeInstanceOf(Error);
  });
});
