import { checkLowLeverageNotification } from '../../../common-form/utils';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';
import { updateLeverage } from '../updateLeverage';

jest.mock('../../../common-form/utils', () => ({
  checkLowLeverageNotification: jest.fn(),
}));

jest.mock('../getProspectiveLpNotional', () => ({
  getProspectiveLpNotional: jest.fn(),
}));

describe('updateLeverage', () => {
  let state = {
    userInput: {
      leverage: 0,
      marginAmount: {
        value: 0,
        editMode: 'add',
        error: null,
      },
      notionalAmount: {
        value: 0,
        editMode: 'add',
        error: null,
      },
      fixedRange: {
        value: null,
        editMode: 'add',
        error: null,
      },
    },
    showLowLeverageNotification: false,
  };

  beforeEach(() => {
    state = {
      userInput: {
        leverage: 0,
        marginAmount: {
          value: 0,
          editMode: 'add',
          error: null,
        },
        notionalAmount: {
          value: 0,
          editMode: 'add',
          error: null,
        },
        fixedRange: {
          value: null,
          editMode: 'add',
          error: null,
        },
      },
      showLowLeverageNotification: false,
    };
    (getProspectiveLpNotional as jest.Mock).mockReturnValue(1000);
    (checkLowLeverageNotification as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set the correct leverage when both notional and margin values are greater than zero', () => {
    state.userInput.notionalAmount.value = 1000;
    state.userInput.marginAmount.value = 100;

    updateLeverage(state as never);

    expect(getProspectiveLpNotional).toHaveBeenCalledWith(state);
    expect(state.userInput.leverage).toEqual(10);
  });

  it('should not set the leverage when either notional or margin value is zero', () => {
    (getProspectiveLpNotional as jest.Mock).mockReturnValue(0);
    state.userInput.notionalAmount.value = 1000;
    state.userInput.marginAmount.value = 0;

    updateLeverage(state as never);

    expect(getProspectiveLpNotional).toHaveBeenCalledWith(state);
    expect(state.userInput.leverage).toEqual(0);

    state.userInput.notionalAmount.value = 0;
    state.userInput.marginAmount.value = 100;

    updateLeverage(state as never);

    expect(getProspectiveLpNotional).toHaveBeenCalledWith(state);
    expect(state.userInput.leverage).toEqual(0);
  });

  it('should set the lowLeverageNotification flag correctly', () => {
    state.userInput.notionalAmount.value = 1000;
    state.userInput.marginAmount.value = 100;

    updateLeverage(state as never);

    expect(checkLowLeverageNotification).toHaveBeenCalledWith(state);
    expect(state.showLowLeverageNotification).toEqual(true);

    (checkLowLeverageNotification as jest.Mock).mockReturnValue(false);

    updateLeverage(state as never);

    expect(checkLowLeverageNotification).toHaveBeenCalledWith(state);
    expect(state.showLowLeverageNotification).toEqual(false);
  });
});
