import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { getExistingPositionFixedRate } from './index';

jest.mock('../getExistingPositionNotional', () => ({
  getExistingPositionNotional: jest.fn(),
}));

jest.mock('../getExistingPositionMode', () => ({
  getExistingPositionMode: jest.fn(),
}));

describe('getExistingPositionFixedRate', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return null if position is not successful', () => {
    const state = {
      position: { status: 'loading', value: { receivingRate: 0.01, payingRate: 0.02 } },
    } as never;
    expect(getExistingPositionFixedRate(state)).toBeNull();
  });

  it('should return null if existing position notional is zero', () => {
    const state = {
      position: { status: 'success', value: { receivingRate: 0.01, payingRate: 0.02 } },
    } as never;
    (getExistingPositionNotional as jest.Mock).mockReturnValue(0);
    expect(getExistingPositionFixedRate(state)).toBeNull();
  });

  it('should return the receiving rate if existing position mode is fixed', () => {
    const state = {
      position: { status: 'success', value: { receivingRate: 0.01, payingRate: 0.02 } },
    } as never;
    (getExistingPositionMode as jest.Mock).mockReturnValue('fixed');
    expect(getExistingPositionFixedRate(state)).toBe(0.01);
  });

  it('should return the paying rate if existing position mode is not fixed', () => {
    const state = {
      position: { status: 'success', value: { receivingRate: 0.01, payingRate: 0.02 } },
    } as never;
    (getExistingPositionMode as jest.Mock).mockReturnValue('floating');
    expect(getExistingPositionFixedRate(state)).toBe(0.02);
  });
});
