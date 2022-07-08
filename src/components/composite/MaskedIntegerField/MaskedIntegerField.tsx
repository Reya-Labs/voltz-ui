import React, { ReactNode } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { InputBaseProps } from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import isEmpty from 'lodash/isEmpty';
import { useUniqueId } from '@hooks';
import { OverrideTypes } from '@utilities';
import { Typography } from '@components/atomic';
import { colors, inputStyles, SystemStyleObject, Theme } from '@theme';

export type MaskedIntegerFieldProps = OverrideTypes<CurrencyInputProps, {
  dynamic?: boolean;
  error?: InputBaseProps['error'],
  errorText?: string;
  label?: ReactNode,
  onChange?: (value: string | undefined) => void;
  inputSize?: 'small' | 'medium' | 'large';
  subtext?: string;
  suffix: ReactNode;
  suffixPadding?: number;
}>;

const errorLabelStyles: SystemStyleObject<Theme> = {
  color: colors.wildStrawberry.base,
  fontSize: '12px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(1),
  textTransform: 'uppercase'
}

const MaskedIntegerField: React.FunctionComponent<MaskedIntegerFieldProps> = ({
  dynamic,
  error,
  errorText,
  label,
  onChange,
  inputSize = 'large',
  subtext,
  suffix,
  suffixPadding = 0,
  ...props
}) => {
  const inputId = useUniqueId();

  const handleChange = (val?: string) => {
    if(onChange) onChange(val);
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
        ...inputStyles({ 
          disabled: props.disabled, 
          error, 
          inputSize, 
          dynamic, 
          subtext: !!subtext,
          suffixPadding 
        }),
        width: '100%',
        position: 'relative'
      }}>
        <CurrencyInput
          id={inputId}
          decimalsLimit={2}
          onValueChange={handleChange}
          suffix={undefined}
          {...props}
        />
        {suffix && (
          <Box 
            className='suffix'
            sx={{
              position: 'absolute', 
              right: (theme) => theme.spacing(4), 
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}>
              {suffix}
          </Box>
        )}
        {subtext && (
          <Box 
          className='subtext'
          sx={{
            position: 'absolute', 
            left: (theme) => theme.spacing(4),
            top: '37px',
            pointerEvents: 'none',
          }}>
            {subtext}
        </Box>
        )}
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
