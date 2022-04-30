import { AugmentedAMM } from '@utilities';
import { FCMUnwindAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const fcmUnwindAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): FCMUnwindAction => ({
    type: 'fcmUnwind',
    payload: {
        amm: serializeAmm(amm),
        transaction: {
            ...transaction,
        id: createId(transaction),
        },
    },
});

export default fcmUnwindAction;








