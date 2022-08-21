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
  underlyingTokenName: string;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  handleChange: (value: number) => void;
  swapSummaryLoading: boolean;
}

const FixBorrowSlider: React.FunctionComponent<FixBorrowSliderProps> = ({
  variableDebt,
  underlyingTokenName,
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

  const labelStyles: SystemStyleObject<Theme> = { 
    textTransform: "uppercase",
    fontWeight: 400, 
    fontSize: 12,
    color: "#A6A2B4",
    verticalAlign: 'middle',
    marginTop: (theme) => theme.spacing(4)
  };

  const colorStyleOverrides = (): SystemStyleObject<Theme> => {
    return {
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
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
          <Typography variant='subtitle1' sx={{...labelStyles}}>
            Fixed Debt
          </Typography>
          <Typography variant='subtitle1' sx={{...labelStyles}}>
              Variable Debt
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant='body2' display="flex" fontSize='14px' fontWeight='700'>
            {(selectedFixedDebt != null && selectedFixedDebt !== undefined)  ? `${formatCurrency(selectedFixedDebt)} ${underlyingTokenName}` : 'Loading...'} 
            <Box sx={{color: "#A6A2B4", fontWeight: 400}}>
            &thinsp; {(selectedFixedDebtPercentage !== null && selectedFixedDebtPercentage !== undefined) ? ` (${formatNumber(selectedFixedDebtPercentage)}%)` : ''}
            </Box>  
          </Typography>
          <Typography variant='body2' display="flex" fontSize='14px' fontWeight='700'>
            {(selectedVariableDebt != null && selectedVariableDebt !== undefined) ? `${formatCurrency(selectedVariableDebt)} ${underlyingTokenName}` : 'Loading...'} 
            <Box sx={{color: "#A6A2B4", fontWeight: 400}}>
            &thinsp;{(selectedVariableDebtPercentage !== null && selectedVariableDebtPercentage !== undefined) ? ` (${formatNumber(selectedVariableDebtPercentage)}%)` : ''}
            </Box>
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
