import React, { useCallback } from 'react';

import {
  approveUnderlyingTokenThunk,
  closeMarginUpdateConfirmationFlowAction,
  closeLpConfirmationFlowAction,
  openMarginUpdateConfirmationFlowAction,
  openLpConfirmationFlowAction,
  selectInfoPostLp,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
} from '../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
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
      case 'lp':
        void dispatch(closeMarginUpdateConfirmationFlowAction());
        void dispatch(openLpConfirmationFlowAction());
        break;
      case 'margin-update':
        void dispatch(closeLpConfirmationFlowAction());
        void dispatch(openMarginUpdateConfirmationFlowAction());
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
      loading={infoPostLp.status === 'pending'}
      onClick={handleButtonClick}
    >
      {submitButtonText}
    </FormSubmitButton>
  );
};
