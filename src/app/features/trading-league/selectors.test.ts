import { RootState } from '../../store';
import { selectChainId } from '../network';
import { selectTradingLeagueRankings, selectTradingLeagueStatus } from './selectors';

jest.mock('../network', () => ({
  selectChainId: jest.fn(),
}));

describe('tradingLeagueSelectors', () => {
  let state: RootState;

  beforeEach(() => {
    state = {
      tradingLeague: {
        status: {
          1: 'idle',
          5: 'succeeded',
        },
        rankings: {
          1: ['user1', 'user2'] as never,
          5: ['user3', 'user4'] as never,
        },
      },
    } as never;
    (selectChainId as jest.Mock).mockClear();
  });

  it('should return the correct trading league status', () => {
    const chainId = 5;
    (selectChainId as jest.Mock).mockReturnValueOnce(chainId);
    const expectedStatus = 'succeeded';
    const result = selectTradingLeagueStatus(state);
    expect(result).toEqual(expectedStatus);
    expect(selectChainId).toHaveBeenCalledWith(state);
  });

  it('should return idle when chainId is not defined for selectTradingLeagueStatus', () => {
    (selectChainId as jest.Mock).mockReturnValueOnce(undefined);
    const expectedStatus = 'idle';
    const result = selectTradingLeagueStatus(state);
    expect(result).toEqual(expectedStatus);
    expect(selectChainId).toHaveBeenCalledWith(state);
  });

  it('should return the correct trading league rankings', () => {
    const chainId = 1;
    (selectChainId as jest.Mock).mockReturnValueOnce(chainId);
    const expectedRankings = ['user1', 'user2'];
    const result = selectTradingLeagueRankings(state);
    expect(result).toEqual(expectedRankings);
    expect(selectChainId).toHaveBeenCalledWith(state);
  });

  it('should return an empty array when chainId is not defined for selectTradingLeagueRankings', () => {
    (selectChainId as jest.Mock).mockReturnValueOnce(undefined);
    const expectedRankings: string[] = [];
    const result = selectTradingLeagueRankings(state);
    expect(result).toEqual(expectedRankings);
    expect(selectChainId).toHaveBeenCalledWith(state);
  });
});
