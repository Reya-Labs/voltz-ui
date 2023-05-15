import { getSelectedPositionNotional } from './index';

describe('getSelectedPositionNotional', () => {
  it('should return 0 when selectedPosition is null', () => {
    const state = { selectedPosition: null };
    const result = getSelectedPositionNotional(state as never);
    expect(result).toEqual(0);
  });

  it('should return the notional of the selected position when it is not null', () => {
    const notional = 500;
    const position = { notional };
    const state = { selectedPosition: position };
    const result = getSelectedPositionNotional(state as never);
    expect(result).toEqual(notional);
  });
});
