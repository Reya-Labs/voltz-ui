import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { hasExistingPosition } from '../hasExistingPosition';
import { swapFormLimitAndFormatNumber } from '../swapFormLimitAndFormatNumber';
import { getAvailableMargin } from './index';

jest.mock('../getProspectiveSwapNotional', () => ({
  getProspectiveSwapNotional: jest.fn(),
}));

jest.mock('../hasExistingPosition', () => ({
  hasExistingPosition: jest.fn(),
}));

jest.mock('../swapFormLimitAndFormatNumber', () => ({
  swapFormLimitAndFormatNumber: jest.fn(),
}));

describe('getAvailableMargin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when in "remove" margin edit mode and prospective swap is not successful', () => {
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'remove',
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'error',
        },
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
    } as never;
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBeNull();
  });

  it('returns null when in "remove" margin edit mode and prospective swap is successful but there is no margin to withdraw and no existing position', () => {
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'remove',
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            maxMarginWithdrawable: 0,
            fee: 0.01,
          },
        },
      },
      position: {
        status: 'idle',
        value: null,
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
    } as never;
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(0);
    (hasExistingPosition as jest.Mock).mockReturnValue(false);
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBeNull();
  });

  it('returns the max margin withdrawable when in "remove" margin edit mode and there is an existing position with margin to withdraw', () => {
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'remove',
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            maxMarginWithdrawable: 1000,
            fee: 0.01,
          },
        },
      },
      position: {
        status: 'success',
        value: {
          maxMarginWithdrawable: 500,
        },
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
    } as never;
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(0);
    (hasExistingPosition as jest.Mock).mockReturnValue(true);
    (swapFormLimitAndFormatNumber as jest.Mock).mockReturnValue('500');
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBe(500);
    expect(getProspectiveSwapNotional).toHaveBeenCalledTimes(1);
    expect(hasExistingPosition).toHaveBeenCalledTimes(1);
    expect(swapFormLimitAndFormatNumber).toHaveBeenCalledTimes(1);
    expect(swapFormLimitAndFormatNumber).toHaveBeenCalledWith(499.99, 'floor');
  });

  it('returns the max margin withdrawable minus the swap fee when in "remove" margin edit mode and there is a prospective swap', () => {
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'remove',
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            maxMarginWithdrawable: 1000,
            fee: 0.01,
          },
        },
      },
      position: {
        status: 'idle',
        value: null,
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
    } as never;
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);
    (hasExistingPosition as jest.Mock).mockReturnValue(false);
    (swapFormLimitAndFormatNumber as jest.Mock).mockReturnValue('500');
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBe(500);
    expect(getProspectiveSwapNotional).toHaveBeenCalledTimes(1);
    expect(hasExistingPosition).toHaveBeenCalledTimes(1);
    expect(swapFormLimitAndFormatNumber).toHaveBeenCalledTimes(1);
    expect(swapFormLimitAndFormatNumber).toHaveBeenCalledWith(999.99, 'floor');
  });

  it('returns the wallet balance when not in "remove" margin edit mode and wallet balance is available', () => {
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'add',
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'idle',
          value: null,
        },
      },
      position: {
        status: 'idle',
        value: null,
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
    } as never;
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBe(1000);
  });

  it('returns null when not in "remove" margin edit mode and wallet balance is not available', () => {
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'add',
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'idle',
          value: null,
        },
      },
      position: {
        status: 'idle',
        value: null,
      },
      walletBalance: {
        status: 'loading',
        value: null,
      },
    } as never;
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBeNull();
  });
});
