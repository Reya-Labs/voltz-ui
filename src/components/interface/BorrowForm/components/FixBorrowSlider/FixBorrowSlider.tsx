import { Typography } from '@components/atomic';
import { Stack, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { formatCurrency, formatNumber } from '@utilities';
import { upperCase } from 'lodash';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';
import { SystemStyleObject, Theme } from '@theme';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseAsyncFunctionResult } from '@hooks';

import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import { ReactComponent as ThumbComponent } from './thumb.svg';

export type FixBorrowSliderProps = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  currencySymbol: string;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  handleChange: (value: number) => void;
  swapSummaryLoading: boolean;
}

const FixBorrowSlider: React.FunctionComponent<FixBorrowSliderProps> = ({
  variableDebt,
  currencySymbol,
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  handleChange,
  swapSummaryLoading
}) => {
  const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      handleChange(newValue);
    }
  };

  const colorStyleOverrides = (): SystemStyleObject<Theme> => {
    return {
      // '& .MuiSlider-thumb': {
      //   height: 27,
      //   width: 27,
      //   border: '1px solid currentColor',
      //   '&:hover': {
      //     boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      //   }
      // },
      '& .MuiSlider-rail': {
        background: '#002BB1',
        height: 20,
      },
      '& .MuiSlider-track': {
        background: "#009AB3",
        height: 20
      },
      '& .MuiSlider-mark': {
        opacity: 0
      }
    };
  };

  interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

  function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        <ThumbComponent/>
      </SliderThumb>
    );
  }
  
  return (
    <Box>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant='body2'>
            {upperCase('Fixed Debt')}
          </Typography>
          <Typography variant='body2'>
              {upperCase('Variable Debt')}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant='body2'>
            {(selectedFixedDebt != null && selectedFixedDebt !== undefined)  ? `${currencySymbol}${formatCurrency(selectedFixedDebt)}` : 'Loading...'} 
            {(selectedFixedDebtPercentage !== null && selectedFixedDebtPercentage !== undefined) ? `(${formatNumber(selectedFixedDebtPercentage)}%)` : ''}
          </Typography>
          <Typography variant='body2'>
            {(selectedVariableDebt != null && selectedVariableDebt !== undefined) ? `${currencySymbol}${formatCurrency(selectedVariableDebt)}` : 'Loading...'} 
            {(selectedVariableDebtPercentage !== null && selectedVariableDebtPercentage !== undefined) ? `(${formatNumber(selectedVariableDebtPercentage)}%)` : ''}
          </Typography>
        </Stack>
      </Stack>

      <Slider
        // components={{ Thumb: AirbnbThumbComponent }}
        defaultValue={0}
        // valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={100}
        onChangeCommitted={handleChangeCommitted}
        disabled={variableDebt.loading || swapSummaryLoading}
        sx={{ ...colorStyleOverrides() }}
      />
    </Box>
  );
};

export default FixBorrowSlider;
