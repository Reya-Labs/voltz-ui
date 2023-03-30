import { Button, ColorTokens } from 'brokoli-ui';
import React from 'react';

import { FormSubmitButtonBox } from './FormSubmitButton.styled';

type SubmitButtonProps = {
  bottomLeftText: string | undefined;
  bottomLeftTextColorToken: ColorTokens;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
  children: string;
};

export const FormSubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  bottomLeftTextColorToken,
  bottomLeftText,
  children,
  onClick,
  loading,
  disabled,
}) => {
  return (
    <FormSubmitButtonBox>
      <Button
        bottomLeftText={bottomLeftText}
        bottomLeftTextColorToken={bottomLeftTextColorToken}
        data-testid="FormSubmitButton"
        disabled={disabled}
        loading={loading}
        variant="primary"
        onClick={loading || disabled ? undefined : onClick}
      >
        {children}
      </Button>
    </FormSubmitButtonBox>
  );
};
