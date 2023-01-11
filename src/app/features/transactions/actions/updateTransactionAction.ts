import { TransactionUpdate, UpdateTransactionAction } from '../../../types';

export const updateTransactionAction = (update: TransactionUpdate): UpdateTransactionAction => ({
  type: 'update-transaction',
  payload: {
    update,
  },
});
