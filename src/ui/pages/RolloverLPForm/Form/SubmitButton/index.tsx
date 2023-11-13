import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  approveUnderlyingTokenThunk,
  openRolloverConfirmationFlowAction,
  selectInfoPostLp,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
} from '../../../../../app/features/forms/lps/rollover-lp';
import { FormSubmitButton } from '../../../../components/FormSubmitButton';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  const dispatch = useAppDispatch();
  const submitButtonInfo = useAppSelector(selectSubmitButtonInfo);
  const submitButtonText = useAppSelector(selectSubmitButtonText);
  const infoPostLp = useAppSelector(selectInfoPostLp);

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
        submitButtonInfo.message.type === 'error'
          ? 'error100'
          : submitButtonInfo.message.type === 'warning'
          ? 'warning100'
          : 'white300'
      }
      disabled={submitButtonInfo.disabled}
      loading={infoPostLp.status === 'pending'}
      onClick={handleButtonClick}
    >
      {submitButtonText}
    </FormSubmitButton>
  );
};
