import { updateSelectedPosition } from '../updateSelectedPosition';

describe('updateSelectedPosition', () => {
  it('does not update selected position if positions status is not "success"', () => {
    const state = {
      positions: { status: 'idle', value: null },
      userInput: { fixedRange: { lower: 0, upper: 1 } },
      selectedPosition: { notional: 100 },
    };

    updateSelectedPosition(state as never);

    expect(state.selectedPosition).toEqual({ notional: 100 });
  });

  it('does not update selected position if positions value is empty', () => {
    const state = {
      positions: { status: 'success', value: [] },
      userInput: { fixedRange: { lower: 0, upper: 1 } },
      selectedPosition: { notional: 100 },
    };

    updateSelectedPosition(state as never);

    expect(state.selectedPosition).toEqual({ notional: 100 });
  });

  it('updates selected position with first position if no matching position found', () => {
    const state = {
      positions: {
        status: 'success',
        value: [
          {
            fixedRateLower: {
              toNumber: () => 0,
            },
            fixedRateUpper: {
              toNumber: () => 1,
            },
            notional: 100,
          },
        ],
      },
      userInput: { fixedRange: { lower: 2, upper: 3 } },
      selectedPosition: null,
    };

    updateSelectedPosition(state as never);

    expect(state.selectedPosition).toEqual(null);
  });

  it('updates selected position with matching position', () => {
    const state = {
      positions: {
        status: 'success',
        value: [
          {
            fixedRateLower: {
              toNumber: () => 0,
            },
            fixedRateUpper: {
              toNumber: () => 1,
            },
            notional: 100,
          },
          {
            fixedRateLower: {
              toNumber: () => 2,
            },
            fixedRateUpper: {
              toNumber: () => 3,
            },
            notional: 200,
          },
        ],
      },
      userInput: { fixedRange: { lower: 2, upper: 3 } },
      selectedPosition: null,
    };

    updateSelectedPosition(state as never);

    expect(state.selectedPosition).toEqual(state.positions.value[1]);
  });
});
