import { getProspectiveSwapMode } from './index';

describe('getProspectiveSwapMode', () => {
  const mockState = {
    position: {
      value: 'some value',
    },
    userInput: {
      mode: 'variable',
      notionalAmount: {
        value: 10,
      },
    },
  };

  it('should return the userInput.mode', () => {
    const state = {
      ...mockState,
    };

    expect(getProspectiveSwapMode(state as never)).toEqual(state.userInput.mode);
  });
});
