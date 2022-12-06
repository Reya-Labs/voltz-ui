/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { SystemStyleObject, Theme } from '@mui/system';

import colors from '../../colors';

type inputStylesProps = {
  background?: 'standard' | 'dark';
  disabled?: boolean;
  dynamic?: boolean;
  error?: boolean;
  inputSize?: string;
  suffixPadding?: number;
  subtextSize?: number;
};

export const inputStyles = ({
  background = 'standard',
  disabled,
  dynamic,
  error,
  inputSize,
  suffixPadding = 0,
  subtextSize,
}: inputStylesProps): SystemStyleObject<Theme> => {
  const containerStyles: SystemStyleObject<Theme> = {
    '&:hover': {
      '*, input, .MuiSelect-select': {
        borderColor: (theme) => {
          if (error) return colors.wildStrawberry1;
          if (disabled) return 'transparent';
          return colors.lavenderWeb5;
        },
        color: (theme) => {
          if (error) return colors.wildStrawberry;
          if (disabled) return colors.lavenderWeb5;
          if (dynamic) return colors.lavenderWeb1;
          return colors.lavenderWeb2;
        },
        '::placeholder': {
          color: (theme) => {
            if (error) return colors.wildStrawberry;
            if (disabled) return colors.lavenderWeb5;
            if (dynamic) return colors.lavenderWeb1;
            return colors.lavenderWeb2;
          },
        },
      },
    },
    '&:focus-within': {
      '*, input, .MuiSelect-select': {
        outline: 'none',
        borderColor: (theme) => {
          if (error) return colors.wildStrawberry1;
          return colors.lavenderWeb2;
        },
        color: (theme) => {
          if (error) return colors.wildStrawberry;
          return colors.lavenderWeb;
        },
        '::placeholder': {
          color: (theme) => {
            if (error) return colors.wildStrawberry;
            return colors.lavenderWeb;
          },
        },
      },
    },
    fieldset: {
      display: 'none',
    },
  };

  const childElementStyles: SystemStyleObject<Theme> = {
    color: (theme) => {
      if (error) return colors.wildStrawberry;
      if (dynamic) return colors.lavenderWeb1;
      return colors.lavenderWeb5;
    },
    fontFamily: 'PixelOperatorMono',
    transition: 'border-color 0.1s linear, color 0.1s linear',
  };

  const inputFieldStyles: SystemStyleObject<Theme> = {
    backgroundColor: (theme) =>
      background === 'standard' ? colors.lavenderWeb7 : colors.lavenderWeb8,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: (theme) => theme.spacing(1),
    borderColor: (theme) => {
      if (error) return colors.wildStrawberry1;
      return colors.lavenderWeb7;
    },
    minHeight: 'auto !important',
    boxSizing: 'border-box',
    width: '100%',
    cursor: disabled ? 'not-allowed' : undefined,

    '::placeholder': {
      transition: 'color 0.1s linear',
      color: (theme) => {
        if (error) return colors.wildStrawberry;
        if (disabled) return colors.lavenderWeb5;
        if (dynamic) return colors.lavenderWeb1;
        return colors.lavenderWeb5;
      },
    },
    '::-webkit-outer-spin-button': {
      webkitAppearance: 'none',
      mozAppearance: 'none',
      appearance: 'none',
    },
    '::-webkit-inner-spin-button': {
      webkitAppearance: 'none',
      mozAppearance: 'none',
      appearance: 'none',
    },
  };

  if (inputSize === 'small') {
    return {
      ...containerStyles,
      '*, input, .MuiSelect-select': {
        ...childElementStyles,
        fontSize: '14px',
        lineHeight: '14px',
      },
      input: {
        ...inputFieldStyles,
        height: '31px',
        padding: (theme) => `
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px + ${suffixPadding}px) 
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px)
        `,
      },
    };
  }

  if (inputSize === 'medium') {
    return {
      ...containerStyles,
      '*, input, .MuiSelect-select': {
        ...childElementStyles,
        fontSize: '16px',
        lineHeight: '14px',
      },
      input: {
        ...inputFieldStyles,
        height: '31px',
        padding: (theme) => `
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px + ${suffixPadding}px) 
          calc(${theme.spacing(2)} - 1px) 
          calc(${theme.spacing(4)} - 1px)
        `,
      },
    };
  }

  return {
    ...containerStyles,
    '*, input, .MuiSelect-select': {
      ...childElementStyles,
      fontSize: '24px',
      lineHeight: '1.2',
    },
    input: {
      ...inputFieldStyles,
      height: '61px',
      padding: (theme) => `
        calc(${subtextSize ? '11px' : theme.spacing(4)} - 1px)
        calc(${theme.spacing(4)} - 1px + ${suffixPadding}px)
        calc(${subtextSize ? '29px' : theme.spacing(4)} - 1px)
        calc(${theme.spacing(4)} - 1px)
      `,
    },
    '.subtext': {
      fontSize: `${subtextSize || 14}px`,
      color: (theme) => {
        if (error) return colors.wildStrawberry;
        return colors.lavenderWeb3;
      },
    },
  };
};
