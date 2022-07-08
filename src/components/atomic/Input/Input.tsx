import React from 'react';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { withLabel } from '../../hoc';

export type InputProps = InputBaseProps;

const Input: React.FunctionComponent<InputProps> = ({ ...props }) => {
  return <InputBase {...props} />;
};

export default withLabel<InputProps>(Input);
