import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';

import { withLabel } from '../../utilities';

export type InputProps = InputBaseProps;

const Input: React.FunctionComponent<InputProps> = ({ size, ...props }) => {
  const getFontSize = (_theme: Theme) => {
    if (size === 'small') {
      return 14;
    }

    return 24;
  };
  const getMinHeight = (theme: Theme) => {
    if (size === 'small') {
      return theme.spacing(8);
    }

    return theme.spacing(8);
  };
  const getPadding = (): SystemStyleObject<Theme> => {
    if (size === 'small') {
      return {
        padding: (theme) => theme.spacing(1),
        paddingLeft: (theme) => theme.spacing(2),
      };
    }

    return {
      paddingTop: (theme) => theme.spacing(6),
      paddingBottom: (theme) => theme.spacing(6),
      paddingLeft: (theme) => theme.spacing(4),
      paddingRight: (theme) => theme.spacing(4),
    };
  };
  const commonOverrides: SystemStyleObject<Theme> = {
    '&.MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 2,
      fontSize: getFontSize,
      lineHeight: 14,
      maxHeight: getMinHeight,
      ...getPadding(),
    },
  };

  return <InputBase {...props} sx={{ ...commonOverrides }} />;
};

export default withLabel<InputProps>(Input);
