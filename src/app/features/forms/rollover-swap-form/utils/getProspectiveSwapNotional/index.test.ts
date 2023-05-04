import { isUserInputNotionalError } from '../../../common/utils/isUserInputNotionalError';
import { getProspectiveSwapNotional } from './index';

jest.mock('../../../common/utils/isUserInputNotionalError');

describe('getProspectiveSwapNotional', () => {
  let mockState = {
    userInput: {
      notionalAmount: {
        value: 100,
      },
      mode: 'some mode',
    },
  };

  beforeEach(() => {
    mockState = {
      userInput: {
        notionalAmount: {
          value: 100,
        },
        mode: 'variable',
      },
    };
    jest.clearAllMocks();
  });

  it('should return 0 if isUserInputNotionalError returns true', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(true);

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(0);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(mockState);
  });

  it('should return value when there is no existing position', () => {
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    const result = getProspectiveSwapNotional(mockState as never);

    expect(result).toEqual(mockState.userInput.notionalAmount.value);
    expect(isUserInputNotionalError).toHaveBeenCalledWith(mockState);
  });
});
