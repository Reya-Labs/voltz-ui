import { checkLowLeverageNotification } from '../../../../common';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { updateLeverage } from './index';

jest.mock('../../../../common', () => ({
  checkLowLeverageNotification: jest.fn(),
}));
jest.mock('../getProspectiveSwapNotional');

describe('updateLeverage', () => {
  it('should update the userInput.leverage when prospective swap notional and margin amount are both greater than zero', () => {
    const mockProspectiveSwapNotional = 100;
    const mockMarginAmount = {
      value: 50,
    };
    const mockState = {
      userInput: {
        notionalAmount: {
          value: 0,
        },
        marginAmount: mockMarginAmount,
        leverage: null,
      },
    };

    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(mockProspectiveSwapNotional);

    updateLeverage(mockState as never);

    expect(mockState.userInput.leverage).toEqual(2);
  });

  it('should not update the userInput.leverage when either prospective swap notional or margin amount is zero', () => {
    const mockProspectiveSwapNotional = 100;
    const mockMarginAmount = {
      value: 0,
    };
    const mockState = {
      userInput: {
        notionalAmount: {
          value: 0,
        },
        marginAmount: mockMarginAmount,
        leverage: null,
      },
    };

    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(mockProspectiveSwapNotional);

    updateLeverage(mockState as never);

    expect(mockState.userInput.leverage).toBeNull();
  });

  it('should call checkLowLeverageNotification with the current state', () => {
    const mockState = {
      userInput: {
        notionalAmount: {
          value: 0,
        },
        marginAmount: {
          value: 0,
        },
        leverage: null,
      },
      showLowLeverageNotification: false,
    };

    updateLeverage(mockState as never);

    expect(checkLowLeverageNotification).toHaveBeenCalledWith(mockState);
  });

  it('should update showLowLeverageNotification with the return value of checkLowLeverageNotification', () => {
    const mockState = {
      userInput: {
        notionalAmount: {
          value: 0,
        },
        marginAmount: {
          value: 0,
        },
        leverage: null,
      },
      showLowLeverageNotification: false,
    };
    const mockCheckLowLeverageNotificationResult = true;

    (checkLowLeverageNotification as jest.Mock).mockReturnValue(
      mockCheckLowLeverageNotificationResult,
    );

    updateLeverage(mockState as never);

    expect(mockState.showLowLeverageNotification).toEqual(mockCheckLowLeverageNotificationResult);
  });
});
