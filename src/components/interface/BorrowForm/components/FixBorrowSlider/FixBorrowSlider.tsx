import { Typography } from '@components/atomic';
import { Slider, Stack, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { formatCurrency, formatNumber } from '@utilities';
import { upperCase } from 'lodash';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseAsyncFunctionResult } from '@hooks';

export type FixBorrowSliderProps = {
  aggregatedDebt: UseAsyncFunctionResult<unknown, number | void>;
  currencySymbol: string;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  handleChange: (value: number) => void;
}

const FixBorrowSlider: React.FunctionComponent<FixBorrowSliderProps> = ({
  aggregatedDebt,
  currencySymbol,
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  handleChange
}) => {
  const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      handleChange(newValue);
    }
  };

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
        defaultValue={0}
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={100}
        onChangeCommitted={handleChangeCommitted}
        disabled={aggregatedDebt.loading}
      />
    </Box>
  );
};

export default FixBorrowSlider;
