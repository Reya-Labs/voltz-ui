import { RankType, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { SliceState, tradingLeagueReducer } from './reducer';
import { fetchRankingsThunk } from './thunks';

// Define the mock state
const mockState: SliceState = {
  status: {
    [SupportedChainId.mainnet]: 'idle',
    [SupportedChainId.goerli]: 'idle',
    [SupportedChainId.arbitrum]: 'idle',
    [SupportedChainId.arbitrumGoerli]: 'idle',
    [SupportedChainId.avalanche]: 'idle',
  },
  rankings: {
    [SupportedChainId.mainnet]: [],
    [SupportedChainId.goerli]: [],
    [SupportedChainId.arbitrum]: [],
    [SupportedChainId.arbitrumGoerli]: [],
    [SupportedChainId.avalanche]: [],
  },
};

// Define the mock fetchRankingsThunk
const mockPayload: RankType[] = [
  {
    rank: 1,
    address: '0x0000000000000000000000000000000000000000',
    score: 1000,
  },
  {
    rank: 2,
    address: '0x1111111111111111111111111111111111111111',
    score: 500,
  },
] as never;

const mockMeta = {
  arg: {
    chainId: SupportedChainId.mainnet,
  },
};

describe('tradingLeagueReducer', () => {
  it('should update the status field to "pending" when fetchRankingsThunk is pending', () => {
    const nextState = tradingLeagueReducer(mockState, {
      type: fetchRankingsThunk.pending.type,
      meta: mockMeta,
    });
    expect(nextState.status[SupportedChainId.mainnet]).toEqual('pending');
  });

  it('should update the status field to "failed" and rankings field to an empty array when fetchRankingsThunk is rejected', () => {
    const nextState = tradingLeagueReducer(mockState, {
      type: fetchRankingsThunk.rejected.type,
      meta: mockMeta,
    });
    expect(nextState.status[SupportedChainId.mainnet]).toEqual('failed');
    expect(nextState.rankings[SupportedChainId.mainnet]).toEqual([]);
  });

  it('should update the rankings and status fields when fetchRankingsThunk is fulfilled', () => {
    const nextState = tradingLeagueReducer(mockState, {
      type: fetchRankingsThunk.fulfilled.type,
      payload: mockPayload,
      meta: mockMeta,
    });
    expect(nextState.status[SupportedChainId.mainnet]).toEqual('succeeded');
    expect(nextState.rankings[SupportedChainId.mainnet]).toEqual(mockPayload);
  });
});
