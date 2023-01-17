import { colors } from '../../../../../theme';

type BatchBudgetState = {
  submitText: string;
  hintText: {
    prefixText?: string;
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  disabled: boolean;
  loading: boolean;
  success: boolean;
};

export const initialState = {
  submitText: 'Batch',
  hintText: {
    text: '',
  },
  loading: false,
  disabled: false,
  success: false,
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
      value: number;
      tokenName: string;
    }
  | {
      type: 'batch_success';
      value: number;
      tokenName: string;
    };

export const batchBudgetReducer = (state: BatchBudgetState, action: Actions) => {
  if (action.type === 'initialise') {
    return {
      submitText: 'Initialising',
      hintText: {
        text: 'Initialising, please wait',
      },
      loading: true,
      disabled: true,
      success: false,
    };
  }
  if (action.type === 'batch_failed') {
    return {
      submitText: 'Batch',
      hintText: {
        text: action.errorMessage,
        textColor: colors.vzCustomRed1.base,
      },
      loading: false,
      disabled: false,
      success: false,
    };
  }
  if (action.type === 'batch_pending') {
    return {
      submitText: 'Batching',
      hintText: {
        prefixText: 'Batching',
        text: `${action.value} ${action.tokenName}`,
      },
      loading: true,
      disabled: true,
      success: false,
    };
  }
  if (action.type === 'batch_success') {
    return {
      submitText: 'Batched',
      hintText: {
        prefixText: 'Batched',
        text: `${action.value} ${action.tokenName}`,
        suffixText: 'successfully',
        textColor: colors.skyBlueCrayola.base,
      },
      loading: false,
      disabled: true,
      success: true,
    };
  }
  throw Error('Unknown action.');
};
