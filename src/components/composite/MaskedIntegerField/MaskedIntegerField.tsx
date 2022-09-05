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
  bottomText?: string;
  dynamic?: boolean;
  error?: InputBaseProps['error'],
  errorText?: string;
  label?: ReactNode,
  labelRight?: ReactNode,
  onChange?: (value: string | undefined) => void;
  inputSize?: 'small' | 'medium' | 'large';
  subtext?: string;
  suffix: ReactNode;
  suffixPadding?: number;
}>;

const textStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '1.2',
  textTransform: 'uppercase'
}
const errorLabelStyles: SystemStyleObject<Theme> = {
  ...textStyles,
  color: colors.wildStrawberry.base,
  marginTop: (theme) => theme.spacing(1),
}

const MaskedIntegerField: React.FunctionComponent<MaskedIntegerFieldProps> = ({
  bottomText,
  dynamic,
  error,
  errorText,
  label,
  labelRight,
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
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        <>
          {!isEmpty(label) 
            ? (
              <InputLabel shrink htmlFor={inputId} error={error} sx={{ 
                color: (theme) => error ? `${theme.palette.error.base} !important` : undefined 
              }}>
                {label}
              </InputLabel>
            ) 
            : <div/>
          }
          {!isEmpty(labelRight) 
            ? (
              <Typography variant='body2' sx={{ 
                ...textStyles, 
                color: colors.lavenderWeb.darken010, 
                marginBottom: (theme) => theme.spacing(2)
              }}>
                {labelRight}
              </Typography>
            ) 
            : <div/>
          }
        </>
      </Box>
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
          intlConfig={{locale: navigator.language}}
          id={inputId}
          decimalsLimit={2}
          maxLength={9}
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
      {bottomText && (
        <Typography variant='body2' sx={textStyles}>
          {bottomText}
        </Typography>
      )}
      {error && errorText && (
        <Typography variant='body2' sx={errorLabelStyles}>
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
};

export default MaskedIntegerField;
