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
      paddingTop: (theme) => theme.spacing(4),
      paddingBottom: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingRight: (theme) => theme.spacing(4),
    };
  };
  const commonOverrides: SystemStyleObject<Theme> = {
    '&.MuiInputBase-root': {
      width: '100%',
    },
    
    '& .MuiInputBase-input': {
      // borderWidth: 1,
      // borderStyle: 'solid',
      backgroundColor: "secondary.darken040",
      borderRadius: 1,
      fontSize: getFontSize,
      lineHeight: '14px',
      maxHeight: getMinHeight,
      ...getPadding(),
      "::-webkit-outer-spin-button": { 
        "-webkit-appearance": "none", 
        "-moz-appearance": "none",
        "appearance": "none"
      },
      "::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        "appearance": "none"
      }
    },
  };

  return <InputBase {...props} sx={{ ...commonOverrides }} />;
};

export default withLabel<InputProps>(Input);
