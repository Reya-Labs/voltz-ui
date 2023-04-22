import { hasExistingPosition } from '../hasExistingPosition';
import { validateUserInputNotional } from './validateUserInputNotional';

jest.mock('../hasExistingPosition', () => ({
  hasExistingPosition: jest.fn(),
}));

describe('validateUserInputNotional', () => {
  const stateWithPosition = {
    userInput: {
      notionalAmount: {
        editMode: 'remove',
        value: 25,
        error: null,
      },
    },
    selectedPosition: {
      notional: 20,
      otherProperty: 'otherValue',
    },
    otherProperty: 'otherValue',
  };
  const stateWithoutPosition = {
    userInput: {
      notionalAmount: {
        editMode: 'remove',
        value: 30,
        error: null,
      },
    },
    selectedPosition: null,
    otherProperty: 'otherValue',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set an error if there is an existing position and notionalAmount is too high', () => {
    (hasExistingPosition as jest.Mock).mockReturnValue(true);

    validateUserInputNotional(stateWithPosition as never);

    expect(stateWithPosition.userInput.notionalAmount.error).toEqual(
      'Not enough notional. Available notional:',
    );
  });

  it('should not set an error if there is no existing position', () => {
    (hasExistingPosition as jest.Mock).mockReturnValue(false);

    validateUserInputNotional(stateWithoutPosition as never);

    expect(stateWithoutPosition.userInput.notionalAmount.error).toBeNull();
  });

  it('should not set an error if notionalAmount is not too high', () => {
    (hasExistingPosition as jest.Mock).mockReturnValue(true);
    stateWithPosition.userInput.notionalAmount.value = 15;

    validateUserInputNotional(stateWithPosition as never);

    expect(stateWithPosition.userInput.notionalAmount.error).toBeNull();
  });

  it('should not set an error if notionalAmount is being added', () => {
    (hasExistingPosition as jest.Mock).mockReturnValue(true);
    stateWithPosition.userInput.notionalAmount.editMode = 'add';
    stateWithPosition.userInput.notionalAmount.value = 30;

    validateUserInputNotional(stateWithPosition as never);

    expect(stateWithPosition.userInput.notionalAmount.error).toBeNull();
  });
});
