import {
  portfolioReducer,
  resetPortfolioStateAction,
  togglePositionSortingDirectionAction,
} from './reducer';
import { initialState } from './state';
import { initialisePortfolioPositionsThunk } from './thunks';

describe('portfolioReducer', () => {
  it('should return the initial state', () => {
    expect(portfolioReducer(undefined, {} as never)).toEqual(initialState);
  });

  it('should handle togglePositionSortingDirectionAction', () => {
    const sortId = 'name';
    const nextState = portfolioReducer(
      initialState,
      togglePositionSortingDirectionAction({ sortId }),
    );

    expect(nextState.sortingDirection[sortId]).toEqual('ascending');
    expect(nextState.positionsLoadedState).toEqual('idle');
    expect(nextState.positions).toEqual([]);
  });

  it('should handle resetPortfolioStateAction', () => {
    const currentState = {
      ...initialState,
      positionsLoadedState: 'succeeded',
      positions: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    const nextState = portfolioReducer(currentState as never, resetPortfolioStateAction());

    expect(nextState).toEqual(initialState);
  });

  it('should handle initialisePortfolioPositionsThunk.pending', () => {
    const nextState = portfolioReducer(initialState, {
      type: initialisePortfolioPositionsThunk.pending,
    });

    expect(nextState.positionsLoadedState).toEqual('pending');
    expect(nextState.positions).toEqual([]);
  });

  it('should handle initialisePortfolioPositionsThunk.rejected', () => {
    const nextState = portfolioReducer(initialState, {
      type: initialisePortfolioPositionsThunk.rejected,
    });

    expect(nextState.positionsLoadedState).toEqual('failed');
    expect(nextState.positions).toEqual([]);
  });

  it('should handle initialisePortfolioPositionsThunk.fulfilled', () => {
    const payload = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const nextState = portfolioReducer(initialState, {
      type: initialisePortfolioPositionsThunk.fulfilled,
      payload,
    });

    expect(nextState.positionsLoadedState).toEqual('succeeded');
    expect(nextState.positions).toEqual(payload);
  });
});
