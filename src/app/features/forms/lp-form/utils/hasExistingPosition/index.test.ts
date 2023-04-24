import { hasExistingPosition } from './index';

describe('hasExistingPosition', () => {
  it('should return false when selectedPosition is null', () => {
    const state = { selectedPosition: null };
    const result = hasExistingPosition(state as never);
    expect(result).toEqual(false);
  });

  it('should return true when selectedPosition is not null', () => {
    const position = { id: 'abc', notional: 500 };
    const state = { selectedPosition: position };
    const result = hasExistingPosition(state as never);
    expect(result).toEqual(true);
  });
});
