import { Button } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { openSwapConfirmationFlowAction } from '../../../../app/features/swap-form';
import { useAppDispatch } from '../../../../app/hooks';
import { SubmitButtonBox } from './SubmitButton.styled';

type SubmitButtonProps = {};

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = () => {
  // todo: Alex handle button states
  const dispatch = useAppDispatch();
  const handleButtonClick = useCallback(() => {
    dispatch(openSwapConfirmationFlowAction());
  }, [dispatch]);

  return (
    <SubmitButtonBox>
      <Button bottomLeftText="Almost ready." variant="primary" onClick={handleButtonClick}>
        Swap
      </Button>
    </SubmitButtonBox>
  );
};
