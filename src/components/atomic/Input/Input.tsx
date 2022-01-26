import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';

import { withLabel } from '../../utilities';

export type InputProps = InputBaseProps;

const Input: React.FunctionComponent<InputProps> = ({ ...props }) => {
  const commonOverrides: SystemStyleObject<Theme> = {
    '&.MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 2,
      fontSize: 24,
      padding: (theme) => theme.spacing(2),
    },
  };

  return <InputBase {...props} sx={{ ...commonOverrides }} />;
};

export default withLabel<InputProps>(Input);
