import { pushEvent } from '../../../../utilities/googleAnalytics';
import {
  pushEstimatedApyChangeEvent,
  pushLeverageChangeEvent,
  pushPageViewEvent,
  pushSwapTransactionFailedEvent,
  pushSwapTransactionSubmittedEvent,
  pushSwapTransactionSuccessEvent,
} from './index';

jest.mock('../../../../utilities/googleAnalytics', () => ({
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
      const mockMargin = 0.1;
      const mockIsEdit = true;
      const mockPool = 'pool123';
      const mockIsFT = false;
      const mockAccount = 'account123';

      pushSwapTransactionSubmittedEvent({
        notional: mockNotional,
        margin: mockMargin,
        isEdit: mockIsEdit,
        pool: mockPool,
        isFT: mockIsFT,
        account: mockAccount,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'tx_submitted',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'edit',
        },
        pool: mockPool,
        agent: 'Variable Trader',
      });
    });
  });

  describe('pushSwapTransactionSuccessEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockIsEdit = true;
      const mockPool = 'pool123';
      const mockIsFT = false;
      const mockAccount = 'account123';

      pushSwapTransactionSuccessEvent({
        notional: mockNotional,
        margin: mockMargin,
        isEdit: mockIsEdit,
        pool: mockPool,
        isFT: mockIsFT,
        account: mockAccount,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'successful_tx',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'edit',
        },
        pool: mockPool,
        agent: 'Variable Trader',
      });
    });
  });

  describe('pushSwapTransactionFailedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockIsEdit = true;
      const mockPool = 'pool123';
      const mockIsFT = false;
      const mockAccount = 'account123';
      const mockErrorMessage = 'error message';

      pushSwapTransactionFailedEvent({
        notional: mockNotional,
        margin: mockMargin,
        isEdit: mockIsEdit,
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
          margin: mockMargin,
          action: 'edit',
          failMessage: mockErrorMessage,
        },
        pool: mockPool,
        agent: 'Variable Trader',
      });
    });
  });

  describe('pushEstimatedApyChangeEvent', () => {
    it('calls pushEvent with the correct arguments when account is defined', () => {
      const account = '12345';
      const estimatedApy = 5.5;
      const pool = 'My Pool';
      const isFT = true;
      pushEstimatedApyChangeEvent({ account, estimatedApy, pool, isFT });
      expect(pushEvent).toHaveBeenCalledWith(account, {
        event: 'expectedApy_change',
        eventValue: estimatedApy,
        pool,
        agent: 'Fixed Trader',
      });
    });

    it('calls pushEvent with the correct arguments when account is undefined', () => {
      const account = '12345';
      const estimatedApy = 5.5;
      const pool = 'My Pool';
      const isFT = false;
      pushEstimatedApyChangeEvent({ account, estimatedApy, pool, isFT });
      expect(pushEvent).toHaveBeenCalledWith('12345', {
        event: 'expectedApy_change',
        eventValue: estimatedApy,
        pool,
        agent: 'Variable Trader',
      });
    });
  });

  describe('pushLeverageChangeEvent', () => {
    it('calls pushEvent with the correct parameters', () => {
      const account = 'myAccount';
      const leverage = 3;
      const isFT = false;
      const pool = 'myPool';
      const changeType = 'button';

      // Call pushLeverageChangeEvent with the test parameters and the mock pushEvent function
      pushLeverageChangeEvent({
        account,
        leverage,
        isFT,
        pool,
        changeType,
      });

      // Check if pushEvent was called once
      expect(pushEvent).toHaveBeenCalledTimes(1);

      // Check if pushEvent was called with the correct parameters
      expect(pushEvent).toHaveBeenCalledWith(account, {
        event: 'leverage_change_button',
        eventValue: leverage,
        pool,
        agent: 'Variable Trader',
      });

      // Call pushLeverageChangeEvent with the test parameters and the mock pushEvent function
      pushLeverageChangeEvent({
        account,
        leverage,
        isFT,
        pool,
        changeType: 'input',
      });

      // Check if pushEvent was called with the correct parameters
      expect(pushEvent).toHaveBeenCalledWith(account, {
        event: 'leverage_change_input',
        eventValue: leverage,
        pool,
        agent: 'Variable Trader',
      });
    });
  });
});
