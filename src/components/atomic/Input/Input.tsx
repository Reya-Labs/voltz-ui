import React from 'react';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { withLabel } from '../../hoc';
import { inputStyles } from '@theme';

export type InputProps = InputBaseProps & {
  background?: 'standard' | 'dark';
};

const Input: React.FunctionComponent<InputProps> = ({ background = 'standard', ...props }) => {
  const styles = inputStyles({
    background: 'dark',
    disabled: props.disabled,
    dynamic: false,
    error: props.error,
    inputSize: props.size,
    suffixPadding: 0,
    subtext: false,
  });

  return <InputBase {...props} sx={{ ...styles, ...(props.sx || {}) }} />;
};

export default withLabel<InputProps>(Input);
