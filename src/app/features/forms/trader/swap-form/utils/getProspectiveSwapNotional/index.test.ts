import { isUserInputNotionalError } from '../../../../common/utils/isUserInputNotionalError';
import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { getProspectiveSwapNotional } from './index';

jest.mock('../getExistingPositionMode');
jest.mock('../getExistingPositionNotional');
jest.mock('../../../../common/utils/isUserInputNotionalError');

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

  it('should return value when there is no existing position', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);
    (getExistingPositionNotional as jest.Mock).mockReturnValue(null);

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(mockState.userInput.notionalAmount.value);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionNotional).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionMode).not.toHaveBeenCalled();
  });

  it('should return the calculated value when there is an existing position and editMode is add', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);
    (getExistingPositionNotional as jest.Mock).mockReturnValue(50);
    (getExistingPositionMode as jest.Mock).mockReturnValue('fixed');

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(2 * 50 + mockState.userInput.notionalAmount.value);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionNotional).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionMode).toHaveBeenCalledWith(mockState);
  });

  it('should return the calculated value when there is an existing position and editMode is subtract', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);
    (getExistingPositionNotional as jest.Mock).mockReturnValue(50);
    (getExistingPositionMode as jest.Mock).mockReturnValue('different mode');
    mockState.userInput.notionalAmount.editMode = 'subtract';

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(2 * 50 - mockState.userInput.notionalAmount.value);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionNotional).toHaveBeenCalledWith(mockState);
    expect(getExistingPositionMode).toHaveBeenCalledWith(mockState);
  });
});
