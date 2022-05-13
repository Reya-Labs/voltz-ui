/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { SystemStyleObject, Theme } from '@mui/system';
import colors from '../../colors';

export const inputStyles = (disabled?: boolean, error?: boolean, inputSize?: string): SystemStyleObject<Theme> => ({
  fontFamily: 'PixelOperatorMono',
  backgroundColor: (theme) => theme.palette.secondary.darken040,
  borderColor: (theme) => {
    if (disabled) return 'transparent';
    if (error) return theme.palette.error.darken020;
    return colors.vzGreyDark;
  },
  borderStyle: 'solid',
  borderWidth: () => error ? '1px' : '0',
  borderRadius: (theme) => theme.spacing(1),
  color: (theme) => {
    if (disabled) return colors.vzGreyDark;
    if (error) return theme.palette.error.darken015;
    return colors.vzGrey;
  },
  minHeight: 'auto !important',
  height: 'auto !important',
  fontSize: () => inputSize === 'small' ? '16px' : '24px',
  lineHeight:() => '14px',
  padding: (theme) => {
    if (inputSize === 'small') {
      return `${theme.spacing(2)} ${theme.spacing(4)}`;
    } else {
      return theme.spacing(4);
    }
  },
  boxSizing: 'border-box',
  width: '100%',
  '::placeholder': {
    color: (theme) => {
      if (disabled) return colors.vzGreyDark;
      if (error) return theme.palette.error.darken015;
      return colors.vzGrey;
    },
  },
  '&:focus-visible': {
    outline: 'none',
  },
  "::-webkit-outer-spin-button": { 
    "webkitAppearance": "none", 
    "mozAppearance": "none",
    "appearance": "none"
  },
  "::-webkit-inner-spin-button": {
    "webkitAppearance": "none",
    "mozAppearance": "none",
    "appearance": "none"
  },
});