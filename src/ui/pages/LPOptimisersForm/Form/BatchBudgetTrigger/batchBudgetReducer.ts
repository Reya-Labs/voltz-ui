type BatchBudgetState = {
  submitText: string;
  hintText: string;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
};

export const initialState: BatchBudgetState = {
  submitText: 'Batch',
  hintText: '',
  loading: false,
  disabled: false,
  success: false,
  error: false,
};

type Actions =
  | {
      type: 'initialise';
    }
  | {
      type: 'batch_failed';
      errorMessage: string;
    }
  | {
      type: 'batch_pending';
    }
  | {
      type: 'batch_success';
    };

export const batchBudgetReducer = (state: BatchBudgetState, action: Actions): BatchBudgetState => {
  if (action.type === 'initialise') {
    return {
      submitText: 'Initialising',
      hintText: 'Initialising, please wait',
      loading: true,
      disabled: true,
      success: false,
      error: false,
    };
  }
  if (action.type === 'batch_failed') {
    return {
      submitText: 'Batch',
      hintText: action.errorMessage,
      error: true,
      loading: false,
      disabled: false,
      success: false,
    };
  }
  if (action.type === 'batch_pending') {
    return {
      submitText: 'Batching',
      hintText: '',
      error: false,
      loading: true,
      disabled: true,
      success: false,
    };
  }
  if (action.type === 'batch_success') {
    return {
      submitText: 'Batched',
      hintText: 'Batched successfully!',
      error: false,
      loading: false,
      disabled: true,
      success: true,
    };
  }
  throw Error('Unknown action.');
};
