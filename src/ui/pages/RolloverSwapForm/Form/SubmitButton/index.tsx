import React, { useCallback } from 'react';

import {
  approveUnderlyingTokenThunk,
  openRolloverConfirmationFlowAction,
  selectInfoPostSwap,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
} from '../../../../../app/features/forms/trader/rollover-swap-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { FormSubmitButton } from '../../../../components/FormSubmitButton';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  const dispatch = useAppDispatch();
  const submitButtonInfo = useAppSelector(selectSubmitButtonInfo);
  const submitButtonText = useAppSelector(selectSubmitButtonText);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);

  const handleButtonClick = useCallback(() => {
    switch (submitButtonInfo.state) {
      case 'approve':
        void dispatch(approveUnderlyingTokenThunk());
        break;
      case 'rollover':
        void dispatch(openRolloverConfirmationFlowAction());
        break;
      default:
        break;
    }
  }, [dispatch, submitButtonInfo.state]);

  return (
    <FormSubmitButton
      bottomLeftText={submitButtonInfo.message.text || undefined}
      bottomLeftTextColorToken={
        submitButtonInfo.message.isError ? 'wildStrawberry' : 'lavenderWeb2'
      }
      disabled={submitButtonInfo.disabled}
      loading={infoPostSwap.status === 'pending'}
      onClick={handleButtonClick}
    >
      {submitButtonText}
    </FormSubmitButton>
  );
};
