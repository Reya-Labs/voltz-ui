import { isMarginWithdrawable } from './index';

describe('isMarginWithdrawable', () => {
  it('returns true if margin can be withdrawn', () => {
    expect(isMarginWithdrawable(50, 100, 49)).toBe(true);
    expect(isMarginWithdrawable(50, 100, 50)).toBe(true);
  });

  it('returns false if margin cannot be withdrawn', () => {
    expect(isMarginWithdrawable(50, 100, 51)).toBe(false);
  });

  it('returns undefined if any of the arguments are undefined', () => {
    expect(isMarginWithdrawable(50, undefined, 75)).toBe(undefined);
    expect(isMarginWithdrawable(50, 100, undefined)).toBe(undefined);
    expect(isMarginWithdrawable(undefined, 100, 75)).toBe(undefined);
    expect(isMarginWithdrawable(undefined, undefined, undefined)).toBe(undefined);
  });

  it('returns undefined if marginToBeWithdrawn is 0', () => {
    expect(isMarginWithdrawable(0, 100, 75)).toBe(undefined);
  });
});
