import { pushEvent } from '../../../../utilities/googleAnalytics';
import { pushEstimatedApyChangeEvent } from './index';

jest.mock('../../../../utilities/googleAnalytics', () => ({
  pushEvent: jest.fn(),
}));

describe('analyticsEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
