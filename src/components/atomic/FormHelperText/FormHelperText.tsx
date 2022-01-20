import React from 'react';
import { styled } from '@mui/system';
import MuiFormHelperText, {
  FormHelperTextProps as MuiFormHelperTextProps,
} from '@mui/material/FormHelperText';

import { colors } from '@theme';

export type FormHelperTextProps = MuiFormHelperTextProps;

const FormHelperText: React.FunctionComponent<FormHelperTextProps> = ({ ...props }) => {
  return <MuiFormHelperText {...props} />;
};

export default styled(FormHelperText)(({ theme }) => ({
  color: colors.vzBlueGreenLight,
}));
