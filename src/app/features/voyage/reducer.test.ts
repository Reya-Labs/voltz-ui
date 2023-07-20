import { voyageReducer } from './reducer';
import { initialState } from './state';
import { fetchVoyageBadgesThunk } from './thunks';

describe('voyageReducer', () => {
  it('should return the initial state', () => {
    expect(voyageReducer(undefined, {} as never)).toEqual(initialState);
  });

  it('should handle fetchVoyageBadgesThunk.pending', () => {
    const chainId = 1;
    const account = '0x123456789';
    const nextState = voyageReducer(initialState, {
      type: fetchVoyageBadgesThunk.pending,
      meta: { arg: { chainId, account } },
    });

    const voyageId = `${chainId}-${account}`;
    expect(nextState.status[voyageId]).toEqual('pending');
  });

  it('should handle fetchVoyageBadgesThunk.rejected', () => {
    const chainId = 1;
    const account = '0x123456789';
    const nextState = voyageReducer(initialState, {
      type: fetchVoyageBadgesThunk.rejected,
      meta: { arg: { chainId, account } },
    });

    const voyageId = `${chainId}-${account}`;
    expect(nextState.status[voyageId]).toEqual('failed');
    expect(nextState.badges[voyageId]).toEqual([]);
  });

  it('should handle fetchVoyageBadgesThunk.fulfilled', () => {
    const chainId = 1;
    const account = '0x123456789';
    const payload = [{ id: 'v1' }, { id: 'v2' }];
    const nextState = voyageReducer(initialState, {
      type: fetchVoyageBadgesThunk.fulfilled,
      payload,
      meta: { arg: { chainId, account } },
    });

    const voyageId = `${chainId}-${account}`;
    expect(nextState.status[voyageId]).toEqual('succeeded');
    expect(nextState.badges[voyageId]).toEqual(payload);
  });
});
