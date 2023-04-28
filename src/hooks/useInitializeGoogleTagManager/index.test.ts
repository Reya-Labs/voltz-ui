import { renderHook } from '@testing-library/react-hooks';
import TagManager from 'react-gtm-module';

import { useInitializeGoogleTagManager } from '.';

// Mock TagManager.initialize
jest.mock('react-gtm-module', () => ({
  initialize: jest.fn(),
}));

describe('useInitializeGoogleTagManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize Google Tag Manager if the GTM code is defined', () => {
    process.env.REACT_APP_GTM_CODE = 'GTM-12345';

    renderHook(() => useInitializeGoogleTagManager());

    expect(TagManager.initialize).toHaveBeenCalledWith({ gtmId: 'GTM-12345' });
  });

  it('should not initialize Google Tag Manager if the GTM code is not defined', () => {
    delete process.env.REACT_APP_GTM_CODE;

    renderHook(() => useInitializeGoogleTagManager());

    expect(TagManager.initialize).not.toHaveBeenCalled();
  });
});
