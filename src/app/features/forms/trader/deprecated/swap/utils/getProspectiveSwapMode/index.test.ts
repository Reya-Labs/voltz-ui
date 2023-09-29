import { getExistingPositionMode } from '../getExistingPositionMode';
import { getProspectiveSwapMode } from '.';

jest.mock('../getExistingPositionMode');

describe('getProspectiveSwapMode', () => {
  const mockState = {
    position: {
      value: 'some value',
    },
    userInput: {
      mode: 'variable',
      notionalAmount: {
        editMode: 'add',
      },
    },
  };

  it('should return the userInput.mode when there is no existing position', () => {
    const state = {
      ...mockState,
      position: {
        value: null,
      },
    };

    expect(getProspectiveSwapMode(state as never)).toEqual(state.userInput.mode);
  });

  it('should return existingPositionMode when userInput.notionalAmount.editMode is not "add"', () => {
    const state = {
      ...mockState,
      userInput: {
        mode: 'variable',
        notionalAmount: {
          editMode: 'subtract',
        },
      },
    };

    expect(getProspectiveSwapMode(state as never)).toEqual('fixed');
  });

  it('should return existingPositionMode when existingPositionMode equals userInput.mode and userInput.notionalAmount.editMode equals "add"', () => {
    const existingPositionMode = 'variable';

    (getExistingPositionMode as jest.Mock).mockReturnValue(existingPositionMode);

    expect(getProspectiveSwapMode(mockState as never)).toEqual(existingPositionMode);
    expect(getExistingPositionMode).toHaveBeenCalledWith(mockState);
  });

  it('should return the opposite of existingPositionMode when existingPositionMode does not equal userInput.mode and userInput.notionalAmount.editMode equals "add"', () => {
    const existingPositionMode = 'variable';

    (getExistingPositionMode as jest.Mock).mockReturnValue(existingPositionMode);

    const state = {
      ...mockState,
      userInput: {
        mode: 'fixed',
      },
    };

    expect(getProspectiveSwapMode(state as never)).toEqual('fixed');
    expect(getExistingPositionMode).toHaveBeenCalledWith(state);
  });
});
