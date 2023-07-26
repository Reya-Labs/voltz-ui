import { getProspectiveSwapMargin } from '.';

describe('getProspectiveSwapMargin', () => {
  const state = {
    userInput: {
      marginAmount: { value: 0 },
    },
    prospectiveSwap: { infoPostSwap: { value: { fee: 0 } } },
  };

  beforeEach(() => {
    // Reset the state object before each test
    state.userInput.marginAmount = { value: 0 };
    state.prospectiveSwap = { infoPostSwap: { value: { fee: 0 } } };
  });

  it('should return the sum of marginAmount.value and prospectiveSwap.infoPostSwap.value.fee', () => {
    state.userInput.marginAmount.value = 0.5;
    state.prospectiveSwap.infoPostSwap.value.fee = 0.25;

    expect(getProspectiveSwapMargin(state as never)).toBe(0.75);
  });
});
