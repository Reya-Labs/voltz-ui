import { RootState } from '../../store';
import { defaultPositionsSummaryFormatted } from './constants';
import { mapPortfolioPositionToPortfolioUI, sortPositions } from './helpers';
import {
  selectPositions,
  selectPositionsLoadedState,
  selectPositionsLoading,
  selectPositionsSortOptions,
  selectPositionsSummary,
} from './selectors';
import { PositionUI } from './types';

// Mock external dependencies
jest.mock('../../../utilities/number', () => ({
  compactFormatToParts: jest.fn(),
  formFormatNumber: jest.fn(),
}));

jest.mock('./helpers', () => ({
  getPositionsSummary: jest.fn(),
  mapPortfolioPositionToPortfolioUI: jest.fn(),
  sortPositions: jest.fn(),
}));
describe('portfolio.selectors', () => {
  let state: RootState;

  beforeEach(() => {
    state = {
      portfolio: {
        positions: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
        sortingDirection: {
          margin: 'ascending',
          notional: 'descending',
          status: 'ascending',
          name: 'ascending',
          maturity: 'ascending',
          unrealizedPNL: 'ascending',
          realizedPNL: 'ascending',
        },
        positionsLoadedState: 'idle',
      },
    } as never;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('selectPositions', () => {
    it('should return sorted positions', () => {
      (mapPortfolioPositionToPortfolioUI as jest.Mock).mockImplementation(
        (p: PositionUI) => `mapPortfolioPositionToPortfolioUI${p.id}`,
      );

      selectPositions(state);

      expect(mapPortfolioPositionToPortfolioUI).toHaveBeenCalledTimes(2);
      expect(sortPositions).toHaveBeenCalledTimes(1);
      expect(sortPositions).toHaveBeenCalledWith(
        ['mapPortfolioPositionToPortfolioUI1', 'mapPortfolioPositionToPortfolioUI2'],
        {
          marginSortingDirection: 'ascending',
          notionalSortingDirection: 'descending',
          statusSortingDirection: 'ascending',
          nameSortingDirection: 'ascending',
          maturitySortingDirection: 'ascending',
          unrealizedPNLSortingDirection: 'ascending',
          realizedPNLSortingDirection: 'ascending',
        },
      );
    });
  });

  describe('selectPositionsLoading', () => {
    it('should return true if loadedState is "idle" or "pending"', () => {
      state.portfolio.positionsLoadedState = 'idle';
      let result = selectPositionsLoading(state);
      expect(result).toBe(true);

      state.portfolio.positionsLoadedState = 'pending';
      result = selectPositionsLoading(state);
      expect(result).toBe(true);
    });

    it('should return false if loadedState is not "idle" or "pending"', () => {
      state.portfolio.positionsLoadedState = 'succeeded';
      const result = selectPositionsLoading(state);
      expect(result).toBe(false);
    });
  });

  describe('selectPositionsSummary', () => {
    it('should return defaultPositionsSummaryFormatted if positions are loading', () => {
      const result = selectPositionsSummary(state);
      expect(result).toBe(defaultPositionsSummaryFormatted);
    });
  });

  describe('selectPositionsSortOptions', () => {
    it('should return an array of sort options', () => {
      const result = selectPositionsSortOptions(state);
      expect(result).toEqual([
        {
          direction: 'ascending',
          disabled: false,
          id: 'margin',
          text: 'Margin',
        },
        {
          direction: 'descending',
          disabled: false,
          id: 'notional',
          text: 'Notional',
        },
        {
          direction: 'ascending',
          disabled: true,
          id: 'status',
          text: 'Status',
        },
        {
          direction: 'ascending',
          disabled: true,
          id: 'name',
          text: 'Side - Pool',
        },
        {
          direction: 'ascending',
          disabled: true,
          id: 'maturity',
          text: 'Maturity',
        },
        {
          direction: 'ascending',
          disabled: true,
          id: 'unrealizedPNL',
          text: 'Unrealized PNL',
        },
        {
          direction: 'ascending',
          disabled: true,
          id: 'realizedPNL',
          text: 'Realized PnL',
        },
      ]);
    });
  });

  describe('selectPositionsLoadedState', () => {
    it('should return positionsLoadedState', () => {
      const loadedState = 'idle';
      state.portfolio.positionsLoadedState = loadedState;

      const result = selectPositionsLoadedState(state);

      expect(result).toBe(loadedState);
    });
  });
});
