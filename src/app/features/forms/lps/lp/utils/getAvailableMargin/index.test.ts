import { getProspectiveLpNotional } from '../getProspectiveLpNotional';
import { hasExistingPosition } from '../hasExistingPosition';
import { getAvailableMargin } from '.';

jest.mock('../getProspectiveLpNotional');
jest.mock('../hasExistingPosition');

describe('getAvailableMargin', () => {
  const mockState = {
    userInput: {
      marginAmount: {
        editMode: 'remove',
      },
    },
    prospectiveLp: {
      infoPostLp: {
        status: 'success',
        value: {
          maxMarginWithdrawable: 100,
        },
      },
    },
    selectedPosition: {
      maxMarginWithdrawable: 50,
    },
    walletBalance: {
      status: 'success',
      value: 200,
    },
  };

  beforeEach(() => {
    (getProspectiveLpNotional as jest.Mock).mockReturnValue(0);
    (hasExistingPosition as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns null if editMode is "remove" and prospectiveLp.infoPostLp.status is not "success"', () => {
    const state = {
      ...mockState,
      userInput: {
        marginAmount: {
          editMode: 'remove',
        },
      },
      prospectiveLp: {
        infoPostLp: {
          status: 'failure',
        },
      },
    };

    expect(getAvailableMargin(state as never)).toBeNull();
  });

  it('returns maxMarginWithdrawable from selectedPosition if prospectiveLpNotional is 0 and hasExistingPosition is true', () => {
    (getProspectiveLpNotional as jest.Mock).mockReturnValue(0);
    (hasExistingPosition as jest.Mock).mockReturnValue(true);

    expect(getAvailableMargin(mockState as never)).toBe(50);
  });

  it('returns maxMarginWithdrawable from selectedPosition if prospectiveLpNotional is negative and hasExistingPosition is true', () => {
    (getProspectiveLpNotional as jest.Mock).mockReturnValue(-1);
    (hasExistingPosition as jest.Mock).mockReturnValue(true);

    expect(getAvailableMargin(mockState as never)).toBe(50);
  });

  it('returns maxMarginWithdrawable from prospectiveLp.infoPostLp.value if prospectiveLpNotional is positive', () => {
    (getProspectiveLpNotional as jest.Mock).mockReturnValue(1);

    expect(getAvailableMargin(mockState as never)).toBe(100);
  });

  it('returns walletBalance.value if editMode is not "remove" and walletBalance.status is "success"', () => {
    const state = {
      ...mockState,
      userInput: {
        marginAmount: {
          editMode: 'add',
        },
      },
      walletBalance: {
        status: 'success',
        value: 200,
      },
    };

    expect(getAvailableMargin(state as never)).toBe(200);
  });

  it('returns null if editMode is not "remove" and walletBalance.status is not "success"', () => {
    const state = {
      ...mockState,
      userInput: {
        marginAmount: {
          editMode: 'add',
        },
      },
      walletBalance: {
        status: 'failure',
      },
    };

    expect(getAvailableMargin(state as never)).toBeNull();
  });
});
