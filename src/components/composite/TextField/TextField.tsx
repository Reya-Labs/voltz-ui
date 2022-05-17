import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import isEmpty from 'lodash/isEmpty';

import { useUniqueId } from '@hooks';
import { Input, Typography } from '@components/atomic';
import { OverrideTypes } from '@utilities';
import { colors, inputStyles } from '@theme';
import { SystemStyleObject, Theme } from '@mui/system';

export type TextFieldProps = OverrideTypes<Omit<MuiTextFieldProps, 'variant'>, {
  errorText?: string
}>;

const errorLabelStyles: SystemStyleObject<Theme> = {
  color: colors.wildStrawberry.darken010,
  fontSize: '12px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(1)
}

const TextField: React.FunctionComponent<TextFieldProps> = ({
  disabled,
  error,
  errorText,
  label,
  inputRef,
}) => {
  const inputId = useUniqueId();

  return (
    <FormControl variant="outlined">
      {!isEmpty(label) && (
        <InputLabel shrink htmlFor={inputId} error={error}>
          {label}
        </InputLabel>
      )}
      <Input id={inputId} disabled={disabled} error={error} inputRef={inputRef} sx={{ input: inputStyles(disabled, error, 'medium') }} />
      {error && errorText && (
        <Typography variant='body2' sx={errorLabelStyles}>
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
};

export default TextField;
