import { getAvailableMargin } from './index';

jest.mock('../../../../common/utils/formLimitAndFormatNumber', () => ({
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
      },
    } as never;
    const availableMargin = getAvailableMargin(state);
    expect(availableMargin).toBe(1100);
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
