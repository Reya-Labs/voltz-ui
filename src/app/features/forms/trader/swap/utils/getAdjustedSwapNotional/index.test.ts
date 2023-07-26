import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { getAdjustedSwapNotional } from '.';

jest.mock('../getExistingPositionMode');
jest.mock('../getExistingPositionNotional');
jest.mock('../../../../common');

describe('getAdjustedSwapNotional', () => {
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

  it('should return value when there is no existing position', () => {
    (getExistingPositionNotional as jest.Mock).mockReturnValue(null);

    const result = getAdjustedSwapNotional(mockState as never);

    expect(result).toEqual(mockState.userInput.notionalAmount.value);
    expect(getExistingPositionNotional).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionMode).not.toHaveBeenCalled();
  });

  it('should return the calculated value when there is an existing position and editMode is add', () => {
    (getExistingPositionNotional as jest.Mock).mockReturnValue(50);
    (getExistingPositionMode as jest.Mock).mockReturnValue('fixed');

    const result = getAdjustedSwapNotional(mockState as never);

    expect(result).toEqual(2 * 50 + mockState.userInput.notionalAmount.value);
    expect(getExistingPositionNotional).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionMode).toHaveBeenCalledWith(mockState);
  });

  it('should return the calculated value when there is an existing position and editMode is subtract', () => {
    (getExistingPositionNotional as jest.Mock).mockReturnValue(50);
    (getExistingPositionMode as jest.Mock).mockReturnValue('different mode');
    mockState.userInput.notionalAmount.editMode = 'subtract';

    const result = getAdjustedSwapNotional(mockState as never);

    expect(result).toEqual(2 * 50 - mockState.userInput.notionalAmount.value);
    expect(getExistingPositionNotional).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionMode).toHaveBeenCalledWith(mockState);
  });
});
