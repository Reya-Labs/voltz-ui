import { getAvailableMargin } from '.';

jest.mock('../../../../common', () => ({
  formLimitAndFormatNumber: jest.fn(),
}));

describe('getAvailableMargin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the wallet balance when wallet balance is available', () => {
    const state = {
      userInput: {
        marginAmount: {
          value: 10,
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'idle',
          value: null,
        },
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
      previousPosition: {
        settlementCashflow: 100,
        margin: 10,
        fees: 0,
      },
    } as never;
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBe(1110);
  });

  it('returns null when wallet balance is not available', () => {
    const state = {
      userInput: {
        marginAmount: {
          value: 10,
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'idle',
          value: null,
        },
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
