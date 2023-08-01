import { isUserInputNotionalError } from '../../../../common';
import { getAdjustedSwapNotional } from '../getAdjustedSwapNotional';
import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { getProspectiveSwapNotional } from '.';

jest.mock('../getExistingPositionMode');
jest.mock('../getExistingPositionNotional');
jest.mock('../getAdjustedSwapNotional');
jest.mock('../../../../common');

describe('getProspectiveSwapNotional', () => {
  let mockState = {
    userInput: {
      notionalAmount: {
        value: 100,
        editMode: 'add',
      },
      mode: 'some mode',
    },
    position: {
      value: 123,
    },
  };

  beforeEach(() => {
    mockState = {
      userInput: {
        notionalAmount: {
          value: 100,
          editMode: 'add',
        },
        mode: 'variable',
      },
      position: {
        value: 123,
      },
    };
    jest.clearAllMocks();
  });

  it('should return 0 if isUserInputNotionalError returns true', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(true);

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(0);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionNotional).not.toHaveBeenCalled();
    expect(getExistingPositionMode).not.toHaveBeenCalled();
  });

  it('should return value from getAdjustedSwapNotional', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);
    (getAdjustedSwapNotional as jest.Mock).mockReturnValue(
      mockState.userInput.notionalAmount.value,
    );

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(mockState.userInput.notionalAmount.value);
    expect(getAdjustedSwapNotional).toHaveBeenCalled();
  });
});
