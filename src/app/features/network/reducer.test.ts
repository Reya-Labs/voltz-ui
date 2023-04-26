import { networkReducer, SliceState } from './reducer';
import { setChainIdThunk } from './thunks';

// Define the mock state
const mockState: SliceState = {
  chainId: null,
  isSupportedChain: true,
  chainChangeState: 'idle',
};

// Define the mock setChainIdThunk
const mockPayload = {
  chainId: 1,
  isSupportedChain: true,
};

describe('networkReducer', () => {
  it('should update chainChangeState to "pending" when setChainIdThunk is pending', () => {
    const nextState = networkReducer(mockState, {
      type: setChainIdThunk.pending.type,
    });
    expect(nextState.chainChangeState).toEqual('pending');
  });

  it('should update chainChangeState to "error" when setChainIdThunk is rejected', () => {
    const nextState = networkReducer(mockState, {
      type: setChainIdThunk.rejected.type,
    });
    expect(nextState.chainChangeState).toEqual('error');
  });

  it('should update chainId, isSupportedChain and chainChangeState to the correct values when setChainIdThunk is fulfilled', () => {
    const nextState = networkReducer(mockState, {
      type: setChainIdThunk.fulfilled.type,
      meta: {
        arg: mockPayload,
      },
    });
    expect(nextState.chainId).toEqual(mockPayload.chainId);
    expect(nextState.isSupportedChain).toEqual(mockPayload.isSupportedChain);
    expect(nextState.chainChangeState).toEqual('success');
  });
});
