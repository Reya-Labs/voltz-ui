import { renderHook } from '@testing-library/react-hooks';
import { generatePath, useNavigate } from 'react-router-dom';

import { routes } from '../../../app/paths';
import { useAppNavigate } from './index';

jest.mock('react-router-dom', () => ({
  generatePath: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('useAppNavigate', () => {
  const navigateMock = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigateMock);

  beforeEach(() => {
    navigateMock.mockClear();
    (generatePath as jest.Mock).mockClear();
  });

  it('should navigate to LP form page with fixedUpper and fixedLower query parameters', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      ammId: 'abc',
      poolId: 'def',
      fixedLower: 123,
      fixedUpper: 456,
    };

    (generatePath as jest.Mock).mockReturnValueOnce(`lp/${params.ammId}/${params.poolId}`);

    result.current.toLPFormPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.LP_FORM, {
      ammId: 'abc',
      poolId: 'def',
    });
    expect(navigateMock).toHaveBeenCalledWith(
      `/lp/${params.ammId}/${params.poolId}?fixedLower=${params.fixedLower}&fixedUpper=${params.fixedUpper}`,
    );
  });

  it('should navigate to LP form page without fixedUpper and fixedLower query parameters', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      ammId: 'abc',
      poolId: 'def',
    };

    (generatePath as jest.Mock).mockReturnValueOnce(`lp/${params.ammId}/${params.poolId}`);

    result.current.toLPFormPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.LP_FORM, params);
    expect(navigateMock).toHaveBeenCalledWith(`/lp/${params.ammId}/${params.poolId}`);
  });

  it('should navigate to swap form page', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      ammId: 'abc',
      poolId: 'def',
    };

    (generatePath as jest.Mock).mockReturnValueOnce(`trader/swap/${params.ammId}/${params.poolId}`);

    result.current.toSwapFormPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.TRADER_SWAP_FORM, params);
    expect(navigateMock).toHaveBeenCalledWith(`/trader/swap/${params.ammId}/${params.poolId}`);
  });

  it('should navigate to rollover swap form page', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      ammId: 'abc',
      poolId: 'def',
      positionId: 'ghj',
    };

    (generatePath as jest.Mock).mockReturnValueOnce(
      `trader/rollover/${params.ammId}/${params.poolId}/${params.positionId}`,
    );

    result.current.toRolloverSwapFormPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.TRADER_ROLLOVER_SWAP_FORM, params);
    expect(navigateMock).toHaveBeenCalledWith(
      `/trader/rollover/${params.ammId}/${params.poolId}/${params.positionId}`,
    );
  });

  it('should navigate to LP optimisers deposit form page', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      vaultId: 'abc',
    };

    (generatePath as jest.Mock).mockReturnValueOnce(`lp-optimisers/deposit/${params.vaultId}`);

    result.current.toLPOptimisersDepositFormPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.LP_OPTIMISERS_DEPOSIT_FORM, {
      actions: 'deposit',
      vaultId: 'abc',
    });
    expect(navigateMock).toHaveBeenCalledWith(`/lp-optimisers/deposit/${params.vaultId}`);
  });

  it('should navigate to rollover lp form page', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      ammId: 'abc',
      poolId: 'def',
      positionId: 'ghj',
    };

    (generatePath as jest.Mock).mockReturnValueOnce(
      `lp/rollover/${params.ammId}/${params.poolId}/${params.positionId}`,
    );

    result.current.toRolloverLPFormPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.LP_ROLLOVER_FORM, params);
    expect(navigateMock).toHaveBeenCalledWith(
      `/lp/rollover/${params.ammId}/${params.poolId}/${params.positionId}`,
    );
  });

  it('should navigate to margin account details page', () => {
    const { result } = renderHook(() => useAppNavigate());

    const params = {
      marginAccountId: 'abc',
    };

    (generatePath as jest.Mock).mockReturnValueOnce(
      `portfolio/margin-account/${params.marginAccountId}`,
    );

    result.current.toMarginAccountDetailsPage(params);

    expect(generatePath).toHaveBeenCalledWith(routes.PORTFOLIO_MARGIN_ACCOUNTS_DETAILS, params);
    expect(navigateMock).toHaveBeenCalledWith(
      `/portfolio/margin-account/${params.marginAccountId}`,
    );
  });
});
