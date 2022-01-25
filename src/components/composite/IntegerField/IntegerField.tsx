import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import isEmpty from 'lodash/isEmpty';

import { useUniqueId } from '@hooks';
import { Input } from '../../atomic';

export type IntegerFieldProps = Omit<MuiTextFieldProps, 'variant'>;

const IntegerField: React.FunctionComponent<IntegerFieldProps> = ({
  label,
  disabled,
  error,
  ...props
}) => {
  const inputId = useUniqueId();

  return (
    <FormControl variant="standard">
      {!isEmpty(label) && (
        <InputLabel shrink htmlFor={inputId} error={error}>
          {label}
        </InputLabel>
      )}
      <Input id={inputId} disabled={disabled} error={error} type="number" />
    </FormControl>
  );
};

export default IntegerField;
