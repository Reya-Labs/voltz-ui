import Box from '@mui/material/Box';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';

import { UseAsyncFunctionResult } from '../../../../../hooks/useAsyncFunction';
import { colors, SystemStyleObject, Theme } from '../../../../../theme';
import { formatCurrency, formatNumber } from '../../../../../utilities/number';
import { Typography } from '../../../../atomic/Typography/Typography';

export type FixBorrowSliderProps = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  underlyingTokenName: string;
  selectedFixedDebt: number;
  selectedFixedDebtPercentage: number;
  selectedVariableDebt: number;
  selectedVariableDebtPercentage: number;
  handleSliderChange: (value: number) => void;
  swapSummaryLoading: boolean;
  error?: boolean;
  errorText?: string;
};

const textStyles: SystemStyleObject<Theme> = {
  fontSize: '11px',
  lineHeight: '1.2',
  textTransform: 'uppercase',
};
const errorLabelStyles: SystemStyleObject<Theme> = {
  ...textStyles,
  color: colors.wildStrawberry,
  marginTop: (theme) => theme.spacing(-2),
};

export const FixBorrowSlider: React.FunctionComponent<FixBorrowSliderProps> = ({
  variableDebt,
  underlyingTokenName,
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  handleSliderChange,
  error,
  errorText,
}) => {
  const [sliderValue, setSliderValue] = useState<number | undefined>(undefined);

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    setSliderValue(undefined);
    if (typeof newValue === 'number') {
      handleSliderChange(newValue);
    }
  };

  const labelStyles: SystemStyleObject<Theme> = {
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: 12,
    color: '#A6A2B4',
    verticalAlign: 'middle',
    marginTop: (theme) => theme.spacing(4),
  };

  const colorStyleOverrides = (): SystemStyleObject<Theme> => {
    return {
      '& .MuiSlider-thumb': {
        height: 0,
        width: 0,
        paddingTop: 1,
      },
      '& .MuiSlider-rail': {
        background: '#002BB1',
        height: 13,
      },
      '& .MuiSlider-track': {
        background: '#009AB3',
        height: 13,
      },
      '& .MuiSlider-mark': {
        opacity: 0,
      },
    };
  };

  interface FixBorrowThumbComponentProps extends React.HTMLAttributes<unknown> {}

  function FixBorrowThumbComponent(props: FixBorrowThumbComponentProps) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <div>
          <svg
            fill="none"
            height="18"
            viewBox="0 0 17 18"
            width="17"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="#E5E1F9" height="18" width="4.04734" x="6.46875" />
            <path d="M16.5859 9L12.0327 11.5981L12.0327 6.40192L16.5859 9Z" fill="#E5E1F9" />
            <path d="M0.396484 9L4.94974 6.40192L4.94974 11.5981L0.396484 9Z" fill="#E5E1F9" />
          </svg>
        </div>
      </SliderThumb>
    );
  }

  return (
    <Box>
      <Stack>
        <Stack alignItems="baseline" direction="row" justifyContent="space-between" spacing={1}>
          <Typography sx={{ ...labelStyles }} variant="subtitle1">
            Fixed Debt
          </Typography>
          <Typography sx={{ ...labelStyles }} variant="subtitle1">
            Variable Debt
          </Typography>
        </Stack>

        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Typography display="flex" fontSize="14px" fontWeight="700" variant="body2">
            {!variableDebt.loading
              ? `${formatCurrency(
                  selectedFixedDebt,
                  true,
                  false,
                  underlyingTokenName === 'ETH' ? 4 : 2,
                  underlyingTokenName === 'ETH' ? 4 : 2,
                )} ${underlyingTokenName}`
              : 'Loading...'}
            <Box sx={{ color: '#A6A2B4', fontWeight: 400 }}>
              &thinsp;{' '}
              {!variableDebt.loading ? ` (${formatNumber(selectedFixedDebtPercentage)}%)` : ''}
            </Box>
          </Typography>
          <Typography display="flex" fontSize="14px" fontWeight="700" variant="body2">
            {!variableDebt.loading
              ? `${formatCurrency(
                  selectedVariableDebt,
                  true,
                  false,
                  underlyingTokenName === 'ETH' ? 4 : 2,
                  underlyingTokenName === 'ETH' ? 4 : 2,
                )} ${underlyingTokenName}`
              : 'Loading...'}
            <Box sx={{ color: '#A6A2B4', fontWeight: 400 }}>
              &thinsp;
              {!variableDebt.loading ? ` (${formatNumber(selectedVariableDebtPercentage)}%)` : ''}
            </Box>
          </Typography>
        </Stack>
      </Stack>

      <Slider
        components={{ Thumb: FixBorrowThumbComponent }}
        defaultValue={0}
        disabled={variableDebt.loading}
        max={100}
        min={0}
        step={2.5}
        sx={{ ...colorStyleOverrides() }}
        value={sliderValue ?? selectedFixedDebtPercentage}
        marks
        onChange={handleChangeCommitted}
      />

      {error && errorText && (
        <Typography sx={errorLabelStyles} variant="body2">
          {errorText}
        </Typography>
      )}
    </Box>
  );
};
