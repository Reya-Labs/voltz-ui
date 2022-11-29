import { CloseTransactionAction } from '../../../types';

const closeTransactionAction = (transactionId: string): CloseTransactionAction => ({
  type: 'close-transaction',
  payload: {
    transactionId,
  },
});

export default closeTransactionAction;
