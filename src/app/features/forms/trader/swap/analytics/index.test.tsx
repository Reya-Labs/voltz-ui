import { pushEvent } from '../../../../../../utilities/googleAnalytics';
import {
  pushPageViewEvent,
  pushSwapTransactionFailedEvent,
  pushSwapTransactionSubmittedEvent,
  pushSwapTransactionSuccessEvent,
} from '.';

jest.mock('../../../../../../utilities/googleAnalytics', () => ({
  pushEvent: jest.fn(),
}));

describe('analyticsEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('pushPageViewEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockAccount = 'account123';
      const mockIsEdit = true;

      pushPageViewEvent({ account: mockAccount, isEdit: mockIsEdit });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'title_change',
        eventValue: 'New Trader Position',
      });
    });
  });

  describe('pushSwapTransactionSubmittedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockPool = 'pool123';
      const mockIsFT = false;
      const mockAccount = 'account123';

      pushSwapTransactionSubmittedEvent({
        notional: mockNotional,
        pool: mockPool,
        isFT: mockIsFT,
        account: mockAccount,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'tx_submitted',
        eventValue: {
          notional: mockNotional,
          action: 'new',
        },
        pool: mockPool,
        agent: 'Variable Trader',
      });
    });
  });

  describe('pushSwapTransactionSuccessEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockPool = 'pool123';
      const mockIsFT = false;
      const mockAccount = 'account123';

      pushSwapTransactionSuccessEvent({
        notional: mockNotional,
        pool: mockPool,
        isFT: mockIsFT,
        account: mockAccount,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'successful_tx',
        eventValue: {
          notional: mockNotional,
          action: 'new',
        },
        pool: mockPool,
        agent: 'Variable Trader',
      });
    });
  });

  describe('pushSwapTransactionFailedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockPool = 'pool123';
      const mockIsFT = false;
      const mockAccount = 'account123';
      const mockErrorMessage = 'error message';

      pushSwapTransactionFailedEvent({
        notional: mockNotional,
        pool: mockPool,
        isFT: mockIsFT,
        account: mockAccount,
        errorMessage: mockErrorMessage,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'failed_tx',
        eventValue: {
          notional: mockNotional,
          action: 'new',
          failMessage: mockErrorMessage,
        },
        pool: mockPool,
        agent: 'Variable Trader',
      });
    });
  });
});
