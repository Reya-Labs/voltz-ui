import { pushEvent } from '../../../../../../utilities/googleAnalytics';
import {
  pushLPTransactionFailedEvent,
  pushLPTransactionSubmittedEvent,
  pushLPTransactionSuccessEvent,
  pushPageViewEvent,
} from '.';

jest.mock('../../../../../../utilities/googleAnalytics', () => ({
  pushEvent: jest.fn(),
}));

describe('analyticsEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('pushPageViewEvent', () => {
    it('should call pushEvent with the correct arguments when edit', () => {
      const mockAccount = 'account123';
      const mockIsEdit = true;

      pushPageViewEvent({ account: mockAccount, isEdit: mockIsEdit });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'title_change',
        eventValue: 'Edit Liquidity Provider Position',
      });
    });

    it('should call pushEvent with the correct arguments when new', () => {
      const mockAccount = 'account123';
      const mockIsEdit = false;

      pushPageViewEvent({ account: mockAccount, isEdit: mockIsEdit });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'title_change',
        eventValue: 'New Liquidity Provider Position',
      });
    });
  });

  describe('pushLPTransactionSubmittedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockIsEdit = true;
      const mockPool = 'pool123';
      const mockFixedLow = 5;
      const mockFixedHigh = 10;
      const mockAccount = 'account123';

      pushLPTransactionSubmittedEvent({
        notional: mockNotional,
        margin: mockMargin,
        isEdit: mockIsEdit,
        pool: mockPool,
        account: mockAccount,
        fixedHigh: mockFixedHigh,
        fixedLow: mockFixedLow,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'tx_submitted',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'edit',
          fixedHigh: mockFixedHigh,
          fixedLow: mockFixedLow,
        },
        pool: mockPool,
        agent: 'Liquidity Provider',
      });
    });
  });

  describe('pushLPTransactionSuccessEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockIsEdit = true;
      const mockPool = 'pool123';
      const mockAccount = 'account123';
      const mockFixedLow = 5;
      const mockFixedHigh = 10;

      pushLPTransactionSuccessEvent({
        notional: mockNotional,
        margin: mockMargin,
        isEdit: mockIsEdit,
        pool: mockPool,
        account: mockAccount,
        fixedHigh: mockFixedHigh,
        fixedLow: mockFixedLow,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'successful_tx',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'edit',
          fixedHigh: mockFixedHigh,
          fixedLow: mockFixedLow,
        },
        pool: mockPool,
        agent: 'Liquidity Provider',
      });
    });
  });

  describe('pushLPTransactionFailedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockIsEdit = true;
      const mockPool = 'pool123';
      const mockAccount = 'account123';
      const mockErrorMessage = 'error message';
      const mockFixedLow = 5;
      const mockFixedHigh = 10;

      pushLPTransactionFailedEvent({
        notional: mockNotional,
        margin: mockMargin,
        isEdit: mockIsEdit,
        pool: mockPool,
        account: mockAccount,
        errorMessage: mockErrorMessage,
        fixedHigh: mockFixedHigh,
        fixedLow: mockFixedLow,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'failed_tx',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'edit',
          failMessage: mockErrorMessage,
          fixedHigh: mockFixedHigh,
          fixedLow: mockFixedLow,
        },
        pool: mockPool,
        agent: 'Liquidity Provider',
      });
    });
  });
});
