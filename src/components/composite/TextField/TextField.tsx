import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import isEmpty from 'lodash/isEmpty';

import { useUniqueId } from '@hooks';
import { Input, Typography } from '@components/atomic';
import { OverrideTypes } from '@utilities';
import { colors, inputStyles, SystemStyleObject, Theme } from '@theme';

export type TextFieldProps = OverrideTypes<Omit<MuiTextFieldProps, 'variant'>, {
  dynamic?: boolean; // used for styling
  errorText?: string;
  size?: 'small' | 'medium' | 'large'
}>;

const errorLabelStyles: SystemStyleObject<Theme> = {
  color: colors.wildStrawberry.base,
  fontSize: '12px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(1)
}

const TextField: React.FunctionComponent<TextFieldProps> = ({
  disabled,
  dynamic,
  error,
  errorText,
  label,
  inputRef,
  size,
}) => {
  const inputId = useUniqueId();

  return (
    <FormControl variant="outlined">
      {!isEmpty(label) && (
        <InputLabel shrink htmlFor={inputId} error={error}>
          {label}
        </InputLabel>
      )}
      <Input 
        id={inputId} 
        disabled={disabled} 
        error={error} 
        inputRef={inputRef} 
        sx={inputStyles({ disabled, error, inputSize: size, dynamic })} 
      />
      {error && errorText && (
        <Typography variant='body2' sx={errorLabelStyles}>
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
};

export default TextField;
