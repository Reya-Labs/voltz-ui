import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { InputBaseProps } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import isUndefined from 'lodash.isundefined';
import React, { ReactNode } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

import { useUniqueId } from '../../../hooks/useUniqueId';
import { colors, inputStyles, SystemStyleObject, Theme } from '../../../theme';
import { Typography } from '../../atomic/Typography/Typography';

type OverrideTypes<T1, T2> = Omit<T1, keyof T2> & T2;

export type MaskedIntegerFieldProps = OverrideTypes<
  CurrencyInputProps,
  {
    bottomText?: string;
    dynamic?: boolean;
    error?: InputBaseProps['error'];
    errorText?: string;
    label?: ReactNode;
    labelRight?: ReactNode;
    onChange?: (value: string | undefined) => void;
    inputSize?: 'small' | 'medium' | 'large';
    subtext?: string;
    subtextSize?: number;
    suffix: ReactNode;
    suffixPadding?: number;
  }
>;

const textStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '1.2',
  textTransform: 'uppercase',
};
const errorLabelStyles: SystemStyleObject<Theme> = {
  ...textStyles,
  color: colors.wildStrawberry.base,
  marginTop: (theme) => theme.spacing(1),
};

export const MaskedIntegerField: React.FunctionComponent<MaskedIntegerFieldProps> = ({
  bottomText,
  dynamic,
  error,
  errorText,
  label,
  labelRight,
  onChange,
  inputSize = 'large',
  subtext,
  subtextSize,
  suffix,
  suffixPadding = 0,
  ...props
}) => {
  const inputId = useUniqueId();

  const handleChange = (val?: string) => {
    if (onChange) onChange(val);
  };

  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <>
          {label ? (
            <InputLabel
              error={error}
              htmlFor={inputId}
              sx={{
                color: (theme) => (error ? `${theme.palette.error.base} !important` : undefined),
              }}
              shrink
            >
              {label}
            </InputLabel>
          ) : (
            <div />
          )}
          {labelRight ? (
            <Typography
              sx={{
                ...textStyles,
                color: colors.lavenderWeb.darken010,
                marginBottom: (theme) => theme.spacing(2),
              }}
              variant="body2"
            >
              {labelRight}
            </Typography>
          ) : (
            <div />
          )}
        </>
      </Box>
      <Box
        sx={{
          ...inputStyles({
            disabled: props.disabled,
            error,
            inputSize,
            dynamic,
            subtextSize: isUndefined(subtext) ? undefined : subtextSize || 14,
            suffixPadding,
          }),
          width: '100%',
          position: 'relative',
        }}
      >
        <CurrencyInput
          decimalsLimit={2}
          id={inputId}
          intlConfig={{ locale: navigator.language }}
          maxLength={9}
          suffix={undefined}
          onValueChange={handleChange}
          {...props}
        />
        {suffix && (
          <Box
            className="suffix"
            sx={{
              position: 'absolute',
              right: (theme) => theme.spacing(4),
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            {suffix}
          </Box>
        )}
        {subtext && (
          <Box
            className="subtext"
            sx={{
              position: 'absolute',
              left: (theme) => theme.spacing(4),
              top: '37px',
              pointerEvents: 'none',
            }}
          >
            {subtext}
          </Box>
        )}
      </Box>
      {bottomText && (
        <Typography sx={textStyles} variant="body2">
          {bottomText}
        </Typography>
      )}
      {error && errorText && (
        <Typography sx={errorLabelStyles} variant="body2">
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
};
