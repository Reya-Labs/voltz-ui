import { getProspectiveSwapMode } from '.';

describe('getProspectiveSwapMode', () => {
  const mockState = {
    userInput: {
      mode: 'variable',
    },
  };

  it('should return the userInput.mode', () => {
    const state = {
      ...mockState,
    };

    expect(getProspectiveSwapMode(state as never)).toEqual(state.userInput.mode);
  });
});
