import React, { ReactNode, useCallback } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { InputBaseProps } from '@mui/material/InputBase';
import { Box, FormControl, InputLabel } from '@mui/material';
import colors from '../../../theme/colors';
import isEmpty from 'lodash/isEmpty';
import { useUniqueId } from '@hooks';
import { OverrideTypes } from '@utilities';

export type MaskedIntegerFieldProps = OverrideTypes<CurrencyInputProps, {
  error?: InputBaseProps['error'],
  label?: ReactNode,
  onChange?: (value: string) => void;
  inputSize?: InputBaseProps['size'];
}>;

const MaskedIntegerField: React.FunctionComponent<MaskedIntegerFieldProps> = ({
  error,
  label,
  onChange,
  inputSize = 'medium',
  suffix,
  ...props
}) => {
  const inputId = useUniqueId();

  const handleChange = (val?: string) => {
    if(onChange) onChange(val || '0');
  };

  return (
    <FormControl variant="outlined" sx={{width: '100%'}}>
      {!isEmpty(label) && (
        <InputLabel shrink htmlFor={inputId} error={error}>
          {label}
        </InputLabel>
      )}

      <Box sx={{
        width: '100%',
        input: {
          fontFamily: 'PixelOperatorMono',
          backgroundColor: (theme) => theme.palette.secondary.darken040,
          borderColor: (theme) => {
            if (props.disabled) return 'transparent';
            if (error) return theme.palette.error.main;
            return colors.vzGreyDark;
          },
          borderRadius: (theme) => theme.spacing(1),
          lineHeight: 1.2,
          color: (theme) => {
            if (props.disabled) return colors.vzGreyDark;
            if (error) return theme.palette.error.main;
            return colors.vzGrey;
          },
          minHeight: (theme) => theme.spacing(8),
          fontSize: () => inputSize === 'small' ? '14px' : '24px',
          padding: (theme) => {
            if (inputSize === 'small') {
              return `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(2)}`;
            } else {
              return theme.spacing(4);
            }
          },
          boxSizing: 'border-box',
          width: '100%',
          border: 0,
          '::placeholder': {
            color: colors.vzGrey,
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
        }}
      }>
        <CurrencyInput
          id={inputId}
          decimalsLimit={2}
          onValueChange={handleChange}
          suffix={` ${suffix || ''}`}
          {...props}
        />
      </Box>
    </FormControl>
  );
};

export default MaskedIntegerField;
