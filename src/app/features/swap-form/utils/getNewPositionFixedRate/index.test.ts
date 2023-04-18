import { getNewPositionFixedRate } from './';

describe('getNewPositionFixedRate', () => {
  const state = {
    prospectiveSwap: {
      infoPostSwap: {
        status: 'idle',
        value: {
          averageFixedRate: 0,
        },
      },
    },
    fixedRate: {
      status: 'idle',
      value: 0,
    },
  };

  beforeEach(() => {
    // Reset the state object before each test
    state.prospectiveSwap = {
      infoPostSwap: {
        value: {
          averageFixedRate: 0,
        },
        status: 'pending',
      },
    };
    state.fixedRate = { status: 'pending', value: 0 };
  });

  it('should return the average fixed rate from state.prospectiveSwap.infoPostSwap when status is success', () => {
    state.prospectiveSwap.infoPostSwap.status = 'success';
    state.prospectiveSwap.infoPostSwap.value = { averageFixedRate: 0.5 };

    expect(getNewPositionFixedRate(state as never)).toBe(0.5);
  });

  it('should return the fixed rate from state.fixedRate when status is success', () => {
    state.fixedRate.status = 'success';
    state.fixedRate.value = 0.25;

    expect(getNewPositionFixedRate(state as never)).toBe(0.25);
  });

  it('should return null when both prospectiveSwap.infoPostSwap and fixedRate have status other than success', () => {
    expect(getNewPositionFixedRate(state as never)).toBeNull();
  });
});
