import { renderHook } from '@testing-library/react-hooks';
import { showNotification } from 'brokoli-ui';

import { useLowLeverageNotification } from './index';

// Mock showNotification function
jest.mock('brokoli-ui', () => ({
  showNotification: jest.fn(),
}));

describe('useLowLeverageNotification', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show notification and set notificationRead to true when showLowLeverageNotification is true and notificationRead is false', () => {
    const showLowLeverageNotification = true;
    renderHook(() => useLowLeverageNotification({ showLowLeverageNotification }));

    expect(showNotification).toHaveBeenCalledTimes(1);
    expect(showNotification).toHaveBeenCalledWith({
      title: 'Reminder',
      content:
        'If you take small amounts of leverage when providing liquidity, whilst your risk is lower, your payoff is likely to be low.',
      colorToken: 'warning',
      autoClose: 5000,
    });
  });

  it('should not show notification and keep notificationRead as false when showLowLeverageNotification is false', () => {
    const showLowLeverageNotification = false;
    renderHook(() => useLowLeverageNotification({ showLowLeverageNotification }));

    expect(showNotification).not.toHaveBeenCalled();
  });
});
