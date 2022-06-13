import React, { ReactNode, useCallback } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { InputBaseProps } from '@mui/material/InputBase';
import { Box, FormControl, InputLabel } from '@mui/material';
import colors from '../../../theme/colors';
import isEmpty from 'lodash/isEmpty';
import { useUniqueId } from '@hooks';
import { OverrideTypes } from '@utilities';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';
import { inputStyles } from '@theme';

export type MaskedIntegerFieldProps = OverrideTypes<CurrencyInputProps, {
  error?: InputBaseProps['error'],
  errorText?: string;
  label?: ReactNode,
  onChange?: (value: string) => void;
  inputSize?: 'small' | 'medium' | 'large';
}>;

const errorLabelStyles: SystemStyleObject<Theme> = {
  color: colors.wildStrawberry.base,
  fontSize: '12px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(1),
  textTransform: 'uppercase'
}

const MaskedIntegerField: React.FunctionComponent<MaskedIntegerFieldProps> = ({
  error,
  errorText,
  label,
  onChange,
  inputSize = 'large',
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
        <InputLabel shrink htmlFor={inputId} error={error} sx={{ 
          color: (theme) => error ? `${theme.palette.error.base} !important` : undefined 
        }}>
          {label}
        </InputLabel>
      )}

      <Box sx={{
        width: '100%',
        input: inputStyles(props.disabled, error, inputSize)
      }}>
        <CurrencyInput
          id={inputId}
          decimalsLimit={2}
          onValueChange={handleChange}
          suffix={` ${suffix || ''}`}
          {...props}
        />
      </Box>
      {error && errorText && (
        <Typography variant='body2' sx={errorLabelStyles}>
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
};

export default MaskedIntegerField;
