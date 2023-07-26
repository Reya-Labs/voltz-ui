import { getPreviousPositionNotional } from '.';

describe('getPreviousPositionNotional', () => {
  it('should return 0 when selectedPosition is null', () => {
    const state = { previousPosition: null };
    const result = getPreviousPositionNotional(state as never);
    expect(result).toEqual(0);
  });

  it('should return the notional of the selected position when it is not null', () => {
    const notional = 500;
    const position = { notional };
    const state = { previousPosition: position };
    const result = getPreviousPositionNotional(state as never);
    expect(result).toEqual(notional);
  });
});
