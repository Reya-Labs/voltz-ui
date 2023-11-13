import { getMaxAvailableNotional } from '../getMaxAvailableNotional';
import { validateUserInputNotional } from './validateUserInputNotional';

jest.mock('../getMaxAvailableNotional');

describe('validateUserInputNotional', () => {
  let mockState = {
    userInput: {
      notionalAmount: {
        error: '',
        value: 10,
      },
    },
  };

  beforeEach(() => {
    mockState = {
      userInput: {
        notionalAmount: {
          error: '',
          value: 10,
        },
      },
    };
    jest.resetAllMocks();
  });

  it('sets error when and there is not enough notional', () => {
    (getMaxAvailableNotional as jest.Mock).mockReturnValueOnce(5);
    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).not.toBeNull();
  });

  it('sets error to null when there is enough notional', () => {
    (getMaxAvailableNotional as jest.Mock).mockReturnValueOnce(100);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).toBeNull();
  });
});
