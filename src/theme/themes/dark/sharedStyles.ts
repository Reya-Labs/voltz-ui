/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { SystemStyleObject, Theme } from '@mui/system';
import colors from '../../colors';

export const inputStyles = (disabled?: boolean, error?: boolean, inputSize?: string, dynamic?: boolean): SystemStyleObject<Theme> => {
  const styles:SystemStyleObject<Theme> = {
    fontFamily: 'PixelOperatorMono',
    backgroundColor: (theme) => theme.palette.secondary.darken040,
    borderColor: (theme) => {
      if (error) return theme.palette.error.darken010;
      return theme.palette.secondary.darken040;
    },
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: (theme) => theme.spacing(1),
    color: (theme) => {
      if (error) return theme.palette.error.base;
      if (dynamic) return colors.lavenderWeb.darken010;
      return colors.vzGreyDarkish2;
    },
    minHeight: 'auto !important',
    boxSizing: 'border-box',
    width: '100%',
    cursor: disabled ? 'not-allowed' : undefined,
    transition: 'border-color 0.1s linear, color 0.1s linear',
    '::placeholder': {
      transition: 'color 0.1s linear',
      color: (theme) => {
        if (error) return theme.palette.error.base;
        if (disabled) return colors.vzGreyDarkish2;
        if (dynamic) return colors.lavenderWeb.darken010;
        return colors.vzGreyDarkish2;
      },
    },
    '&:hover': {
      borderColor: (theme) => {
        if (error) return theme.palette.error.darken010;
        if (disabled) return 'transparent';
        return colors.vzGreyDarkish2;
      },
      color: (theme) => {
        if (error) return theme.palette.error.base;
        if (disabled) return colors.vzGreyDarkish2;
        if (dynamic) return colors.lavenderWeb.darken010;
        return colors.lavenderWeb.darken015
      },
      '::placeholder': {
        color: (theme) => {
          if (error) return theme.palette.error.base;
          if (disabled) return colors.vzGreyDarkish2;
          if (dynamic) return colors.lavenderWeb.darken010;
          return colors.lavenderWeb.darken015
        },
      }
    },
    '&:focus-visible': {
      outline: 'none',
      borderColor: (theme) => {
        if (error) return theme.palette.error.darken010;
        return colors.lavenderWeb.darken015;
      },
      color: (theme) => {
        if (error) return theme.palette.error.base;
        return colors.lavenderWeb.base
      },
      '::placeholder': {
        color: (theme) => {
          if (error) return theme.palette.error.base;
          return colors.lavenderWeb.base
        }
      }
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
      lineHeight: '14px',
      height: '31px',
      padding: (theme) => `calc(${theme.spacing(2)} - 1px) calc(${theme.spacing(4)} - 1px)`,
    }
  }

  if(inputSize === 'medium') {
    return {
      ...styles,
      fontSize: '16px',
      lineHeight: '14px',
      height: '31px',
      padding: (theme) => `calc(${theme.spacing(2)} - 1px) calc(${theme.spacing(4)} - 1px)`,
    }
  }

  return {
    ...styles,
    fontSize: '24px',
    lineHeight: '1.2',
    height: '61px',
    padding: (theme) => `calc(${theme.spacing(4)} - 1px)`
  }
};