import { renderHook } from '@testing-library/react-hooks';

import {
  deleteReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  setReferrer,
} from '../../../utilities/referrer-store';
import { useReferrer } from './index';

// Mock useSearchParams with specified referrer query parameter
jest.mock('react-router-dom', () => ({
  useSearchParams: () => [{ get: () => 'valid_referrer' }],
}));

// Mock referrer-store functions
jest.mock('../../../utilities/referrer-store', () => ({
  isValidReferrerStored: jest.fn(),
  isValidReferrerValue: jest.fn(),
  isRefererStored: jest.fn(),
  deleteReferrer: jest.fn(),
  setReferrer: jest.fn(),
}));

describe('useReferrer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not do anything if the referrer is invalid', () => {
    (isValidReferrerValue as jest.Mock).mockReturnValue(false);
    (isValidReferrerStored as jest.Mock).mockReturnValue(true);

    renderHook(() => useReferrer());

    expect(deleteReferrer).not.toHaveBeenCalled();
    expect(setReferrer).not.toHaveBeenCalled();
  });

  it('should delete the referrer if it is not validly stored', () => {
    (isValidReferrerStored as jest.Mock).mockReturnValue(false);

    renderHook(() => useReferrer());

    expect(deleteReferrer).toHaveBeenCalled();
    expect(setReferrer).not.toHaveBeenCalled();
  });

  it('should set the referrer if it is valid and not already stored', () => {
    (isRefererStored as jest.Mock).mockReturnValue(false);
    (isValidReferrerValue as jest.Mock).mockReturnValue(true);
    (isValidReferrerStored as jest.Mock).mockReturnValue(true);
    renderHook(() => useReferrer());

    expect(deleteReferrer).not.toHaveBeenCalled();
    expect(setReferrer).toHaveBeenCalledWith('valid_referrer');
  });

  it('should not set the referrer if it is already stored', () => {
    (isRefererStored as jest.Mock).mockReturnValue(true);

    renderHook(() => useReferrer());

    expect(deleteReferrer).not.toHaveBeenCalled();
    expect(setReferrer).not.toHaveBeenCalled();
  });
});
