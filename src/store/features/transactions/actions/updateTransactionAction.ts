import { TransactionUpdate, UpdateTransactionAction } from '../../../types';

const updateTransactionAction = (update: TransactionUpdate): UpdateTransactionAction => ({
  type: 'update-transaction',
  payload: {
    update,
  },
});

export default updateTransactionAction;
