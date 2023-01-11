import { CloseTransactionAction } from '../../../types';

export const closeTransactionAction = (transactionId: string): CloseTransactionAction => ({
  type: 'close-transaction',
  payload: {
    transactionId,
  },
});
