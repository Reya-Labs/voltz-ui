import { pushEvent } from './index';

jest.mock('uuid', () => {
  return {
    v4: jest.fn().mockImplementation(() => 42),
  };
});

describe('googleAnalytics.pushEvent', () => {
  it('pushEvent should do nothing when no window.dataLayer', () => {
    window.dataLayer = null;
    expect(() =>
      pushEvent('', {
        event: 'tx_submitted',
        eventValue: 'success',
      }),
    ).not.toThrowError();
  });

  it('pushEvent should push to google analytics', () => {
    const mockedPush = jest.fn();
    window.dataLayer = {
      push: mockedPush,
    };
    pushEvent('0xfake-address', {
      event: 'tx_submitted',
      eventValue: 'success',
    });

    expect(mockedPush).toHaveBeenCalledTimes(1);
    expect(mockedPush).toHaveBeenCalledWith({
      event: 'tx_submitted',
      eventValue: 'success',
      sessionId: 42,
      userAddress: '0xfake-address',
    });
  });
});
