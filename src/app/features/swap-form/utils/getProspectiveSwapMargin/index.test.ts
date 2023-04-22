import { getProspectiveSwapMargin } from './';

describe('getProspectiveSwapMargin', () => {
  const state = {
    userInput: {
      marginAmount: { editMode: 'add', value: 0 },
    },
    prospectiveSwap: { infoPostSwap: { value: { fee: 0 } } },
  };

  beforeEach(() => {
    // Reset the state object before each test
    state.userInput.marginAmount = { editMode: 'add', value: 0 };
    state.prospectiveSwap = { infoPostSwap: { value: { fee: 0 } } };
  });

  it('should return the sum of marginAmount.value and prospectiveSwap.infoPostSwap.value.fee when editMode is "add"', () => {
    state.userInput.marginAmount.value = 0.5;
    state.prospectiveSwap.infoPostSwap.value.fee = 0.25;

    expect(getProspectiveSwapMargin(state as never)).toBe(0.75);
  });

  it('should return the negation of marginAmount.value when editMode is not "add"', () => {
    state.userInput.marginAmount.editMode = 'subtract';
    state.userInput.marginAmount.value = 0.5;

    expect(getProspectiveSwapMargin(state as never)).toBe(-0.5);
  });
});
