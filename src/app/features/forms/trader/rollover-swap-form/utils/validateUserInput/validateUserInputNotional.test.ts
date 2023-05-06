import { getAvailableNotional } from '../getAvailableNotional';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { validateUserInputNotional } from './validateUserInputNotional';

jest.mock('../getProspectiveSwapNotional');
jest.mock('../getAvailableNotional');

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

  it('sets error to null there is enough liquidity', () => {
    (getProspectiveSwapNotional as jest.Mock).mockReturnValueOnce(100);
    (getAvailableNotional as jest.Mock).mockReturnValueOnce(150);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).toBeNull();
  });

  it('sets error there is not enough liquidity', () => {
    (getProspectiveSwapNotional as jest.Mock).mockReturnValueOnce(100);
    (getAvailableNotional as jest.Mock).mockReturnValueOnce(50);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).not.toBeNull();
  });
});
