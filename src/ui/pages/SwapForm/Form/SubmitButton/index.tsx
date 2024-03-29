import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  openDepositAndSwapConfirmationFlowAction,
  openSwapConfirmationFlowAction,
  selectInfoPostSwap,
  selectSubmitButtonInfo,
} from '../../../../../app/features/forms/trader/swap';
import { FormSubmitButton } from '../../../../components/FormSubmitButton';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  const dispatch = useAppDispatch();
  const submitButtonInfo = useAppSelector(selectSubmitButtonInfo);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);

  const handleButtonClick = useCallback(() => {
    switch (submitButtonInfo.state) {
      case 'swap':
        void dispatch(openSwapConfirmationFlowAction());
        break;
      case 'deposit-and-swap':
        void dispatch(openDepositAndSwapConfirmationFlowAction());
        break;
      default:
        break;
    }
  }, [dispatch, submitButtonInfo.state]);

  return (
    <FormSubmitButton
      bottomLeftText={submitButtonInfo.message.text || undefined}
      bottomLeftTextColorToken={
        submitButtonInfo.message.type === 'error'
          ? 'error100'
          : submitButtonInfo.message.type === 'warning'
          ? 'warning100'
          : 'white300'
      }
      disabled={submitButtonInfo.disabled}
      loading={infoPostSwap.status === 'pending'}
      onClick={handleButtonClick}
    >
      {submitButtonInfo.text}
    </FormSubmitButton>
  );
};
