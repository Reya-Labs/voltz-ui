import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';

export type InputProps = InputBaseProps;

const Input: React.FunctionComponent<InputProps> = ({ ...props }) => {
  const commonOverrides: SystemStyleObject<Theme> = {
    'label + &': {
      marginTop: (theme) => theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      width: '100%',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 2,
      fontSize: 24,
      padding: (theme) => theme.spacing(2),
    },
  };

  return <InputBase {...props} sx={{ ...commonOverrides }} />;
};

export default Input;
