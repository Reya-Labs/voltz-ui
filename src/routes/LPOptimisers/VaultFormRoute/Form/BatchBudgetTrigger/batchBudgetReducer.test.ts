import { batchBudgetReducer, initialState } from './batchBudgetReducer';

describe('batchBudgetReducer', () => {
  it('should handle initialise action', () => {
    const expectedState = {
      submitText: 'Initialising',
      hintText: 'Initialising, please wait',
      loading: true,
      disabled: true,
      success: false,
      error: false,
    };

    expect(batchBudgetReducer(initialState, { type: 'initialise' })).toEqual(expectedState);
  });

  it('should handle batch_failed action', () => {
    const expectedState = {
      submitText: 'Batch',
      hintText: 'Error occurred',
      error: true,
      loading: false,
      disabled: false,
      success: false,
    };

    expect(
      batchBudgetReducer(initialState, { type: 'batch_failed', errorMessage: 'Error occurred' }),
    ).toEqual(expectedState);
  });

  it('should handle batch_pending action', () => {
    const expectedState = {
      submitText: 'Batching',
      hintText: '',
      error: false,
      loading: true,
      disabled: true,
      success: false,
    };

    expect(batchBudgetReducer(initialState, { type: 'batch_pending' })).toEqual(expectedState);
  });

  it('should handle batch_success action', () => {
    const expectedState = {
      submitText: 'Batched',
      hintText: 'Batched successfully!',
      error: false,
      loading: false,
      disabled: true,
      success: true,
    };

    expect(batchBudgetReducer(initialState, { type: 'batch_success' })).toEqual(expectedState);
  });

  it('should throw error for unknown action', () => {
    expect(() => batchBudgetReducer(initialState, { type: 'unknown' })).toThrowError(
      'Unknown action.',
    );
  });
});
