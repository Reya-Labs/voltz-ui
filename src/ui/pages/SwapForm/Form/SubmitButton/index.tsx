import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  openSwapConfirmationFlowAction,
  selectInfoPostSwap,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
} from '../../../../../app/features/forms/trader/swap';
import { FormSubmitButton } from '../../../../components/FormSubmitButton';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  const dispatch = useAppDispatch();
  const submitButtonInfo = useAppSelector(selectSubmitButtonInfo);
  const submitButtonText = useAppSelector(selectSubmitButtonText);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);

  const handleButtonClick = useCallback(() => {
    switch (submitButtonInfo.state) {
      case 'swap':
        void dispatch(openSwapConfirmationFlowAction());
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
          ? 'wildStrawberry'
          : submitButtonInfo.message.type === 'warning'
          ? 'orangeYellow'
          : 'lavenderWeb2'
      }
      disabled={submitButtonInfo.disabled}
      loading={infoPostSwap.status === 'pending'}
      onClick={handleButtonClick}
    >
      {submitButtonText}
    </FormSubmitButton>
  );
};
