import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { lpOptimisersReducer, SliceState, updateOptimiserStateAction } from './reducer';
import { initialiseOptimisersThunk } from './thunks';

// Define the mock state
const mockState: SliceState = {
  optimisersLoadedState: {
    [SupportedChainId.mainnet]: 'idle',
    [SupportedChainId.goerli]: 'idle',
    [SupportedChainId.arbitrum]: 'idle',
    [SupportedChainId.arbitrumGoerli]: 'idle',
  },
  optimisers: {
    [SupportedChainId.mainnet]: [],
    [SupportedChainId.goerli]: [],
    [SupportedChainId.arbitrum]: [],
    [SupportedChainId.arbitrumGoerli]: [],
  },
};

const mockPayload = [
  {
    optimiserId: 'optimiser1',
    chainId: SupportedChainId.mainnet,
    strategyId: 'strategy1',
  },
  {
    optimiserId: 'optimiser2',
    chainId: SupportedChainId.mainnet,
    strategyId: 'strategy2',
  },
];

const mockMeta = {
  arg: {
    chainId: SupportedChainId.mainnet,
  },
};

describe('lpOptimisersReducer', () => {
  it('should update the optimisersLoadedState field to "pending" when initialiseOptimisersThunk is pending', () => {
    const nextState = lpOptimisersReducer(mockState, {
      type: initialiseOptimisersThunk.pending.type,
      meta: mockMeta,
    });
    expect(nextState.optimisersLoadedState[SupportedChainId.mainnet]).toEqual('pending');
  });

  it('should update the optimisersLoadedState field to "failed" and optimisers field to an empty array when initialiseOptimisersThunk is rejected', () => {
    const nextState = lpOptimisersReducer(mockState, {
      type: initialiseOptimisersThunk.rejected.type,
      meta: mockMeta,
    });
    expect(nextState.optimisersLoadedState[SupportedChainId.mainnet]).toEqual('failed');
    expect(nextState.optimisers[SupportedChainId.mainnet]).toEqual([]);
  });

  it('should update the optimisers and optimisersLoadedState fields when initialiseOptimisersThunk is fulfilled', () => {
    const nextState = lpOptimisersReducer(mockState, {
      type: initialiseOptimisersThunk.fulfilled.type,
      payload: mockPayload,
      meta: mockMeta,
    });
    expect(nextState.optimisersLoadedState[SupportedChainId.mainnet]).toEqual('succeeded');
    expect(nextState.optimisers[SupportedChainId.mainnet]).toEqual(mockPayload);
  });

  it('should update the optimisers field when updateOptimiserState is called', () => {
    const optimiserId = 'optimiser1';
    const chainId = SupportedChainId.mainnet;
    const newOptimiserState = {
      optimiserId,
      chainId,
      strategyId: 'newStrategy',
    } as never;
    const state = {
      optimisersLoadedState: {
        ...mockState.optimisersLoadedState,
        [SupportedChainId.mainnet]: 'idle',
      },
      optimisers: {
        ...mockState.optimisers,
        [SupportedChainId.mainnet]: mockPayload,
      },
    };
    const optimiserIndex = state.optimisers[chainId].findIndex(
      (opt) => opt.optimiserId === optimiserId,
    );
    const updatedState = lpOptimisersReducer(
      state as never,
      updateOptimiserStateAction({ optimiserId, chainId, newOptimiserState }),
    );
    expect(updatedState.optimisers[chainId][optimiserIndex]).toEqual(newOptimiserState);
  });
});
