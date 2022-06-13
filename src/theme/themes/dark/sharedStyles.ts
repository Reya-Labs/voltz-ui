/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { SystemStyleObject, Theme } from '@mui/system';
import colors from '../../colors';

export const inputStyles = (disabled?: boolean, error?: boolean, inputSize?: string): SystemStyleObject<Theme> => {
  const styles:SystemStyleObject<Theme> = {
    fontFamily: 'PixelOperatorMono',
    backgroundColor: (theme) => theme.palette.secondary.darken040,
    borderColor: (theme) => {
      if (disabled) return 'transparent';
      if (error) return theme.palette.error.darken010;
      return colors.vzGreyDark;
    },
    borderStyle: 'solid',
    borderWidth: () => error ? '1px' : '0',
    borderRadius: (theme) => theme.spacing(1),
    color: (theme) => {
      if (disabled) return colors.vzGreyDark;
      if (error) return theme.palette.error.base;
      return colors.vzGrey;
    },
    minHeight: 'auto !important',
    height: 'auto !important',
    lineHeight:() => '14px',
    boxSizing: 'border-box',
    width: '100%',
    cursor: disabled ? 'not-allowed' : undefined,
    '::placeholder': {
      color: (theme) => {
        if (disabled) return colors.vzGreyDark;
        if (error) return theme.palette.error.base;
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
  }

  if(inputSize === 'small') {
    return {
      ...styles,
      fontSize: '14px',
      borderWidth: '1px',
      padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
      borderColor: (theme) => {
        if (error) return theme.palette.error.darken010;
        return colors.lavenderWeb.darken020;
      },
    }
  }

  if(inputSize === 'medium') {
    return {
      ...styles,
      fontSize: '16px',
      padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
    }
  }

  return {
    ...styles,
    fontSize: '24px',
    padding: (theme) => theme.spacing(4),
  }
};