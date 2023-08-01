import { pushEvent } from '../../../../../../utilities/googleAnalytics';
import {
  pushPageViewEvent,
  pushRolloverFailedEvent,
  pushRolloverSubmittedEvent,
  pushRolloverSuccessEvent,
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

      pushPageViewEvent({ account: mockAccount });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'title_change',
        eventValue: 'LP Rollover Position',
      });
    });
  });

  describe('pushRolloverSubmittedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockPool = 'pool123';
      const mockAccount = 'account123';

      pushRolloverSubmittedEvent({
        notional: mockNotional,
        margin: mockMargin,
        pool: mockPool,
        account: mockAccount,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'tx_submitted',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'rollover',
        },
        pool: mockPool,
        agent: 'Liquidity Provider',
      });
    });
  });

  describe('pushRolloverSuccessEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockPool = 'pool123';
      const mockAccount = 'account123';

      pushRolloverSuccessEvent({
        notional: mockNotional,
        margin: mockMargin,
        pool: mockPool,
        account: mockAccount,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'successful_tx',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'rollover',
        },
        pool: mockPool,
        agent: 'Liquidity Provider',
      });
    });
  });

  describe('pushRolloverFailedEvent', () => {
    it('should call pushEvent with the correct arguments', () => {
      const mockNotional = 1000;
      const mockMargin = 0.1;
      const mockPool = 'pool123';
      const mockAccount = 'account123';
      const mockErrorMessage = 'error message';

      pushRolloverFailedEvent({
        notional: mockNotional,
        margin: mockMargin,
        pool: mockPool,
        account: mockAccount,
        errorMessage: mockErrorMessage,
      });

      expect(pushEvent).toHaveBeenCalledTimes(1);
      expect(pushEvent).toHaveBeenCalledWith(mockAccount, {
        event: 'failed_tx',
        eventValue: {
          notional: mockNotional,
          margin: mockMargin,
          action: 'rollover',
          failMessage: mockErrorMessage,
        },
        pool: mockPool,
        agent: 'Liquidity Provider',
      });
    });
  });
});
