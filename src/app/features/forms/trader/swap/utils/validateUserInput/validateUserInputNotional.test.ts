import { getAdjustedSwapNotional } from '../getAdjustedSwapNotional';
import { getAvailableNotional } from '../getAvailableNotional';
import { hasExistingPosition } from '../hasExistingPosition';
import { validateUserInputNotional } from './validateUserInputNotional';

jest.mock('../getAdjustedSwapNotional');
jest.mock('../getAvailableNotional');
jest.mock('../hasExistingPosition');

describe('validateUserInputNotional', () => {
  let mockState = {
    userInput: {
      notionalAmount: {
        error: '',
        editMode: 'add',
        value: 10,
      },
    },
  };

  beforeEach(() => {
    mockState = {
      userInput: {
        notionalAmount: {
          error: '',
          editMode: 'add',
          value: 10,
        },
      },
    };
    jest.resetAllMocks();
  });

  it('sets error to null when editMode is "add" and there is enough liquidity', () => {
    mockState.userInput.notionalAmount.editMode = 'add';
    (getAdjustedSwapNotional as jest.Mock).mockReturnValueOnce(100);
    (getAvailableNotional as jest.Mock).mockReturnValueOnce(150);
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).toBeNull();
  });

  it('sets error when editMode is "add" and there is not enough liquidity', () => {
    mockState.userInput.notionalAmount.editMode = 'add';
    (getAdjustedSwapNotional as jest.Mock).mockReturnValueOnce(100);
    (getAvailableNotional as jest.Mock).mockReturnValueOnce(50);
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).not.toBeNull();
  });

  it('sets error when editMode is "remove" and there is not enough notional', () => {
    mockState.userInput.notionalAmount.editMode = 'remove';
    (getAdjustedSwapNotional as jest.Mock).mockReturnValueOnce(100);
    (getAvailableNotional as jest.Mock).mockReturnValueOnce(5);
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(true);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).not.toBeNull();
  });

  it('sets error to null when editMode is "remove" and there is enough notional', () => {
    mockState.userInput.notionalAmount.editMode = 'remove';
    (getAdjustedSwapNotional as jest.Mock).mockReturnValueOnce(50);
    (getAvailableNotional as jest.Mock).mockReturnValueOnce(100);
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(true);

    validateUserInputNotional(mockState as never);

    expect(mockState.userInput.notionalAmount.error).toBeNull();
  });
});
