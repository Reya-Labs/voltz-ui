import { Button } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  approveUnderlyingTokenThunk,
  openSwapConfirmationFlowAction,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { SubmitButtonBox } from './SubmitButton.styled';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  const dispatch = useAppDispatch();
  const submitButtonInfo = useAppSelector(selectSubmitButtonInfo);
  const submitButtonText = useAppSelector(selectSubmitButtonText);

  const handleButtonClick = useCallback(() => {
    switch (submitButtonInfo.state) {
      case 'approve':
        void dispatch(approveUnderlyingTokenThunk());
        break;
      case 'swap':
        void dispatch(openSwapConfirmationFlowAction());
        break;
      default:
        break;
    }
  }, [dispatch, submitButtonInfo.state]);

  return (
    <SubmitButtonBox>
      <Button
        bottomLeftText={submitButtonInfo.message.text || undefined}
        bottomLeftTextColorToken={
          submitButtonInfo.message.isError ? 'wildStrawberry' : 'lavenderWeb2'
        }
        disabled={submitButtonInfo.disabled}
        variant="primary"
        onClick={handleButtonClick}
      >
        {submitButtonText}
      </Button>
    </SubmitButtonBox>
  );
};
