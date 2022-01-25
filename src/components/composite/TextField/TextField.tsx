import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import isEmpty from 'lodash/isEmpty';

import { useUniqueId } from '@hooks';
import { Input } from '../../atomic';

export type TextFieldProps = Omit<MuiTextFieldProps, 'variant'>;

const TextField: React.FunctionComponent<TextFieldProps> = ({ disabled, error, label }) => {
  const inputId = useUniqueId();

  return (
    <FormControl variant="standard">
      {!isEmpty(label) && (
        <InputLabel shrink htmlFor={inputId} error={error}>
          {label}
        </InputLabel>
      )}
      <Input id={inputId} disabled={disabled} error={error} />
    </FormControl>
  );
};

export default TextField;
