/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { SystemStyleObject, Theme } from '@mui/system';
import colors from '../../colors';

type inputStylesProps = {
  disabled?: boolean;
  dynamic?: boolean;
  error?: boolean;
  inputSize?: string;
  suffixPadding?: number;
  subtext?: boolean;
}

export const inputStyles = ({ disabled, dynamic, error, inputSize, suffixPadding = 0, subtext }: inputStylesProps): SystemStyleObject<Theme> => {
  const containerStyles:SystemStyleObject<Theme> = {
    '&:hover': {
      '*, input': {
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
      }
    },
    '&:focus-within': {
      '*, input': {
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
      }
    },
  }

  const childElementStyles:SystemStyleObject<Theme> = {
    color: (theme) => {
      if (error) return theme.palette.error.base;
      if (dynamic) return colors.lavenderWeb.darken010;
      return colors.vzGreyDarkish2;
    },
    fontFamily: 'PixelOperatorMono',
    transition: 'border-color 0.1s linear, color 0.1s linear',
  }

  const inputFieldStyles:SystemStyleObject<Theme> = {
    backgroundColor: (theme) => theme.palette.secondary.darken040,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: (theme) => theme.spacing(1),
    borderColor: (theme) => {
      if (error) return theme.palette.error.darken010;
      return theme.palette.secondary.darken040;
    },
    minHeight: 'auto !important',
    boxSizing: 'border-box',
    width: '100%',
    cursor: disabled ? 'not-allowed' : undefined,
    
    '::placeholder': {
      transition: 'color 0.1s linear',
      color: (theme) => {
        if (error) return theme.palette.error.base;
        if (disabled) return colors.vzGreyDarkish2;
        if (dynamic) return colors.lavenderWeb.darken010;
        return colors.vzGreyDarkish2;
      },
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
  };

  if(inputSize === 'small') {
    return {
      ...containerStyles,
      '*, input': {
        ...childElementStyles,
        fontSize: '14px',
        lineHeight: '14px',
      },
      'input': {
        ...inputFieldStyles,
        height: '31px',
        padding: (theme) => `
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px + ${suffixPadding}px) 
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px)
        `,
      }
    }
  }

  if(inputSize === 'medium') {
    return {
      ...containerStyles,
      '*, input': {
        ...childElementStyles,
        fontSize: '16px',
        lineHeight: '14px',
      },
      'input': {
        ...inputFieldStyles,
        height: '31px',
        padding: (theme) => `
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px + ${suffixPadding}px) 
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px)
        `,
      }
    }
  }

  return {
    ...containerStyles,
    '*, input': {
      ...childElementStyles,
      fontSize: '24px',
      lineHeight: '1.2',
    },
    'input': {
      ...inputFieldStyles,
      height: '61px',
      padding: (theme) => `
        calc(${subtext ? '11px' : theme.spacing(4)} - 1px)
        calc(${theme.spacing(4)} - 1px + ${suffixPadding}px)
        calc(${subtext ? '29px' : theme.spacing(4)} - 1px)
        calc(${theme.spacing(4)} - 1px)
      `
    },
    '.subtext': {
      fontSize: '14px',
      color: (theme) => {
        if (error) return theme.palette.error.base;
        return colors.lavenderWeb.darken020;
      }
    }
  }
};
