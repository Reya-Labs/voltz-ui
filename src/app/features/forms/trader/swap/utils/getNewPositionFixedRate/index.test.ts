import { getNewPositionFixedRate } from '.';

describe('getNewPositionFixedRate', () => {
  const state = {
    prospectiveSwap: {
      swapSimulation: {
        status: 'idle',
        value: {
          averageFixedRate: 0,
        },
      },
    },
    pool: null,
  };

  beforeEach(() => {
    // Reset the state object before each test
    state.prospectiveSwap = {
      swapSimulation: {
        value: {
          averageFixedRate: 0,
        },
        status: 'pending',
      },
    };
    state.pool = null;
  });

  it('should return the average fixed rate from state.prospectiveSwap.infoPostSwap when status is success', () => {
    state.pool = { currentFixedRate: 0.25 } as never;
    state.prospectiveSwap.swapSimulation.status = 'success';
    state.prospectiveSwap.swapSimulation.value = { averageFixedRate: 0.5 };

    expect(getNewPositionFixedRate(state as never)).toBe(0.5);
  });

  it('should return the fixed rate from state.fixedRate when status is success', () => {
    state.pool = { currentFixedRate: 0.25 } as never;

    expect(getNewPositionFixedRate(state as never)).toBe(0.25);
  });

  it('should return null when both prospectiveSwap.infoPostSwap and fixedRate have status other than success', () => {
    expect(getNewPositionFixedRate(state as never)).toBeNull();
  });
});
