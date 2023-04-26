import { RatesData } from '@voltz-protocol/v1-sdk';

import { historicalRatesReducer, SliceState } from './reducer';
import { fetchHistoricalRatesThunk } from './thunks';

// Define the mock payload
const mockPayload: RatesData = {
  historicalRates: [
    {
      date: new Date('2023-04-25T00:00:00Z'),
      rate: 1.5,
    },
    {
      date: new Date('2023-04-24T00:00:00Z'),
      rate: 1.2,
    },
  ],
} as never;

// Define the mock state
const initialState: SliceState = {
  historicalRates: [],
  status: 'idle',
};

describe('historicalRatesReducer', () => {
  it('should update status to "pending" when fetchHistoricalRatesThunk is pending', () => {
    const nextState = historicalRatesReducer(initialState, {
      type: fetchHistoricalRatesThunk.pending.type,
    });
    expect(nextState.status).toEqual('pending');
  });

  it('should update status to "failed" and set historicalRates to an empty array when fetchHistoricalRatesThunk is rejected', () => {
    const nextState = historicalRatesReducer(initialState, {
      type: fetchHistoricalRatesThunk.rejected.type,
    });
    expect(nextState.status).toEqual('failed');
    expect(nextState.historicalRates).toEqual([]);
  });

  it('should update historicalRates and status to "succeeded" when fetchHistoricalRatesThunk is fulfilled', () => {
    const nextState = historicalRatesReducer(initialState, {
      type: fetchHistoricalRatesThunk.fulfilled.type,
      payload: mockPayload,
    });
    expect(nextState.historicalRates).toEqual(mockPayload.historicalRates);
    expect(nextState.status).toEqual('succeeded');
  });
});
